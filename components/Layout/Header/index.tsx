import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, ButtonBase, Toolbar, AppBar } from '@mui/material';
import Image from 'components/Image';
import BottomDrawer from 'components/BottomMenuDrawer';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import { StoreKey, Category } from 'types/index';

type Props = {
  sx?: SxProps;
};
const Header = (props: Props) => {
  const router = useRouter();

  // drawer에서 사용하기위한 세션 카테고리 조회
  const sessionCatgoryList: Category[] =
    typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem(StoreKey.CATEGORY) || 'null')
      : null;

  const [sortOn, setSortOn] = useState(false);

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
            {/* <ButtonBase
              sx={styles.tipIcon}
              onClick={() => {
                router.push('/mypage/tip');
              }}
              disableRipple
              disableTouchRipple
            >
              <Image
                objectFit="cover"
                width={34}
                height={34}
                src={'/images/links_tip.png'}
                alt="tipLogo"
              />
            </ButtonBase> */}
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
          router
            .push(`/goods/list/${categoryCode}?brandCd=${brandCode}`)
            .then(() => toggleSort(false)());
        }}
      />
    </Box>
  );
};

export default Header;
