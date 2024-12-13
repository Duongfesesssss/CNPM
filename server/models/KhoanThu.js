const mongoose = require('mongoose');

const KhoanThuSchema = new mongoose.Schema(
  {
    ma_khoanthu: {
      type: Number,
      required: true,
      unique: true, // Mã khoản thu phải duy nhất
    },
    ten_khoanthu: {
      type: String,
      required: true,
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    chi_tiet: {
      type: String,
      trim: true,
      default: '', // Chi tiết không bắt buộc, mặc định là chuỗi rỗng
    },
    ghi_chu: {
      type: String,
      trim: true,
      default: '', // Ghi chú không bắt buộc, mặc định là chuỗi rỗng
    },
    loai_hoatdong: {
      type: String,
      required: true,
      trim: true,
    },
    thoigian_batdau: {
      type: Date,
      required: true,
    },
    thoigian_ketthuc: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.thoigian_batdau;
        },
        message: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu.',
      },
    },
  },
  { collection: 'KhoanThu' }
);

const KhoanThu = mongoose.model('KhoanThu', KhoanThuSchema);

module.exports = KhoanThu;
