const mongoose = require('mongoose');
// Định nghĩa schema cho mô hình sản phẩm
const imageProductSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
});

// Tạo mô hình từ schema
const imageProduct = mongoose.model('ImageProduct', imageProductSchema);

module.exports = imageProduct;