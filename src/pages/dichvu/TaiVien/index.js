import RectangleItem from '../../../components/RectangleItem';
import DoctorItem from '../../../components/DoctorItem';
import images from '../../../assets/images';
import Image from '../../../components/Image';

import styles from './TaiVien.module.scss';
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
function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('poster-wrapper')}>
        <Image className={cx('poster')} src={images.posterTaiVien} alt="poster" />
      </div>
      <div className={cx('Specialty')}>
        <h4 className={cx('title')}>Chuyên Khoa</h4>
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
      <div className={cx('facilities')}>
        <h4 className={cx('title')}>Cơ Sở Y Tế</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    srcImage={images.bv_choray}
                    title="Bệnh viện Chợ Rẫy"
                    link="/dich-vu-y-te/kham-chuyen-khoa"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('future-doctor')}>
        <h4 className={cx('title')}>Bác Sĩ Nổi Bật</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={4} spaceBetween={40} navigation={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item-doctor')}>
                  <DoctorItem
                    srcImage={images.trongHung}
                    title="Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng"
                    link="/doctor"
                    specialty="Thần Kinh"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('telemedicine')}>
        <h4 className={cx('title')}>Gói khám</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    srcImage={images.goiKhamCoBan}
                    title="Gói khám sức khỏe tổng quát cơ bản cho nam (PKYD1M)"
                    link="/dich-vu-y-te/kham-tong-quat/goi-kham-suc-khoe-tong-quat-co-ban-cho-nam-pkyd1m-i862"
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

export default Home;
