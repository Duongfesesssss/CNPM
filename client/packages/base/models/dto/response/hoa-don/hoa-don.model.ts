import type { KhoanThuTheoHoModel } from "../khoan-thu-theo-ho/khoan-thu-theo-ho.model";

class HoaDonModel {
    id?: string;
    khoanthu_theoho?: KhoanThuTheoHoModel;
    ma_hoadon?: number;
    ma_khoanthu_theoho?: number;
    sotien_danop?: number;
    ten_hoadon?: string;
  }

  export { HoaDonModel };