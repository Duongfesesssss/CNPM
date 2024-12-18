const mongoose = require('mongoose');

const HoaDonSchema = new mongoose.Schema(
  {
    khoanthu_theoho: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KhoanThuTheoHo',
      required: true,
    },
    ma_hoadon: {
      type: Number,
      required: true,
      unique: true, // Đảm bảo mã hóa đơn là duy nhất
    },
    ma_khoanthu_theoho: {
      type: Number,
      required: true,
    },
    sotien_danop: {
      type: Number,
      min: 0, // Đảm bảo số tiền không âm
    },
    ten_hoadon: {
      type: String,
    },
  },
  { collection: 'HoaDon' }
);

const HoaDon = mongoose.model('HoaDon', HoaDonSchema);

module.exports = HoaDon;
