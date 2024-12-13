const mongoose = require('mongoose');

const KhoanThuTheoHoSchema = new mongoose.Schema(
  {
    ghi_chu: {
      type: String,
      required: true,
    },
    ma_hokhau: {
      type: String,
      required: true,
    },
    ma_khoanthu: {
      type: Number,
      required: true,
    },
    so_tien: {
      type: Number,
      required: true,
      min: 0,
    },
    ten_khoanthu: {
      type: String,
      required: true,
    },
    thoigian_batdau: {
      type: Date,
      required: true,
    },
    thoigian_ketthuc: {
      type: Date,
      required: true,
    },
  },
  { collection: 'KhoanThuTheoHo' }
);

const KhoanThuTheoHo = mongoose.model('KhoanThuTheoHo', KhoanThuTheoHoSchema);

module.exports = KhoanThuTheoHo;
