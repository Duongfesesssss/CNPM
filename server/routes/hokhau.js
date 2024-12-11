const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
        const { page = 0, rows = 10 } = req.body; 
        const first = req.body.first;

        const totalRecords = await HoKhau.countDocuments();
        const hoKhauList = await HoKhau.find({})
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



module.exports = router;
