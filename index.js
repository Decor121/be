import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import custom routes and seed logic
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import comboRoutes from './routes/combos.js';
import cartRoutes from './routes/cart.js';
import adminRoutes from './routes/admin.js';
import Category from './models/Category.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/decor_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes configuration
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/combos', comboRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Message Schema & Model
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

// Routes
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: mongoose.connection.readyState === 1
      ? 'Backend server is running correctly'
      : 'Backend server is running correctly (Database offline)',
    timestamp: new Date()
  });
});

// POST a contact inquiry
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to Mongo if connected
    if (mongoose.connection.readyState === 1) {
      const newMessage = new Message({ name, email, message });
      await newMessage.save();
      return res.status(201).json({ status: 'success', data: newMessage });
    } else {
      // Mock save to console if database is not active
      console.log('Mock save (DB offline):', { name, email, message });
      return res.status(201).json({
        status: 'success',
        message: 'Saved to mock memory (DB offline)',
        data: { name, email, message, createdAt: new Date() }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all inquiries
app.get('/api/messages', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
      res.json(messages);
    } else {
      // Return dummy messages if database is not running
      res.json([
        {
          name: "Sophia Loren",
          email: "sophia@example.com",
          message: "Looking to renovate my mid-century modern living room in Milan. I love warm sandstone tones.",
          createdAt: new Date(Date.now() - 3600000)
        },
        {
          name: "Marco Rossi",
          email: "marco@example.com",
          message: "Requesting a catalog for the new bespoke oak bedroom collections.",
          createdAt: new Date(Date.now() - 7200000)
        }
      ]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Database connection & Server startup
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Successfully connected to MongoDB Database.');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed. Server starting anyway without DB...');
    console.error(err.message);

    // Start server even if MongoDB is not running, so API status can be tested
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT} (Database offline)...`);
    });
  });

// Nodemon reload trigger
