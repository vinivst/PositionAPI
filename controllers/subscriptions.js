const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');

// @desc        Get all subscriptions
// @route       GET /api/v1/subscriptions
// @access      Private
exports.getSubscriptions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Update Subscription Status
// @route       POST /api/v1/subscriptions
// @access      Private
exports.addSubscription = asyncHandler(async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const signature = req.header('X-WC-Webhook-Signature');

  const hash = crypto
    .createHmac('SHA256', secret)
    .update(req.rawBody)
    .digest('base64');

  if (hash === signature) {
    console.log(req.body);

    /*const subscription = await Subscription.findOneAndUpdate({
        phone: req.root.billing.phone
    });*/

    res.status(200).json({
      match: true
    });
  } else {
    console.log('math: false');
    res.status(401).json({
      match: false
    });
  }
});
