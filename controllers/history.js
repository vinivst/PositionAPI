const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const History = require('../models/History');

// @desc        Get all history
// @route       GET /api/v1/history
// @access      Private
exports.getHistory = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
