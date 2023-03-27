import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import classes from './Banner.module.scss';
import classNames from 'classnames';

interface HomeBannerProps {
  className?: string;
}

export function HomeBanner({ className }: HomeBannerProps) {
  const items = [
    {
      src: '../assets/homeBanner_1.svg',
      text: '최소주문금액 채우기 힘드시다구요?',
    },
    {
      src: '../assets/homeBanner_2.svg',
      text: `이젠 이웃사람들과 함께 음식 시키세요!`,
    },
    { src: '../assets/homeBanner_3.svg', text: 'N밥생활이 함께합니다!' },
  ];
  return (
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
      className={classNames(classes['swiperHomeBannerContainer'], className)}
    >
      {items.map((item, idx) => {
        return (
          <SwiperSlide key={idx} className={classes.swiperSlide}>
            <div className={classes['swiperContainer']}>
              <img src={item.src} alt="배너광고" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
