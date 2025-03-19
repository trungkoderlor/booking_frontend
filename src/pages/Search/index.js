import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
];
function Search() {
  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={3} // Hiển thị 3 item
      spaceBetween={20} // Khoảng cách giữa các item
      navigation // Có nút điều hướng
      loop={true} // Trượt vòng lặp
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="slide-item">{item.name}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Search;
