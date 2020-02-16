const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Portfolio = require('../models/Portfolio');

// @desc        Get all portfolios
// @route       GET /api/v1/portfolios
// @access      Private
exports.getPortfolios = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Get single portfolio
// @route       GET /api/v1/portfolio/:id
// @access      Private
exports.getPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id).populate('buys');

  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: portfolio
  });
});

// @desc        Add Portfolio
// @route       POST /api/v1/portfolios
// @access      Private
exports.addPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.create(req.body);

  res.status(201).json({
    success: true,
    data: portfolio
  });
});
