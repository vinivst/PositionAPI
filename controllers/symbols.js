const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Symbol = require('../models/Symbol');

// @desc        Get all symbols
// @route       GET /api/v1/symbols
// @access      Public
exports.getSymbols = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
