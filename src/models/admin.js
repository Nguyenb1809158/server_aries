const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  // Tạo mô hình từ schema
  const Admin = mongoose.model('Admin', adminSchema);
  
  // Xuất mô hình Admin để sử dụng ở những nơi khác trong mã của bạn
  module.exports = Admin;