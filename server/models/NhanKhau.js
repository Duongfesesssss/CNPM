const mongoose = require('mongoose');

const NhanKhauSchema = new mongoose.Schema(
  {
    cancuoc_congdan: { type: String },
    dan_toc: { type: String },
    ghi_chu: { type: String },
    ho_ten: { type: String },
    ngay_sinh: { type: Date },
    nghe_nghiep: { type: String },
    noi_sinh: { type: String },
    quan_he: { type: String },
    trang_thai: { type: Boolean },
    gioi_tinh: { type: String },
    quoc_tich: { type: String },
    hokhau_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HoKhau', required: true },
  },
  { collection: 'NhanKhau' }
);

const NhanKhau = mongoose.model('NhanKhau', NhanKhauSchema);
module.exports = NhanKhau;
