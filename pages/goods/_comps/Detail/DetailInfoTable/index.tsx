import {
  Box,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { styles } from './styles';
import { SxProps } from 'libs/sx';

interface GoodsInfo {
  goodsNotiTitle: string;
  goodsNotiDesc: string;
}

type Props = {
  sx?: SxProps;
  goodsInfo: GoodsInfo[];
};
const DetailInfoTable = (props: Props) => {
  return (
    <Box sx={styles.root}>
      <TableContainer>
        <Table aria-label="goods-info-table">
          <TableBody>
            {props.goodsInfo.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={styles.cellTitle} scope="row">
                  {row.goodsNotiTitle}
                </TableCell>
                <TableCell sx={styles.cellInfo}>{row.goodsNotiDesc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DetailInfoTable;
