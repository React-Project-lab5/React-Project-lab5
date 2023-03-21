import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import classes from './Banner.module.scss';

export function HomeBanner() {
  const items = [
    { src: '../assets/homeBanner_1.svg' },
    { src: '../assets/homeBanner_2.svg' },
    { src: '../assets/homeBanner_3.svg' },
  ];
  return (
    <div className={classes['swiperHomeBannerContainer']}>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className={classes.swiperSlide}>
              <img src={item.src} alt="배너광고" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
