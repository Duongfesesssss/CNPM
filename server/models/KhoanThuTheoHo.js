const mongoose = require('mongoose');

const KhoanThuTheoHoSchema = new mongoose.Schema(
  {
    ghi_chu: {
      type: String,
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

      min: 0,
    },
    ten_khoanthu: {
      type: String,
    },
    thoigian_batdau: {
      type: Date,
    },
    thoigian_ketthuc: {
      type: Date,
    },
  },
  { collection: 'KhoanThuTheoHo' }
);

const KhoanThuTheoHo = mongoose.model('KhoanThuTheoHo', KhoanThuTheoHoSchema);

module.exports = KhoanThuTheoHo;
