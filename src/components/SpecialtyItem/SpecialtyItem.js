import styles from './SpecialtyItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../Image';

const cx = classNames.bind(styles);

function SpecialtyItem({ srcIcon, title, link }) {
  return (
    <Link to={link} className={cx('wrapper')}>
      <div className={cx('specialtyItem')}>
        <Image className={cx('icon')} src={srcIcon} alt={title} />
        <span className={cx('title')}>
          <span>{title}</span>
        </span>
      </div>
    </Link>
  );
}

export default SpecialtyItem;
