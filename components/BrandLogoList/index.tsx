import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Image from 'components/Image';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import { BrandLogoItem } from 'types';

type Props = {
  sx?: SxProps;
  onClick?: (id: number) => void;
  brandLogoItem?: BrandLogoItem[];
};
const BrandLogoList = ({ sx, brandLogoItem, onClick }: Props) => {
  return (
    <Box sx={styles.root}>
      {brandLogoItem &&
        brandLogoItem.map((item, index) => {
          return (
            <Box key={index} sx={styles.item}>
              <ButtonBase
                onClick={() => onClick?.(index)}
                disableRipple
                disableTouchRipple
              >
                <Box sx={styles.itemRoot}>
                  <Image
                    width={90}
                    height={90}
                    src={item?.imagePath}
                    alt="brandLogo"
                  />
                </Box>
              </ButtonBase>
            </Box>
          );
        })}
    </Box>
  );
};

export default BrandLogoList;
