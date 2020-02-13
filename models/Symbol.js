const mongoose = require('mongoose');
const slugify = require('slugify');

const SymbolSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, 'Please, add a symbol'],
      unique: true,
      trim: true,
      maxlength: [10, 'symbols can not be more than 10 characters']
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

module.exports = mongoose.model('Symbol', SymbolSchema);
