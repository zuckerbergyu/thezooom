import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';

const Delivery = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          상품별 발송기간이 상이하며, 택배사 사정에 따라 1~3일 더 소요될 수
          있습니다.
        </Typography>
      </Box>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          산지및 택배사 사정상 토 · 일요일 및 공휴일은 상품을 발송하지 않습니다.
        </Typography>
      </Box>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          제주, 도서 산간 지역은 추가배송비 발생되실수 있으며, 배송이 1~2일 더
          소요될 수 있습니다.
        </Typography>
      </Box>
      <Box sx={styles.labelRoot}>
        <Typography>ㆍ </Typography>
        <Typography sx={styles.label}>
          상품 생산지와 수취인명, 배송지 등이 동일한 주문건은 묶음배송해
          드립니다.
        </Typography>
      </Box>
    </Box>
  );
};

export default Delivery;
