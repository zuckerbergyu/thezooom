import { Box, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  value: string;
  onChange: (value: string) => void;
};
const PaymentMethod = (props: Props) => {
  return (
    <Box sx={styles.root}>
      <Box
        sx={[
          styles.paymentBtnRoot,
          props.value === '0001' && styles.paymentBtnSelectedRoot,
        ]}
        onClick={() => props.onChange('0001')}
      >
        <CreditCardIcon
          sx={[
            styles.creditIcon,
            props.value === '0001' && styles.creditIconSelected,
          ]}
        />
        <Typography
          sx={[styles.label, props.value === '0001' && styles.labelSelected]}
        >
          신용카드
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentMethod;
