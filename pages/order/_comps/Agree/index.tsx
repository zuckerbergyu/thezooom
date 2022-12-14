import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styles } from './styles';

type Props = {
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Agree = (props: Props) => {
  return (
    <Box>
      <FormControlLabel
        value="end"
        control={
          <Checkbox
            icon={<CheckCircleIcon sx={styles.checkIcon} />}
            checkedIcon={<CheckCircleIcon sx={styles.checkedIcon} />}
            checked={props.value}
            onChange={props.onChange}
          />
        }
        label={
          <Box sx={styles.labelRoot}>
            <Typography sx={styles.label}>주문 내용 확인 및 동의</Typography>
            <Typography sx={styles.labelDot}> *</Typography>
          </Box>
        }
        labelPlacement="end"
      />
      <Box sx={styles.contentsRoot}>
        <Typography sx={styles.contentTxt}>
          주문 상품의 상세 정보, 가격, 배송정보 등을 확인
        </Typography>
        <Typography sx={styles.contentTxt}>
          하였으며, 구매에 동의합니다
        </Typography>
        <Typography sx={styles.contentTxt}>
          <br />
          (전자상거래법 제8조 제2항)
        </Typography>
      </Box>
    </Box>
  );
};

export default Agree;
