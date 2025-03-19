import RectangleItem from '../../../components/RectangleItem';
import DoctorItem from '../../../components/DoctorItem';
import ServiceItem from '../../../components/ServiceItem';

import styles from './SongKhoe.module.scss';
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
function SongKhoe() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('poster-wrapper')}>
        <Image className={cx('poster')} src={images.posterSongKhoe} alt="poster" />
      </div>
      <div className={cx('telemedicine')}>
        <h4 className={cx('title')}>Bài Viết Mới Nhất</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    srcImage={images.lapkehoach}
                    title="Lập kế hoạch bữa ăn cho người bệnh tiểu đường"
                    link="/cam-nang/lap-ke-hoach-bua-an-cho-nguoi-benh-tieu-duong-p3570"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('telemedicine')}>
        <h4 className={cx('title')}>Bài Viết Nổi Bật</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true} loop={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    srcImage={images.thucdon}
                    title="Thực đơn 7 ngày cho người bệnh tiểu đường"
                    link="/cam-nang/thuc-don-7-ngay-cho-nguoi-benh-tieu-duong-p3572"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('future-doctor')}>
        <h4 className={cx('title')}>Tác Giả Nội Dung</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={4} spaceBetween={40} navigation={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item-doctor')}>
                  <DoctorItem srcImage={images.leHung} title="Tiến sĩ, Bác sĩ Nguyễn Lê Hùng" link="/doctor" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('Service')}>
        <div className={cx('ServiceList')}>
          <ServiceItem
            srcIcon={images.iconQuyTrinh}
            title="Quy Trình Xây Dựng Nội Dung"
            link="/thong-tin/quy-trinh-xay-dung-noi-dung-p89"
          />
          <ServiceItem
            srcIcon={images.iconQuyTrinh}
            title="Quy Trình Xây Dựng Nội Dung"
            link="/thong-tin/quy-trinh-xay-dung-noi-dung-p89"
          />
        </div>
      </div>
    </div>
  );
}

export default SongKhoe;
