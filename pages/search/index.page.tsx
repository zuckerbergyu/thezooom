import React, { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import { goods as goodsApi } from 'apis';
import SearchField from 'components/SearchField';
import InfiniteScroll from 'components/InfiniteScroll';
import ProductGridHeader from 'components/ProductGridHeader';
import Loader from 'components/Loader';
import Empty from 'components/Empty';
import { NO_RESULT } from 'constants/meta';
import { ProductItem } from 'types/index';
import { styles } from './styles';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState(0);

  // 상품 리스트 조회 api
  const { data, refetch, fetchNextPage, hasNextPage, isFetching, isFetched } =
    goodsApi.useSearchProductInfiniteList(keyword, sort);

  // 인피니티 스크롤을 위하여, 상품 리스트 합성
  const productList = useMemo<ProductItem[]>(() => {
    if (data) {
      const list = data?.pages.reduce((acc, { data }) => {
        return [...acc, ...data];
      }, [] as ProductItem[]);
      return list;
    }
    return [];
  }, [data]);

  // 총 상품 개수
  const totalCount = useMemo(() => {
    if (productList.length > 0) {
      return productList[0]?.rowNumCnt || 0;
    }
    return 0;
  }, [productList]);

  // 상품 상세에서 돌아올경우 입력 검색어, 정렬 값 삽입
  useEffect(() => {
    if (
      router.isReady &&
      router.query &&
      router.query.keyword &&
      keyword === ''
    ) {
      setKeyword(String(router.query.keyword));
      setSort(Number(router.query.sort));
    }
  }, [router, keyword, sort]);

  // 로드 완료될경우 path에 쿼리를 추가하여 현재 상태 저장
  useEffect(() => {
    if (isFetched) {
      router.replace(`/search?keyword=${keyword}&sort=${sort}`);
    }
  }, [productList, isFetched]);

  return (
    <Box sx={styles.root}>
      <SearchField
        placeholder="검색어를 입력하세요"
        onSubmit={(value) => {
          setSort(0);
          setKeyword(value);
          // refetch();
        }}
        initialValue={keyword}
      />
      <Box>
        {totalCount !== 0 && (
          <ProductGridHeader
            value={sort}
            setValue={setSort}
            totalCount={totalCount}
          />
        )}
        <InfiniteScroll
          data={productList}
          sx={styles.infiniteScroll}
          ListEmptyComponent={
            isFetching ? (
              <Loader height={100} />
            ) : isFetched ? (
              <Empty text={NO_RESULT} />
            ) : null
          }
          onEndReached={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </Box>
    </Box>
  );
};

export default Search;
