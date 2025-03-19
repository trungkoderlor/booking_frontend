import config from '../config';

// Pages
import Home from '../pages/Home';
import Search from '../pages/Search';
import { TaiNha, TaiVien, SongKhoe } from '../pages/dichvu';
import { KhamChuyenKhoa, ChiTietChuyenKhoa } from '../pages/dichvuyte';
import { CoSoYTe } from '../pages/CoSoYTe';

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.taiNha, component: TaiNha },
  { path: config.routes.songKhoe, component: SongKhoe },
  { path: config.routes.taiVien, component: TaiVien },
  { path: config.routes.khamChuyenKhoa, component: KhamChuyenKhoa },
  { path: config.routes.chiTietChuyenKhoa, component: ChiTietChuyenKhoa },
  { path: config.routes.coSoYTe, component: CoSoYTe },
  { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
