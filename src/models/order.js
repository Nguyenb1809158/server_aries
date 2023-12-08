const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    shipper: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipper' },
    promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' ,default: null},
    totalPrice: { type: Number, required: true },
    state: { type: Number ,default: 1 },
    shippingPhone: { type : String },
    shippingAddress: { type : String },
    deliverAt: { type: Date },
    cancelAt: { type: Date },
    completeAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
  });
  
  // Tạo mô hình từ schema
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order