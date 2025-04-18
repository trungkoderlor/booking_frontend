import SpecialtyItem from '../../../components/SpecialtyItem';
import styles from './KhamChuyenKhoa.module.scss';
import classNames from 'classnames/bind';
import axios from '../../../utils/httpRequest';
import { useEffect, useState } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);
function KhamChuyenKhoa() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/specialties`)
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
            srcIcon={`${API_BASE_URL}${item.avatar}`} // Thêm đường dẫn backend
            title={item.name}
            link={`/dich-vu-y-te/kham-chuyen-khoa/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export default KhamChuyenKhoa;
