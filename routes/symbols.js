const express = require('express');
const { getSymbols } = require('../controllers/symbols');

const Symbol = require('../models/Symbol');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(advancedResults(Symbol), getSymbols);
//.post(protect, authorize('publisher', 'admin'), createBootcamp);

/* router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp); */

module.exports = router;
