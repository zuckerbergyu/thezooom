import { Box, Typography } from '@mui/material';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import comma from 'libs/comma';

type Props = {
  sx?: SxProps;
  totalPrice: number;
  deliveryFee: number;
};
const OrderPayment = ({ sx, totalPrice, deliveryFee }: Props) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.bodyAreaRoot}>
        <Box sx={styles.bodyRoot}>
          <Box sx={styles.bodyPriceRoot}>
            <Box sx={styles.bodyPriceInfoRoot}>
              <Typography sx={styles.bodyPriceInfoTitle}>상품가격</Typography>
              <Typography sx={styles.bodyPriceInfoContent}>
                {`${comma(totalPrice)}원`}
              </Typography>
            </Box>
            <Box
              sx={[styles.bodyPriceInfoRoot, styles.bodyPriceInfoRootMargin]}
            >
              <Typography sx={styles.bodyPriceInfoTitle}>배송비</Typography>
              <Typography
                sx={styles.bodyPriceInfoContent}
              >{`+ ${deliveryFee}원`}</Typography>
            </Box>
          </Box>
          <Box sx={styles.bodyFinalPriceRoot}>
            <Box sx={styles.bodyFinalPriceInfoRoot}>
              <Typography sx={styles.bodyFinalPriceInfoTitle}>
                최종결제금액
              </Typography>
              <Typography sx={styles.bodyFinalPriceInfoContent}>
                {`${comma(totalPrice + deliveryFee)}원`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderPayment;
