import { useEffect, useState } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { order as orderApi } from 'apis';
import { SELECT_EXCHANGE_OPTIONS as options } from 'constants/meta';
import SelectReasonMemo from '../../_comps/SelectReasonMemo';
import ExchangeReturnInfo from '../../_comps/ExchangeReturnInfo';
import { styles } from './styles';

const OrderExchange = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  const [reason, setReason] = useState('');

  const orderSeq =
    router.isReady && router.query.id ? Number(router.query.id) : null;

  const params: orderApi.ExchangeOrReturnParams = {
    orderGrpSeq: orderSeq,
    msg: reason,
  };
  const { data, isSuccess, refetch } = orderApi.useGetExchange(params);

  useEffect(() => {
    if (data && isSuccess) {
      confirmActions
        .open('알림', '교환신청이 완료되었습니다.')
        .then(async (answer) => {
          router.replace('/mypage');
        });
    }
  }, [data]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.headerTxt}>교환 신청</Typography>
      </Box>
      <Box sx={styles.selectReasonMemoRoot}>
        <SelectReasonMemo
          addressMemo={reason}
          setAddressMemo={setReason}
          type="교환"
          options={options}
        />
        <ButtonBase
          onClick={() => {
            if (reason === '') {
              confirmActions.open('알림', '교환사유를 입력해주세요.');
              return;
            }
            confirmActions
              .open('알림', '교환을 신청을 진행하시겠습니까?', ['취소', '확인'])
              .then(async (answer) => {
                if (answer === '확인') {
                  refetch();
                }
              });
          }}
          sx={styles.submitBtn}
        >
          <Box>교환하기</Box>
        </ButtonBase>
        <ExchangeReturnInfo />
      </Box>
    </Box>
  );
};

export default OrderExchange;
