const express = require('express');
const router = express.Router();
const HoKhau = require('../models/HoKhau');

router.get('/', async (req, res) => {
  try {
    const hoKhauList = await HoKhau.find({});
    res.status(200).json({
      success: true,
      data: hoKhauList,
    });
  } catch (error) {
    console.error('Error fetching ho khau:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể lấy thông tin hộ khẩu.',
    });
  }
});

router.post('/datatable', async (req, res) => {
  try {
    const { page = 0, rows = 10 } = req.body;
    const first = req.body.first;

    const totalRecords = await HoKhau.countDocuments();
    const hoKhauList = await HoKhau.find({}).skip(first).limit(Number(rows));

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
    const newRecord = new HoKhau(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json({
      success: true,
      data: savedRecord,
      message: 'Thêm mới hộ khẩu thành công.',
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Mã hộ khẩu đã tồn tại.',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Lỗi server. Không thể thêm mới hộ khẩu.',
      });
    }
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const deletedRecord = await HoKhau.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy hộ khẩu với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedRecord,
      message: 'Xóa hộ khẩu thành công.',
    });
  } catch (error) {
    console.error('Không thể xóa hộ khẩu', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể xóa hộ khẩu.',
    });
  }
});

// Route chỉnh sửa hộ khẩu theo ID
router.put('/', async (req, res) => {
  try {
    const { id } = req.body;
    const updatedData = req.body;

    const updatedRecord = await HoKhau.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy hộ khẩu với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: 'Cập nhật hộ khẩu thành công.',
    });
  } catch (error) {
    console.error('Không thể cập nhật hộ khẩu', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể cập nhật hộ khẩu.',
    });
  }
});

module.exports = router;
