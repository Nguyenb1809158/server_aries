const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    name: { type : String},
    birth: { type : Date},
    gender: { type : Boolean},
    phone: { type : String},
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],//bình thường là {} nhưng do có thể có nhiều địa chỉ nên []
    createAt: {type:Date,default:Date.now},
    updateAt: {type:Date,default:Date.now}
  });
  
  const Customer = mongoose.model('Customer', customerSchema);
  
  module.exports = Customer
