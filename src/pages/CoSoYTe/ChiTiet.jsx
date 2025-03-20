import styles from './ChiTiet.module.scss';
import DoctorItem from '../../components/DoctorItem';
import classNames from 'classnames/bind';
import axios from 'axios';
import Image from '../../components/Image';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ChiTiet() {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/clinics/${slug}`)
      .then((response) => {
        setClinic(response.data);
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
  if (!clinic) {
    return <div>Không tìm thấy bác sĩ</div>;
  }
  return (
    <div className={cx('wrapper')}>
      <Helmet>
        <title>{clinic.name}</title>
      </Helmet>
      <div className={cx('header')}>
        <div className={cx('banner')}>
          <Image src={`http://localhost:3003${clinic.avatar}`} alt={clinic.name} />
          <div className={cx('info')}>
            <h3>{clinic.name}</h3>
            <span>{clinic.address}</span>
          </div>
        </div>
      </div>
      <div className={cx('description')}>
        <div dangerouslySetInnerHTML={{ __html: clinic.description }} />
      </div>
      <div className={cx('doctors-list')}>
        <h3>Danh sách bác sĩ</h3>
        {clinic.doctors.map((item) => (
          <DoctorItem
            className={cx('list')}
            specialty={item.specialty}
            key={item._id}
            srcImage={`http://localhost:3003${item.userId.avatar}`}
            title={item.userId.fullname}
            link={`/bac-si/${item.userId.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ChiTiet;
