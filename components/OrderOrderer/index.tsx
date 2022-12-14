import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';

type Props = {
  data: any;
};
const OrderOrderer = ({ data }: Props) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.bodyRoot}>
        <Box sx={styles.sectionRoot}>
          <Box sx={styles.bodyTitleRoot}>
            <Typography sx={styles.bodyTitle}>주문번호</Typography>
          </Box>
          <Box sx={styles.bodyContentRoot}>
            <Typography sx={styles.bodyContent}>{data.orderSeq}</Typography>
          </Box>
        </Box>
        <Box sx={styles.sectionRoot}>
          <Box sx={styles.bodyTitleRoot}>
            <Typography sx={styles.bodyTitle}>주문자명</Typography>
          </Box>
          <Box sx={styles.bodyContentRoot}>
            <Typography sx={styles.bodyContent}>{data.ordererNm}</Typography>
          </Box>
        </Box>
        <Box sx={styles.sectionRoot}>
          <Box sx={styles.bodyTitleRoot}>
            <Typography sx={styles.bodyTitle}>연락처</Typography>
          </Box>
          <Box sx={styles.bodyContentRoot}>
            <Typography sx={styles.bodyContent}>{data.ordererHp}</Typography>
          </Box>
        </Box>
        <Box sx={styles.sectionRoot}>
          <Box sx={styles.bodyTitleRoot}>
            <Typography sx={styles.bodyTitle}>주문일자</Typography>
          </Box>
          <Box sx={styles.bodyContentRoot}>
            <Typography sx={styles.bodyContent}>{data.orderDt}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderOrderer;
