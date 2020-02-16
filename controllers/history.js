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

// @desc        Get Variation
// @route       GET /api/v1/history/variation
// @access      Private
exports.getVariation = asyncHandler(async (req, res, next) => {
  let variation = 1;
  const history = await History.find();

  history.forEach(element => {
    variation = parseFloat(
      (variation * (element.variation / 100 + 1)).toFixed(4)
    );
  });

  res.status(200).json({
    success: true,
    data: variation
  });
});
