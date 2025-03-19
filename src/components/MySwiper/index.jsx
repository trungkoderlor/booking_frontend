import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import styles from './MySwiper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MySwiper({ items, children, ...props }) {
  return (
    <div className={cx('swiper-container')}>
      <Swiper {...props}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={cx('slide-item')}>
              <RectangleItem srcImage={images.timMach} title="Tim mạch" link="/dich-vu-y-te/kham-chuyen-khoa" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MySwiper;
