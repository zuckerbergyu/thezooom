import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@mui/material';
import { SxProps } from 'libs/sx';
import { Category } from 'types';
import TabItem from './TabItem';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  data: Pick<Category, 'catgryCd' | 'catgryNm'>[];
  onClick?: (code?: string) => void;
};
const BrandSubCategoryTab = (props: Props) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id;
      if (id) {
        setValue(String(router.query.id));
      } else {
        setValue('/');
      }
    }
  }, [router]);

  return (
    <Tabs
      value={value}
      sx={styles.root}
      variant="scrollable"
      scrollButtons={false}
      aria-label="main-navi-tabs"
    >
      {props.data &&
        props.data.map((item, index) => (
          <TabItem
            value={item.catgryCd}
            name={item.catgryNm}
            key={index}
            path={item.catgryCd}
            onClick={(code) => props.onClick?.(code)}
          />
        ))}
    </Tabs>
  );
};
export default BrandSubCategoryTab;
