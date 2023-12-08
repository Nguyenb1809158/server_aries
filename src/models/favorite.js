const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm yêu thích
const favoriteSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Tham chiếu đến mô hình người dùng
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Tham chiếu đến mô hình sản phẩm mảng là vì có thể có nhiều
});

// Tạo mô hình từ schema
const Favorite = mongoose.model('FavoriteProduct', favoriteSchema);

module.exports = Favorite;