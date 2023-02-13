import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { styles } from './styles';
import { useRouter } from 'next/router';
import { order as orderApi } from 'apis';
import FoldingSection from 'components/FoldingSection';
import OrderProductItem from 'components/OrderProductItem';
import OrderPayment from 'components/OrderPayment';
import OrderAddress from 'components/OrderAddress';
import OrderOrderer from 'components/OrderOrderer';

const OrderDetail = () => {
  const router = useRouter();
  const orderId =
    router.isReady && router.query.id ? String(router.query.id) : '';

  // 주문 상세 조회 api
  const { data, isSuccess } = orderApi.useGetOrderDetail(orderId);

  const { goodsList, orderInfo } = useMemo(() => {
    if (data && isSuccess) {
      const temp = data.result.orderCompleteGoodsList || [];
      // orderItem component 양식에 맞추기위해 데이터 변형
      const goodsList = temp.reduce((acc: any, cur: any) => {
        const goodsInfo = {
          goodsImg: cur.goodsImg,
          goodsNm: cur.goodsNm,
          dlvAmt: cur.dlvAmt,
        };
        const goodsOpt = {
          goodsSellAmt: cur.goodsSellAmt,
          goodsOrderCnt: cur.goodsOrderCnt,
          goodsOptNm: cur.goodsOptNm,
        };
        return [...acc, { goodsInfo, goodsOpt }];
      }, []);

      const orderInfo = data.result.orderCompleteInfo;
      return { goodsList, orderInfo };
    }
    return { goodsList: [], orderInfo: null };
  }, [data]);

  // 최종 구매금액, 총상품수량:옵션개수
  const { finalPrice, totalPrice, deliveryFee, totalCount } = useMemo(() => {
    if (goodsList.length > 0) {
      const priceSum = goodsList.reduce((acc: any, cur: any) => {
        const a = Number(acc);
        const b = Number(
          cur.goodsOpt.goodsOrderCnt * (cur.goodsOpt.goodsSellAmt || 0)
        );
        return a + b;
      }, 0);

      const deliveryFee = goodsList[0].goodsInfo.dlvAmt || 0;

      return {
        finalPrice: priceSum + deliveryFee,
        totalPrice: priceSum,
        deliveryFee: deliveryFee,
        totalCount: goodsList.length,
      };
    }
    return { finalPrice: 0, totalPrice: 0, deliveryFee: 0, totalCount: 0 };
  }, [goodsList]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.headerTxt}>주문완료</Typography>
      </Box>
      <FoldingSection
        title="주문 상품"
        isFolding={totalCount > 3}
        customLabel={
          <Box sx={styles.orderFoldingSectionLabelRoot}>
            <Box sx={styles.orderFoldingSectionLabel}>주문 상품</Box>
            <Box sx={styles.orderFoldingSectionCount}>{totalCount}개</Box>
          </Box>
        }
      >
        {goodsList.map((item: any, index: number) => {
          return <OrderProductItem key={index} data={item} />;
        })}
      </FoldingSection>
      {orderInfo && (
        <FoldingSection title="주문 정보">
          <OrderOrderer data={orderInfo} />
        </FoldingSection>
      )}
      {orderInfo && (
        <FoldingSection title="배송지 정보">
          <OrderAddress data={orderInfo} />
        </FoldingSection>
      )}
      <FoldingSection title="결제 정보">
        <OrderPayment totalPrice={totalPrice} deliveryFee={deliveryFee} />
      </FoldingSection>
    </Box>
  );
};

export default OrderDetail;
