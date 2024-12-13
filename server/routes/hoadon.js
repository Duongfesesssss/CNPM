const express = require('express');
const router = express.Router();
const HoaDon = require('../models/HoaDon');
const KhoanThuTheoHo = require('../models/KhoanThuTheoHo');

router.get('/', async (req, res) => {
  try {
    const hoaDonList = await HoaDon.find({}).populate('khoanthu_theoho');
    res.status(200).json({
      success: true,
      data: hoaDonList,
    });
  } catch (error) {
    console.error('Error fetching hoa don:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể lấy thông tin hóa đơn.',
    });
  }
});

router.post('/datatable', async (req, res) => {
  try {
    const { page = 0, rows = 10 } = req.body;
    const first = req.body.first;

    const totalRecords = await HoaDon.countDocuments();
    const hoKhauList = await HoaDon.find({})
      .populate('khoanthu_theoho')
      .skip(first)
      .limit(Number(rows));

    const totalPages = Math.ceil(totalRecords / rows);

    res.status(200).json({
      success: true,
      data: hoKhauList,
      rows: Number(rows),
      first: first,
      page: page,
      totalRecords: totalRecords,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error('Không thể lấy thông tin DataTable', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể lấy thông tin DataTable.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const khoanThuTheoHo = await KhoanThuTheoHo.findById(req.body.khoanthu_theoho);
    if (!khoanThuTheoHo) {
      return res.status(404).json({
        success: false,
        message: 'Khoản thu theo hộ không tồn tại.',
      });
    }

    // Tạo mới Căn Hộ
    const newCanHo = new HoaDon(req.body);
    const savedCanHo = await newCanHo.save();

    res.status(201).json({
      success: true,
      data: savedCanHo,
      message: 'Thêm mới hóa đơn thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi thêm mới hóa đơn:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể thêm mới hóa đơn.',
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedRecord = await HoaDon.findByIdAndDelete(_id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy hóa đơn với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Xóa hóa đơn thành công.',
    });
  } catch (error) {
    console.error('Không thể xóa hóa đơn', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể xóa hóa đơn.',
    });
  }
});

// Route chỉnh sửa hóa đơn theo ID
router.put('/', async (req, res) => {
  try {
    const { _id, khoanthu_theoho, ...updatedData } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: 'ID của hóa đơn là bắt buộc.',
      });
    }

    // Kiểm tra xem `ho_khau` có hợp lệ hay không (nếu được cung cấp)
    if (ho_khau) {
      const existingKhoanThu = await KhoanThuTheoHo.findById(khoanthu_theoho);

      if (!existingKhoanThu) {
        return res.status(400).json({
          success: false,
          message: 'Không tìm thấy khoản thu theo hộ với ID đã cung cấp.',
        });
      }
      updatedData.khoanthu_theoho = khoanthu_theoho; // Gắn `ho_khau` vào dữ liệu cập nhật
    }

    // Cập nhật hóa đơn
    const updatedRecord = await HoaDon.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    // Kiểm tra nếu không tìm thấy hóa đơn
    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy hóa đơn với ID đã cung cấp.',
      });
    }

    // Thành công
    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: 'Cập nhật hóa đơn thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật hóa đơn:', error); // Ghi log chi tiết lỗi
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể cập nhật hóa đơn.',
    });
  }
});

module.exports = router;
