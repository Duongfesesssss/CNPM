const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define a schema for 'DanhSachHoKhau' if not already defined
const hoKhauSchema = new mongoose.Schema({}, { collection: 'DanhSachHoKhau' });
const HoKhau = mongoose.model('HoKhau', hoKhauSchema);

// Route lấy thông tin hộ khẩu
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
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const totalRecords = await HoKhau.countDocuments();
        const hoKhauList = await HoKhau.find({})
            .skip(offset)
            .limit(Number(limit)); // Lấy dữ liệu phân trang
        const totalPages = Math.ceil(totalRecords / limit);
        res.status(200).json({
            success: true,
            data: hoKhauList,
            totalRecords: totalRecords,
        });
    } catch (error) {
        console.error('Error fetching data for DataTable:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server. Không thể lấy thông tin DataTable.',
        });
    }
});



module.exports = router;
