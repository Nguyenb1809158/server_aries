const mongoose = require('mongoose');

// Định nghĩa schema cho chi tiết đơn hàng
const orderDetailSchema = new mongoose.Schema({
  id_order : {type : String},
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Tên sản phẩm
  quantity: { type: Number, required: true }, // Số lượng sản phẩm
  price: {type: Number},
  size : { type: mongoose.Schema.Types.ObjectId, ref: 'ProductSize' },
  color : { type: mongoose.Schema.Types.ObjectId, ref: 'ProductColor' },
});

// Tạo mô hình từ schema
const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;