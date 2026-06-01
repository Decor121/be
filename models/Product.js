import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. trays, vases, paintings, objects
  desc: { type: String },
  image: { type: String },
  images: [{ type: String }],
  label: { type: String },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  code: { type: String, unique: true, index: true },
  color: { type: String },
  colorHex: { type: String },
  dimensions: { type: String },
  material: { type: String },
  details: { type: String },
  descriptionLong: { type: String },
  characteristics: { type: String },
  stock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 }
});

export default mongoose.model('Product', ProductSchema);
