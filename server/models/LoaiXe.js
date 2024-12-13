const mongoose = require('mongoose');

const LoaiXeSchema = new mongoose.Schema(
  {
    ma_loaixe: {
      type: String,
      required: true,
      unique: true, // Mã loại xe phải duy nhất
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    ten_loaixe: {
      type: String,
      required: true,
      trim: true,
    },
    mo_ta: {
      type: String,
      trim: true,
      default: '', // Không bắt buộc, mặc định là chuỗi rỗng
    },
    dich_vu: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: 'LoaiXe' }
);

const LoaiXe = mongoose.model('LoaiXe', LoaiXeSchema);

module.exports = LoaiXe;
