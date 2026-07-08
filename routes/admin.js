import express from 'express';
import auth from '../middleware/auth.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables for module initialization
dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

// Configure multer memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'decor_products'
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// @route   POST /api/admin/upload
// @desc    Upload multiple product images to Cloudinary
// @access  Private/Admin
router.post('/upload', auth, isAdmin, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    // Upload all buffers to Cloudinary concurrently
    const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
    const uploadResults = await Promise.all(uploadPromises);

    // Collect the secure URLs from Cloudinary upload results
    const fileUrls = uploadResults.map(result => result.secure_url);

    res.json({ urls: fileUrls });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: `Cloudinary upload failed: ${error.message}` });
  }
});

// Helper function to create sluggified text
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// @route   POST /api/admin/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/products', auth, isAdmin, async (req, res) => {
  try {
    const {
      name,
      categoryType,
      newCategoryName,
      category,
      price,
      stock,
      code,
      material,
      dimensions,
      weight,
      style,
      application,
      highlights,
      careInstructions,
      customFields,
      images,
      colors
    } = req.body;

    // Simple validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Tên và giá sản phẩm là bắt buộc.' });
    }

    let finalCategoryId = category;

    if (categoryType === 'new') {
      if (!newCategoryName || !newCategoryName.trim()) {
        return res.status(400).json({ error: 'Tên danh mục mới không được trống.' });
      }

      const slug = slugify(newCategoryName.trim());
      let cat = await Category.findOne({ slug });
      if (!cat) {
        cat = new Category({
          name: newCategoryName.trim(),
          slug
        });
        await cat.save();
      }
      finalCategoryId = cat._id;
    } else {
      if (!category) {
        return res.status(400).json({ error: 'Vui lòng chọn danh mục.' });
      }
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: 'Danh mục không hợp lệ.' });
      }
    }

    // Check if code is unique if provided
    if (code) {
      const existingProduct = await Product.findOne({ code });
      if (existingProduct) {
        return res.status(400).json({ error: 'Mã sản phẩm đã tồn tại.' });
      }
    }

    // Determine primary image
    const primaryImage = images && images.length > 0 ? images[0] : '';

    // Set fallback single color and colorHex from primary color in colors array
    const primaryColor = colors && colors.length > 0 ? colors[0] : { name: '', hex: '' };

    const newProduct = new Product({
      name,
      category: finalCategoryId,
      price: Number(price),
      stock: Number(stock) || 0,
      code: code || `PROD-${Date.now()}`,
      material,
      color: primaryColor.name,
      colorHex: primaryColor.hex,
      colors: colors || [],
      dimensions,
      weight,
      style,
      application,
      highlights: highlights || '',
      careInstructions: careInstructions || '',
      customFields: customFields || [],
      image: primaryImage,
      images: images || []
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update an existing product
// @access  Private/Admin
router.put('/products/:id', auth, isAdmin, async (req, res) => {
  try {
    const {
      name,
      categoryType,
      newCategoryName,
      category,
      price,
      stock,
      code,
      material,
      dimensions,
      weight,
      style,
      application,
      highlights,
      careInstructions,
      customFields,
      images,
      colors
    } = req.body;

    // Simple validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Tên và giá sản phẩm là bắt buộc.' });
    }

    let finalCategoryId = category;

    if (categoryType === 'new') {
      if (!newCategoryName || !newCategoryName.trim()) {
        return res.status(400).json({ error: 'Tên danh mục mới không được trống.' });
      }

      const slug = slugify(newCategoryName.trim());
      let cat = await Category.findOne({ slug });
      if (!cat) {
        cat = new Category({
          name: newCategoryName.trim(),
          slug
        });
        await cat.save();
      }
      finalCategoryId = cat._id;
    } else {
      if (!category) {
        return res.status(400).json({ error: 'Vui lòng chọn danh mục.' });
      }
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: 'Danh mục không hợp lệ.' });
      }
    }

    // Check if code is unique if provided
    if (code) {
      const existingProduct = await Product.findOne({ code, _id: { $ne: req.params.id } });
      if (existingProduct) {
        return res.status(400).json({ error: 'Mã sản phẩm đã tồn tại.' });
      }
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại.' });
    }

    // Determine primary image
    const primaryImage = images && images.length > 0 ? images[0] : '';

    // Set fallback single color and colorHex from primary color in colors array
    const primaryColor = colors && colors.length > 0 ? colors[0] : { name: '', hex: '' };

    product.name = name;
    product.category = finalCategoryId;
    product.price = Number(price);
    product.stock = Number(stock) || 0;
    product.code = code || product.code;
    product.material = material;
    product.color = primaryColor.name;
    product.colorHex = primaryColor.hex;
    product.colors = colors || [];
    product.dimensions = dimensions;
    product.weight = weight;
    product.style = style;
    product.application = application;
    product.highlights = highlights || '';
    product.careInstructions = careInstructions || '';
    product.customFields = customFields || [];
    product.image = primaryImage;
    product.images = images || [];

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/products/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại.' });
    }
    res.json({ message: 'Xóa sản phẩm thành công.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
