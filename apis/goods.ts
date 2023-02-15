import { useQuery, useInfiniteQuery } from 'react-query';
import { getFromTo } from 'libs/pageHelper';
import request from 'apis/request';

// 상품 리스트 api
export const getProductList = async ({
  categoryCode,
  brandCode,
  sort = 0,
  pageParam = 0,
}: {
  categoryCode: number | null;
  brandCode: number | null;
  sort?: number;
  pageParam?: number;
}) => {
  if (categoryCode) {
    const { to, pageSize } = getFromTo({ page: pageParam });

    const params = {
      mainCatgryCd: categoryCode,
      brandCd: brandCode,
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

// 상품 리스트 인피니티 api hook
export function useProductInfiniteList(
  categoryCode: number | null,
  brandCode: number | null,
  sort: number
) {
  return useInfiniteQuery(
    ['product-list-infinite', categoryCode, sort],
    ({ pageParam = 0 }) =>
      getProductList({
        categoryCode,
        brandCode,
        sort,
        pageParam,
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.pageParam + 1;
      },
    }
  );
}

// 상품 상세 조회 api
export const useGetGoodsDetail = (goodsSeq: number | null) =>
  useQuery(
    ['useGetGoodsDetail', goodsSeq],
    async () => {
      const { data } = await request.post('/api/goods/detail', { goodsSeq });
      return data;
    },
    {
      enabled: Boolean(goodsSeq),
    }
  );

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

// 상품 검색 인피니티 api hook
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
