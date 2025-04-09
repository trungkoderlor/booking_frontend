import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DangNhap.module.scss';
import axios from '../../utils/httpRequest';
import Cookies from 'js-cookie';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const { useAuth } = require('../../hooks');
const cx = classNames.bind(styles);

function DangNhap() {
  const [tab, setTab] = useState('login');
  const { login, setUser } = useAuth();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordCf: '',
    firstName: '',
    lastName: '',
    otp: '',
  });
  useEffect(() => {
    document.querySelectorAll('input').forEach((input) => {
      if (input.value.trim() !== '') {
        input.previousElementSibling?.classList.add(styles.active);
      }
    });
  }, []);
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    if (inputs.email === '') {
      alert('Vui lòng nhập email !');
    } else if (inputs.password === '') {
      alert('Vui lòng nhập mật khẩu !');
    } else {
      axios
        .post(`/api/auth/login`, inputs)
        .then((res) => {
          login();
          setUser(res.data.user);
        })
        .catch((err) => {
          if (err.status === 401) {
            alert(err.response.data.message);
          }
          console.log(err);
        });
    }
  };
  const handleRegister = () => {
    if (inputs.email === '') {
      alert('Vui lòng nhập email !');
    } else if (inputs.password === '') {
      alert('Vui lòng nhập mật khẩu !');
    } else if (inputs.password !== inputs.passwordCf) {
      alert('xác nhận mật khẩu không khớp');
      return;
    } else {
      axios
        .post(`/api/auth/register`, inputs)
        .then((res) => {
          setTab('otp');
        })
        .catch((err) => {
          if (err.status === 402) {
            alert('Email đã tồn tại');
            return;
          } else {
            console.log(err);
          }
        });
    }
  };
  const handleOtp = () => {
    if (inputs.otp === '') {
      alert('Vui lòng nhập mã otp !');
    } else {
      axios
        .post(`/api/auth/register/otp`, inputs)
        .then((res) => {
          login();
        })
        .catch((err) => {
          if (err.status === 401) {
            alert(err.response.data.message);
          } else {
            console.log(err);
          }
        });
    }
  };
  const handleForgotPassword = () => {
    if (inputs.email === '') {
      alert('Vui lòng nhập email !');
    } else {
      axios
        .post(`/api/auth/forgot-password`, inputs)
        .then((res) => {
          setTab('otp-forgot');
        })
        .catch((err) => {
          if (err.status === 401) {
            alert(err.response.data.message);
          } else {
            console.log(err);
          }
        });
    }
  };
  const handleResendOTP = () => {
    axios
      .post(`/api/auth/forgot-password`, inputs)
      .then((res) => {
        alert('Đã gửi lại mã otp');
      })
      .catch((err) => {
        if (err.status === 401) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  };
  const handleOtpForgot = () => {
    if (inputs.otp === '') {
      alert('Vui lòng nhập mã otp !');
    } else {
      axios
        .post(`/api/auth/forgot-password/otp`, inputs)
        .then((res) => {
          setTab('new-password');
        })
        .catch((err) => {
          if (err.status === 401) {
            alert(err.response.data.message);
          } else {
            console.log(err);
          }
        });
    }
  };

  const handleNewPassword = () => {
    if (inputs.password === '') {
      alert('Vui lòng nhập mật khẩu !');
    }
    if (inputs.password !== inputs.passwordCf) {
      alert('xác nhận mật khẩu không khớp');
      return;
    } else {
      axios
        .patch(`${API_BASE_URL}/api/auth/forgot-password/reset`, inputs)
        .then((res) => {
          login();
        })
        .catch((err) => {
          if (err.status === 401) {
            alert(err.response.data.message);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('form')}>
        <ul className={cx('tab-group')}>
          <li className={cx('tab', { active: tab === 'signup' })} onClick={() => setTab('signup')}>
            <span>Đăng Kí</span>
          </li>
          <li className={cx('tab', { active: tab === 'login' })} onClick={() => setTab('login')}>
            <span>Đăng Nhập</span>
          </li>
        </ul>

        <div className={cx('tab-content')}>
          {tab === 'login' && (
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
                <span onClick={() => setTab('forgot-password')}>Quên Mật Khẩu?</span>
              </p>

              <button className={cx('button', 'button-block')} onClick={handleLogin}>
                Đăng Nhập
              </button>
            </div>
          )}
          {tab === 'signup' && (
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

              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.password })}>
                  Đặt Mật Khẩu Mới<span className={cx('req')}>*</span>
                </label>
                <input type="password" name="password" value={inputs.password} onChange={handleInputChange} required />
              </div>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.passwordCf })}>
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

              <button type="submit" onClick={handleRegister} className={cx('button', 'button-block')}>
                Xác Nhận
              </button>
            </div>
          )}
          {tab === 'otp' && (
            <div id="otp">
              <h1>Nhập Mã OTP</h1>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.otp })}>
                  Mã OTP<span className={cx('req')}>*</span>
                </label>
                <input type="text" name="otp" value={inputs.otp} onChange={handleInputChange} required />
              </div>
              <button type="submit" onClick={handleOtp} className={cx('button', 'button-block')}>
                Xác Nhận
              </button>
            </div>
          )}
          {tab === 'forgot-password' && (
            <div id="forgot-password">
              <h1>Nhập Email Để Nhận Mã OTP</h1>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.email })}>
                  Địa Chỉ Email<span className={cx('req')}>*</span>
                </label>
                <input type="email" name="email" value={inputs.email} onChange={handleInputChange} required />
              </div>
              <button type="submit" onClick={handleForgotPassword} className={cx('button', 'button-block')}>
                Gửi
              </button>
            </div>
          )}
          {tab === 'otp-forgot' && (
            <div id="otp">
              <h1>Nhập Mã OTP</h1>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.email })}>
                  Địa Chỉ Email<span className={cx('req')}>*</span>
                </label>
                <input type="email" name="email" className={cx('input-disabled')} value={inputs.email} readonly />
              </div>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.otp })}>
                  Mã OTP<span className={cx('req')}>*</span>
                </label>
                <input type="text" name="otp" value={inputs.otp} onChange={handleInputChange} required />
              </div>
              <p className={cx('resend', 'forgot')}>
                <span onClick={handleResendOTP}>Gửi Lại Mã OTP</span>
              </p>
              <button type="submit" onClick={handleOtpForgot} className={cx('button', 'button-block')}>
                Xác Nhận
              </button>
            </div>
          )}
          {tab === 'new-password' && (
            <div id="new-password">
              <h1>Nhập Mật Khẩu Mới</h1>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.email })}>
                  Địa Chỉ Email<span className={cx('req')}>*</span>
                </label>
                <input type="email" name="email" className={cx('input-disabled')} value={inputs.email} readonly />
              </div>

              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.password })}>
                  Đặt Mật Khẩu<span className={cx('req')}>*</span>
                </label>
                <input type="password" name="password" value={inputs.password} onChange={handleInputChange} required />
              </div>
              <div className={cx('field-wrap')}>
                <label className={cx({ active: inputs.passwordCf })}>
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
              <button type="submit" onClick={handleNewPassword} className={cx('button', 'button-block')}>
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
