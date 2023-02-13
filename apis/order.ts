import { useQuery } from 'react-query';
import request from 'apis/request';
import { OrderList, OrderSheet } from 'types';

// 주문 정보 임시저장
export const useGetOrderListTmp = (params: OrderList[]) =>
  useQuery(
    ['useGetOrderListTmp', params],
    async () => {
      const { data } = await request.post('/api/order/setOrderTmp', {
        orderList: params,
      });
      return data;
    },
    {
      enabled: false,
    }
  );

// 주문 정보 업데이트 : 주문완료전 마지막 api
export const useGetOrderUpdate = (params: OrderSheet) =>
  useQuery(
    ['useGetOrderUpdate', params],
    async () => {
      const { data } = await request.post('/api/order/setOrderUpdate', params);
      return data;
    },
    {
      enabled: false,
    }
  );

// 주문 상세 api : 주문완료,마이페이지 - 주문상세
export const useGetOrderDetail = (id: string) =>
  useQuery(
    ['useGetOrderDetail', id],
    async () => {
      const params = {
        orderSeq: id,
      };
      const { data } = await request.post(
        '/api/order/orderCompleteInfo',
        params
      );
      return data;
    },
    {
      enabled: Boolean(id),
    }
  );

export interface ExchangeOrReturnParams {
  orderGrpSeq: number | null;
  msg: string;
}
// 주문 교환 신청
export const useGetExchange = (params: ExchangeOrReturnParams) =>
  useQuery(
    ['useGetExchange', params],
    async () => {
      const { data } = await request.post('/api/order/orderExcha', params);
      return data;
    },
    {
      enabled: false,
    }
  );

// 주문 반품 신청
export const useGetReturn = (params: ExchangeOrReturnParams) =>
  useQuery(
    ['useGetReturn', params],
    async () => {
      const { data } = await request.post('/api/order/orderRtn', params);
      return data;
    },
    {
      enabled: false,
    }
  );

export interface CancelParams {
  orderGrpSeq: number | null;
  cancelMsg: string;
}
// 주문 취소 신청
export const useGetCancel = (params: CancelParams) =>
  useQuery(
    ['getCancel', params],
    async () => {
      const { data } = await request.post('/api/order/orderCancel', params);
      return data;
    },
    {
      enabled: false,
    }
  );
