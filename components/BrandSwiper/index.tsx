import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SxProps } from 'libs/sx';
import sliceArray from 'libs/sliceArray';
import BrandSwiperItem from './BrandSwiperItem';
import ProgressBar from './ProgressBar';
import { styles } from './styles';
import 'swiper/css';

type Props = {
  sx?: SxProps;
  onClick?: (path: string, brandPath: string) => void;
  data: any[];
};
const COLUMN_CNT = 3;
const BrandSwiper = (props: Props) => {
  const [isReadyForInitSwiper, setIsReadyForInitSwiper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const dataLength = (props.data && props.data.length) || 0;
  const slideArray =
    (props.data && (sliceArray(props.data, COLUMN_CNT) as any[])) || [];

  const totalStep = useMemo(() => {
    if (dataLength > 0) {
      const a = dataLength - COLUMN_CNT * COLUMN_CNT;
      return Math.ceil(a / COLUMN_CNT);
    }
    return 0;
  }, [dataLength]);

  useEffect(() => {
    setIsReadyForInitSwiper(true);
  }, []);

  return (
    <Box sx={styles.root}>
      {dataLength > COLUMN_CNT * COLUMN_CNT ? (
        <Box sx={styles.progressBarRoot}>
          <ProgressBar activeStep={activeStep} totalStep={totalStep} />
        </Box>
      ) : null}
      {isReadyForInitSwiper ? (
        <Box sx={styles.swiperRoot}>
          <Swiper
            spaceBetween={0}
            slidesPerView={COLUMN_CNT}
            onRealIndexChange={(e) => {
              setActiveStep(e.activeIndex);
            }}
          >
            <Box sx={styles.swiperSlideRoot}>
              {slideArray &&
                slideArray.length > 0 &&
                slideArray.map((slideContent, index) => (
                  <SwiperSlide key={index}>
                    <BrandSwiperItem
                      data={slideContent}
                      onClick={props.onClick}
                    />
                  </SwiperSlide>
                ))}
            </Box>
          </Swiper>
        </Box>
      ) : null}
    </Box>
  );
};
export default BrandSwiper;
