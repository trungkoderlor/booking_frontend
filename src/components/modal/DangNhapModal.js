import { useAuth } from '../../hooks';
import { DangNhap } from '../../pages/TaiKhoan';
import styles from './DangNhapModal.module.scss';

function DangNhapModal() {
  const { showLogin, setShowLogin } = useAuth();

  if (!showLogin) return null;

  return (
    <div className={styles.overlay} onClick={() => setShowLogin(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <DangNhap />
      </div>
    </div>
  );
}

export default DangNhapModal;
