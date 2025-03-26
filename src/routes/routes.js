import config from '../config';
import { HeaderOnly } from '../layouts';
// Pages
import Home from '../pages/Home';
import Search from '../pages/Search';
import { TaiNha, TaiVien, SongKhoe } from '../pages/dichvu';
import { KhamChuyenKhoa, ChiTietChuyenKhoa } from '../pages/dichvuyte';
import { CoSoYTe, ChiTietCoSoYTe } from '../pages/CoSoYTe';
import { BacSi, ChiTietBacSi, DatLich } from '../pages/BacSi';
import { BaiViet, ChiTietBaiViet } from '../pages/BaiViet';
import { DangNhap, ThongTin } from '../pages/TaiKhoan';
import { LichKham, HuongDan } from '../pages/LichKham';
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.khamChuyenKhoa, component: KhamChuyenKhoa },
  { path: config.routes.chiTietChuyenKhoa, component: ChiTietChuyenKhoa },
  { path: config.routes.coSoYTe, component: CoSoYTe },
  { path: config.routes.chiTietCoSoYTe, component: ChiTietCoSoYTe },
  { path: config.routes.bacSi, component: BacSi },
  { path: config.routes.chiTietBacSi, component: ChiTietBacSi },
  { path: config.routes.baiViet, component: BaiViet },
  { path: config.routes.chiTietBaiViet, component: ChiTietBaiViet },

  { path: config.routes.dangNhap, component: DangNhap, layout: null },
];

const privateRoutes = [
  { path: config.routes.datLichKham, component: DatLich, layout: HeaderOnly },
  { path: config.routes.lichKham, component: LichKham },
  { path: config.routes.huongDan, component: HuongDan },
  { path: config.routes.thongTin, component: ThongTin },
];

export { publicRoutes, privateRoutes };
