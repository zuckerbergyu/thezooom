import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Tabs, Tab, NoSsr, Typography } from '@mui/material';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { NO_ORDER_LIST, NO_REVIEW_LIST, NO_ADDRESS_LIST } from 'constants/meta';
import {
  useGetOrderList,
  useGetAddress,
  useGetAddressDelete,
} from 'apis/index';
import useBtnTop from 'libs/useBtnTop';
import Empty from 'components/Empty';
import OrderItem from './_comps/OrderItem';
import Panel from './_comps/Panel';
import AddressItem from './_comps/AddressItem';
import { styles } from './styles';

const MAIN_TAB_LABELS = ['주문', '배송지'];
const SUB_TAB_LABELS = ['주문목록', '구매후기'];

const Mypage = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  useBtnTop();

  // 상단 탭 상태
  const [selectedMainTabIdx, setSelectedMainTabIdx] = useState(0);
  const [selectedSubTabIdx, setSelectedSubTabIdx] = useState(0);

  // 배송지 삭제 params
  const [deleteItem, setDeleteItem] = useState({});

  // query.tabType과 함께 페이지 진입시 탭 선택 처리
  useEffect(() => {
    if (router.isReady && String(router.query.tabType)) {
      const tabType = String(router.query.tabType);
      if (tabType === 'review') {
        setSelectedMainTabIdx(0);
        setSelectedSubTabIdx(1);
      } else if (tabType === 'add') {
        setSelectedMainTabIdx(1);
      } else {
        setSelectedMainTabIdx(0);
      }
    }
  }, [router]);

  // 주문 리스트 조회 api
  const {
    data: orderListData,
    isSuccess: orderRequestSuccess,
    refetch: fetchOrderList,
  } = useGetOrderList();

  // 배송지 리스트 조회 api
  const {
    data: addressListData,
    isSuccess: addressRequestSuccess,
    refetch: fetchAddressList,
  } = useGetAddress();

  // 배송지 삭제 api
  const { data: addressDeleteData, isSuccess: addressDeleteSuccess } =
    useGetAddressDelete(deleteItem);

  // 주문 리스트
  const orderList = useMemo(() => {
    if (orderListData && orderRequestSuccess) {
      console.log('orderListData : ', orderListData);
      const list = orderListData.result.orderList;
      return list;
    }
    return [];
  }, [orderListData]);

  // 배송지 리스트
  const addressList = useMemo(() => {
    if (addressListData && addressRequestSuccess) {
      const list = addressListData.result.list;
      return list;
    }
    return [];
  }, [addressListData]);

  // TODO: 구매후기 리스트
  const reviewList = useMemo(() => {
    return [];
  }, []);

  // 최초 페이지 진입시 api 호출
  useEffect(() => {
    fetchOrderList();
    fetchAddressList();
  }, []);

  // 배송지 삭제
  const onDelete = (idx: number) => {
    confirmActions
      .open('알림', '배송지를 삭제하시겠습니까?', ['취소', '확인'])
      .then(async (answer) => {
        if (answer === '확인') {
          const deleteList = addressList.filter(
            (_: any, index: number) => index === idx
          );
          setDeleteItem({ delList: deleteList });
        }
      });
  };

  // 배송지 삭제후 배송지 리스트 갱신
  useEffect(() => {
    if (addressDeleteData && addressDeleteSuccess) {
      setDeleteItem({});
      fetchAddressList();
    }
  }, [addressDeleteData, addressDeleteSuccess]);

  return (
    <NoSsr>
      <Box sx={styles.root}>
        <Box sx={styles.mainTabRoot}>
          <Tabs
            value={selectedMainTabIdx}
            onChange={(_, index) => setSelectedMainTabIdx(index)}
            variant="fullWidth"
            sx={styles.mainTabs}
          >
            {MAIN_TAB_LABELS.map((label, index) => {
              return <Tab key={index} sx={styles.mainTab} label={label} />;
            })}
          </Tabs>
        </Box>
        <Box sx={styles.mainTabPanelRoot}>
          <Panel value={selectedMainTabIdx} index={0}>
            <Box sx={styles.subTabRoot}>
              <Tabs
                value={selectedSubTabIdx}
                onChange={(_, index) => setSelectedSubTabIdx(index)}
                variant="fullWidth"
                sx={styles.subTabs}
              >
                {SUB_TAB_LABELS.map((label, index) => {
                  return <Tab key={index} sx={styles.subTab} label={label} />;
                })}
              </Tabs>
            </Box>
            <Box sx={styles.subTabPanelRoot}>
              <Panel value={selectedSubTabIdx} index={0} sx={{}}>
                {orderList.length > 0 ? (
                  orderList.map((item: any, index: number) => (
                    <OrderItem key={index} data={item} />
                  ))
                ) : (
                  <Empty text={NO_ORDER_LIST} />
                )}
              </Panel>
              <Panel value={selectedSubTabIdx} index={1}>
                {reviewList.length > 0 ? (
                  reviewList.map((item, index) => (
                    <Box key={index}>리뷰 리스트</Box>
                  ))
                ) : (
                  <Empty text={NO_REVIEW_LIST} />
                )}
              </Panel>
            </Box>
          </Panel>
          <Panel value={selectedMainTabIdx} index={1}>
            <Box sx={styles.submitAddressRoot}>
              <Box
                sx={styles.submitAddressBtnRoot}
                onClick={() => {
                  router.push('/mypage/address/add');
                }}
              >
                <Typography sx={styles.submitAddressTxt}>
                  + 신규배송지 등록
                </Typography>
              </Box>
            </Box>
            {/* address Item */}
            {addressList.length > 0 ? (
              addressList.map((item: any, index: number) => (
                <AddressItem
                  key={index}
                  data={item}
                  index={index}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <Empty text={NO_ADDRESS_LIST} />
            )}
          </Panel>
        </Box>
      </Box>
    </NoSsr>
  );
};

export default Mypage;
