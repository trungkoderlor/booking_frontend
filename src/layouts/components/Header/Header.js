import classNames from 'classnames/bind';
import Search from '../Search';
import styles from './Header.module.scss';
import Image from '../../../assets/images';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('logo')}>
          <FontAwesomeIcon icon={faBars} className={cx('icon-bars')} />
          <img src={Image.logo} alt="logo" width="200px" />
        </h1>
        <nav className={cx('nav')}>
          <ul>
            <li className={cx('active')}>
              <Link to="/">Tất Cả</Link>
            </li>
            <li>
              <Link to="/dich-vu/tai-nha">Tại Nhà</Link>
            </li>
            <li>
              <Link to="/dich-vu/tai-vien">Tại Viện</Link>
            </li>
            <li>
              <Link to="/dich-vu/song-khoe">Sống Khỏe</Link>
            </li>
          </ul>
        </nav>
        <Link to="/search" className={cx('search_virtual')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span className={cx('place-holder')}>Tìm kiếm ...</span>
        </Link>
        <div className={cx('right-menu')}>
          <Link to="/contact" className={cx('contact')}>
            <FontAwesomeIcon icon={faHandshake} />
            <span>Hợp tác</span>
          </Link>
          <Link to="/lich-hen" className={cx('Schedule')}>
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <span>Lịch hẹn</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
