import React, { useEffect, useState } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { useGetCancel } from 'apis/index';
import { SELECT_CANCEL_RETURN_OPTIONS as options } from 'constants/meta';
import SelectReasonMemo from '../../_comps/SelectReasonMemo';
import { styles } from './styles';

const OrderCancel = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  const [reason, setReason] = useState('');

  const orderSeq =
    router.isReady && router.query.id ? Number(router.query.id) : null;

  const params = {
    orderGrpSeq: orderSeq,
    cancelMsg: reason,
  };
  const { data, isSuccess, refetch } = useGetCancel(params);

  useEffect(() => {
    if (data && isSuccess) {
      confirmActions
        .open('알림', '주문취소신청이 완료되었습니다.')
        .then(async (answer) => {
          router.replace('/mypage');
        });
    }
  }, [data]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.headerTxt}>주문 취소</Typography>
      </Box>
      <Box sx={styles.selectReasonMemoRoot}>
        <SelectReasonMemo
          addressMemo={reason}
          setAddressMemo={setReason}
          type="취소"
          options={options}
        />
        <ButtonBase
          onClick={() => {
            if (reason === '') {
              confirmActions.open('알림', '주문취소사유를 입력해주세요.');
              return;
            }
            confirmActions
              .open('알림', '주문취소를 진행하시겠습니까?', ['취소', '확인'])
              .then(async (answer) => {
                if (answer === '확인') {
                  refetch();
                }
              });
          }}
          sx={styles.submitBtn}
        >
          <Box>취소하기</Box>
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default OrderCancel;
