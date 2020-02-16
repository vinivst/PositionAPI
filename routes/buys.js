const express = require('express');
const {
  getBuys,
  addBuy,
  deleteBuy,
  updateBuy
} = require('../controllers/buys');

const Buy = require('../models/Buy');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(Buy), getBuys)
  .post(protect, authorize('admin'), addBuy);

router
  .route('/:symbol')
  .put(protect, authorize('admin'), updateBuy)
  .delete(protect, authorize('admin'), deleteBuy);

module.exports = router;
