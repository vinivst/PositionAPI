const mongoose = require('mongoose');

const RecomendationSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, 'Please, add a symbol'],
      unique: true,
      trim: true,
      maxlength: [10, 'symbols can not be more than 10 characters']
    },
    buyTrigger: {
      type: Number,
      required: [true, 'Please, add a buy trigger'],
      maxlength: [10, 'Can not be more than 10 characters']
    },
    stopLoss: {
      type: Number,
      required: [true, 'Please, add a stop loss'],
      maxlength: [10, 'Stop Loss can not be more than 10 characters']
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

module.exports = mongoose.model('Recomendation', RecomendationSchema);
