import React, { useState } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { styles } from './styles';
import { SxProps } from 'libs/sx';
import Divider from 'components/Divider';

interface AddressItem {
  addrNick: string;
  rcverNm: string;
  rcvAddr: string;
  rcverHp: string;
  rcvAddrDetail: string;
  basicYn: 'Y' | 'N';
}
type Props = {
  sx?: SxProps;
  data: AddressItem;
  index: number;
  onDelete: (value: number) => void;
};
const AddressItem = (props: Props) => {
  return (
    <Box>
      <Box sx={styles.root}>
        <Box sx={styles.headerRoot}>
          <Box sx={styles.addressNickNameRoot}>
            <Typography sx={styles.addressNickNameTxt}>
              {props.data.basicYn === 'Y' ? `기본배송지 l ` : null}
              {props.data.addrNick}
            </Typography>
          </Box>
          <Box sx={styles.editDeleteRoot}>
            <ButtonBase
              onClick={() => {
                // TODO: 수정 api는 휴샵에 없어 추후 구현
                // 수정 페이지는, 등록 페이지에 프롭스변경으로 구현
              }}
            >
              <Typography sx={styles.editDeleteBtn}>수정</Typography>
            </ButtonBase>
            <span style={styles.verticalDivider} />
            <ButtonBase onClick={() => props.onDelete(props.index)}>
              <Typography sx={styles.editDeleteBtn}>삭제</Typography>
            </ButtonBase>
          </Box>
        </Box>
        <Box sx={styles.bodyRoot}>
          <Box sx={styles.nameNumberRoot}>
            <Typography sx={styles.nameNumberTxt}>
              {props.data.rcverNm}{' '}
            </Typography>
            <Typography sx={styles.nameNumberTxt}>
              {props.data.rcverHp}
            </Typography>
          </Box>
          <Box sx={{}}>
            <Typography sx={styles.addressTxt}>
              {props.data.rcvAddr} {props.data.rcvAddrDetail}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider size={1} />
    </Box>
  );
};

export default AddressItem;
