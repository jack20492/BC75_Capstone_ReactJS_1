import { https, MA_NHOM } from "./config";

// Movie-related services
export const getListMovie = () =>
  https.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`);

export const getDetailMovie = (id) =>
  https.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);

export const getDetailMovieShow = (id) =>
  https.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);

export const getMovieByTheater = () =>
  https.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MA_NHOM}`);

export const getDataSlider = () => https.get(`/QuanLyPhim/LayDanhSachBanner`);

// Ticket-related services
export const postTickets = (id, seats, info) =>
  https.post(`/QuanLyDatVe/DatVe`, {
    maLichChieu: id,
    danhSachVe: seats,
    taiKhoanNguoiDung: info.taiKhoan,
  });

// User-related services
export const getSeatListByFilm = (id) =>
  https.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);

export const getUserInfo = (userName) =>
  https.get(
    `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${MA_NHOM}&tuKhoa=${userName}`
  );

export const layUserTickets = (userName) =>
  https.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`, { taiKhoan: userName });

export const putUserInfo = (values) =>
  https.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values);

// Admin services
export const userServ = {
  getList: () =>
    https.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}`),
  deleteUser: (taiKhoan) =>
    https.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`),
};

export const adminServ = {
  deleteFilm: (MaPhim) => https.delete(`/QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`),
};
