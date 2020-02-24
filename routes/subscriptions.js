const express = require('express');
const {
  addSubscription,
  getSubscriptions
} = require('../controllers/subscriptions');

const Subscription = require('../models/Subscription');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    authorize('admin'),
    advancedResults(Subscription),
    getSubscriptions
  )
  .post(addSubscription);

/* router
  .route('/:symbol')
  .put(protect, authorize('admin'), updateBuy)
  .delete(protect, authorize('admin'), deleteBuy); */

module.exports = router;
