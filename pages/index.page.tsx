import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import { useGetDefaultData } from 'apis';
import { useUserContext } from 'contexts/User';
import { useContext as useConfirmContext } from 'contexts/confirm';
import BrandSwiper from 'components/BrandSwiper';
import Footer from 'components/Layout/Footer';
import { StoreKey, Category } from 'types';

export default function Home() {
  const router = useRouter();
  const { user } = useUserContext();
  const [, confirmActions] = useConfirmContext();

  // 메인 브랜드 로고 리스트, 장바구니(TODO..) 데이터 조회 api
  const { data, isSuccess, refetch } = useGetDefaultData(
    user?.custmrId || null
  );

  const sessionCategoryList =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem(StoreKey.CATEGORY) || 'null')
      : null;
  const [category, setCategory] = useState<Category[] | null>(
    sessionCategoryList
  );

  useEffect(() => {
    if (!category && user?.custmrId) refetch();
  }, [category, user?.custmrId]);

  // api 호출하고 성공하면 세션 스토리지에 저장,
  useEffect(() => {
    if (data && isSuccess) {
      const reArrageCategoryList = data.result.data.categoryList.reduce(
        (acc: any, cur: any) => {
          if (cur.lv === 1) {
            if (cur.isChild === 'Y') {
              const test = { ...cur, child: [] };
              return [...acc, test];
            } else {
              return [...acc, cur];
            }
          }
          acc[acc.length - 1].child.push(cur);
          return [...acc];
        },
        []
      );
      sessionStorage.setItem(
        StoreKey.CATEGORY,
        JSON.stringify(reArrageCategoryList)
      );
      setCategory(reArrageCategoryList);
    }
  }, [data]);

  const handleBrandLogoClick = (path: string, brandPath: number) => {
    console.log('a', path, typeof brandPath);
    if (brandPath === 100000) {
      // 전용몰 로그인 여부 체크
      // - 로그인 하였을경우 해당 페이지로 이동
      // - 로그인x -> 로그인 페이지로 이동
      confirmActions
        .open('알림', '로그인이 필요한 서비스입니다.로그인 하시겠습니까?', [
          '취소',
          '확인',
        ])
        .then(async (answer) => {
          if (answer === '확인') {
            router.push({
              pathname: '/check-auth',
              query: { pid: path, brandCd: brandPath },
            });
          }
        });
    } else {
      router.push(`/goods/list/${path}?brandCd=${brandPath}`);
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={styles.root}>
        <Box sx={styles.contentsRoot}>
          <Box sx={styles.brandSwiperRoot}>
            <BrandSwiper onClick={handleBrandLogoClick} data={category || []} />
          </Box>
        </Box>
        <Box sx={styles.footerRoot}>
          <Footer />
        </Box>
      </Box>
    </Container>
  );
}
const styles = {
  // 메인 화면에 보여줄 컴포넌트의 양이 전체 화면보다 적어
  // 아래의 방법으로 상하 고정
  root: {
    position: 'relative',
    minHeight: 'calc(100vh - 48px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentsRoot: {},
  brandSwiperRoot: { padding: '20px 10px' },
  footerRoot: {},
};
