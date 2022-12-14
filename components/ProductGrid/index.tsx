import { Grid } from '@mui/material';
import ProductItem from 'components/ProductItem';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  numOfColumn?: number;
  productList: any[];
  rowType?: boolean;
};

const ProductGrid = ({
  sx,
  productList = [],
  numOfColumn = 2,
  rowType = false,
}: Props) => {
  return (
    <Grid container xs={12} item columnSpacing={1}>
      {productList.map((item, index) => {
        return (
          <Grid
            key={index}
            item
            xs={12 / numOfColumn}
            sx={[styles.innerGrid, rowType && styles.innerRowGrid]}
          >
            <ProductItem productItem={item} rowType={rowType} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductGrid;
