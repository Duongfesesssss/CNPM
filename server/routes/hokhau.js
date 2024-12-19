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
    const { page = 0, rows = 10, first = 0 } = req.body;

    const hoKhauList = await HoKhau.aggregate([
      // Skip và Limit cho phân trang
      { $skip: first },
      { $limit: Number(rows) },

      // Lookup để lấy thông tin chủ hộ (chuHo)
      {
        $lookup: {
          from: 'NhanKhau',             // Tên collection cần join
          localField: 'chuho_id',       // Trường trong HoKhau
          foreignField: '_id',          // Trường _id trong NhanKhau
          as: 'chuHo'              // Tên field chứa kết quả join
        }
      },

      // Lookup để lấy danh sách nhân khẩu liên kết với HoKhau
      {
        $lookup: {
          from: 'NhanKhau',
          localField: '_id',            // Trường _id trong HoKhau
          foreignField: 'hokhau_id',    // Trường hokhau_id trong NhanKhau
          as: 'nhanKhau'                // Tên field chứa danh sách nhân khẩu
        }
      },

      {
        $lookup: {
          from: 'CanHo',
          localField: '_id', 
          foreignField: 'hokhau_id',   
          as: 'canHo'               
        }
      },
      // Unwind chỉ cho chuHo (nếu cần) nhưng giữ nhanKhau là mảng
      {
        $unwind: {
          path: '$chuHo',
          preserveNullAndEmptyArrays: true // Giữ các bản ghi không có chủ hộ
        }
      },

      // Project để định hình kết quả trả về
      {
        $project: {
          _id: 1,
          dia_chi_thuong_tru: 1,
          noi_cap: 1,
          ngay_cap: 1,
          chuho_id: 1,
          chuHo: {
            ho_ten: '$chuHo.ho_ten',
            ngay_sinh: '$chuHo.ngay_sinh',
            gioi_tinh: '$chuHo.gioi_tinh',
            nghe_nghiep: '$chuHo.nghe_nghiep'
          },
          nhanKhau: 1,
          canHo: 1
        }
      }
    ]);

    const totalRecords = await HoKhau.countDocuments();
    const totalPages = Math.ceil(totalRecords / rows);

    // Trả về kết quả
    res.status(200).json({
      success: true,
      data: hoKhauList,
      rows: Number(rows),
      first: Number(first),
      page: Number(page),
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

    // Trả về định dạng yêu cầu khi thành công
    res.status(201).json({
      status: 'OK',
      metadata: null,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Lỗi trùng lặp
      res.status(400).json({
        status: 'ERROR',
        metadata: null,
        message: 'Mã hộ khẩu đã tồn tại.',
      });
    } else {
      // Lỗi server
      res.status(500).json({
        status: 'ERROR',
        metadata: null,
        message: 'Lỗi server. Không thể thêm mới hộ khẩu.',
      });
    }
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        status: 'ERROR',
        metadata: null,
        message: 'Vui lòng cung cấp _id của bản ghi cần xóa.',
      });
    }

    const deletedRecord = await HoKhau.findByIdAndDelete(_id);

    if (!deletedRecord) {
      return res.status(404).json({
        status: 'ERROR',
        metadata: null,
        message: 'Không tìm thấy hộ khẩu với _id đã cung cấp.',
      });
    }

    res.status(200).json({
      status: 'OK',
      metadata: null,
    });
  } catch (error) {
    console.error('Không thể xóa hộ khẩu', error);
    res.status(500).json({
      status: 'ERROR',
      metadata: null,
      message: 'Lỗi server. Không thể xóa hộ khẩu.',
    });
  }
});

// Route chỉnh sửa hộ khẩu theo ID
router.put('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const updatedData = req.body;

    const updatedRecord = await HoKhau.findByIdAndUpdate(_id, updatedData, {
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
    res.status(500).json({
      success: false,
      message: 'Lỗi server. Không thể cập nhật hộ khẩu.',
    });
  }
});

module.exports = router;
