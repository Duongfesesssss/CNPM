const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const tamVangSchema = new mongoose.Schema({}, { collection: 'TamVang' });
const TamVang = mongoose.model('TamVang', tamVangSchema);

router.get('/', async (req, res) => {
    try {
        const tamVangList = await TamVang.find({});
        res.status(200).json({
            success: true,
            data: tamVangList,
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
        const first = page * rows;

        const totalRecords = await TamVang.countDocuments();
        const tamVangList = await TamVang.find({})
            .skip(first)
            .limit(Number(rows));

        const totalPages = Math.ceil(totalRecords / rows);

        res.status(200).json({
            success: true,
            data: tamVangList,
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
