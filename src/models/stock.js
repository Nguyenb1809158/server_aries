const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductColor' },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductSize' },
    quantityInStock: { type: Number, default: 0 }, // Thêm trường số lượng tồn kho
  });
  
  const Stock = mongoose.model('Stock', stockSchema);
  
  module.exports = Stock;