import styles from './DatLich.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import InputIcon from '../../components/InputIcon';
import { useAuth } from '../../hooks';
import axios from '../../utils/httpRequest';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);

function DatLich() {
  const [doctor, setDoctor] = useState(null);
  const [loadingPage, setLoading] = useState(true);
  const [schedule, setSchedule] = useState(null);
  const navigate = useNavigate();
  const { slug, schedule_id } = useParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    axios
      .get(`/api/doctors/${slug}/schedule/${schedule_id}`)
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
  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
    address: '',
    birthyear: '',
    gender: 'male',
    reasons: '',
  });

  useEffect(() => {
    if (!loading) {
      setInputs({
        email: user.email || '',
        fullname: user.fullname || '',
        phone: user.phone || '',
        address: user.address || '',
        birthyear: user.birthyear || '',
        gender: user.gender || 'male',
        reasons: '',
      });
    }
  }, [loading, user]);
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    if (!inputs.fullname || !inputs.phone || !inputs.birthyear) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    axios
      .post(`/api/bookings/create`, { info: inputs, doctor_slug: slug, schedule_id: schedule_id })
      .then((res) => {
        if (res.status === 200) {
          alert('Đặt lịch thành công');
          navigate('/lich-kham');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loadingPage) {
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
          <Image src={`${API_BASE_URL}${doctor.avatar}`} alt={doctor.fullname} />
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
        <InputIcon
          icon={<FontAwesomeIcon icon={faUser} />}
          placeholder="Họ tên bệnh nhân (bắt buộc)"
          name="fullname"
          value={inputs.fullname}
          onChange={handleInputChange}
        />
        {/* radio gender */}
        <div className={cx('field-wrap')}>
          <div className={cx('radio-group')}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={inputs.gender === 'male'}
                onChange={handleInputChange}
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={inputs.gender === 'female'}
                onChange={handleInputChange}
              />
              Nữ
            </label>
          </div>
        </div>
        <InputIcon
          icon={<FontAwesomeIcon icon={faPhone} />}
          name="phone"
          type="tel"
          placeholder="Số điện thoại (bắt buộc)"
          value={inputs.phone}
          onChange={handleInputChange}
        />
        <InputIcon
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          name="email"
          type="email"
          placeholder="Địa chỉ email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <InputIcon
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
          name="birthyear"
          placeholder="Năm sinh (bắt buộc)"
          value={inputs.birthyear}
          onChange={handleInputChange}
        />
        <InputIcon
          icon={<FontAwesomeIcon icon={faLocationDot} />}
          name="address"
          placeholder="Địa chỉ"
          value={inputs.address}
          onChange={handleInputChange}
        />
        <InputIcon
          icon={<FontAwesomeIcon icon={faCirclePlus} />}
          placeholder="Lý do khám"
          name="reasons"
          value={inputs.reasons}
          onChange={handleInputChange}
        />
        <span onClick={handleSubmit} className={cx('submit')}>
          Xác nhận đặt khám
        </span>
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
