import styles from './DoctorItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import images from '../../assets/images';
const cx = classNames.bind(styles);

function DoctorItem({ srcImage, title, link, specialty, className }) {
  console.log('DoctorItem className:', className);
  return (
    <Link to={link} className={cx('wrapper', className)}>
      <Image className={cx('avatar')} src={srcImage} alt={title} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{title}</span>
        </h4>
        <span className={cx('spectily')}>{specialty}</span>
      </div>
    </Link>
  );
}

export default DoctorItem;
