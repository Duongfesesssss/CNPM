const express = require('express');
const router = express.Router();
const LoaiXe = require('../models/LoaiXe');

router.get('/', async (req, res) => {
  try {
    const hoKhauList = await LoaiXe.find({});
    res.status(200).json({
      success: true,
      data: hoKhauList,
    });
  } catch (error) {
    console.error('Error fetching loai xe:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể lấy thông tin loại xe.',
    });
  }
});

router.post('/datatable', async (req, res) => {
  try {
    const { page = 0, rows = 10 } = req.body;
    const first = req.body.first;

    const totalRecords = await LoaiXe.countDocuments();
    const hoKhauList = await LoaiXe.find({}).skip(first).limit(Number(rows));

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
    const newRecord = new LoaiXe(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json({
      success: true,
      data: savedRecord,
      message: 'Thêm mới loại xe thành công.',
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Mã loại xe đã tồn tại.',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Lỗi server. Không thể thêm mới loại xe.',
      });
    }
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedRecord = await LoaiXe.findByIdAndDelete(_id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy loại xe với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedRecord,
      message: 'Xóa loại xe thành công.',
    });
  } catch (error) {
    console.error('Không thể xóa loại xe', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể xóa loại xe.',
    });
  }
});

// Route chỉnh sửa loại xe theo ID
router.put('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const updatedData = req.body;

    const updatedRecord = await LoaiXe.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy loại xe với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: 'Cập nhật loại xe thành công.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể cập nhật loại xe.',
    });
  }
});

module.exports = router;
