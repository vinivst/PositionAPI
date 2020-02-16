const express = require('express');
const { getSymbols } = require('../controllers/symbols');

const Symbol = require('../models/Symbol');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(Symbol), getSymbols);

module.exports = router;
