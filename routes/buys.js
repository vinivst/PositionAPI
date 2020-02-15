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
  .get(advancedResults(Buy), getBuys)
  .post(addBuy);
//.post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:symbol')
  //.get(getBootcamp)
  //.put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .put(updateBuy)
  .delete(deleteBuy);

module.exports = router;
