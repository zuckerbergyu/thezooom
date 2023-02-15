import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useUserContext } from 'contexts/User';
import { useContext as useConfirmContext } from 'contexts/confirm';
import Empty from 'components/Empty';
import Image from 'components/Image';
import Loader from 'components/Loader';
import Divider from 'components/Divider';
import InfiniteScroll from 'components/InfiniteScroll';
import ProductGridHeader from 'components/ProductGridHeader';
import BrandSubCategoryTab from 'components/BrandSubCategoryTab';
import Breadcrumb from 'components/Breadcrumb';
import useBtnTop from 'libs/useBtnTop';
import { NO_PRODUCT } from 'constants/meta';
import { goods as goodsApi } from 'apis';
import { Category, ProductItem, StoreKey } from 'types/index';
import { styles } from './styles';

type SubCategoryTabType = Pick<Category, 'catgryCd' | 'catgryNm' | 'brandCd'>[];

const GoodsList = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();
  useBtnTop();

  const [sort, setSort] = useState(0);
  const [banner, setBanner] = useState('');
  const [subCategoryList, setSubCategoryList] = useState<SubCategoryTabType>(
    []
  );

  const categoryCode =
    router.isReady && router.query.id ? Number(router.query.id) : null;

  const brandCode =
    router.isReady && router.query.brandCd
      ? Number(router.query.brandCd)
      : null;

  const { user } = useUserContext();
  useEffect(() => {
    if (brandCode === 100000 && !user?.isBrandLogin) {
      confirmActions
        .open('알림', '2차인증후 이용 가능합니다.')
        .then(async () => {
          router.push('/');
        });
    }
  }, [brandCode]);

  // 상품 리스트 조회 api
  const { data, fetchNextPage, hasNextPage, isFetching } =
    goodsApi.useProductInfiniteList(categoryCode, brandCode, sort);

  // 서브 카테고리 처리
  useEffect(() => {
    if (categoryCode) {
      const sessionCategoryList =
        sessionStorage.getItem(StoreKey.CATEGORY) || 'null';
      const categoryList =
        (JSON.parse(sessionCategoryList) as Category[]) || [];
      console.log('categoryList ', categoryList);

      const list: SubCategoryTabType = [];

      const isSubCategory =
        categoryList?.filter((item) => item.catgryCd === String(categoryCode))
          .length === 0;

      categoryList.map((item) => {
        if (
          item.catgryCd ===
          (!isSubCategory
            ? String(categoryCode)
            : String(categoryCode).substring(0, 3))
        ) {
          list.push({
            catgryCd: item.catgryCd,
            catgryNm: `${item.catgryNm}`,
            brandCd: item.brandCd,
          });
          item.child?.map((item) => {
            list.push({
              catgryCd: item.catgryCd,
              catgryNm: item.catgryNm,
              brandCd: item.brandCd,
            });
          });
        }
      });
      setSubCategoryList(list);
      setSort(0);
    }
  }, [categoryCode]);

  // 인피니티 스크롤을 위하여, 상품 리스트 합성
  const productList = useMemo<ProductItem[]>(() => {
    if (data) {
      const list = data?.pages.reduce((acc, { data, imgPath }) => {
        if (imgPath) {
          setBanner(imgPath);
        }
        return [...acc, ...data];
      }, [] as ProductItem[]);
      return list;
    }
    return [];
  }, [data]);

  const totalCount = useMemo(() => {
    if (productList.length > 0) {
      return productList[0]?.rowNumCnt || 0;
    }
    return 0;
  }, [productList]);

  // 서브 카테고리 클릭시 라우터 쿼리 변경
  const handleCategoryClick = (code?: string, brandCode?: string) => {
    router.push(`/goods/list/${code}?brandCd=${brandCode}`);
  };

  const breadCrumbList = useMemo(() => {
    if (subCategoryList && subCategoryList.length > 0) {
      const id = String(router.query.id);
      const cur = subCategoryList.find((item) => item.catgryCd === id);
      const list = [];
      list.push(
        {
          catgryCd: '/',
          catgryNm: '브랜드',
        },
        subCategoryList[0]
      );
      if (cur && cur.catgryCd.length > 3) {
        list.push(cur);
      }

      // 상품상세에서 사용하기위해 임시 세션에 저장
      sessionStorage.setItem(StoreKey.BREADCRUMB, JSON.stringify(list));
      return list;
    }
    return [];
  }, [subCategoryList]);

  return (
    <Box sx={styles.root}>
      {breadCrumbList && breadCrumbList.length > 0 && (
        <Breadcrumb items={breadCrumbList} />
      )}
      {banner && (
        <Box>
          <Image alt="brandTopBanner" layout="fill" src={banner} />
        </Box>
      )}
      {subCategoryList && subCategoryList.length > 0 && (
        <Box sx={styles.brandSubCategoryTabRoot}>
          <BrandSubCategoryTab
            onClick={(code, brandCode) => handleCategoryClick(code, brandCode)}
            data={subCategoryList}
          />
        </Box>
      )}
      <Divider size={3} />
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
          isFetching ? <Loader height={100} /> : <Empty text={NO_PRODUCT} />
        }
        onEndReached={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </Box>
  );
};

export default GoodsList;
