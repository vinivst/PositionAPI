const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//const Buy = require('../models/Buy');

// @desc        Add new subscription
// @route       POST /api/v1/subscriptions
// @access      Private
exports.addSubscription = asyncHandler(async (req, res, next) => {
  console.log(req);
  res.status(200).json(req);
});
