import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, NoSsr, ButtonBase } from '@mui/material';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { useGetGoodsDetail } from 'apis';
import Image from 'components/Image';
import Divider from 'components/Divider';
import Breadcrumb from 'components/Breadcrumb';
import ProductSelectDrawer from 'components/ProductSelectDrawer';
import comma from 'libs/comma';
import roundByPrecision from 'libs/roundByPrecision';
import useBtnTop from 'libs/useBtnTop';
import { TAB_LABELS } from 'constants/meta';
import {
  GoodsInfoAnnounce as GoodsInfoAnnounceType,
  GoodsInfo as GoodsInfoType,
  GoodsOptions as GoodsOptionsType,
  GoodsOption as GoodsOptionType,
  OrderList as OrderListType,
  StoreKey,
} from 'types/index';
import Menu from '../../_comps/Menu';
import Panel from '../../_comps/Panel';
import Detail from '../../_comps/Detail';
import Review from '../../_comps/Review';
import Delivery from '../../_comps/Delivery';
import ExchangeOrReturn from '../../_comps/ExchangeOrReturn';
import { styles } from './styles';

// 메뉴 패널
const PANELS = [Detail, Review, Delivery, ExchangeOrReturn];

const GoodsDetail = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  useBtnTop();

  const breadCrumb: any[] =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem(StoreKey.BREADCRUMB) || '[]')
      : [];

  const goodsSeq =
    router.isReady && router.query.id ? Number(router.query.id) : null;

  // 상품 상세 조회 api
  const { data, isSuccess } = useGetGoodsDetail(goodsSeq);

  const goodsInfo = useMemo<GoodsInfoType | null>(() => {
    if (isSuccess && data.result.goodsInfo) {
      const info = data.result.goodsInfo;
      return (info as GoodsInfoType) || [];
    }
    return null;
  }, [data, isSuccess]);

  const goodsInfoAnnounce = useMemo<GoodsInfoAnnounceType[] | null>(() => {
    if (data && data.result && data.result.goodsInfoAnnounce) {
      const infoAnnounce = data.result.goodsInfoAnnounce;
      return (infoAnnounce as GoodsInfoAnnounceType[]) || [];
    }
    return null;
  }, [data]);

  const detailPanelData = useMemo(() => {
    const detailPanelList = [];
    if (goodsInfo) detailPanelList.push(goodsInfo);
    if (goodsInfoAnnounce) detailPanelList.push(goodsInfoAnnounce);
    return detailPanelList;
  }, [goodsInfo, goodsInfoAnnounce]);

  // 메뉴탭 선택 Index
  const [selectedIdx, setSelectedIdx] = useState(0);

  // 구매하기 버튼
  const [sortOn, setSortOn] = useState(false);

  const toggleSort =
    (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setSortOn(open);
    };

  // 상품 옵션 데이터 가공(1뎁스에서 2뎁스로 처리)
  const goodsOptions = useMemo<GoodsOptionsType[] | null>(() => {
    if (isSuccess && data.result.goodsOptions) {
      const options = data.result.goodsOptions;
      console.log('options: ', options);

      const reArrageOptionsList = options.reduce((acc: any, cur: any) => {
        if (cur.goodsOptLv === 0) {
          return [...acc, cur];
        } else {
          if (cur.goodsOptLv === 1) {
            const tmp = { ...cur, child: [] };
            return [...acc, tmp];
          }
          acc[acc.length - 1].child.push(cur);
          return [...acc];
        }
      }, []);
      return reArrageOptionsList as GoodsOptionsType[];
    }
    return null;
  }, [data, isSuccess]);

  // 주문 리스트 상태
  const [orderList, setOrderList] = useState<OrderListType[]>([]);
  // 상품 옵션 선택 값
  const [goodsOption, setGoodsOption] = useState<GoodsOptionType[]>([]);

  // 주문 리스트 생성
  useEffect(() => {
    const list: OrderListType[] = [];
    goodsOption.map((item) => {
      list.push({
        goodsInfo: goodsInfo,
        goodsOpt: item,
        goodsOptions: goodsOptions,
      });
    });
    setOrderList(list);
  }, [goodsOption]);

  return (
    goodsInfo && (
      <Box sx={styles.root}>
        <Box sx={styles.headerRoot}>
          <Breadcrumb items={breadCrumb} />
          <Box sx={styles.thumbnailRoot}>
            <Image
              layout="fill"
              src={goodsInfo.goodsImg}
              alt={'productThumbnail'}
            />
          </Box>
          <Box sx={styles.contentsRoot}>
            <Box sx={styles.titleRoot}>
              <Typography sx={styles.title}>{goodsInfo.goodsNm}</Typography>
            </Box>

            <Box sx={styles.priceRoot}>
              {goodsInfo.goodsSellAmt && (
                <Typography sx={styles.salePercentage}>{`${roundByPrecision(
                  ((goodsInfo.goodsCustmrAmt - goodsInfo.goodsSellAmt) /
                    goodsInfo.goodsCustmrAmt) *
                    100
                )}%`}</Typography>
              )}
              {goodsInfo.goodsSellAmt && (
                <Typography sx={styles.salePrice}>{`${comma(
                  goodsInfo.goodsSellAmt
                )}원`}</Typography>
              )}
              {goodsInfo.goodsCustmrAmt && (
                <Typography sx={styles.price}>{`${comma(
                  goodsInfo.goodsCustmrAmt
                )} 원`}</Typography>
              )}
            </Box>
            {goodsInfo.dlvAmt === 0 && (
              <Box sx={styles.freeDeliveryRoot}>
                <Typography sx={styles.freeDeliveryTxt}>무료배송</Typography>
              </Box>
            )}
          </Box>
        </Box>
        {/* 분리선 */}

        <Divider sx={styles.divider} size={10} />

        {/* 메뉴 패널 */}
        <NoSsr>
          <Box>
            <Menu
              tabLabels={TAB_LABELS}
              value={selectedIdx}
              onSelect={(idx) => setSelectedIdx(idx)}
            />
            <Box sx={styles.pannelRoot}>
              {PANELS.map((PanelItem, index) => (
                <Panel value={selectedIdx} index={index} key={index}>
                  <PanelItem
                    panelData={
                      index === 0
                        ? // TODO: 추후 데이터에 따라 데이터 가공후 전달
                          // ? [goodsInfo, goodsInfoAnnounce]
                          detailPanelData
                        : []
                    }
                  />
                </Panel>
              ))}
            </Box>
          </Box>
        </NoSsr>

        <ButtonBase
          onClick={() => {
            if (sortOn) {
              if (orderList.length === 0) {
                confirmActions.open('알림', '상품 옵션을 선택해주세요.');
              } else {
                sessionStorage.removeItem(StoreKey.ORDERLIST);

                sessionStorage.setItem(
                  StoreKey.ORDERLIST,
                  JSON.stringify(orderList)
                );
                router.push('/order');
              }
            } else {
              toggleSort(true)();
            }
          }}
          sx={styles.buyButton}
        >
          <Box>구매하기</Box>
        </ButtonBase>

        <ProductSelectDrawer
          open={sortOn}
          onClose={toggleSort(false)}
          onOpen={toggleSort(true)}
          items={[goodsInfo, goodsOptions]}
          goodsOption={goodsOption}
          setGoodsOption={setGoodsOption}
        />
      </Box>
    )
  );
};

export default GoodsDetail;
