import React, { useEffect, useState } from 'react';
import { Tabs } from '@mui/material';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import TabItem from 'components/MainCategoryTab/TabItem';
import { Category } from 'types';
import { useRouter } from 'next/router';

// TODO: 추후 사용 예정
type Props = {
  sx?: SxProps;
  data: Pick<Category, 'catgryCd' | 'catgryNm'>[];
};
const MainCategoryTab = (props: Props) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id;
      if (id) {
        setValue(id.length > 4 ? String(id).substring(0, 3) : String(id));
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
      <TabItem name="HOME" path="/" value="/" />
      {props.data &&
        props.data.map((item, index) => (
          <TabItem
            value={item.catgryCd}
            name={item.catgryNm}
            key={index}
            path={item.catgryCd}
          />
        ))}
    </Tabs>
  );
};
export default MainCategoryTab;
