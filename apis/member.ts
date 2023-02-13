import { useQuery } from 'react-query';
import request from 'apis/request';
import { Address, DeleteAddress } from 'types';

export interface LoginParams {
  memId: string;
  custmrId: string;
}
// 로그인 api
export const getLogin = async (params: LoginParams) => {
  return request.post('/api/member/sign', params);
};

// 장바구니,카테고리탭 리스트 api
export const useGetDefaultData = (custmrId: string | null) =>
  useQuery(
    ['useGetDefaultData', custmrId],
    async () => {
      const { data } = await request.post('/api/member/defaultData', {
        custmrId,
      });
      return data;
    },
    {
      enabled: false,
    }
  );

// 배송지 조회
export const useGetAddress = () =>
  useQuery(
    ['useGetAddress'],
    async () => {
      const { data } = await request.post('/api/member/deliveryList', {});
      return data;
    },
    {
      enabled: false,
    }
  );

// 배송지 등록
export const useGetAddressSubmit = (params: Address) =>
  useQuery(
    ['useGetAddressSubmit', params],
    async () => {
      const data = await request.post('/api/member/regDelivery', params);
      return data;
    },
    {
      enabled: false,
    }
  );

// 배송지 삭제
export const useGetAddressDelete = (params: DeleteAddress) =>
  useQuery(
    ['useGetAddressDelete', params],
    async () => {
      const data = await request.post('/api/member/delDelivery', params);
      return data;
    },
    {
      enabled: params?.delList?.length > 0,
    }
  );
