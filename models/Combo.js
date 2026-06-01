import mongoose from 'mongoose';

const ComboSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g. COMBO NGHỆ THUẬT 01
  title: { type: String, required: true }, // e.g. Bộ Sưu Tập Trà Chiều Hoàng Gia
  desc: { type: String },
  bannerImage: { type: String },
  quote: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Combo', ComboSchema);
