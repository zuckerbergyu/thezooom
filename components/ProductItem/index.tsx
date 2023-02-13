import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Image from 'components/Image';
import { ProductItem as ProductItemType } from 'types';
import comma from 'libs/comma';
import { SxProps } from 'libs/sx';
import roundByPrecision from 'libs/roundByPrecision';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  productItem?: ProductItemType;
  rowType?: boolean;
};
const ProductItem = ({
  sx,
  productItem = {
    goodsCustmrAmt: 0,
    goodsImg: '',
    goodsNm: '',
    goodsSeq: 0,
    goodsStockStatusCd: '0000',
  },
  rowType = false,
}: Props) => {
  return (
    <Card elevation={0} square sx={[styles.root, rowType && styles.rowRoot]}>
      {/* <Link href={`/goods/detail/${productItem.goodsSeq}`} passHref> */}
      <Link
        href="/goods/detail/[id]?breadcrumb=true"
        as={`/goods/detail/${productItem.goodsSeq}`}
        // passHref
      >
        <CardActionArea
          disableRipple
          component="a"
          sx={[
            styles.cardActionAreaRoot,
            rowType && styles.cardActionAreaRowRoot,
          ]}
        >
          <CardMedia
            sx={[
              styles.thumbnailAreaRoot,
              rowType && styles.thumbnailAreaRowRoot,
            ]}
          >
            <Image
              layout={rowType ? undefined : 'fill'}
              width={rowType ? '98px' : undefined}
              height={rowType ? '98px' : undefined}
              alt="ProductImage"
              src={productItem.goodsImg}
              css={styles.thumbnailImg}
            />
            {(productItem.goodsStockStatusCd === '0001' ||
              productItem.goodsStockStatusCd === '0002' ||
              productItem.goodsStockStatusCd === '0005') && (
              <Box sx={[styles.noStockRoot, rowType && styles.noStockRowRoot]}>
                <Typography sx={styles.noStockTxt}>
                  {productItem.goodsStockStatusCd === '0005'
                    ? '판매종료'
                    : '품절'}
                </Typography>
              </Box>
            )}
          </CardMedia>
          <CardContent sx={styles.contentsRoot}>
            {productItem.dlvAmt === 0 && (
              <Box sx={styles.freeDeliveryRoot}>
                <Typography sx={styles.freeDeliveryTxt}>무료배송</Typography>
              </Box>
            )}
            <Box sx={styles.titleRoot}>
              <Typography sx={styles.title}>{productItem.goodsNm}</Typography>
            </Box>
            <Box sx={[styles.priceRoot, rowType && styles.priceRowRoot]}>
              {productItem.goodsCustmrAmt && (
                <Typography sx={styles.price}>{`${comma(
                  productItem.goodsCustmrAmt
                )} 원`}</Typography>
              )}
            </Box>
            <Box sx={styles.salePriceRoot}>
              {productItem.goodsSellAmt && (
                <Typography sx={styles.salePercentage}>{`${roundByPrecision(
                  ((productItem.goodsCustmrAmt - productItem.goodsSellAmt) /
                    productItem.goodsCustmrAmt) *
                    100
                )}%`}</Typography>
              )}
              {productItem.goodsSellAmt && (
                <Typography sx={styles.salePrice}>{`${comma(
                  productItem.goodsSellAmt
                )}원`}</Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProductItem;
