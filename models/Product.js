import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  desc: { type: String },
  image: { type: String },
  images: [{ type: String }],
  label: { type: String },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now },
  code: { type: String, unique: true, index: true },
  color: { type: String },
  colorHex: { type: String },
  colors: [{
    name: { type: String },
    hex: { type: String },
    stock: { type: Number, default: 0 }
  }],
  dimensions: { type: String },
  material: { type: String },
  details: { type: String },
  descriptionLong: { type: String },
  characteristics: { type: String },
  style: { type: String },
  application: { type: String },
  highlights: { type: String },
  careInstructions: { type: String },
  customFields: [{
    name: { type: String },
    value: { type: String }
  }],
  variants: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    code: { type: String },
    dimensions: { type: String },
    image: { type: String }
  }],
  stock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 }
});

export default mongoose.model('Product', ProductSchema);
