import { useState, useEffect } from 'react';
import styles from './ThongTin.module.scss';
import classNames from 'classnames/bind';
import { useAuth } from '../../hooks';
import icons from '../../assets/icons';
import axios from '../../utils/httpRequest';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);
const ThongTin = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, loading, setUser } = useAuth();
  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    avatar: icons.patient,
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    cfPassword: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setInputs((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('fullname', inputs.fullname);
    formData.append('email', inputs.email);
    formData.append('phone', inputs.phone);
    formData.append('address', inputs.address);
    formData.append('gender', inputs.gender);

    if (selectedFile) {
      formData.append('avatar', selectedFile); // Nếu có ảnh mới thì gửi lên backend
    }

    axios
      .patch(`${API_BASE_URL}/api/users/update`, formData)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    if (!password.currentPassword || !password.newPassword || !password.cfPassword) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password.newPassword !== password.cfPassword) {
      alert('Mật khẩu không khớp');
      return;
    }
    axios
      .patch(`/api/users/change-password`, password)
      .then((res) => {
        alert(res.data.message);
        setPassword({
          currentPassword: '',
          newPassword: '',
          cfPassword: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!loading) {
      setInputs({
        ...inputs,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        gender: user.gender,

        address: user.address,
        avatar: `${API_BASE_URL}${user.avatar}`,
      });
    }
  }, [loading]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={cx('account-container')}>
      <div className={cx('account-sidebar')}>
        <ul>
          <li className={cx({ active: activeTab === 'profile' })} onClick={() => setActiveTab('profile')}>
            Thông Tin
          </li>
          <li className={cx({ active: activeTab === 'edit' })} onClick={() => setActiveTab('edit')}>
            Sửa Thông Tin
          </li>
          <li className={cx({ active: activeTab === 'password' })} onClick={() => setActiveTab('password')}>
            Đổi Mật Khẩu
          </li>
        </ul>
      </div>

      <div className={cx('account-content')}>
        {activeTab === 'profile' && (
          <div className={cx('tab-content')}>
            <h2>Thông Tin Tài Khoản</h2>
            <div className={cx('wrapper-avatar')}>
              <img
                className={cx('avatar')}
                src={user.avatar ? `${API_BASE_URL}${user.avatar}` : icons.patient}
                alt="avatar"
              />
            </div>
            <div className={cx('info-item')}>
              <span className={cx('label')}>Họ và tên:</span>
              <span className={cx('value')}>{user.fullname}</span>
            </div>
            <div className={cx('info-item')}>
              <span className={cx('label')}>Giới tính</span>
              <span className={cx('value')}>
                {user.gender === 'male' && <span>Nam</span>}
                {user.gender === 'female' && <span>Nữ</span>}
              </span>
            </div>
            <div className={cx('info-item')}>
              <span className={cx('label')}>Email:</span>
              <span className={cx('value')}>{user.email}</span>
            </div>
            <div className={cx('info-item')}>
              <span className={cx('label')}>Số điện thoại:</span>
              <span className={cx('value')}>{user.phone}</span>
            </div>
            <div className={cx('info-item')}>
              <span className={cx('label')}>Địa chỉ:</span>
              <span className={cx('value')}>{user.address}</span>
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className={cx('tab-content')}>
            <h2>Sửa Thông Tin</h2>
            <form onSubmit={handleSubmit}>
              <div className={cx('avatar-upload')}>
                <img src={inputs.avatar} alt="Avatar" className={cx('avatar')} />
                <input type="file" id="avatarInput" accept="image/*" onChange={handleAvatarChange} hidden />
                <label htmlFor="avatarInput" className={cx('btn-upload')}>
                  Thay đổi ảnh
                </label>
              </div>
              <div className={cx('input-group')}>
                <label>Họ và tên:</label>
                <input type="text" value={inputs.fullname} name="fullname" onChange={handleInputChange} />
              </div>
              <div className={cx('input-group')}>
                <div className={cx('radio-group')}>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={inputs.gender === 'male'}
                      onChange={handleInputChange}
                    />
                    Nam
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={inputs.gender === 'female'}
                      onChange={handleInputChange}
                    />
                    Nữ
                  </label>
                </div>
              </div>
              <div className={cx('input-group')}>
                <label>Email:</label>
                <input type="email" value={inputs.email} name="email" onChange={handleInputChange} />
              </div>
              <div className={cx('input-group')}>
                <label>Số điện thoại:</label>
                <input type="text" value={inputs.phone} name="phone" onChange={handleInputChange} />
              </div>
              <div className={cx('input-group')}>
                <label>Địa chỉ:</label>
                <input type="text" value={inputs.address} name="address" onChange={handleInputChange} />
              </div>
              <button type="submit" className={cx('btn-save')}>
                Lưu Thay Đổi
              </button>
            </form>
          </div>
        )}

        {activeTab === 'password' && (
          <div className={cx('tab-content')}>
            <h2>Đổi Mật Khẩu</h2>
            <div className={cx('avatar-upload')}>
              <img src={inputs.avatar} alt="Avatar" className={cx('avatar')} />
            </div>
            <form onSubmit={handleSubmitChangePassword}>
              <div className={cx('input-group')}>
                <label>Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className={cx('input-group')}>
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className={cx('input-group')}>
                <label>Xác nhận mật khẩu:</label>
                <input type="password" name="cfPassword" value={password.cfPassword} onChange={handlePasswordChange} />
              </div>
              <button type="submit" className={cx('btn-save')}>
                Đổi Mật Khẩu
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThongTin;
