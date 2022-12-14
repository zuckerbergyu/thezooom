import { useQuery, useInfiniteQuery } from 'react-query';
import request from 'apis/request';
import { getFromTo } from 'libs/pageHelper';

// 로그인 api
export const getLogin = async (param: any) => {
  return request.post('/api/member/sign', param);
};
export const useGetLogin = (param: any) =>
  useQuery(['getLogin', param.memId, param.custmrId], () => getLogin(param), {
    enabled: true,
  });

// 장바구니,카테고리탭 리스트 api
export const getDefaultData = async (custmrId: string | null) => {
  const { data } = await request.post('/api/member/defaultData', { custmrId });
  return data;
};
export const useGetDefaultData = (custmrId: string | null) =>
  useQuery(['getDefaultData', custmrId], () => getDefaultData(custmrId), {
    enabled: false,
  });

// 상품 리스트 api
export const getProductList = async ({
  categoryCode,
  sort = 0,
  pageParam = 0,
}: {
  categoryCode: number | null;
  sort?: number;
  pageParam?: number;
}) => {
  if (categoryCode) {
    const { to, pageSize } = getFromTo({ page: pageParam });

    const params = {
      mainCatgryCd: categoryCode,
      viewRowCnt: pageSize,
      currentPage: pageParam,
      sort,
    };
    const { data } = await request.post('/api/goods/goodsList', params);
    const returnData = data.result.list;
    const totalCount = data.result.list[0]?.rowNumCnt;
    const imgPath = data.result.goodsCatgryBannerInfo?.imgPath || '';

    return {
      data: returnData,
      imgPath,
      totalCount,
      isLast: !totalCount || totalCount === 0 ? true : totalCount <= to,
      totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
      pageParam,
    };
  }
  return {
    data: [],
    totalCount: 0,
    isLast: true,
    totalPages: 0,
    pageParam,
  };
};
export function useProductInfiniteList(
  categoryCode: number | null,
  sort: number
) {
  return useInfiniteQuery(
    ['product-list-infinite', categoryCode, sort],
    ({ pageParam = 0 }) =>
      getProductList({
        categoryCode,
        sort,
        pageParam,
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      // keepPreviousData: true, // 확인 필요
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.pageParam + 1;
      },
    }
  );
}

// 상품 상세 조회 api
export const getGoodsDetail = async (goodsSeq: number | null) => {
  const { data } = await request.post('/api/goods/detail', { goodsSeq });
  return data;
};
export const useGetGoodsDetail = (goodsSeq: number | null) =>
  useQuery(['goodsDetail', goodsSeq], () => getGoodsDetail(goodsSeq), {
    enabled: Boolean(goodsSeq),
  });

// 상품 검색 api
export const getSearchProductList = async ({
  keyword,
  sort = 0,
  pageParam = 0,
}: {
  keyword: string;
  sort?: number;
  pageParam?: number;
}) => {
  if (keyword) {
    const { to, pageSize } = getFromTo({ page: pageParam });

    const params = {
      currentPage: pageParam,
      inputKeyword: '',
      keyword: keyword,
      sort,
      viewRowCnt: pageSize,
    };

    const { data } = await request.post('/api/goods/goodsSearchList', params);
    const returnData = data.result.list;
    const totalCount = data.result.list[0]?.rowNumCnt;

    return {
      data: returnData,
      totalCount,
      isLast: !totalCount || totalCount === 0 ? true : totalCount <= to,
      totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
      pageParam,
    };
  }
  return {
    data: [],
    totalCount: 0,
    isLast: true,
    totalPages: 0,
    pageParam,
  };
};
export function useSearchProductInfiniteList(keyword: string, sort: number) {
  return useInfiniteQuery(
    ['product-search-list-infinite', keyword, sort],
    ({ pageParam = 0 }) =>
      getSearchProductList({
        keyword,
        sort,
        pageParam,
      }),
    {
      enabled: Boolean(keyword),
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.pageParam + 1;
      },
    }
  );
}

// 주문 목록 api
export const getOrderList = async () => {
  const params = {
    endDate: new Date() // 필수값
      .toLocaleDateString()
      .replace(/\./g, '')
      .replace(/\s/g, '-'),
    searchType: 'order', // TODO: order/cancel
    startDate: '2020-01-01', // 운영 시작 날짜로 정한다 // 필수값
  };

  const { data } = await request.post('/api/mypage/orderList', params);
  return data;
};
export const useGetOrderList = () =>
  useQuery(['getOrderList'], () => getOrderList(), {
    enabled: false,
  });

// 주문 상세 api : 주문완료,마이페이지 - 주문상세
export const getOrderDetail = async (id: string) => {
  const params = {
    orderSeq: id,
  };
  const { data } = await request.post('/api/order/orderCompleteInfo', params);
  return data;
};
export const useGetOrderDetail = (id: string) =>
  useQuery(['getOrderDetail', id], () => getOrderDetail(id), {
    enabled: Boolean(id),
  });

// 배송지 조회
export const getAddress = async () => {
  const { data } = await request.post('/api/member/deliveryList', {});
  return data;
};
export const useGetAddress = () =>
  useQuery(['getAddress'], () => getAddress(), {
    enabled: false,
  });

// 배송지 등록
export const getAddressSubmit = async (params: any) => {
  const data = await request.post('/api/member/regDelivery', params);
  return data;
};
export const useGetAddressSubmit = (params: any) =>
  useQuery(['getAddressSubmit', params], () => getAddressSubmit(params), {
    enabled: false,
  });

// 배송지 삭제
export const getAddressDelete = async (params: any) => {
  const data = await request.post('/api/member/delDelivery', params);
  return data;
};
export const useGetAddressDelete = (params: any) =>
  useQuery(['getAddressDelete', params], () => getAddressDelete(params), {
    enabled: params?.delList?.length > 0,
  });

// 주문 정보 임시저장
export const getOrderListTmp = async (params: any) => {
  const { data } = await request.post('/api/order/setOrderTmp', {
    orderList: params,
  });
  return data;
};
export const useGetOrderListTmp = (params: any[]) =>
  useQuery(['getOrderListTmp', params], () => getOrderListTmp(params), {
    enabled: false,
  });

// 주문 정보 업데이트 : 주문완료전 마지막 api
export const getOrderUpdate = async (params: any) => {
  const { data } = await request.post('/api/order/setOrderUpdate', params);
  return data;
};
export const useGetOrderUpdate = (params: any) =>
  useQuery(['getOrderUpdate', params], () => getOrderUpdate(params), {
    enabled: false,
  });

// 주문 교환 신청
export const getExchange = async (params: any) => {
  const { data } = await request.post('/api/order/orderExcha', params);
  return data;
};
export const useGetExchange = (params: any) =>
  useQuery(['getExchange', params], () => getExchange(params), {
    enabled: false,
  });

// 주문 반품 신청
export const getReturn = async (params: any) => {
  const { data } = await request.post('/api/order/orderRtn', params);
  return data;
};
export const useGetReturn = (params: any) =>
  useQuery(['getReturn', params], () => getReturn(params), {
    enabled: false,
  });

// 주문 취소 신청
export const getCancel = async (params: any) => {
  const { data } = await request.post('/api/order/orderCancel', params);
  return data;
};
export const useGetCancel = (params: any) =>
  useQuery(['getCancel', params], () => getCancel(params), {
    enabled: false,
  });
