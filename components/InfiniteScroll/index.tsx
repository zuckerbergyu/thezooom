import React from 'react';
import Box from '@mui/material/Box';
import { SxProps } from 'libs/sx';
import Observer from 'components/Observer';
import ProductGrid from 'components/ProductGrid';
import { styles } from './styles';

type Props<T> = {
  data: T[];
  sx?: SxProps | null;
  onEndReached?: () => void;
  hasNextPage?: boolean;
  ListHeaderComponent?: React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
};
const InfiniteScroll = <T,>(props: Props<T>) => {
  return (
    <Box sx={{ ...styles.root, ...props.sx }}>
      {props.ListHeaderComponent || null}
      {/* TODO: 헤더와 같이 밖에서 주입 가능 / 쓰임새에따라 추후 수정 */}
      <ProductGrid productList={props.data} />
      {props.hasNextPage ? (
        <Observer
          onObserved={() => {
            if (props.onEndReached) props.onEndReached();
          }}
        >
          <Box sx={styles.observerDummy} />
        </Observer>
      ) : props.data.length === 0 && props.ListEmptyComponent ? (
        props.ListEmptyComponent
      ) : (
        props.ListFooterComponent || null
      )}
    </Box>
  );
};
export default InfiniteScroll;
