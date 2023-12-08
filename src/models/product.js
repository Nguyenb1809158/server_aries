const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Number},
    imageUrl: [String],
    createdAt: { type: Date, default: Date.now },
  });
  
  // Tạo mô hình từ schema
  const Product = mongoose.model('Product', productSchema);
  
  module.exports = Product;