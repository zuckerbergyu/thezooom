import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import comma from 'libs/comma';
import { OrderList as OrderListType } from 'types/index';
import Image from 'components/Image';
import { styles } from './styles';

type Props = {
  data: OrderListType;
};
const OrderProductItem = ({ data }: Props) => {
  return (
    <Box sx={styles.root}>
      <Card elevation={0} sx={styles.cardRoot}>
        <CardActionArea
          disableRipple
          component="a"
          sx={styles.cardActionAreaRoot}
          disabled
        >
          <CardMedia sx={styles.thumbnailAreaRoot}>
            <Image
              width={'110px'}
              height={'110px'}
              alt="ProductImage"
              src={data.goodsInfo?.goodsImg}
              css={styles.thumbnailImg}
            />
          </CardMedia>
          <CardContent sx={styles.contentsRoot}>
            <Box>
              <Box sx={styles.titleRoot}>
                <Typography sx={styles.title}>
                  {data.goodsInfo?.goodsNm}
                </Typography>
              </Box>
              <Box sx={styles.priceRoot}>
                <Typography sx={styles.priceTxt}>
                  {comma(
                    data.goodsOpt.goodsSellAmt * data.goodsOpt.goodsOrderCnt
                  )}
                </Typography>
                <Typography sx={styles.priceSubTxt}>원</Typography>
              </Box>
            </Box>
            <Box>
              {data.goodsOpt.goodsOptNm && (
                <Box>
                  <Typography sx={styles.subInfoTxt}>
                    {`[옵션: ${data.goodsOpt.goodsOptNm}]`}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography sx={styles.subInfoTxt}>
                  {`수량 : ${data.goodsOpt.goodsOrderCnt}개`}
                </Typography>
              </Box>
              {/* TODO: 무료배송 확인 */}
              <Box>
                <Typography sx={styles.subInfoTxt}>무료배송</Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default OrderProductItem;
