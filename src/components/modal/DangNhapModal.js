import { useAuth } from '../../hooks';
import { DangNhap } from '../../pages/TaiKhoan';
import styles from './DangNhapModal.module.scss';
import { motion } from 'framer-motion';
function DangNhapModal() {
  const { showLogin, setShowLogin } = useAuth();

  if (!showLogin) return null;

  return (
    <div className={styles.overlay} onClick={() => setShowLogin(false)}>
      <motion.div
        className={styles.modal}
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <DangNhap />
      </motion.div>
    </div>
  );
}

export default DangNhapModal;
