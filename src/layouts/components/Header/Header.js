import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '../../../assets/images';
import { useAuth } from '../../../hooks';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header({ className }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const { token, setShowLogin, logout, user, loading } = useAuth();

  return (
    <>
      {/* Hiển thị loading toàn cục */}
      {loading && (
        <div className={cx('loading-overlay')}>
          <div className={cx('loading-spinner')}></div>
        </div>
      )}
      <header className={cx('wrapper', className)}>
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
            {token ? (
              !loading && (
                <div
                  className={cx('user-menu')}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <a>
                    <FontAwesomeIcon icon={faUser} />
                    <span>{user.fullname}</span>
                  </a>

                  {showDropdown && (
                    <div className={cx('dropdown-menu')}>
                      <Link to={`/thong-tin/${user.slug}`}>Trang cá nhân</Link>
                      <Link to="/lich-kham">Lịch khám</Link>
                      <span onClick={logout}>Đăng xuất</span>
                    </div>
                  )}
                </div>
              )
            ) : (
              <a onClick={() => setShowLogin(true)}>
                <FontAwesomeIcon icon={faUser} />
                <span>Đăng Nhập</span>
              </a>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
