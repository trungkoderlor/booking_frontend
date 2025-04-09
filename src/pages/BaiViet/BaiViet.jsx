import RectangleItem from '../../components/RectangleItem';
import DoctorItem from '../../components/DoctorItem';
import ServiceItem from '../../components/ServiceItem';

import styles from './BaiViet.module.scss';
import Image from '../../components/Image';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';
import axios from '../../utils/httpRequest';
import { useAuth } from '../../hooks';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
];
const cx = classNames.bind(styles);
function BaiViet() {
  const [posts, setPosts] = useState([]);
  const { loading, setLoading } = useAuth();
  useEffect(() => {
    axios
      .get(`/api/posts`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      });
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('poster-wrapper')}>
        <Image className={cx('poster')} src={images.posterSongKhoe} alt="poster" />
      </div>
      <div className={cx('telemedicine')}>
        <h4 className={cx('title')}>Bài Viết Mới Nhất</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={posts.length > 3} loop={true}>
            {posts.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    srcImage={`${API_BASE_URL}${item.poster}`}
                    title={item.title}
                    link={`/bai-viet/${item.slug}`}
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
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={posts.length > 3} loop={true}>
            {posts.map((item) => (
              <SwiperSlide key={item.id}>
                {item.featured && (
                  <div className={cx('slide-item')}>
                    <RectangleItem
                      srcImage={`${API_BASE_URL}${item.poster}`}
                      title={item.title}
                      link={`/bai-viet/${item.slug}`}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={cx('future-doctor')}>
        <h4 className={cx('title')}>Tác Giả Nội Dung</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={true}>
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item-doctor')}>
                  <DoctorItem
                    className={cx('home')}
                    srcImage={images.leHung}
                    title="Tiến sĩ, Bác sĩ Nguyễn Lê Hùng"
                    link="/doctor"
                  />
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
          <ServiceItem srcIcon={images.iconHopTac} title="Bác Sĩ Hợp Tác Viết Bài" link="/hop-tac" />
        </div>
      </div>
    </div>
  );
}

export default BaiViet;
