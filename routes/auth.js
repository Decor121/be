import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'decor_secret_jwt_key_2026';

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, emailOrPhone, password } = req.body;

    if (!fullName || !emailOrPhone || !password) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ emailOrPhone });
    console.log(fullName, emailOrPhone, password)
    if (userExists) {
      return res.status(400).json({ error: 'Tài khoản Email/Số điện thoại này đã được đăng ký.' });
    }

    // Create user (password will be hashed by pre-save hook in User model)
    const user = new User({
      fullName,
      emailOrPhone,
      password
    });
    console.log(user)
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin đăng nhập.' });
    }

    // Find user and populate cart products
    const user = await User.findOne({ emailOrPhone }).populate('cart.product');
    if (!user) {
      return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' });
    }

    // Generate JWT Token
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        emailOrPhone: user.emailOrPhone,
        cart: user.cart,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
