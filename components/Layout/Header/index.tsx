import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, ButtonBase, Toolbar, AppBar } from '@mui/material';
import { useUserContext } from 'contexts/User';
import Image from 'components/Image';
import LoginModal from 'components/LoginModal';
import BottomDrawer from 'components/BottomMenuDrawer';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import { StoreKey, Category } from 'types/index';

type Props = {
  sx?: SxProps;
};
const Header = (props: Props) => {
  const router = useRouter();
  const { user } = useUserContext();
  const [sortOn, setSortOn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  // drawer에서 사용하기위한 세션 카테고리 조회
  const sessionCatgoryList: Category[] =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem(StoreKey.CATEGORY) || 'null')
      : null;

  const toggleSort =
    (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setSortOn(open);
    };
  return (
    <Box sx={styles.root}>
      <AppBar sx={styles.appBar} elevation={0}>
        <Toolbar disableGutters variant="dense" sx={styles.toolBar}>
          <Box>
            <ButtonBase
              onClick={() => {
                toggleSort(true)();
              }}
              disableRipple
              disableTouchRipple
              sx={styles.menuIcon}
            >
              <Image
                objectFit="cover"
                width={34}
                height={34}
                src={'/images/menu_toggle.png'}
                alt="menuLogo"
              />
            </ButtonBase>
          </Box>
          <Box>
            <ButtonBase
              onClick={() => router.push('/')}
              disableRipple
              disableTouchRipple
              sx={styles.logoIcon}
            >
              <Image
                objectFit="cover"
                width={107}
                height={28}
                src={'/logo.png'}
                alt="mainLogo"
              />
            </ButtonBase>
          </Box>
          <Box>
            <ButtonBase
              sx={styles.personIcon}
              onClick={() => {
                router.push('/mypage');
              }}
              disableRipple
              disableTouchRipple
            >
              <Image
                objectFit="cover"
                width={34}
                height={34}
                src={'/images/links_mp.png'}
                alt="mypageLogo"
              />
            </ButtonBase>
            <ButtonBase
              sx={styles.searchIcon}
              onClick={() => {
                router.push('/search');
              }}
              disableRipple
              disableTouchRipple
            >
              <Image
                objectFit="cover"
                width={34}
                height={34}
                src={'/images/links_sc.png'}
                alt="searchLogo"
              />
            </ButtonBase>
          </Box>
        </Toolbar>
      </AppBar>
      <BottomDrawer
        open={sortOn}
        onClose={toggleSort(false)}
        onOpen={toggleSort(true)}
        items={sessionCatgoryList}
        onSubmit={(categoryCode, brandCode) => {
          if (String(brandCode) === '100000' && !user?.isBrandLogin) {
            setOpenLoginModal(true);
            toggleSort(false)();
            return;
          }
          router
            .push(`/goods/list/${categoryCode}?brandCd=${brandCode}`)
            .then(() => toggleSort(false)());
        }}
      />
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
  );
};

export default Header;
