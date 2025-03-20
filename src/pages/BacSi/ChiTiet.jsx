import styles from './ChiTiet.module.scss';
import DoctorItem from '../../components/DoctorItem';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function SDatePicker({ onChange }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // Lấy danh sách 7 ngày tiếp theo
    const today = new Date();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + i);
      next7Days.push({
        value: futureDate.toISOString().split('T')[0], // Format YYYY-MM-DD
        label: futureDate.toLocaleDateString('vi-VN', {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit',
        }),
      });
    }

    setDates(next7Days);
  }, []);

  return (
    <div className={cx('sDatePicker')}>
      <select onChange={(e) => onChange(e.target.value)}>
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
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/doctors/${slug}`)
      .then((response) => {
        setDoctor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      });
  }, [slug]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!doctor) {
    return <div>Không tìm thấy bác sĩ</div>;
  }
  //lấy ngày hôm nay
  let today = new Date();

  console.log(today);
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
          srcImage={`http://localhost:3003${doctor.avatar}`}
          title={doctor.fullname}
          address={doctor.address}
          link={`/bac-si/${doctor.slug}`}
        />
      </div>
      <div className={cx('time-table_clinic')}>
        <div className={cx('time')}>
          <div className={cx('select-date')}>
            <SDatePicker />
          </div>
          <div className={cx('title')}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>LỊCH KHÁM</span>
          </div>
          <div className={cx('time-table')}>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
            <div className={cx('time-item')}>
              <span>07:00 - 08:00</span>
            </div>
          </div>
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
