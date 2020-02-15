const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, 'Please, add a symbol'],
      trim: true,
      maxlength: [10, 'symbols can not be more than 10 characters']
    },
    buyPrice: {
      type: Number,
      required: [true, 'Please, add a buy price'],
      maxlength: [10, 'Can not be more than 10 characters']
    },
    sellPrice: {
      type: Number,
      required: [true, 'Please, add a stop loss'],
      maxlength: [10, 'Stop Loss can not be more than 10 characters']
    },
    variation: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('History', HistorySchema);
