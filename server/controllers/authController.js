const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Model User của bạn

const register = async (req, res) => {
    try {
        const { user_name, password, email, phone_number, full_name } = req.body;
        const existingUser = await User.findOne({ $or: [{ user_name }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Tài khoản hoặc email đã tồn tại.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            user_name,
            password: hashedPassword,
            email,
            phone_number,
            full_name
        });

        await newUser.save();

        res.status(201).json({
            message: 'Tài khoản đã được đăng ký thành công.',
            user: {
                user_name: newUser.user_name,
                email: newUser.email,
                full_name: newUser.full_name
            }
        });

    } catch (error) {
        console.error('Lỗi trong quá trình đăng ký:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi từ server.' });
    }
};

const login = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        // Tìm người dùng theo user_name
        const user = await User.findOne({ user_name });
        if (!user) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng.' });
        }

        const token = jwt.sign({ id: user._id, user_name: user.user_name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Đăng nhập thành công.',
            token
        });

    } catch (error) {
        console.error('Lỗi trong quá trình đăng nhập:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi từ server.' });
    }
};

module.exports = { register, login };
