const mongoose = require('mongoose');

const CanHoSchema = new mongoose.Schema(
  {
    tang: { type: Number, required: true },
    dien_tich: { type: Number, required: true },
    ho_khau: { type: mongoose.Schema.Types.ObjectId, ref: 'HoKhau', required: true },
    ma_canho: { type: String, required: true },
    mo_ta: { type: String },
    ten_canho: { type: String, required: true },
  },
  { collection: 'CanHo' }
);

const CanHo = mongoose.model('CanHo', CanHoSchema);
module.exports = CanHo;
