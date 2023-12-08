const mongoose = require('mongoose');
  // Định nghĩa schema cho mô hình giỏ hàng tổng thể
  const cartSchema = new mongoose.Schema({
    id_customer : {type : String},
    quantity: { type: Number, required: true }, // Số lượng sản phẩm
    size : { type: mongoose.Schema.Types.ObjectId, ref: 'ProductSize' },
    color : { type: mongoose.Schema.Types.ObjectId, ref: 'ProductColor' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Tên sản phẩm
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart