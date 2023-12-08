const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên của loại sản phẩm
    description: String, // Mô tả loại sản phẩm (không bắt buộc)
    // Các trường khác mà bạn muốn bổ sung cho loại sản phẩm
  });
  
  // Tạo mô hình từ schema
  const Category = mongoose.model('Category', categorySchema);
  
  module.exports = Category;