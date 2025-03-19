import ServiceItem from '../../components/ServiceItem';
import RectangleItem from '../../components/RectangleItem';
import DoctorItem from '../../components/DoctorItem';
import images from '../../assets/images';
import Image from '../../components/Image';

import styles from './HomeStyles.module.scss';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [specialties, setSpecialties] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('http://localhost:3003/api/specialties')
      .then((response) => setSpecialties(response.data))
      .catch((error) => console.error('Lỗi khi gọi API:', error));
  }, []);
  useEffect(() => {
    axios
      .get('http://localhost:3003/api/doctors')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error('Lỗi khi gọi API:', error));
  }, []);
  useEffect(() => {
    axios
      .get('http://localhost:3003/api/clinics')
      .then((response) => {
        setClinics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('poster-wrapper')}>
        <Image className={classNames(cx('poster'), 'mt-2')} src={images.posterHome} alt="poster" />
      </div>
      <div className={cx('Service')}>
        <h4 className={cx('title')}>Dịch Vụ Toàn Diện</h4>
        <div className={cx('ServiceList')}>
          <ServiceItem srcIcon={images.phongKham} title="Khám Chuyên Khoa" link="/dich-vu-y-te/kham-chuyen-khoa" />
          <ServiceItem srcIcon={images.cosoyte} title="Cơ Sở Y Tế" link="/dich-vu-y-te/co-so-y-te" />
          <ServiceItem srcIcon={images.baiTest} title="Bài Test Sức Khỏe" link="/dich-vu-y-te/bai-test-suc-khoe" />
          <ServiceItem srcIcon={images.khamTuXa} title="Khám Từ Xa" link="/dich-vu-y-te/kham-tu-xa" />
        </div>
      </div>
      <div className={classNames(cx('Specialty', 'category'))}>
        <h4 className={cx('title', 'title-more')}>
          <span>Chuyên Khoa</span>
          <Link className={cx('btn-more')} to="/more">
            Xem Thêm
          </Link>
        </h4>
        <div className={cx('swiper-container')}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={40}
            navigation={specialties.length > 3}
            loop={true}
          >
            {specialties.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    key={item._id}
                    srcImage={`http://localhost:3003${item.avatar}`}
                    title={item.name}
                    link={`/dich-vu-y-te/kham-chuyen-khoa/${item.slug}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={classNames(cx('facilities', 'category'))}>
        <h4 className={cx('title')}>Cơ Sở Y Tế</h4>
        <div className={cx('swiper-container')}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            navigation={clinics.length > 3}
            spaceBetween={40}
            loop={true}
          >
            {clinics.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    key={item._id}
                    srcImage={`http://localhost:3003${item.avatar}`}
                    title={item.name}
                    link={`/dich-vu-y-te/kham-chuyen-khoa/${item.slug}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={classNames(cx('future-doctor', 'category'))}>
        <h4 className={cx('title')}>Bác Sĩ Nổi Bật</h4>
        <div className={cx('swiper-container')}>
          <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={40} navigation={doctors.length > 3}>
            {doctors.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={cx('slide-item')}>
                  <RectangleItem
                    className={cx('home')}
                    key={item._id}
                    srcImage={`http://localhost:3003${item.userId.avatar}`}
                    title={item.userId.fullname}
                    link={`/dich-vu-y-te/kham-chuyen-khoa/${item.userId.slug}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={classNames(cx('telemedice', 'category'))}>
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
      <div className={classNames(cx('mentalHealth', 'category'))}>
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
      <div className={classNames(cx('qa-doctor', 'category'))}>
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
      <div className={classNames(cx('posts', 'category'))}>
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
      <div className={classNames(cx('posts', 'category'))}>
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
