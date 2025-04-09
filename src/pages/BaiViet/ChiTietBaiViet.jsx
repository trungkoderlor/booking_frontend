import styles from './ChiTietBaiViet.module.scss';

import classNames from 'classnames/bind';
import axios from '../../utils/httpRequest';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const cx = classNames.bind(styles);
function ChiTietBaiViet() {
  const [post, setPost] = useState(null);
  const { loading, setLoading } = useAuth();
  const [note, setNote] = useState(false);
  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`/api/posts/${slug}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      });
  }, [slug]);
  const handleNote = () => {
    setNote(!note);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!post) {
    return <div>Không tìm thấy bài viết</div>;
  }
  return (
    <div className={cx('wrapper')}>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <div className={cx('post-header')}>
        <h1>{post.title}</h1>
      </div>
      <div className={cx('post-info')}>
        <div className={cx('body')}>
          <div className={cx('thumbnail')}>
            <img src={`${API_BASE_URL}${post.poster}`} alt={post.title} />
          </div>
          <div className={cx('title')}>
            <h3>{post.title}</h3>
          </div>
          <div className={cx('description')}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        <div className={cx('sidebar')}>
          <span onClick={handleNote} className={cx('title', { active: note })}>
            {!note && <FontAwesomeIcon icon={faCaretRight} />}
            {note && <FontAwesomeIcon icon={faCaretDown} />}
            Lưu ý khi sử dụng
          </span>
          {note && (
            <span className={cx('note')}>
              Nội dung trong bài chỉ mang tính tham khảo, bệnh nhân không nên tự ý điều trị mà cần phải tham khảo thêm
              lời khuyên của bác sĩ. Chúng tôi không chịu trách nhiệm nào do việc áp dụng các thông tin trong các bài
              viết gây ra.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChiTietBaiViet;
