import { Box, Typography } from '@mui/material';
import { styles } from './styles';

const ExchangeOrReturn = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          상품수령 후 제품의 하자 및 불량건인 경우 반품 및 교환가능 하나,
          단순변심으로 인한 취소는 불가합니다.
        </Typography>
      </Box>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          수령즉시 내용물과 중량, 수량 등을 꼼꼼히 확인해 주십시오.
        </Typography>
      </Box>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          수령시점에 상품의 하자가 발견된 경우에는 즉시 연락주십시오.
        </Typography>
      </Box>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          고객님의 귀책사유로 상품 및 포장 등의 훼손 발생시 반품/교환/환불은
          불가능합니다.
        </Typography>
      </Box>
    </Box>
  );
};

export default ExchangeOrReturn;
