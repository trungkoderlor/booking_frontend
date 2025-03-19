import styles from './ServiceItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import images from '../../assets/images';
const cx = classNames.bind(styles);

function ServiceItem({ srcIcon, title, link }) {
  return (
    <Link to={link} className={cx('wrapper')}>
      <div className={cx('ServiceItem')}>
        <Image className={cx('icon')} src={srcIcon} alt={title} />
        <h4 className={cx('name')}>
          <span>{title}</span>
        </h4>
      </div>
    </Link>
  );
}

export default ServiceItem;
