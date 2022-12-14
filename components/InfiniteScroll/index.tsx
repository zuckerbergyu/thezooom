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
      {/* FIXME: 이부분도 헤더처럼 밖에서 주입시키는것으로 변경하면 어떨지 고민해보기 */}
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
