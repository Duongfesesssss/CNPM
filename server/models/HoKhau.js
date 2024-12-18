const mongoose = require('mongoose');

const hoKhauSchema = new mongoose.Schema(
  {
    dia_chi_thuong_tru: { type: String },
    noi_cap: { type: String },
    ngay_cap: { type: Date },
    chuho_id: { type: String, required: true, unique: true },
  },
  { collection: 'DanhSachHoKhau' }
);

const HoKhau = mongoose.model('HoKhau', hoKhauSchema);

module.exports = HoKhau;
