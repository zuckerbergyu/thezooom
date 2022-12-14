import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import Divider from 'components/Divider';

type Props = {
  sx?: SxProps;
  data: any;
};
const AddressSection = ({ sx, data }: Props) => {
  console.log('AddressSection : ', data);
  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.headerTxt}>배송지 정보</Typography>
      </Box>
      <Divider size={1} sx={styles.divider} />
      <Box sx={styles.bodyRoot}>
        <Box>
          <Typography sx={styles.bodyTitle}>수령인</Typography>
          <Typography sx={styles.bodyContent}>{data.rcverNm}</Typography>
          <Divider size={1} sx={styles.divider} />
        </Box>
        <Box>
          <Typography sx={[styles.bodyTitle, styles.bodyTitleMargin]}>
            휴대전화
          </Typography>
          <Typography sx={styles.bodyContent}>{data.rcverHp}</Typography>
          <Divider size={1} sx={styles.divider} />
        </Box>
        <Box>
          <Typography sx={[styles.bodyTitle, styles.bodyTitleMargin]}>
            배송지
          </Typography>
          <Typography sx={styles.bodyContent}>
            {data.rcvAddr} {data.rcvAddrDetail}
          </Typography>
          <Divider size={1} sx={styles.divider} />
        </Box>

        {data.orderDlvMsg && (
          <Box>
            <Typography sx={[styles.bodyTitle, styles.bodyTitleMargin]}>
              배송메세지
            </Typography>
            <Typography sx={styles.bodyContent}>{data.orderDlvMsg}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddressSection;
