const mongoose = require('mongoose')
const shipperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type : String},
    hireDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  });
  
  // Tạo mô hình từ schema
  const Shipper = mongoose.model('Shipper', shipperSchema);
  
  module.exports = Shipper;