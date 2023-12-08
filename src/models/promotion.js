const mongoose = require('mongoose');
const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date},
  discountPercentage: {type : Number},
  isActive: { type: Boolean, default: true },

});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;