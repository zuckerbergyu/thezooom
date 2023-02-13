import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';
import { member as memberApi } from 'apis';
import { useUserContext } from 'contexts/User';
import BrandSwiper from 'components/BrandSwiper';
import Footer from 'components/Layout/Footer';
import LoginModal from 'components/LoginModal';
import { StoreKey, Category } from 'types';
import WebView from 'components/WebView';

export default function Home() {
  const router = useRouter();
  const { user } = useUserContext();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  // 메인 브랜드 로고 리스트, 장바구니(TODO..) 데이터 조회 api
  const { data, isSuccess, refetch } = memberApi.useGetDefaultData(
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

  const handleBrandLogoClick = (path: string, brandPath: string) => {
    if (brandPath === '100000' && !user?.isBrandLogin) {
      setOpenLoginModal(true);
      return;
    }
    router.push(`/goods/list/${path}?brandCd=${brandPath}`);
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Box sx={styles.root}>
        {/* FIXME: TEXT용 / 추후 삭제 */}
        <WebView />
        <Box sx={styles.contentsRoot}>
          <Box sx={styles.brandSwiperRoot}>
            <BrandSwiper onClick={handleBrandLogoClick} data={category || []} />
          </Box>

          {/* 이렇게 조건을 추가하면, true일때 새로 생성되기에 자동 initialized */}
          {openLoginModal && (
            <LoginModal
              open={openLoginModal}
              onClose={() => {
                setOpenLoginModal(false);
              }}
              title="2단계 인증"
              path={'/goods/list/101?brandCd=100000'}
            />
          )}
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
