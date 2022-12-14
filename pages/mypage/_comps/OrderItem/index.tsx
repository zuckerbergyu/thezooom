import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  ButtonBase,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import comma from 'libs/comma';
import deliveryTracking from 'libs/deliveryTracking';
import Image from 'components/Image';
import { styles } from './styles';

type Props = {
  data: any;
};
const OrderItem = ({ data }: Props) => {
  const router = useRouter();
  console.log('orderItemt2 data : ', data);
  const goods = data.orderGoodsList;
  console.log('orderItemt2 goods', goods);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.headerDateTxt}>{data.orderDt}</Typography>
        <ButtonBase
          onClick={() => {
            router.push(`/mypage/order/detail/${data.orderSeq}`);
          }}
        >
          <Typography sx={styles.headerDetailBtnTxt}>주문상세 보기</Typography>
          <NavigateNextIcon fontSize="small" sx={styles.headerDetailIcon} />
        </ButtonBase>
      </Box>

      {goods.map((item: any, index: number) => (
        <Card elevation={0} sx={styles.cardRoot} key={index}>
          <Box sx={styles.orderStateRoot}>
            <Typography sx={styles.orderStateTxt}>
              {item.orderStatusNm}
            </Typography>
            <Box>
              {item.goodsChangeStatus === '0001' ? (
                <Box sx={styles.stateCompleteRoot}>
                  <Typography sx={styles.stateCompleteTxt}>
                    반품접수 완료
                  </Typography>
                </Box>
              ) : item.goodsChangeStatus === '0003' ? (
                <Box sx={styles.stateCompleteRoot}>
                  <Typography sx={styles.stateCompleteTxt}>
                    교환접수 완료
                  </Typography>
                </Box>
              ) : item.orderStatus === '0003' ? (
                <Box sx={{ display: 'flex' }}>
                  {!(
                    item.dlvStatus == '0000' ||
                    item.dlvStatus == '0001' ||
                    item.dlvStatus == '0002'
                  ) && (
                    <ButtonBase
                      sx={styles.stateProceedRoot}
                      onClick={() => {
                        // 새로운 탭 여는것 휴샵 보고 만들기
                        deliveryTracking(item.dlvCompnyCd, item.dlvNo);
                      }}
                    >
                      <Typography sx={styles.stateProceedTxt}>
                        배송조회
                      </Typography>
                    </ButtonBase>
                  )}
                  {item.dlvStatus == '0000' && (
                    <ButtonBase
                      sx={styles.stateProceedRoot}
                      onClick={() => {
                        router.push(`/mypage/order/cancel/${item.orderGrpSeq}`);
                      }}
                    >
                      <Typography sx={styles.stateProceedTxt}>
                        주문취소
                      </Typography>
                    </ButtonBase>
                  )}
                  {item.dlvStatus == '0006' && (
                    <Box sx={{ display: 'flex' }}>
                      <ButtonBase
                        sx={styles.stateProceedRoot}
                        onClick={() => {
                          router.push(
                            `/mypage/order/exchange/${item.orderGrpSeq}`
                          );
                        }}
                      >
                        <Typography sx={styles.stateProceedTxt}>
                          교환신청
                        </Typography>
                      </ButtonBase>
                      <ButtonBase
                        sx={styles.stateProceedRoot}
                        onClick={() => {
                          router.push(
                            `/mypage/order/return/${item.orderGrpSeq}`
                          );
                        }}
                      >
                        <Typography sx={styles.stateProceedTxt}>
                          반품신청
                        </Typography>
                      </ButtonBase>
                    </Box>
                  )}
                </Box>
              ) : null}
            </Box>
          </Box>
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
                src={item.goodsImg}
                css={styles.thumbnailImg}
              />
            </CardMedia>
            <CardContent sx={styles.contentsRoot}>
              <Box>
                <Box sx={styles.titleRoot}>
                  <Typography sx={styles.title}>{item.goodsNm}</Typography>
                </Box>
                <Box sx={styles.priceRoot}>
                  <Typography sx={styles.priceTxt}>
                    {comma(data.orderTotalAmt)}
                  </Typography>
                  <Typography sx={styles.priceSubTxt}>원</Typography>
                </Box>
              </Box>
              <Box>
                {item.goodsOptNm && (
                  <Box>
                    <Typography sx={styles.subInfoTxt}>
                      {`[옵션: ${item.goodsOptNm}]`}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography sx={styles.subInfoTxt}>
                    {`수량 : ${item.goodsOrderCnt}개`}
                  </Typography>
                </Box>
                {item.dlvAmt === 0 && (
                  <Box>
                    <Typography sx={styles.subInfoTxt}>무료배송</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default OrderItem;
