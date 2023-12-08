const mongoose = require('mongoose');
const changepasswordSchema = new mongoose.Schema({
    code: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  });
  
  // Tạo mô hình từ schema
  const ChangePassword = mongoose.model('ChangePassword', changepasswordSchema);
  
  // Xuất mô hình Admin để sử dụng ở những nơi khác 
  module.exports = ChangePassword;