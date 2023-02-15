import { Box, Typography } from '@mui/material';
import { styles } from './styles';

type Props = {
  data: any;
};
const OrderAddress = ({ data }: Props) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.bodyRoot}>
        <Box sx={styles.sectionRoot}>
          <Box sx={styles.bodyTitleRoot}>
            <Typography sx={styles.bodyTitle}>수령인</Typography>
          </Box>
          <Box sx={styles.bodyContentRoot}>
            <Typography sx={styles.bodyContent}>{data.rcverNm}</Typography>
          </Box>
        </Box>
        <Box sx={styles.sectionRoot}>
          <Box sx={styles.bodyTitleRoot}>
            <Typography sx={styles.bodyTitle}>휴대전화</Typography>
          </Box>
          <Box sx={styles.bodyContentRoot}>
            <Typography sx={styles.bodyContent}>{data.rcverHp}</Typography>
          </Box>
        </Box>
        <Box sx={styles.sectionRoot}>
          <Box sx={styles.bodyTitleRoot}>
            <Typography sx={styles.bodyTitle}>배송지</Typography>
          </Box>
          <Box sx={styles.bodyContentRoot}>
            <Typography sx={styles.bodyContent}>
              {data.rcvAddr} {data.rcvAddrDetail}
            </Typography>
          </Box>
        </Box>
        {data.orderDlvMsg && (
          <Box sx={styles.sectionRoot}>
            <Box sx={styles.bodyTitleRoot}>
              <Typography sx={styles.bodyTitle}>배송메세지</Typography>
            </Box>
            <Box sx={styles.bodyContentRoot}>
              <Typography sx={styles.bodyContent}>
                {data.orderDlvMsg}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderAddress;
