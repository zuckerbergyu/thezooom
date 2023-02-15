import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import { useRouter } from 'next/router';
import { Category } from 'types';
import Divider from 'components/Divider';

// TODO: 현재 사용x / 추후 사용 예정
type Props = {
  sx?: SxProps;
  onClick?: (code?: string) => void;
  data: Pick<Category, 'catgryCd' | 'catgryNm'>[];
};

const SubCategoryTab = (props: Props) => {
  const router = useRouter();
  return (
    <Box>
      <Divider sx={styles.divider} size={1} />
      <Box sx={styles.root}>
        {props.data.map((item, index) => {
          return (
            <ButtonBase
              key={index}
              onClick={() => {
                props.onClick?.(item.catgryCd);
              }}
            >
              <Box
                key={index}
                sx={[
                  styles.tabItemRoot,
                  String(router.query.id) === item.catgryCd && styles.click,
                ]}
              >
                {item.catgryNm}
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
      <Divider sx={styles.divider} size={10} />
    </Box>
  );
};
export default SubCategoryTab;
