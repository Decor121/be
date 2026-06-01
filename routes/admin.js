import express from 'express';
import auth from '../middleware/auth.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin role required.' });
  }
};

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/dashboard', auth, isAdmin, async (req, res) => {
  try {
    // 1. Stats
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    // Calculate total sales
    const salesResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalAmount' }
        }
      }
    ]);
    const totalSales = salesResult.length > 0 ? salesResult[0].totalSales : 0;

    // 2. Recent Orders
    const recentOrdersRaw = await Order.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .populate('user', 'fullName');
    
    const recentOrders = recentOrdersRaw.map(order => ({
      id: `#ORD-${order._id.toString().slice(-4).toUpperCase()}`,
      status: order.status,
      amount: order.totalAmount,
      customer: order.user ? order.user.fullName : 'Guest'
    }));

    // 3. Inventory Overview
    const inventoryRaw = await Product.find()
      .sort({ stock: 1 })
      .limit(5);
    
    const inventory = inventoryRaw.map(product => {
      let status = 'In Stock';
      if (product.stock < 5) status = 'Low Stock';
      else if (product.stock < 15) status = 'High Demand';

      return {
        id: product._id,
        name: product.name,
        status: status,
        stock: product.stock
      };
    });

    res.json({
      stats: {
        sales: totalSales,
        orders: totalOrders,
        products: totalProducts
      },
      recentOrders,
      inventory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
