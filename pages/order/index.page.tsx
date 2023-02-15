import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, ButtonBase } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { order as orderApi } from 'apis';
import {
  OrderList as OrderListType,
  OrderSheet as OrderSheetType,
  StoreKey,
} from 'types';
import isEmptyString from 'libs/isEmptyString';
import FoldingSection from 'components/FoldingSection';
import AddressMemo from 'components/AddressMemo';
import OrderProductItem from 'components/OrderProductItem';
import OrderPayment from 'components/OrderPayment';
import TextField from 'components/TextField';
import AddressModal from './_comps/AddressModal';
import AddressItem from './_comps/AddressItem';
import PaymentMethod from './_comps/PaymentMethod';
import PaymentModal from './_comps/PaymentModal';
import Agree from './_comps/Agree';
import { styles } from './styles';

const Order = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  const [orderList, setOrderList] = useState<OrderListType[]>([]);
  const [memSeq, setMemSeq] = useState('');
  const [orderSeq, setOrderSeq] = useState(0);
  const [ordererEmail, setOrdererEmail] = useState('');
  const [ordererName, setOrdererName] = useState('');
  const [ordererPhone, setOrdererPhone] = useState('');
  const [address, setAddress] = useState<any>(null);
  const [addressMemo, setAddressMemo] = useState('');
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('0001');
  const [agree, setAgree] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(event.target.checked);
  };

  // 주문 정보 임시저장 api
  const {
    data: orderListTmpData,
    isSuccess: orderListTmpIsSuccess,
    refetch: orderListTmpRefetch,
  } = orderApi.useGetOrderListTmp(orderList);

  // orderList 세팅
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionOrderList: OrderListType[] = JSON.parse(
        sessionStorage.getItem(StoreKey.ORDERLIST) || '[]'
      );
      setOrderList(sessionOrderList);
    }
  }, []);
  useEffect(() => {
    if (orderList && orderList.length > 0) {
      orderListTmpRefetch();
    }
  }, [orderList]);

  // 주문 정보 임시저장 api 성공후 / 주문자 정보 세팅
  useEffect(() => {
    if (orderListTmpData && orderListTmpIsSuccess) {
      // string null로 내려와서 아래와 같이 세팅
      setOrdererName(
        orderListTmpData.result.params.memNm === 'null'
          ? ''
          : orderListTmpData.result.params.memNm || ''
      );
      setOrdererPhone(orderListTmpData.result.params.memHpNo || '');
      setMemSeq(orderListTmpData.result.params.memSeq || '');
      setOrderSeq(orderListTmpData.result.params.orderSeq || 0);
      setOrdererEmail(orderListTmpData.result.params.memEmail || '');
    }
  }, [orderListTmpData]);

  // TODO: 현재는 배송비가 모두상품가격에 포함되어 0원
  // 그리고, 장바구니기능이 없음 -> 주문 상품의 업체가 한곳, 배송비를 각각 받지 않음.
  // 따라서 배송비가 있다면 한건에대해서만 배송비를 추가하면됨.
  // 최종 구매금액, 총상품수량:옵션개수
  const { finalPrice, totalPrice, deliveryFee, totalCount } = useMemo(() => {
    if (orderList.length > 0) {
      const priceSum = orderList.reduce((acc: any, cur) => {
        const a = Number(acc);
        const b = Number(
          cur.goodsOpt.goodsOrderCnt * (cur.goodsOpt.goodsSellAmt || 0)
        );
        return a + b;
      }, 0);

      const deliveryFee = orderList[0].goodsInfo?.dlvAmt || 0;

      return {
        finalPrice: priceSum + deliveryFee,
        totalPrice: priceSum,
        deliveryFee: deliveryFee,
        totalCount: orderList.length,
      };
    }
    return { finalPrice: 0, totalPrice: 0, deliveryFee: 0, totalCount: 0 };
  }, [orderList]);

  // 상품 이름 생성
  const orderGoodsName = useMemo(() => {
    if (orderList.length > 0) {
      const name = orderList[0].goodsInfo?.goodsNm;
      let plusName = '';
      if (orderList.length > 1) {
        plusName = ` 택1외 ${orderList.length - 1}건`;
      }
      return name + plusName;
    }

    return '';
  }, [orderList]);

  // 주문서
  const orderSheet: OrderSheetType = {
    memSeq,
    orderSeq,
    ordererEmail,
    orderTotalAmt: finalPrice,
    orderPayCd: paymentMethod,
    orderGoodsNm: orderGoodsName,
    isOrdererHp: 'Y',
    deviceType: !isMobile ? '1' : '2',
    ordererNm: ordererName,
    ordererHp: ordererPhone,
    rcverNm: (address && address.rcverNm) || '',
    rcverHp: (address && address.rcverHp) || '',
    rcvPost: (address && address.rcvPost) || '',
    rcvAddr: (address && address.rcvAddr) || '',
    rcvAddrDetail: (address && address.rcvAddrDetail) || '',
    rcvAddrCode: (address && address.rcvAddrCode) || '',
    dlvAddrSeq: (address && address.dlvAddrSeq) || 0,
    basicYn: (address && address.basicYn) || 'N',
    orderDlvMsg: addressMemo,
    // TODO: 확인 필요
    orderUsePoint: 0,
    pointCnl: '',
    encId: '',
    encPwd: '',
    siteCode: '',
  };

  const isPhoneNumber = (phoneNmuber: string) => {
    const regPhoneNumber = /^((01[0|1|6|7|8|9])[0-9]{7,8})$/;
    return new RegExp(regPhoneNumber).test(phoneNmuber);
  };

  // 주문서 입력 여부 체크
  const checkOrderSheet = () => {
    if (isEmptyString(ordererName)) {
      confirmActions.open('알림', '주문자 이름을 입력해주세요.');
      return false;
    }
    if (isEmptyString(ordererPhone)) {
      confirmActions.open('알림', '주문자 휴대번호를 입력해주세요.');
      return false;
    }
    if (!isPhoneNumber(ordererPhone)) {
      confirmActions.open('알림', '주문자 휴대번호가 유효하지 않습니다.');
      return false;
    }
    if (isEmptyString(addressMemo)) {
      confirmActions.open('알림', '배송 요청사항을 입력해주세요.');
      return false;
    }
    if (isEmptyString(paymentMethod)) {
      confirmActions.open('알림', '결제수단을 선택해주세요.');
      return false;
    }
    if (!agree) {
      confirmActions.open('알림', '주문 내용을 확인해주세요.');
      return false;
    }
    return true;
  };

  // 구매 api
  const {
    data: orderUpdateData,
    isSuccess: orderUpdateIsSuccess,
    refetch: orderUpdateRefetch,
  } = orderApi.useGetOrderUpdate(orderSheet);

  // 구매api 성공후, 이니시스 호출
  useEffect(() => {
    if (orderUpdateData && orderUpdateIsSuccess) {
      if (orderUpdateData.result.resultCode === '0000') {
        let url =
          process.env.NEXT_PUBLIC_BACKEND_API + '/api/payment/iniPayCall';

        type ObjType = {
          [index: string]: string;
        };
        const params: ObjType = {
          orderSeq: String(orderSheet.orderSeq),
          totalAmt: String(orderSheet.orderTotalAmt),
          paymentAmt: String(orderSheet.orderTotalAmt),
          goodsNm: isMobile
            ? orderSheet.orderGoodsNm
            : encodeURIComponent(orderSheet.orderGoodsNm),
          ordererNm: orderSheet.ordererNm,
          ordererHp: orderSheet.isOrdererHp,
          ordererEmail: ordererEmail,
          goodsTexFreeAmt: '0',
          orderPayCd: '0001',
          usePoint: '0',
          isMobile: isMobile ? 'Y' : 'N',
          custmrId: 'hue',
        };

        const form = document.createElement('form');
        form.method = 'post';
        form.acceptCharset = 'utf-8';
        form.hidden = true;
        form.id = 'INICIS_FORM';
        if (isMobile) form.action = url;

        for (const o in params) {
          const input = document.createElement('input');
          input.name = o;
          input.value = params[o];
          input.hidden = true;
          form.appendChild(input);
        }
        document?.querySelector('#INICIS_FORM_ROOT')?.appendChild(form);

        let iframeSrc = url + '?';
        if (params) {
          for (const [key, value] of Object.entries(params)) {
            iframeSrc += `${key}=${value}&`;
          }
        }
        if (isMobile) {
          form.submit();
        } else {
          setIframeSrc(iframeSrc);
          setOpenPaymentModal(true);
        }
      }
    }
  }, [orderUpdateData]);

  // pc 결제 취소/성공 팝업 이벤트 리스너
  useEffect(() => {
    const handleMessage = (e: any) => {
      if (e.data.message) {
        if (e.data.message !== 'closePopup') {
          router.replace(e.data.message);
        }
        setOpenPaymentModal(false);
      }
    };
    window.addEventListener('message', handleMessage, false);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    orderList &&
    orderList.length > 0 && (
      <div id="INICIS_FORM_ROOT">
        <Box sx={styles.root}>
          <Box sx={styles.headerRoot}>
            <Typography sx={styles.headerTxt}>주문 • 결제</Typography>
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
            {orderList.map((item, index) => {
              return <OrderProductItem key={index} data={item} />;
            })}
          </FoldingSection>
          <FoldingSection title="주문자 정보">
            <Box sx={styles.ordererFoldingSectionRoot}>
              <Box>
                <TextField
                  placeholder={'주문자 성함을 입력해주세요'}
                  value={ordererName}
                  onChange={setOrdererName}
                  isRequired
                  label={'이름'}
                />
              </Box>
              <Box sx={styles.ordererFoldingSectionPhoneRoot}>
                <TextField
                  placeholder={'"-"없이 번호만 입력해주세요'}
                  value={ordererPhone}
                  onChange={setOrdererPhone}
                  isRequired
                  label={'휴대전화'}
                />
              </Box>
            </Box>
          </FoldingSection>
          <FoldingSection title="배송지">
            <Box>
              {address && (
                <Box>
                  <AddressItem data={address} />
                  <AddressMemo
                    addressMemo={addressMemo}
                    setAddressMemo={setAddressMemo}
                  />
                </Box>
              )}
              <Box sx={styles.submitAddressRoot}>
                <Box
                  sx={styles.submitAddressBtnRoot}
                  onClick={() => {
                    setOpenAddressModal(true);
                  }}
                >
                  <Typography sx={styles.submitAddressTxt}>
                    {address ? '배송지 변경' : '배송지 추가'}
                  </Typography>
                </Box>
              </Box>
              <AddressModal
                open={openAddressModal}
                onClose={() => {
                  setOpenAddressModal(false);
                }}
                address={address}
                setAddress={(value) => setAddress(value)}
              />
            </Box>
          </FoldingSection>
          <FoldingSection title="결제 정보">
            <OrderPayment totalPrice={totalPrice} deliveryFee={deliveryFee} />
          </FoldingSection>
          <FoldingSection title="결제 수단">
            <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
          </FoldingSection>
          <Box sx={styles.agreeRoot}>
            <Agree value={agree} onChange={handleAgreeChange} />
          </Box>
          <ButtonBase
            onClick={() => {
              if (checkOrderSheet()) {
                orderUpdateRefetch();
              }
            }}
            sx={styles.buyBtn}
          >
            <Box>구매하기</Box>
          </ButtonBase>
          <PaymentModal open={openPaymentModal} iframeSrc={iframeSrc} />
        </Box>
      </div>
    )
  );
};

export default Order;
