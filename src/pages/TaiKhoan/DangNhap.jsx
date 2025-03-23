import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DangNhap.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
const { useAuth } = require('../../hooks');
const cx = classNames.bind(styles);

function DangNhap() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordCf: '',
    firstName: '',
    lastName: '',
  });
  useEffect(() => {
    document.querySelectorAll('input').forEach((input) => {
      if (input.value.trim() !== '') {
        input.previousElementSibling?.classList.add(styles.active);
      }
    });
  }, []);
  useEffect(() => {
    setInputs({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  }, [isLogin]);
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    axios
      .post('http://localhost:3003/api/auth/login', inputs)
      .then((res) => {
        Cookies.set('token', res.data.token, { expires: 7, secure: true });
        login(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('form')}>
        <ul className={cx('tab-group')}>
          <li className={cx('tab', { active: !isLogin })} onClick={() => setIsLogin(false)}>
            <span>Đăng Kí</span>
          </li>
          <li className={cx('tab', { active: isLogin })} onClick={() => setIsLogin(true)}>
            <span>Đăng Nhập</span>
          </li>
        </ul>

        <div className={cx('tab-content')}>
          {isLogin ? (
            <div id="login">
              <h1>Đăng Nhập Để Đặt Lịch Ngay!</h1>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.email })}>
                  Địa Chỉ Email<span className={cx('req')}>*</span>
                </label>
                <input type="email" name="email" value={inputs.email} onChange={handleInputChange} required />
              </div>

              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.password })}>
                  Mật Khẩu<span className={cx('req')}>*</span>
                </label>
                <input type="password" name="password" value={inputs.password} onChange={handleInputChange} required />
              </div>

              <p className={cx('forgot')}>
                <a href="#">Quên Mật Khẩu?</a>
              </p>

              <button className={cx('button', 'button-block')} onClick={handleLogin}>
                Đăng Nhập
              </button>
            </div>
          ) : (
            <div id="signup">
              <h1>Đăng Kí Miễn Phí</h1>
              <div className={cx('top-row')}>
                <div className={cx('field-wrap')}>
                  <label className={cx({ active: inputs.firstName })}>
                    Họ<span className={cx('req')}>*</span>
                  </label>
                  <input type="text" name="firstName" value={inputs.firstName} onChange={handleInputChange} required />
                </div>

                <div className={cx('field-wrap')}>
                  <label className={cx({ active: inputs.lastName })}>
                    Tên<span className={cx('req')}>*</span>
                  </label>
                  <input type="text" name="lastName" value={inputs.lastName} onChange={handleInputChange} required />
                </div>
              </div>

              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.email })}>
                  Địa Chỉ Email<span className={cx('req')}>*</span>
                </label>
                <input type="email" name="email" value={inputs.email} onChange={handleInputChange} required />
              </div>
              {/* <div className={cx('top-row')}> */}
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.password })}>
                  Đặt Mật Khẩu<span className={cx('req')}>*</span>
                </label>
                <input type="password" name="password" value={inputs.password} onChange={handleInputChange} required />
              </div>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.password })}>
                  Xác Nhận Mật Khẩu<span className={cx('req')}>*</span>
                </label>
                <input
                  type="password"
                  name="passwordCf"
                  value={inputs.passwordCf}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* </div> */}

              <button type="submit" className={cx('button', 'button-block')}>
                Xác Nhận
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DangNhap;
