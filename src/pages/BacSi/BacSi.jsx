import DoctorItem from '../../components/DoctorItem';
import { Helmet } from 'react-helmet-async';
import styles from './BacSi.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function BacSi() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3003/api/doctors')
      .then((response) => {
        setDoctors(response.data);
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
      <Helmet>
        <title>Bác sĩ nổi bật</title>
      </Helmet>
      <div className={cx('title')}>
        <h2>Bác sĩ nổi bật</h2>
      </div>
      <div className={cx('doctors-list')}>
        {doctors.map((item) => (
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

export default BacSi;
