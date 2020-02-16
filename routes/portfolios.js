const express = require('express');
const {
  getPortfolios,
  getPortfolio,
  addPortfolio
} = require('../controllers/portfolios');

const Portfolio = require('../models/Portfolio');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    authorize('admin'),
    advancedResults(Portfolio, 'buys'),
    getPortfolios
  )
  .post(protect, authorize('admin'), addPortfolio);

router.route('/:id').get(protect, authorize('admin'), getPortfolio);

module.exports = router;
