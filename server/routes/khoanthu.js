const express = require('express');
const router = express.Router();
const KhoanThu = require('../models/KhoanThu');

router.get('/', async (req, res) => {
  try {
    const hoKhauList = await KhoanThu.find({});
    res.status(200).json({
      success: true,
      data: hoKhauList,
    });
  } catch (error) {
    console.error('Error fetching khoan thu:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể lấy thông tin khoản thu.',
    });
  }
});

router.post('/datatable', async (req, res) => {
  try {
    const { page = 0, rows = 10 } = req.body;
    const first = req.body.first;

    const totalRecords = await KhoanThu.countDocuments();
    const hoKhauList = await KhoanThu.find({}).skip(first).limit(Number(rows));

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
    const newRecord = new KhoanThu(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json({
      success: true,
      data: savedRecord,
      message: 'Thêm mới khoản thu thành công.',
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Mã khoản thu đã tồn tại.',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Lỗi server. Không thể thêm mới khoản thu.',
      });
    }
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedRecord = await KhoanThu.findByIdAndDelete(_id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khoản thu với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedRecord,
      message: 'Xóa khoản thu thành công.',
    });
  } catch (error) {
    console.error('Không thể xóa khoản thu', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể xóa khoản thu.',
    });
  }
});

// Route chỉnh sửa khoản thu theo ID
router.put('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const updatedData = req.body;

    const updatedRecord = await KhoanThu.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khoản thu với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: 'Cập nhật khoản thu thành công.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể cập nhật khoản thu.',
    });
  }
});

module.exports = router;
