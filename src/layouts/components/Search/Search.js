import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Search({ placeholder, className }) {
  return (
    <div className={cx('search', className)}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input type="text" placeholder="Search..." />
    </div>
  );
}

export default Search;
