import axios from "axios";
import { BASE_URL, BASE_URL_2, configHeaders, https, MA_NHOM } from "./config";

// Movie-related services
export const getListMovie = () =>
  axios({
    url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`,
    method: "GET",
    headers: configHeaders(),
  });

export const getDetailMovie = (id) =>
  axios({
    url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });

export const getDetailMovieShow = (id) =>
  axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });

export const getMovieByTheater = () =>
  axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MA_NHOM}`,
    method: "GET",
    headers: configHeaders(),
  });

export const getDataSlider = () =>
  axios({
    url: `${BASE_URL_2}/QuanLyPhim/LayDanhSachBanner`,
    method: "GET",
    headers: configHeaders(),
  });

// Ticket-related services
export const postTickets = (id, seats, info) =>
  axios({
    url: `${BASE_URL}/QuanLyDatVe/DatVe`,
    method: "POST",
    headers: {
      ...configHeaders(),
      Authorization: `Bearer ${info.accessToken}`,
    },
    data: {
      maLichChieu: id,
      danhSachVe: seats,
      taiKhoanNguoiDung: info.taiKhoan,
    },
  });

export const getSeatListByFilm = (id) =>
  axios({
    url: `${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    method: "GET",
    headers: configHeaders(),
  });

// User-related services
export const getUserInfo = (userName) =>
  axios({
    url: `${BASE_URL}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${MA_NHOM}&tuKhoa=${userName}`,
    method: "GET",
    headers: configHeaders(),
  });

export const layUserTickets = (userName) =>
  axios({
    url: `${BASE_URL}/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
    headers: configHeaders(),
    data: { taiKhoan: userName },
  });

export const putUserInfo = (values, accessToken) =>
  axios({
    url: `${BASE_URL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "PUT",
    headers: { ...configHeaders(), Authorization: `Bearer ${accessToken}` },
    data: values,
  });

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
