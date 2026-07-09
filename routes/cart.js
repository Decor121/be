import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart or update quantity
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity, variantName } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ error: 'Vui lòng cung cấp productId và số lượng.' });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({ error: 'Số lượng phải lớn hơn hoặc bằng 1.' });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại.' });
    }

    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }

    // Check if product with this specific variant is already in cart
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId && (item.variantName || '') === (variantName || '')
    );

    if (itemIndex > -1) {
      // If product exists in cart, update quantity
      user.cart[itemIndex].quantity = qty;
    } else {
      // Add new item to cart
      user.cart.push({ product: productId, variantName: variantName || '', quantity: qty });
    }

    await user.save();

    // Return populated cart
    const updatedUser = await User.findById(req.user).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/cart/:productId
// @desc    Remove product from cart
// @access  Private
router.delete('/:productId', auth, async (req, res) => {
  try {
    const { variantName } = req.query;
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }

    // Filter out product variant from cart
    user.cart = user.cart.filter(
      (item) => !(item.product.toString() === req.params.productId && (item.variantName || '') === (variantName || ''))
    );

    await user.save();

    const updatedUser = await User.findById(req.user).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }

    user.cart = [];
    await user.save();

    res.json([]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
