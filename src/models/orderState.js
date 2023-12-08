const mongoose = require('mongoose');
const orderStateSchema = new mongoose.Schema({
    state: { type: String, required: true }, // Tên của màu
    id_state : {type: String, required: true}
  });
  
  // Tạo mô hình từ schema
  const OrderState = mongoose.model('OrderState', orderStateSchema);
  
  module.exports = OrderState;