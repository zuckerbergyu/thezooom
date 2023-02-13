import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  ButtonBase,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { member as memberApi } from 'apis';
import TextField from 'components/TextField';
import DaumAddressFinder from 'components/DaumAddressFinder';
import isEmptyString from 'libs/isEmptyString';
import { Address } from 'types';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  isFixedBottomBtn?: boolean;
  onSubmit: () => void;
  addressAlias: string;
  recipient: string;
  address: string;
  zipCode: string;
  sigunguCode: string;
  detailAddress: string;
  phoneNumber: string;
  checked: boolean;
  setAddressAlias: (value: string) => void;
  setRecipient: (value: string) => void;
  setAddress: (value: string) => void;
  setZipcode: (value: string) => void;
  setSigunguCode: (value: string) => void;
  setDetailAddress: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setChecked: (value: boolean) => void;
};
const AddAddress = (props: Props) => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  const [openDaum, setOpenDaum] = useState(false);

  // 기본 배송지 체크박스
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setChecked(event.target.checked);
  };

  const resultAddressInfo: Address = {
    dlvAddrSeq: 0,
    addrNick: props.addressAlias,
    rcverNm: props.recipient,
    rcvPost: props.zipCode,
    rcvAddr: props.address,
    rcvAddrDetail: props.detailAddress,
    rcvAddrCode: props.sigunguCode,
    reverTel: '',
    rcverHp: props.phoneNumber,
    basicYn: props.checked ? 'Y' : 'N',
  };

  // 배송지 등록 api
  const { data, isSuccess } = memberApi.useGetAddressSubmit(resultAddressInfo);

  // 배송지 등록 완료후 처리
  useEffect(() => {
    if (data && isSuccess) {
      confirmActions
        .open('알림', '배송지 등록이 완료되었습니다.')
        .then(async () => {
          router.replace('/mypage?tabType=add');
        });
    }
  }, [data]);

  const isPhoneNumber = (phoneNmuber: string) => {
    const regPhoneNumber = /^((01[0|1|6|7|8|9])[0-9]{7,8})$/;
    return new RegExp(regPhoneNumber).test(phoneNmuber);
  };

  // 배송지 데이터 체크
  const checkFormState = (state: Address) => {
    if (isEmptyString(state.addrNick)) {
      confirmActions.open('알림', '주소별칭을 입력해 주세요.');
      return false;
    }
    if (isEmptyString(state.rcverNm)) {
      confirmActions.open('알림', '수령인을 입력해 주세요.');
      return false;
    }
    if (isEmptyString(state.rcvPost)) {
      confirmActions.open('알림', '주소를 입력해 주세요.');
      return false;
    }
    if (isEmptyString(state.rcvAddrDetail)) {
      confirmActions.open('알림', '상세주소를 입력해 주세요.');
      return false;
    }
    if (isEmptyString(state.rcverHp)) {
      confirmActions.open('알림', '휴대번호를 입력해 주세요.');
      return false;
    }
    if (!isPhoneNumber(state.rcverHp)) {
      confirmActions.open('알림', '휴대번호가 유효하지 않습니다.');
      return false;
    }
    return true;
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.bodyRoot}>
        <Box sx={styles.textFieldRoot}>
          <TextField
            placeholder={'주소별칭을 입력해주세요'}
            label="주소별칭"
            isRequired
            value={props.addressAlias}
            onChange={props.setAddressAlias}
          />
        </Box>
        <Box sx={styles.textFieldRoot}>
          <TextField
            placeholder={'수령인을 입력해주세요'}
            label="수령인"
            isRequired
            value={props.recipient}
            onChange={props.setRecipient}
          />
        </Box>
        <Box
          sx={styles.zipCodeRoot}
          onClick={() => {
            setOpenDaum(true);
          }}
        >
          <Box sx={{ width: '80%' }}>
            <TextField
              placeholder={'우편번호를 입력해주세요'}
              label="배송지"
              isRequired
              value={props.zipCode}
              onChange={(_) => {}}
              disabled
            />
          </Box>
          <Box
            sx={{ width: '20%' }}
            onClick={() => {
              setOpenDaum(true);
            }}
          >
            <Box sx={styles.zipCodeBtnRoot}>
              <Box sx={styles.zipCodeBtn}>
                <Typography sx={{ fontSize: '13px' }}>우편번호</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={styles.textFieldRoot}
          onClick={() => {
            setOpenDaum(true);
          }}
        >
          <TextField
            placeholder={'주소를 입력해주세요'}
            value={props.address}
            onChange={props.setDetailAddress}
            disabled
          />
        </Box>
        <Box sx={styles.textFieldRoot}>
          <TextField
            placeholder={'상세주소를 입력해주세요'}
            value={props.detailAddress}
            onChange={props.setDetailAddress}
          />
        </Box>
        <Box sx={styles.phoneNumberRoot}>
          <TextField
            placeholder={'"-"없이 번호만 입력해주세요'}
            label="휴대전화"
            isRequired
            value={props.phoneNumber}
            onChange={props.setPhoneNumber}
          />
        </Box>
        <FormControlLabel
          value="end"
          control={
            <Checkbox
              sx={styles.checkBox}
              checked={props.checked}
              onChange={handleChange}
            />
          }
          label={<Typography>기본 배송지로 등록</Typography>}
          labelPlacement="end"
          sx={{ marginBottom: '70px' }}
        />

        {!props.isFixedBottomBtn && (
          <ButtonBase
            onClick={() => {
              if (checkFormState(resultAddressInfo)) {
                props.onSubmit();
              }
            }}
            sx={styles.submitBtn}
          >
            <Box>등록 완료</Box>
          </ButtonBase>
        )}

        <DaumAddressFinder
          open={openDaum}
          onClose={() => setOpenDaum(false)}
          onSubmit={({ address, addressDetail, zipCode, sigunguCode }) => {
            props.setAddress(address);
            props.setZipcode(zipCode);
            props.setSigunguCode(sigunguCode);
          }}
        />
      </Box>
      {props.isFixedBottomBtn && (
        <ButtonBase
          onClick={() => {
            if (checkFormState(resultAddressInfo)) {
              props.onSubmit();
            }
          }}
          sx={styles.fixedBottomSubmitBtn}
        >
          <Box>등록 완료</Box>
        </ButtonBase>
      )}
    </Box>
  );
};

export default AddAddress;
