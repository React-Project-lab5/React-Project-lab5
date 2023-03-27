import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import classes from './Banner.module.scss';

export function Banner() {
  const items = [
    { src: '../assets/banner_1.svg' },
    { src: '../assets/banner_2.svg' },
    { src: '../assets/banner_3.svg' },
  ];
  return (
    <div className={classes.banner}>
      <Swiper
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
        className={classes.swiper}
        loop={true}
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
