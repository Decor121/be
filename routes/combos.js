import express from 'express';
import Combo from '../models/Combo.js';

const router = express.Router();

// @route   GET /api/combos
// @desc    Get all combos populated with products details
router.get('/', async (req, res) => {
  try {
    const combos = await Combo.find().populate('products');
    res.json(combos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
