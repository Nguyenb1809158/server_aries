const mongoose = require('mongoose');
const productSizeSchema = new mongoose.Schema({
    size: { type: String, required: true },
    description: { type: String }, // mô tả kích thước
  })
  
  // Tạo mô hình từ schema
  const ProductSize = mongoose.model('ProductSize', productSizeSchema);
  
  module.exports = ProductSize;