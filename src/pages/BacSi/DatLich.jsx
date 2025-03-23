import styles from './DatLich.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import InputIcon from '../../components/InputIcon';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faHouseMedical,
  faUser,
  faPhone,
  faEnvelope,
  faLocationDot,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function DatLich() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState(null);
  const { slug, schedule_id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/doctors/${slug}/schedule/${schedule_id}`)
      .then((response) => {
        setSchedule(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      });
  }, [schedule_id, slug]);
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

  return (
    <div className={cx('wrapper')}>
      <Helmet>
        <title>{`Đặt lịch khám với ${doctor.fullname}`}</title>
      </Helmet>
      <div className={cx('doctor_info')}>
        <div className={cx('content')}>
          <Image src={`http://localhost:3003${doctor.avatar}`} alt={doctor.fullname} />
          <div className={cx('info')}>
            <h5>ĐẶT LỊCH KHÁM</h5>
            <h5 className={cx('name')}>{doctor.fullname}</h5>
            <span className={cx('schedule')}>
              <FontAwesomeIcon icon={faCalendarDays} />
              {schedule.timeValue} -{' '}
              {new Date(schedule.date).toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
            <div className={cx('clinic')}>
              <h5>
                <FontAwesomeIcon icon={faHouseMedical} />
                {doctor.clinic.name}
              </h5>
              <span>{doctor.clinic.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('patient_form')}>
        <InputIcon icon={<FontAwesomeIcon icon={faUser} />} placeholder="Họ tên bệnh nhân (bắt buộc)" />
        <InputIcon icon={<FontAwesomeIcon icon={faPhone} />} type="tel" placeholder="Số điện thoại (bắt buộc)" />
        <InputIcon icon={<FontAwesomeIcon icon={faEnvelope} />} type="email" placeholder="Địa chỉ email" />
        <InputIcon icon={<FontAwesomeIcon icon={faCalendarDays} />} placeholder="Năm sinh (bắt buộc)" />
        <InputIcon icon={<FontAwesomeIcon icon={faLocationDot} />} placeholder="Địa chỉ" />
        <InputIcon icon={<FontAwesomeIcon icon={faCirclePlus} />} placeholder="Lý do khám" />
        <Link to="#" className={cx('submit')}>
          Xác nhận đặt khám
        </Link>
      </div>
      <div className={cx('footer')}>
        <span>© 2025 MediBook.</span>
        <span>
          <FontAwesomeIcon icon={faPhone} /> 0768-517-629
        </span>
      </div>
    </div>
  );
}

export default DatLich;
