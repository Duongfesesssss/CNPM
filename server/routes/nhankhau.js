const express = require('express');
const router = express.Router();
const NhanKhau = require('../models/NhanKhau');

router.get('/', async (req, res) => {
  try {
    const nhankhauList = await NhanKhau.find({}).populate('hokhau_id');
    res.status(200).json({
      success: true,
      data: nhankhauList,
    });
  } catch (error) {
    console.error('Error fetching can ho:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể lấy thông tin nhân khẩu.',
    });
  }
});

router.post('/datatable', async (req, res) => {
  try {
    const { page = 0, rows = 10 } = req.body;
    const first = req.body.first;

    const totalRecords = await NhanKhau.countDocuments();
    const nhankhauList = await NhanKhau.find({})
      .populate('hokhau_id')
      .skip(first)
      .limit(Number(rows));

    const totalPages = Math.ceil(totalRecords / rows);

    res.status(200).json({
      success: true,
      data: nhankhauList,
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
    // Tạo mới nhân khẩu
    const newNhankhau = new NhanKhau(req.body);
    const savedNhankhau = await newNhankhau.save();

    res.status(201).json({
      success: true,
      data: savedNhankhau,
      message: 'Thêm mới nhân khẩu thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi thêm mới nhân khẩu:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể thêm mới nhân khẩu.',
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedRecord = await NhanKhau.findByIdAndDelete(_id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy nhân khẩu với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Xóa nhân khẩu thành công.',
    });
  } catch (error) {
    console.error('Không thể xóa nhân khẩu', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể xóa nhân khẩu.',
    });
  }
});

// Route chỉnh sửa nhân khẩu theo ID
router.put('/', async (req, res) => {
  try {
    const { _id, ...updatedData } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: 'ID của nhân khẩu là bắt buộc.',
      });
    }

    // Cập nhật nhân khẩu
    const updatedRecord = await NhanKhau.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    // Kiểm tra nếu không tìm thấy nhân khẩu
    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy nhân khẩu với ID đã cung cấp.',
      });
    }

    // Thành công
    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: 'Cập nhật nhân khẩu thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật nhân khẩu:', error); // Ghi log chi tiết lỗi
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể cập nhật nhân khẩu.',
    });
  }
});

module.exports = router;
