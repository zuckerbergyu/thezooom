import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext as useConfirmContext } from 'contexts/confirm';
import TextField from 'components/TextField';
import isEmptyString from 'libs/isEmptyString';
import { styles } from './styles';

/**
 * 특정 사이트 인증을 위한 로그인 페이지
 * 로그인 성공시
 *  -> 세션에 저장
 *  -> 가야할곳으로 이동
 * 로그인 실패시
 *  -> 탈출 버튼 등록
 */
const CheckAuth = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const nextPath = router.isReady && router.query.pid ? router.query.pid : null;
  const nextBrandPath =
    router.isReady && router.query.brandCd ? router.query.brandCd : null;

  // id,pw 체크
  const checkFormState = (state: any) => {
    if (isEmptyString(state.id)) {
      confirmActions.open('알림', '휴대번호를 입력해 주세요.');
      return false;
    }
    // if (isEmptyString(state.pw)) {
    //   confirmActions.open('알림', '비밀번호를 입력해 주세요.');
    //   return false;
    // }
    return true;
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.areaRoot}>
        <Box sx={styles.titleRoot}>
          <Typography sx={styles.titleTxt}>2단계인증</Typography>
        </Box>
        <Box sx={styles.textFieldRoot}>
          <TextField
            placeholder={'휴대번호 입력해주세요'}
            label="휴대번호"
            value={id}
            onChange={setId}
          />
        </Box>
        {/* <Box>
          <TextField
            placeholder={'비밀번호를 입력해주세요'}
            label="비밀번호"
            value={pw}
            onChange={setPw}
            type="password"
          />
        </Box> */}
        <Box sx={{}}>
          <Typography sx={{ fontSize: '14px' }}>
            삼성 브랜드 상품은 2단계 인증 이후 구매가 가능합니다.
          </Typography>
        </Box>
        <ButtonBase
          onClick={() => {
            console.log('로그인 클릭');
            if (checkFormState({ id, pw })) {
              // api 호출
              // 성공 -> nextPage로 이동
              confirmActions
                .open('알림', '인증이 완료되었습니다.')
                .then(async (answer) => {
                  router.replace(
                    `/goods/list/${nextPath}?brandCd=${nextBrandPath}`
                  );
                });
            }
          }}
          sx={styles.submitBtnRoot}
        >
          <Typography sx={styles.btnTxt}>인증하기</Typography>
        </ButtonBase>
        <ButtonBase
          onClick={() => {
            router.back();
          }}
          sx={[styles.submitBtnRoot, styles.goBackBtn]}
        >
          <Typography sx={styles.btnTxt}>이전 페이지로</Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default CheckAuth;
