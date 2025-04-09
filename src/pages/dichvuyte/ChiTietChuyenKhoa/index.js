import styles from './ChiTietChuyenKhoa.module.scss';
import DoctorItem from '../../../components/DoctorItem';
import classNames from 'classnames/bind';
import axios from '../../../utils/httpRequest';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);
function ChiTietChuyenKhoa() {
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`/api/specialties/${slug}`)
      .then((response) => {
        setSpecialty(response.data);
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
  if (!specialty) {
    return <div>Không tìm thấy chuyên khoa</div>;
  }
  return (
    <div className={cx('wrapper')}>
      <Helmet>
        <title>{specialty.name}</title>
      </Helmet>

      <div className={cx('specialty-info')} style={{ backgroundImage: `url(${API_BASE_URL}${specialty.avatar})` }}>
        <div className={cx('title')}>
          <h3>{specialty.name}</h3>
        </div>
        <div className={cx('description')}>
          <div dangerouslySetInnerHTML={{ __html: specialty.description }} />
        </div>
      </div>
      <div className={cx('doctors-list')}>
        <h3>Danh sách bác sĩ</h3>
        {specialty.doctors.map((item) => (
          <DoctorItem
            className={cx('list')}
            key={item._id}
            clinic={item.clinic}
            srcImage={`${API_BASE_URL}${item.userId.avatar}`}
            title={item.userId.fullname}
            link={`/bac-si/${item.userId.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ChiTietChuyenKhoa;
