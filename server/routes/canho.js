const express = require('express');
const router = express.Router();
const CanHo = require('../models/CanHo');
const HoKhau = require('../models/HoKhau');

router.get('/', async (req, res) => {
  try {
    const hoKhauList = await CanHo.find({}).populate('ho_khau');
    res.status(200).json({
      success: true,
      data: hoKhauList,
    });
  } catch (error) {
    console.error('Error fetching can ho:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể lấy thông tin căn hộ.',
    });
  }
});

router.post('/datatable', async (req, res) => {
  try {
    const { page = 0, rows = 10 } = req.body;
    const first = req.body.first;

    const totalRecords = await CanHo.countDocuments();
    const hoKhauList = await CanHo.find({}).populate('ho_khau').skip(first).limit(Number(rows));

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
    // Kiểm tra xem `ho_khau` có tồn tại không
    const hoKhau = await HoKhau.findById(req.body.ho_khau);
    if (!hoKhau) {
      return res.status(404).json({
        success: false,
        message: 'Hộ khẩu không tồn tại.',
      });
    }

    // Tạo mới Căn Hộ
    const newCanHo = new CanHo(req.body);
    const savedCanHo = await newCanHo.save();

    res.status(201).json({
      success: true,
      data: savedCanHo,
      message: 'Thêm mới căn hộ thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi thêm mới căn hộ:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể thêm mới căn hộ.',
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedRecord = await CanHo.findByIdAndDelete(_id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy căn hộ với ID đã cung cấp.',
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Xóa căn hộ thành công.',
    });
  } catch (error) {
    console.error('Không thể xóa căn hộ', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể xóa căn hộ.',
    });
  }
});

// Route chỉnh sửa căn hộ theo ID
router.put('/', async (req, res) => {
  try {
    const { _id, ho_khau, ...updatedData } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: 'ID của căn hộ là bắt buộc.',
      });
    }

    // Kiểm tra xem `ho_khau` có hợp lệ hay không (nếu được cung cấp)
    if (ho_khau) {
      const existingHoKhau = await HoKhau.findById(ho_khau);

      if (!existingHoKhau) {
        return res.status(400).json({
          success: false,
          message: 'Không tìm thấy hộ khẩu với ID đã cung cấp.',
        });
      }
      updatedData.ho_khau = ho_khau; // Gắn `ho_khau` vào dữ liệu cập nhật
    }

    // Cập nhật căn hộ
    const updatedRecord = await CanHo.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    // Kiểm tra nếu không tìm thấy căn hộ
    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy căn hộ với ID đã cung cấp.',
      });
    }

    // Thành công
    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: 'Cập nhật căn hộ thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật căn hộ:', error); // Ghi log chi tiết lỗi
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể cập nhật căn hộ.',
    });
  }
});

module.exports = router;
