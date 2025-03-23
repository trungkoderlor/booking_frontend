import styles from './InfoItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
const cx = classNames.bind(styles);

function InfoItem({ srcIcon, title }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('InfoItem')}>
        <Image className={cx('icon')} src={srcIcon} alt={title} />
        <span className={cx('title')}>
          <span>{title}</span>
        </span>
      </div>
    </div>
  );
}

export default InfoItem;
