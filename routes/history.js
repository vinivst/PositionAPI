const express = require('express');
const { getHistory } = require('../controllers/history');

const History = require('../models/History');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(advancedResults(History), getHistory);
//   .post(addBuy);
//.post(protect, authorize('publisher', 'admin'), createBootcamp);

/* router
  .route('/:symbol')
  //.get(getBootcamp)
  //.put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .put(updateBuy)
  .delete(deleteBuy); */

module.exports = router;
