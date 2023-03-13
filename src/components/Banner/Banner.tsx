import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

export function Banner() {
  const items = [
    { src: '../assets/banner_1.svg' },
    { src: '../assets/banner_2.svg' },
  ];
  return (
    <>
      <Swiper
        effect={'fade'}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {items.map((item, idx) => {
          console.log(item.src.value);
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
