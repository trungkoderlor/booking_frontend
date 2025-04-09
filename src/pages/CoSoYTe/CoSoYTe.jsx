import SpecialtyItem from '../../components/SpecialtyItem';
import { Helmet } from 'react-helmet-async';
import styles from './CoSoYTe.module.scss';
import classNames from 'classnames/bind';
import axios from '../../utils/httpRequest';
import { useEffect, useState } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);
function CoSoYTe() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/api/clinics`)
      .then((response) => {
        setClinics(response.data);
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
        <title>Các cơ sở y tế uy tín</title>
      </Helmet>
      <div className={cx('title')}>
        <h2>Các cơ sở y tế uy tín</h2>
      </div>
      <div className={cx('clinics-list')}>
        {clinics.map((item) => (
          <SpecialtyItem
            key={item._id}
            srcIcon={`${API_BASE_URL}${item.avatar}`}
            title={item.name}
            link={`/co-so-y-te/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CoSoYTe;
