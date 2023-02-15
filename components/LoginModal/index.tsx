import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, ButtonBase, Typography } from '@mui/material';
import { login as loginApi } from 'apis';
import { useUserContext } from 'contexts/User';
import { useContext as useConfirmContext } from 'contexts/confirm';
import TextField from 'components/TextField';
import ResponsiveModal from 'components/ResponsiveModal';
import { SxProps } from 'libs/sx';
import isEmptyString from 'libs/isEmptyString';
import isPorperPassword from 'libs/isProperPassword';
import { styles } from './styles';
import AuthTimer from 'components/AuthTimer';

type Props = {
  sx?: SxProps;
  open: boolean;
  onClose: () => void;
  title: string;
  path?: string;
};
const LoginModal = (props: Props) => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  const { user, setBrandLogin } = useUserContext();
  const [formState, setFormState] = useState({
    type: 'PHONE',
    isPhoneLogin: false,
    title: '로그인',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passWord, setPassWord] = useState('');
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [authNumber, setAuthNumber] = useState('');
  const [authNumberConfirm, setAuthNumberConfirm] = useState('');
  const [newPassWord, setNewPassWord] = useState('');
  const [newPassWordConfirm, setNewPassWordConfirm] = useState('');
  const [isNewPasswordProper, setIsNewPassWordProper] = useState(false);
  const [isNewPasswordSame, setIsNewPassWordSame] = useState(false);

  //api 호출 - 가입 여부 체크
  const { data, isSuccess, refetch, isFetchedAfterMount, dataUpdatedAt } =
    loginApi.useGetBrandLoginCheck({
      // FIXME: 운영에서는 memId 사라짐
      memId: 'testUser',
      custmrId: user?.custmrId,
      memHp: phoneNumber,
    });

  //api 호출 - 가입 여부 체크
  const {
    data: getBrandLoginData,
    isSuccess: getBrandLoginIsSuccess,
    refetch: getBrandLoginRefetch,
    isFetchedAfterMount: getBrandLoginIsFetchedAfterMount,
    dataUpdatedAt: getBrandLoginDataUpdatedAt,
  } = loginApi.useGetBrandLogin({
    // FIXME: 운영에서는 memId 사라짐
    memId: 'testUser',
    custmrId: user?.custmrId,
    memPw: passWord,
  });

  //api 호출 - 신규비밀번호 설정
  const {
    data: newPwSubmitData,
    isSuccess: newPwSubmitIsSucess,
    refetch: newPwSubmitRefetch,
    isFetchedAfterMount: newPwSubmitIsFetchedAfterMount,
  } = loginApi.useGetNewPwSubmit({
    // FIXME: 운영에서는 memId 사라짐
    memId: 'testUser',
    custmrId: user?.custmrId,
    memHp: phoneNumber,
    memNewPwd: newPassWordConfirm,
  });

  const isPhoneNumber = (phoneNmuber: string) => {
    const regPhoneNumber = /^((01[0|1|6|7|8|9])[0-9]{7,8})$/;
    return new RegExp(regPhoneNumber).test(phoneNmuber);
  };
  const checkFormState = (phoneNumber: string) => {
    if (isEmptyString(phoneNumber)) {
      confirmActions.open('알림', '휴대번호를 입력해 주세요.');
      return false;
    }
    if (!isPhoneNumber(phoneNumber)) {
      confirmActions.open('알림', '휴대번호가 유효하지 않습니다.');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (data && isSuccess && isFetchedAfterMount) {
      if (data.result?.resultCode === '0000') {
        if (data.result?.isPasswdUpdate === 'Y') {
          setFormState({ type: 'PHONE', title: '로그인', isPhoneLogin: true });
        } else {
          setFormState({ ...formState, type: 'NEW_LOGIN', title: '확인' });
          setAuthNumberConfirm(String(data.result?.certNo));
        }
      } else {
        confirmActions.open('알림1', data.result?.resultMsg);
      }
    }
  }, [data, isSuccess, isFetchedAfterMount, dataUpdatedAt]);

  useEffect(() => {
    if (
      getBrandLoginData &&
      getBrandLoginIsSuccess &&
      getBrandLoginIsFetchedAfterMount
    ) {
      if (data.result?.resultCode === '0000') {
        setBrandLogin(true);
        router.push(props.path || '/');
        props.onClose();
      } else {
        confirmActions.open('알림', data.result?.resultMsg);
      }
    }
  }, [
    getBrandLoginData,
    getBrandLoginIsSuccess,
    getBrandLoginIsFetchedAfterMount,
    getBrandLoginDataUpdatedAt,
  ]);

  useEffect(() => {
    if (
      newPwSubmitData &&
      newPwSubmitIsSucess &&
      newPwSubmitIsFetchedAfterMount
    ) {
      if (newPwSubmitData.result?.resultCode === '0000') {
        // 세션 스토리지에 저장
        setBrandLogin(true);
        router.push(props.path || '/');
        props.onClose();
      } else {
        confirmActions
          .open('알림', newPwSubmitData.result?.resultMsg)
          .then(async () => {
            // props.onClose();
          });
      }
    }
  }, [newPwSubmitData, isFetchedAfterMount, dataUpdatedAt]);

  // 신규 비밀번호 유효성 확인
  useEffect(() => {
    setIsNewPassWordProper(isPorperPassword(newPassWord));
  }, [newPassWord]);

  // 신규 비밀번호 확인
  useEffect(() => {
    if (newPassWord === newPassWordConfirm) {
      setIsNewPassWordSame(true);
    } else {
      setIsNewPassWordSame(false);
    }
  }, [newPassWordConfirm, newPassWord]);

  const handleSubmitBtn = () => {
    if (formState.type === 'PHONE') {
      if (formState.isPhoneLogin) {
        getBrandLoginRefetch();
      } else {
        if (checkFormState(phoneNumber)) refetch();
        return;
      }
    }
    if (formState.type === 'NEW_LOGIN') {
      if (authNumber === '') {
        confirmActions.open('알림', '인증번호를 입력해주세요.');
        return;
      }
      if (authNumber === authNumberConfirm) {
        if (min === 0 && sec === 0) {
          confirmActions.open(
            '알림',
            '인증번호가 만료되었습니다. 인증번호 재발송후 다시 시도해주시기 바랍니다.'
          );
          return;
        }
        setFormState({
          ...formState,
          type: 'NEW_LOGIN_SUBMIT',
          title: '로그인',
        });

        return;
      } else {
        confirmActions.open('알림', '인증번호가 다릅니다.');
      }
    }
    if (formState.type === 'NEW_LOGIN_SUBMIT') {
      newPwSubmitRefetch();
    }
  };

  return (
    <ResponsiveModal
      open={props.open}
      onClose={props.onClose}
      title={props.title}
      sx={styles.root}
    >
      <Box sx={styles.contentsRoot}>
        {formState.type === 'PHONE' && (
          <Box sx={{ width: '100%' }}>
            <Box sx={styles.textFieldRoot}>
              <TextField
                placeholder={'휴대번호 입력해주세요'}
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </Box>

            {formState.isPhoneLogin && (
              <Box sx={styles.textFieldRoot}>
                <TextField
                  placeholder={'비밀번호를 입력해주세요'}
                  value={passWord}
                  onChange={setPassWord}
                />
              </Box>
            )}
          </Box>
        )}
        {formState.type === 'NEW_LOGIN' && (
          <Box sx={{ width: '100%' }}>
            <Box sx={styles.authAreaRoot}>
              <Box sx={styles.authTextField}>
                <TextField
                  placeholder={'인증번호'}
                  value={authNumber}
                  onChange={setAuthNumber}
                />
              </Box>
              <Box sx={styles.authTimerArea}>
                <Box sx={styles.authTimer}>
                  <AuthTimer
                    min={min}
                    sec={sec}
                    active={true}
                    sx={styles.authTimerTxt}
                    setMin={setMin}
                    setSec={setSec}
                    onFinishTimer={() => {
                      // 타이머 종료시 콜백
                      confirmActions.open('알림', '인증번호가 만료되었습니다.');
                    }}
                  />
                </Box>
                <ButtonBase
                  onClick={() => {
                    if (min < 3 && sec < 40) {
                      confirmActions
                        .open('알림', '인증번호가 재발송되었습니다.')
                        .then(async () => {
                          setAuthNumberConfirm('');
                          setMin(3);
                          setSec(0);
                          refetch();
                        });
                    } else {
                      confirmActions.open(
                        '알림',
                        '잠시뒤 다시 시도해주시기 바랍니다.'
                      );
                    }
                  }}
                  sx={styles.sendAuthNumberBtn}
                >
                  <Typography sx={styles.sendAuthNumberBtnTxt}>
                    {min === 0 && sec === 0
                      ? '인증번호 재발송'
                      : '인증번호 발송'}
                  </Typography>
                </ButtonBase>
              </Box>
            </Box>
          </Box>
        )}
        {formState.type === 'NEW_LOGIN_SUBMIT' && (
          <Box sx={{ width: '100%' }}>
            <Box sx={styles.textFieldRoot} component="form">
              <TextField
                placeholder={'비밀번호'}
                value={newPassWord}
                onChange={setNewPassWord}
                type="password"
              />
            </Box>
            {!isNewPasswordProper && (
              <Box sx={styles.warningTxtRoot}>
                <Typography sx={styles.warningTxt}>
                  알파벳, 특수문자 포함 8자리 이상 입력해주세요.
                </Typography>
              </Box>
            )}
            <Box sx={styles.textFieldRoot}>
              <TextField
                placeholder={'비밀번호 확인'}
                value={newPassWordConfirm}
                onChange={setNewPassWordConfirm}
                type="password"
              />
            </Box>
            {isNewPasswordProper && !isNewPasswordSame && (
              <Box sx={styles.warningTxtRoot}>
                <Typography sx={styles.warningTxt}>
                  비밀번호가 일치하지 않습니다.
                </Typography>
              </Box>
            )}
          </Box>
        )}
        <Box sx={styles.infoTxtRoot}>
          <Typography sx={styles.infoTxt}>
            삼성 브랜드 상품은 2단계 인증 이후 구매 가능합니다.
          </Typography>
        </Box>
        <ButtonBase onClick={handleSubmitBtn} sx={styles.submitBtnRoot}>
          <Typography sx={styles.btnTxt}>{formState.title}</Typography>
        </ButtonBase>
      </Box>
    </ResponsiveModal>
  );
};

export default LoginModal;
