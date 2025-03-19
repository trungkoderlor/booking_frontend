import styles from './RectangleItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';

const cx = classNames.bind(styles);

function RectangleItem({ srcImage, title, link }) {
  return (
    <Link to={link} className={cx('wrapper')}>
      <div className={cx('RectangleItem')}>
        <Image className={cx('image')} src={srcImage} alt={title} />
        <h4 className={cx('name')}>
          <span>{title}</span>
        </h4>
      </div>
    </Link>
  );
}

export default RectangleItem;
