import SpecialtyItem from '../../../components/SpecialtyItem';
import styles from './KhamChuyenKhoa.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function KhamChuyenKhoa() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3003/api/specialties')
      .then((response) => setSpecialties(response.data))
      .catch((error) => console.error('Lỗi khi gọi API:', error));
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h2>Khám chuyên khoa</h2>
      </div>
      <div className={cx('specialty-list')}>
        {specialties.map((item) => (
          <SpecialtyItem
            key={item._id}
            srcIcon={`http://localhost:3003${item.avatar}`} // Thêm đường dẫn backend
            title={item.name}
            link={`/dich-vu-y-te/kham-chuyen-khoa/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export default KhamChuyenKhoa;
