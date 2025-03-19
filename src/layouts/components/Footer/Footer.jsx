import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import icons from '../../../assets/icons';
import styles from './Footer.module.scss';
import { InfoItem } from '../../../components/ServiceItem';
const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={classNames(cx('wrapper'), 'mt-4')}>
      <div className={classNames(cx('footer-top'), 'container')}>
        <div className={classNames('row')}>
          <div className={classNames(cx('info'), 'col-5')}>
            <h5>Công ty Cổ phần Công nghệ MediBook</h5>
            <InfoItem
              srcIcon={icons.location}
              title="Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam"
            />
            <InfoItem srcIcon={icons.location} title="Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
            <InfoItem srcIcon={icons.location} title="Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
            <InfoItem srcIcon={icons.location} title="Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
            <InfoItem srcIcon={icons.location} title="Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
            <InfoItem srcIcon={icons.location} title="Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
            <InfoItem srcIcon={icons.location} title="Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
            <InfoItem srcIcon={icons.location} title="Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" />
          </div>
          <div className={classNames(cx('service'), 'col-3')}>
            <Link to="/">
              <Image src={images.logo} alt="MediBook" className={cx('logo')} />
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Liên hệ hợp tác</span>
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Chuyển đổi sốc</span>
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Chính sách bảo mật</span>
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Quy chế hoạt động</span>
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Tuyển dụng</span>
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Điều khoản sử dụng</span>
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Câu hỏi thường gặp</span>
            </Link>
            <Link to="/hop-tac">
              <span className={cx('title')}>Sức khỏe doanh nghiệp</span>
            </Link>
          </div>
          <div className={classNames(cx('partners'), 'col-4')}>
            <h5>Đối tác bảo trợ nội dung</h5>
            <div className={cx('partner')}>
              <Image className={cx('img-partner')} src={images.helloDoctor} alt="Hello Doctor" />
              <div className={cx('content')}>
                <div className={cx('title-partner')}>
                  <span>Hello Doctor</span>
                </div>
                <div className={cx('description')}>
                  <span>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</span>
                </div>
              </div>
            </div>
            <div className={cx('partner')}>
              <Image className={cx('img-partner')} src={images.helloDoctor} alt="Hello Doctor" />
              <div className={cx('content')}>
                <div className={cx('title-partner')}>
                  <span>Hello Doctor</span>
                </div>
                <div className={cx('description')}>
                  <span>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</span>
                </div>
              </div>
            </div>
            <div className={cx('partner')}>
              <Image className={cx('img-partner')} src={images.helloDoctor} alt="Hello Doctor" />
              <div className={cx('content')}>
                <div className={cx('title-partner')}>
                  <span>Hello Doctor</span>
                </div>
                <div className={cx('description')}>
                  <span>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(cx('footer-bottom'))}>
        <div className={cx('coppy-right')}>© 2025 MediBook.</div>
        <div className={cx('social')}>
          <Link to="/">
            <Image src={icons.facebook} alt="Facebook" />
          </Link>
          <Link to="/">
            <Image className={cx('youtube')} src={icons.youtube} alt="Youtube" />
          </Link>
          <Link to="/">
            <Image src={icons.tiktok} alt="Tiktok" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
