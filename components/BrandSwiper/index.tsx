import React, { useState, useEffect, useMemo } from 'react';
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
  onClick?: (path: string) => void;
  data: any[];
};
const COLUMN_CNT = 3;
const BrandSwiper = (props: Props) => {
  const [isReadyForInitSwiper, setIsReadyForInitSwiper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const dataLength = (props.data && props.data.length) || 0;
  // const slideArray =
  // (props.data && (sliceArray(props.data, COLUMN_CNT) as any[])) || [];

  // FIXME: 임시
  const slideArray = temp;
  // const dataLength = 18;

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
const temp = [
  [
    {
      catgryNm: '캠핑',
      imgPath: '/temp/temp_samsung.png', // 이것추가
      catgryPath: '캠핑',
      catgryCd: '101',
      catgryPathCd: '101',
    },
    {
      catgryNm: '자전거',
      imgPath: '/temp/temp_k2.png', // 이것추가
      lv: 1,
      catgryPath: '자전거',
      catgryCd: '102',
      catgryPathCd: '102',
    },
    {
      catgryNm: '등산',
      imgPath: '/temp/temp_eider.png', // 이것추가
      catgryPath: '등산',
      catgryCd: '103',
      catgryPathCd: '103',
    },
  ],
  [
    {
      catgryNm: '낚시',
      imgPath: '/temp/temp_apple.png', // 이것추가
      catgryPath: '낚시',
      catgryCd: '104',
      catgryPathCd: '104',
    },
    {
      catgryNm: '물놀이',
      imgPath: '/temp/temp_kuku.png', // 이것추가
      catgryPath: '물놀이',
      catgryCd: '105',
      catgryPathCd: '105',
    },
    {
      catgryNm: '스키/보드',
      imgPath: '/temp/temp_gnc.png', // 이것추가
      lv: 1,
      catgryPath: '스키/보드',
      catgryCd: '109',
      catgryPathCd: '109',
    },
  ],
  [
    {
      catgryNm: '아찔특가',
      imgPath: '/temp/temp_north.png', // 이것추가
      catgryPath: '아찔특가',
      catgryCd: '106',
      catgryPathCd: '106',
    },
    {
      catgryNm: '베스트 50',
      imgPath: '/temp/temp_kobea.png', // 이것추가
      catgryPath: '베스트 50',
      catgryCd: '108',
      catgryPathCd: '108',
    },
    {
      catgryNm: '이벤트',
      imgPath: '/temp/temp_tepal.png', // 이것추가
      mappingUrl: '/noti/event',
      catgryPath: '이벤트',
      catgryCd: '107',
      catgryPathCd: '107',
    },
  ],
  [
    {
      catgryNm: '캠핑',
      imgPath: '/temp/temp_samsung.png', // 이것추가
      catgryPath: '캠핑',
      catgryCd: '101',
      catgryPathCd: '101',
    },
    {
      catgryNm: '자전거',
      imgPath: '/temp/temp_k2.png', // 이것추가
      lv: 1,
      catgryPath: '자전거',
      catgryCd: '102',
      catgryPathCd: '102',
    },
    {
      catgryNm: '등산',
      imgPath: '/temp/temp_eider.png', // 이것추가
      catgryPath: '등산',
      catgryCd: '103',
      catgryPathCd: '103',
    },
  ],
  [
    {
      catgryNm: '낚시',
      imgPath: '/temp/temp_apple.png', // 이것추가
      catgryPath: '낚시',
      catgryCd: '104',
      catgryPathCd: '104',
    },
    {
      catgryNm: '물놀이',
      imgPath: '/temp/temp_kuku.png', // 이것추가
      catgryPath: '물놀이',
      catgryCd: '105',
      catgryPathCd: '105',
    },
    {
      catgryNm: '스키/보드',
      imgPath: '/temp/temp_gnc.png', // 이것추가
      lv: 1,
      catgryPath: '스키/보드',
      catgryCd: '109',
      catgryPathCd: '109',
    },
  ],
  [
    {
      catgryNm: '아찔특가',
      imgPath: '/temp/temp_north.png', // 이것추가
      catgryPath: '아찔특가',
      catgryCd: '106',
      catgryPathCd: '106',
    },
    {
      catgryNm: '베스트 50',
      imgPath: '/temp/temp_kobea.png', // 이것추가
      catgryPath: '베스트 50',
      catgryCd: '108',
      catgryPathCd: '108',
    },
    {
      catgryNm: '이벤트',
      imgPath: '/temp/temp_tepal.png', // 이것추가
      mappingUrl: '/noti/event',
      catgryPath: '이벤트',
      catgryCd: '107',
      catgryPathCd: '107',
    },
  ],
];
