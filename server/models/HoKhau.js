const mongoose = require('mongoose');

const hoKhauSchema = new mongoose.Schema(
  {
    ma_ho_khau: { type: String, required: true, unique: true },
    so_thanh_vien: { type: Number, required: true },
    dia_chi_thuong_tru: { type: String, required: true },
    noi_cap: { type: String, required: true },
    ngay_cap: { type: Date, required: true },
  },
  { collection: 'DanhSachHoKhau' }
);

const HoKhau = mongoose.model('HoKhau', hoKhauSchema);

module.exports = HoKhau;
