const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route đăng ký người dùng
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               full_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 *       400:
 *         description: Tài khoản hoặc email đã tồn tại
 *       500:
 *         description: Lỗi từ server
 */
router.post('/register', register);

// Route đăng nhập người dùng
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Tài khoản không tồn tại hoặc mật khẩu sai
 *       500:
 *         description: Lỗi từ server
 */
router.post('/login', login);

module.exports = router;
