import classNames from 'classnames/bind';

import styles from './InputIcon.module.scss';
const cx = classNames.bind(styles);

function InputIcon({ icon, ...props }) {
  return (
    <div className={cx('wrapper')}>
      <span>{icon}</span>
      <input {...props} />
    </div>
  );
}

export default InputIcon;
