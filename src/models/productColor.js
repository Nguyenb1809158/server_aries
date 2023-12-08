const mongoose = require('mongoose');
const productColorSchema = new mongoose.Schema({
    color: { type: String, required: true }, // Tên của màu
  })
  
  // Tạo mô hình từ schema
  const ProductColor = mongoose.model('ProductColor', productColorSchema);
  
  module.exports = ProductColor;