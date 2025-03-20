import classNames from 'classnames/bind';
import Search from '../Search';
import styles from './Header.module.scss';
import Image from '../../../assets/images';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('logo')}>
          <FontAwesomeIcon icon={faBars} className={cx('icon-bars')} />
          <Link to="/">
            <img src={Image.logo} alt="logo" width="200px" />
          </Link>
        </h1>
        <nav className={cx('nav')}>
          <ul>
            <li>
              <Link to="/dich-vu-y-te/kham-chuyen-khoa">
                <h4>Chuyên khoa</h4>
                <span>Tìm bác sĩ theo chuyên khoa</span>
              </Link>
            </li>
            <li>
              <Link to="/co-so-y-te">
                <h4>Cơ sở y tế</h4>
                <span>Chọn bệnh viện phòng khám</span>
              </Link>
            </li>
            <li>
              <Link to="/bac-si">
                <h4>Bác sĩ</h4>
                <span>Chọn bác sĩ giỏi</span>
              </Link>
            </li>
            <li>
              <Link to="/bai-viet">
                <h4>Cẩm nang</h4>
                <span>Hiểu để sống khỏe</span>
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/search" className={cx('search_virtual')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span className={cx('place-holder')}>Tìm kiếm ...</span>
        </Link>
        <div className={cx('right-menu')}>
          <Link to="/contact" className={cx('contact')}>
            <FontAwesomeIcon icon={faUser} />
            <span>Tài khoản</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
