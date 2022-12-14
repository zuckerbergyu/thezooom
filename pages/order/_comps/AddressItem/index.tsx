import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { styles } from './styles';
import { SxProps } from 'libs/sx';
import Divider from 'components/Divider';

interface AddressItemType {
  addrNick: string;
  rcverNm: string;
  rcvAddr: string;
  rcverHp: string;
  rcvAddrDetail: string;
  basicYn: 'Y' | 'N';
}
type Props = {
  sx?: SxProps;
  data: AddressItemType;
  isModalView?: boolean;
  index?: number;
  onDelete?: (value: number) => void;
  selectedIndex?: number;
  onSelect?: (value: any) => void;
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
          {props.isModalView ? (
            <Box sx={styles.editDeleteRoot}>
              <ButtonBase
                onClick={() => {
                  // TODO: 수정 api
                }}
              >
                <Typography sx={styles.editDeleteBtn}>수정</Typography>
              </ButtonBase>
              <span style={styles.verticalDivider} />
              <ButtonBase
                onClick={() =>
                  props.onDelete &&
                  (props.index
                    ? props.onDelete(props.index)
                    : props.index === 0 && props.onDelete(0))
                }
              >
                <Typography sx={styles.editDeleteBtn}>삭제</Typography>
              </ButtonBase>
            </Box>
          ) : null}
        </Box>
        <Box sx={styles.bodyAreaRoot}>
          <Box sx={styles.bodyRoot}>
            <Box sx={styles.nameNumberRoot}>
              <Typography sx={styles.nameNumberTxt}>
                {props.data.rcverNm}{' '}
              </Typography>
              <Typography sx={styles.nameNumberTxt}>
                {props.data.rcverHp}
              </Typography>
            </Box>
            <Box>
              <Typography sx={styles.addressTxt}>
                {props.data.rcvAddr} {props.data.rcvAddrDetail}
              </Typography>
            </Box>
          </Box>
          {props.isModalView && (
            <Box
              sx={[
                styles.addressSelectBtnRoot,
                props.selectedIndex === props.index &&
                  styles.addressSelectedBtnRoot,
              ]}
              onClick={() => props.onSelect && props.onSelect(props.data)}
            >
              <Typography
                sx={[
                  styles.addressSelectTxt,
                  props.selectedIndex === props.index &&
                    styles.addressSelectedTxt,
                ]}
              >
                선택
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Divider size={1} />
    </Box>
  );
};

export default AddressItem;
