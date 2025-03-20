import styles from './DoctorItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import images from '../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function DoctorItem({ srcImage, title, link, specialty, clinic, address, className }) {
  return (
    <Link to={link} className={cx('wrapper', className)}>
      <Image className={cx('avatar')} src={srcImage} alt={title} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{title}</span>
        </h4>
        <span className={cx('specialty')}>{specialty ? specialty.map((s) => s.name).join(', ') : ''}</span>
        <span className={cx('clinic')}>{clinic ? clinic.name : ''}</span>

        <span className={cx('address')}>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{address ? address : 'Chưa xác định'}</span>
        </span>
      </div>
    </Link>
  );
}

export default DoctorItem;
