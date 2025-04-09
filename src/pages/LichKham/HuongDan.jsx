import styles from './HuongDan.module.scss';
import classNames from 'classnames/bind';
import axios from '../../utils/httpRequest';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);
function HuongDan() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/api/bookings/${id}`)
      .then((response) => {
        setBooking(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!booking) {
    return <div>Không tìm thấy lịch khám</div>;
  }
  return (
    <div className={cx('wrapper')}>
      <Helmet>
        <title>Hướng dẫn đi khám</title>
      </Helmet>
      <div className={cx('content')}>
        <h3>Hướng dẫn đi khám </h3>
        <ul>
          <li>{booking.doctorId.userId.fullname}</li>
          <li>
            Thời gian: {booking.scheduleId.time} Ngày{' '}
            {new Date(booking.scheduleId.date).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </li>
          <li>{booking.doctorId.clinics.name}</li>
          <li>{booking.doctorId.clinics.address}</li>
        </ul>
        <h4>Quy trình làm thủ tục</h4>
        <div dangerouslySetInnerHTML={{ __html: booking.doctorId.clinics.howtogo }} />
      </div>
    </div>
  );
}

export default HuongDan;
