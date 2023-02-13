import React, { useEffect, useState } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { order as orderApi } from 'apis';
import { SELECT_CANCEL_RETURN_OPTIONS as options } from 'constants/meta';
import SelectReasonMemo from '../../_comps/SelectReasonMemo';
import ExchangeReturnInfo from '../../_comps/ExchangeReturnInfo';
import { styles } from './styles';

const OrderReturn = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  const [reason, setReason] = useState('');

  const orderSeq =
    router.isReady && router.query.id ? Number(router.query.id) : null;

  const params: orderApi.ExchangeOrReturnParams = {
    orderGrpSeq: orderSeq,
    msg: reason,
  };

  const { data, isSuccess, refetch } = orderApi.useGetReturn(params);

  useEffect(() => {
    if (data && isSuccess) {
      confirmActions
        .open('알림', '반품신청이 완료되었습니다.')
        .then(async (answer) => {
          router.replace('/mypage');
        });
    }
  }, [data]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.headerTxt}>반품 신청</Typography>
      </Box>
      <Box sx={styles.selectReasonMemoRoot}>
        <SelectReasonMemo
          addressMemo={reason}
          setAddressMemo={setReason}
          type="반품"
          options={options}
        />
        <ButtonBase
          onClick={() => {
            if (reason === '') {
              confirmActions.open('알림', '반품사유를 입력해주세요.');
              return;
            }
            confirmActions
              .open('알림', '반품을 신청을 진행하시겠습니까?', ['취소', '확인'])
              .then(async (answer) => {
                if (answer === '확인') {
                  refetch();
                }
              });
          }}
          sx={styles.submitBtn}
        >
          <Box>반품하기</Box>
        </ButtonBase>
        <ExchangeReturnInfo />
      </Box>
    </Box>
  );
};

export default OrderReturn;
