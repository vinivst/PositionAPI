const mongoose = require('mongoose');

const BuySchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, 'Please, add a symbol'],
      unique: true,
      trim: true,
      maxlength: [10, 'symbols can not be more than 10 characters']
    },
    buyPrice: {
      type: Number,
      required: [true, 'Please, add a buy price'],
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

//Cascade delete recomendation when a buy is created
BuySchema.pre('save', async function(next) {
  await this.model('Recomendation').deleteOne({
    symbol: this.symbol
  });
  next();
});

//Cascade add history when a buy is deleted
BuySchema.pre('remove', async function(next) {
  await this.model('History').create({
    symbol: this.symbol,
    buyPrice: this.buyPrice,
    sellPrice: this.stopLoss,
    variation: parseFloat(
      ((this.stopLoss / this.buyPrice - 1) * 100).toFixed(2)
    )
  });
  next();
});

module.exports = mongoose.model('Buy', BuySchema);
