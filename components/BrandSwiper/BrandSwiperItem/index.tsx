import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import { SxProps } from 'libs/sx';
import Image from 'components/Image';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  data: any[];
  onClick?: (path: string) => void;
};
const BrandSwiperItem = (props: Props) => {
  console.log('BrandSwiperItem : ', props.data);

  return (
    <Box sx={styles.root}>
      {props.data.map((item, index) => (
        <ButtonBase
          key={index}
          sx={styles.btnRoot}
          onClick={() => props.onClick && props.onClick(item.catgryPathCd)}
        >
          <Image
            alt={item.name}
            css={styles.img}
            src={item.imgPath}
            // src={
            //   index % 3 === 0
            //     ? 'https://paycoin.thezooom.kr/goods/brand_thumnail_view/20210621164930'
            //     : index % 3 === 1
            //     ? 'https://paycoin.thezooom.kr/goods/brand_thumnail_view/20210621163920'
            //     : index % 3 === 2
            //     ? 'https://paycoin.thezooom.kr/goods/brand_thumnail_view/20210621165245'
            //     : null
            // }
            layout="fill"
          />
        </ButtonBase>
      ))}
    </Box>
  );
};
export default BrandSwiperItem;
