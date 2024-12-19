const mongoose = require('mongoose');

const CanHoSchema = new mongoose.Schema(
  {
    tang: { type: Number,},
    dien_tich: { type: Number,},
    ho_khau: { type: mongoose.Schema.Types.ObjectId, ref: 'HoKhau',},
    so_phong: { type: String,},
    mo_ta: { type: String },
    ten_canho: { type: String},
  },
  { collection: 'CanHo' }
);

const CanHo = mongoose.model('CanHo', CanHoSchema);
module.exports = CanHo;
