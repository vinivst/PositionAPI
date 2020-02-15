const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Buy = require('../models/Buy');

// @desc        Get all buys
// @route       GET /api/v1/buys
// @access      Private
exports.getBuys = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Add Buy
// @route       POST /api/v1/buys
// @access      Private
exports.addBuy = asyncHandler(async (req, res, next) => {
  const buy = await Buy.create(req.body);

  res.status(201).json({
    success: true,
    data: buy
  });
});

// @desc        Update Buy
// @route       PUT /api/v1/buys/:symbol
// @access      Private
exports.updateBuy = asyncHandler(async (req, res, next) => {
  let buy = await Buy.findOne({ symbol: req.params.symbol });

  if (!buy) {
    return next(
      new ErrorResponse(`There is no buy for ${req.params.symbol}`, 404)
    );
  }

  buy = await Buy.findByIdAndUpdate(buy._id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: buy
  });
});

// @desc        Delete Buy
// @route       DELETE /api/v1/buys/:symbol
// @access      Private
exports.deleteBuy = asyncHandler(async (req, res, next) => {
  const buy = await Buy.findOne({
    symbol: req.params.symbol
  });

  if (!buy) {
    return next(
      new ErrorResponse(`There is no buy for ${req.params.symbol}`, 404)
    );
  }

  buy.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
