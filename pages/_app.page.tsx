import React, { useEffect, useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from 'components/Layout';
import { getLogin } from 'apis/index';
import { UserContext } from 'contexts/User';
import { BtnTopContext } from 'contexts/btnTop';
import { Provider as ConfirmProvider } from 'contexts/confirm';
import ConfirmDialog from 'components/ConfirmDialog';
import createEmotionCache from 'libs/createEmotionCache';
import { useScrollRestoration } from 'libs/useScrollRestoration';
import { User, StoreKey } from 'types';
import theme from 'constants/theme';
import { DEFAULT_SEO } from 'constants/seo';
// global style 추가하기

// swiper
// 현재 'eslint-plugin-import'에서 swiperJs 7버전을 import 했을 때
// 'import/no-unresolved' 룰에서 걸리는 버그가 있다.
// 때문에 임시로 eslintrc에 "import/ignore": ["swiper"] 를 추가해 두었다.
// 관련 링크 https://github.com/import-js/eslint-plugin-import/issues/2266
// import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/zoom';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Loader from 'components/Loader';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const useUser = () => {
  const router = useRouter();
  const [userCtx, setUserCtx] = useState<User>({
    custmrId: '',
    isLogin: false,
    token: '',
  });

  useEffect(() => {
    const getUser =
      typeof window !== 'undefined' && sessionStorage.getItem(StoreKey.USER);
    const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'PROD';
    if (router.isReady) {
      try {
        if (getUser) {
          console.log('user정보 있다면, context 업데이트');
          const user = JSON.parse(getUser);
          setUserCtx(user);
        } else {
          // TODO 여기서 최초로 호출하고, 그다음 부터는 호출 하지 않는다.
          console.log('user정보 없다면, api 호출');
          (async () => {
            const memId = isProd ? router.query.memId : 'testUser';
            const custmrId = isProd
              ? document.location.host.split('.')[0]
              : 'hue';

            // FIXME:임시로 세팅
            // const param = { memId, custmrId };
            const param = { memId: 'hue', custmrId: 'testUser' };

            // 인증 정보 조회
            const { data } = await getLogin(param);
            if (!data) {
              router.push('/not-authorized');
              return;
            }

            const memInfo = data.result.memInfo;
            const user: User = {
              custmrId: memInfo.custmrId,
              token: memInfo.token,
              isLogin: true,
            };
            sessionStorage.setItem(StoreKey.USER, JSON.stringify(user));
            setUserCtx(user);
          })();
        }
      } catch (error) {
        router.push('/not-authorized');
      }
    }
  }, [router]);
  return {
    user: userCtx,
  };
};

// TODO: 추후 context method가 많아질경우 파일 분리
const useBtnTop = () => {
  const [btnTopCtx, setBtnTopCtx] = useState(false);
  const setBtnTop = (btnTop: boolean) => setBtnTopCtx(btnTop);
  return { btnTop: btnTopCtx, setBtnTop };
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const queryClient = new QueryClient();

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // 로그인
  const { user } = useUser();

  // 위로가기 버튼(특정 페이지에서만 사용하기위해 context생성(전부는 아니지만 여러곳))
  const { btnTop, setBtnTop } = useBtnTop();

  // 스크롤 유지
  useScrollRestoration();

  return (
    <CacheProvider value={emotionCache}>
      <DefaultSeo {...DEFAULT_SEO} />

      <UserContext.Provider value={{ user }}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ConfirmProvider>
              <Box sx={styles.component}>
                <BtnTopContext.Provider value={{ btnTop, setBtnTop }}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                  {/* <Box sx={styles.loader}> */}
                  {/* <Loader color="#5fc2d5" /> */}
                  {/* </Box> */}
                </BtnTopContext.Provider>
                <ConfirmDialog />
              </Box>
            </ConfirmProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </UserContext.Provider>
    </CacheProvider>
  );
}
const styles = {
  component: {
    maxWidth: 1000,
    width: '100%',
    height: '100%',
    bottom: 0,
    margin: {
      sm: 'auto',
      md: 'auto',
      lg: 'auto',
    },
    position: { xs: 'static', sm: 'relative' },
  },
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
};
