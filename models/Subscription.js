const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: [true, 'Please, add a phone number'],
      unique: true,
      trim: true
    },
    status: {
      type: String,
      required: [true, 'Please, add a status']
    },
    first_name: {
      type: String,
      required: [true, 'Please, add a First Name']
    },
    last_name: {
      type: String,
      required: [true, 'Please, add a Last Name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
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

module.exports = mongoose.model('Subscription', SubscriptionSchema);
