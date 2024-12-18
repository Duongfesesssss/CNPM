const mongoose = require('mongoose');

const CanHoSchema = new mongoose.Schema(
  {
    tang: { type: Number },
    dien_tich: { type: Number },
    mo_ta: { type: String },
    ten_canho: { type: String },
    so_phong: { type: String },
    hokhau_id: { type: mongoose.Schema.Types.ObjectId, ref: 'HoKhau', required: true },
    chu_sohuu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { collection: 'CanHo' }
);

const CanHo = mongoose.model('CanHo', CanHoSchema);
module.exports = CanHo;
