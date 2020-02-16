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
  .get(advancedResults(Portfolio, 'buys'), getPortfolios)
  .post(addPortfolio);
//.post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id').get(getPortfolio);
//   .put(protect, authorize('publisher', 'admin'), updateBootcamp)
//   .put(updateBuy)
//   .delete(deleteBuy);

module.exports = router;
