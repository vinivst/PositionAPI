const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please, add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
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

//Reverse populate with virtuals
PortfolioSchema.virtual('buys', {
  ref: 'Buy',
  localField: '_id',
  foreignField: 'portfolio',
  justOne: false
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
