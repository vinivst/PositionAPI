const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Recomendation = require('../models/Recomendation');

// @desc        Get all recomendations
// @route       GET /api/v1/recomendations
// @access      Private
exports.getRecomendations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Add Recomendation
// @route       POST /api/v1/recomendations
// @access      Private
exports.addRecomendation = asyncHandler(async (req, res, next) => {
  const recomendation = await Recomendation.create(req.body);

  res.status(201).json({
    success: true,
    data: recomendation
  });
});

// @desc        Delete Recomendation
// @route       DELETE /api/v1/recomendations/:symbol
// @access      Private
exports.deleteRecomendation = asyncHandler(async (req, res, next) => {
  const recomendation = await Recomendation.findOne({
    symbol: req.params.symbol
  });

  if (!recomendation) {
    return next(
      new ErrorResponse(
        `There is no recomendation for ${req.params.symbol}`,
        404
      )
    );
  }

  recomendation.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
