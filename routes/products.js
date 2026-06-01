import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with category filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    
    // Filter building
    let queryFilter = {};
    if (category && category !== 'All') {
      queryFilter.category = category;
    }

    // Sort building
    let sortOptions = {};
    if (sortBy === 'newest') {
      sortOptions.createdAt = -1;
    } else if (sortBy === 'priceAsc') {
      sortOptions.price = 1;
    } else if (sortBy === 'priceDesc') {
      sortOptions.price = -1;
    } else {
      // Default to newest
      sortOptions.createdAt = -1;
    }

    const products = await Product.find(queryFilter).sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại.' });
    }
    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại.' });
    }
    res.status(500).json({ error: error.message });
  }
});

export default router;
