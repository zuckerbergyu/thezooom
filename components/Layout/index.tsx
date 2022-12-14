import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, NoSsr } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import Header from 'components/Layout/Header';
import BtnTop from 'components/BtnTop';
import BtnBack from 'components/BtnBack';
import useIsMain from 'libs/useIsMain';
import { useBtnTopContext } from 'contexts/btnTop';

type Props = {
  sx?: SxProps;
  children?: React.ReactNode;
};
const Layout = ({ sx, children }: Props) => {
  const router = useRouter();
  const isMain = useIsMain();
  const { btnTop } = useBtnTopContext();

  const isNotAuthorized = router.pathname === '/not-authorized';
  const isClosePopup = router.pathname.startsWith('/closePopup');
  const isHeaderShow = !isClosePopup && !isNotAuthorized;

  // TODO: 전체 로딩 context 적용
  const setLoading = false;

  return (
    <Box sx={styles.root}>
      {isHeaderShow && <Header />}
      <Container
        maxWidth={false}
        disableGutters
        sx={[styles.container, setLoading && styles.layoutContents]}
      >
        {children}
      </Container>
      {btnTop && <BtnTop />}

      {/* 모바일 뒤로가기 버튼 */}
      {/* {isMobile && !isMain && (
        <NoSsr>
          <BtnBack />
        </NoSsr>
      )} */}
    </Box>
  );
};

export default Layout;
