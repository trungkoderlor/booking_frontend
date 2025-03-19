import RectangleItem from '../../../components/RectangleItem';

import styles from './TaiNha.module.scss';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
];
const cx = classNames.bind(styles);
function TaiNha() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('poster-wrapper')}>
        <Image className={cx('poster')} src={images.postTaiNha} alt="poster" />
      </div>
      <div className={cx('telemedicine')}>
        <h4 className={cx('title')}>Xét nghiệm tại nhà</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    srcImage={images.xetNghiemTaiNha}
                    title="Gói xét nghiệm tổng quát cơ bản tại nhà (MD-XN1TN)"
                    link="/dich-vu-y-te/xet-nghiem-y-hoc/goi-xet-nghiem-tong-quat-co-ban-tai-nha-md-xn1tn-i1369"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('telemedicine')}>
        <h4 className={cx('title')}>Khám Từ Xa</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    srcImage={images.tamLyTuXa}
                    title="Tư vấn, trị liệu Tâm lý từ xa"
                    link="/dich-vu-y-te/kham-tu-xa/tu-van-tri-lieu-tam-ly-tu-xa-s65"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('mentalHealth')}>
        <h4 className={cx('title')}>Sức Khỏe Tinh Thần</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem srcImage={images.timMach} title="Tim mạch" link="/dich-vu-y-te/kham-chuyen-khoa" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('qa-doctor')}>
        <h4 className={cx('title')}>Bác Sĩ Hỏi Đáp</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem srcImage={images.timMach} title="Tim mạch" link="/dich-vu-y-te/kham-chuyen-khoa" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('posts')}>
        <h4 className={cx('title')}>Cẩm Nang</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={4} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item-post')}>
                  <RectangleItem srcImage={images.timMach} title="Tim mạch" link="/dich-vu-y-te/kham-chuyen-khoa" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('posts')}>
        <h4 className={cx('title')}>Sống khỏe suốt đời</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={4} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item-post')}>
                  <RectangleItem srcImage={images.timMach} title="Tim mạch" link="/dich-vu-y-te/kham-chuyen-khoa" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default TaiNha;
