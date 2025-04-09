import styles from './ChiTiet.module.scss';
import DoctorItem from '../../components/DoctorItem';
import classNames from 'classnames/bind';
import axios from '../../utils/httpRequest';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useRef } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);
function SDatePicker({ onChange }) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const next7Days = [];
    for (let i = 0; i < 7; i++) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i);
      next7Days.push({
        value: futureDate.toISOString().split('T')[0],
        label: futureDate.toLocaleDateString('vi-VN', {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit',
        }),
      });
    }
    setDates(next7Days);
  }, []);

  useEffect(() => {
    onChange(selectedDate);
  }, [selectedDate, onChange]);

  return (
    <div className={cx('sDatePicker')}>
      <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        {dates.map((date) => (
          <option key={date.value} value={date.value}>
            {date.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ChiTiet() {
  const { setShowLogin, user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [redirectTo, setRedirectTo] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/doctors/${slug}`)
      .then((response) => {
        setDoctor(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      });
  }, [slug]);
  useEffect(() => {
    if (user && redirectTo) {
      navigate(redirectTo);
    }
  }, [user, redirectTo, navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!doctor) {
    return <div>Không tìm thấy bác sĩ</div>;
  }
  let filteredSchedule = [];
  if (doctor.schedule.length > 0) {
    const now = new Date();
    filteredSchedule = doctor.schedule.filter((item) => {
      const scheduleDate = item.date.split('T')[0];
      if (scheduleDate !== selectedDate) return false;

      if (scheduleDate === new Date().toISOString().split('T')[0]) {
        const scheduleTime = item.timeType.split(' - ')[0];
        const [scheduleHour, scheduleMinute] = scheduleTime.split(':').map(Number);

        const scheduleTotalMinutes = scheduleHour * 60 + scheduleMinute;
        const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
        return scheduleTotalMinutes > currentTotalMinutes;
      }

      return true; // Nếu là ngày khác thì lấy hết
    });
  }

  return (
    <div className={cx('wrapper')}>
      <Helmet>
        <title>{doctor.fullname}</title>
      </Helmet>

      <div className={cx('doctor-info')}>
        <DoctorItem
          className={cx('detail')}
          specialty={doctor.specialty}
          key={doctor._id}
          srcImage={`${API_BASE_URL}${doctor.avatar}`}
          title={doctor.fullname}
          address={doctor.address}
          link={`/bac-si/${doctor.slug}`}
        />
      </div>
      <div className={cx('time-table_clinic')}>
        <div className={cx('time')}>
          <div className={cx('select-date')}>
            <SDatePicker onChange={setSelectedDate} />
          </div>
          <div className={cx('title')}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>LỊCH KHÁM</span>
          </div>
          {filteredSchedule.length > 0 ? (
            <div className={cx('time-table')}>
              {filteredSchedule.map((item, index) => (
                <Link
                  to={user ? `/bac-si/${slug}/dat-lich/${item._id}` : '#'}
                  key={item._id}
                  className={cx('time-item')}
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      setRedirectTo(`/bac-si/${slug}/dat-lich/${item._id}`);
                      setShowLogin(true);
                    }
                  }}
                >
                  <span>{item.timeType}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className={cx('empty')}>
              <p>Lịch khám trống !</p>
              <p>Vui lòng chọn ngày khác !</p>
            </div>
          )}
        </div>
        <div className={cx('clinic')}>
          <div className={cx('title')}>
            <FontAwesomeIcon icon={faHouseMedical} />
            <span>Địa Chỉ Khám</span>
          </div>
          <div className={cx('name')}>
            <span>{doctor.clinic.name}</span>
          </div>
          <div className="address">
            <span>{doctor.clinic.address}</span>
          </div>
        </div>
      </div>
      <div className={cx('description')}>
        <div dangerouslySetInnerHTML={{ __html: doctor.description }} />
      </div>
    </div>
  );
}

export default ChiTiet;
