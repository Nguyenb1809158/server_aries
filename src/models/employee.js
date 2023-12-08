const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    hireDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  });
  
  // Tạo mô hình từ schema
  const Employee = mongoose.model('Employee', employeeSchema);
  
  module.exports = Employee;