import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { SxProps } from 'libs/sx';
import { Box } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type Props = {
  sx?: SxProps;
  onClick?: (id: number) => void;
  children: React.ReactNode;
};

// TODO ->
// 현재는 크기만 다른 메인 배너에만 사용
// 사용 되는 방법에 따라, config, style, props 구성을 변경
// 재사용 상황에 따라 컴포넌트 분리
const SwiperComponent = (props: Props) => {
  SwiperCore.use([Autoplay, Pagination]);

  const [isReadyForInitSwiper, setIsReadyForInitSwiper] = useState(false);

  // array type 아닐경우
  const slides = Array.isArray(props.children)
    ? props.children
    : [props.children];

  // ref참조를 위해 렌더링 이후 state 변경
  useEffect(() => {
    setIsReadyForInitSwiper(true);
  }, []);

  return (
    <Box>
      {isReadyForInitSwiper ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1800, disableOnInteraction: false }} // 추가
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide
              key={index}
              // className={clsx(classes.slide, propClasses.slide)} // 스타일
              //   className={{ height: 'auto' }} // 스타일
              onClick={props.onClick && (() => props.onClick?.(index))}
              // {...props.swiperSlideProps}
            >
              {slideContent}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </Box>
  );
};

export default SwiperComponent;
