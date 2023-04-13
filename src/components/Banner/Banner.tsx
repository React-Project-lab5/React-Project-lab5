import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import classes from './Banner.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';

export function Banner() {
  const items = [
    {
      src: '../assets/banner_1.svg',
      link: 'https://www.baemin.com/',
      alt: '배달의민족',
    },
    {
      src: '../assets/banner_2.svg',
      link: 'https://www.ivips.co.kr:7002/intro/230330/intro.asp',
      alt: '빕스',
    },
    {
      src: '../assets/banner_3.svg',
      link: 'https://www.burgerking.co.kr/#/home',
      alt: '버거킹',
    },
  ];
  return (
    <div className={classes.banner}>
      <Swiper
        coverflowEffect={{
          rotate: 10, // 회전각도
          stretch: 0,
          depth: 100, // 깊이감도
          modifier: 2, //
          slideShadows: true, //선택한 부분 밝게 나머지는 그늘지게 해준다.
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
              <a href={item.link} target="_blank" rel="noreferrer">
                <img src={item.src} alt={item.alt} width="1440" height="200" />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
