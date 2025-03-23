import { Helmet } from 'react-helmet-async';
import styles from './LichKham.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import icons from '../../assets/icons';
import Image from '../../components/Image';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function LichKham() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  useEffect(() => {
    axios
      .get('http://localhost:3003/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBookings(response.data);
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
  if (bookings.length === 0) {
    return <div>Không có lịch khám nào</div>;
  }
  return (
    <div className={cx('wrapper')}>
      <Helmet>
        <title>Lịch Khám</title>
      </Helmet>
      <h3>Lịch khám đã đặt </h3>
      <div className={cx('booking-list')}>
        {bookings.map((booking) => (
          <Link to={`/lich-kham/huong-dan/${booking._id}`} className={cx('booking-item')}>
            <div className={cx('time-info')}>
              <div className={cx('icon')}>
                <Image src={icons.doctor} alt="icon" />
              </div>
              <span>Khám</span>
              <div className={cx('time')}>
                <FontAwesomeIcon icon={faClock} />
                {booking.scheduleId.time}
              </div>
              <div className={cx('date')}>
                <FontAwesomeIcon icon={faCalendarDays} />
                {new Date(booking.scheduleId.date).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </div>
            </div>
            <div className={cx('booking-info')}>
              <div className={cx('patient')}>
                <span>Bệnh nhân : </span>
                <span>{booking.info.fullname}</span>
              </div>
              <div className={cx('doctor')}>
                <span>Bác sĩ : </span>
                <span className={cx('doctor-name')}>{booking.doctorId.userId.fullname}</span>
              </div>
              <div className={cx('clinic')}>
                <span>Phòng khám : </span>
                <span>{booking.doctorId.clinics.name}</span>
              </div>
              {booking.reasons && (
                <div className={cx('reasons')}>
                  <span>Lý do Kkhám : </span>
                  <span>{booking.reasons}</span>
                </div>
              )}
              <div className={cx('status')}>
                <span>Đang chờ xác nhận</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LichKham;
