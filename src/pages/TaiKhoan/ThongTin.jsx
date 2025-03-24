import { useState, useEffect } from 'react';
import styles from './ThongTin.module.scss';
import classNames from 'classnames/bind';
import { useAuth } from '../../hooks';
import icons from '../../assets/icons';
import axios from 'axios';
const cx = classNames.bind(styles);
const ThongTin = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, loading, token, setUser } = useAuth();
  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    avatar: icons.patient,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Hiển thị ảnh ngay lập tức trên giao diện
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

    if (selectedFile) {
      formData.append('avatar', selectedFile); // Nếu có ảnh mới thì gửi lên backend
    }

    axios
      .patch('http://localhost:3003/api/users/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.avatar) {
      setInputs({ ...inputs, avatar: `http://localhost:3003${user.avatar}` });
    }
    setInputs({ ...inputs, fullname: user.fullname, email: user.email, phone: user.phone, address: user.address });
  }, [user]);
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
            <div className={cx('avatar')}>
              <img src={user.avatar ? `http://localhost:3003${user.avatar}` : icons.patient} alt="avatar" />
            </div>
            <div className={cx('info-item')}>
              <span className={cx('label')}>Họ và tên:</span>
              <span className={cx('value')}>{user.fullname}</span>
            </div>
            <div className={cx('info-item')}>
              <span className={cx('label')}>Giới tính</span>
              <span className={cx('value')}>{user.gender === 'male' ? 'Nam' : 'Nữ'}</span>
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
            <form>
              <div className={cx('input-group')}>
                <label>Mật khẩu hiện tại:</label>
                <input type="password" />
              </div>
              <div className={cx('input-group')}>
                <label>Mật khẩu mới:</label>
                <input type="password" />
              </div>
              <div className={cx('input-group')}>
                <label>Xác nhận mật khẩu:</label>
                <input type="password" />
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
