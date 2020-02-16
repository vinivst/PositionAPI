const express = require('express');
const { getHistory } = require('../controllers/history');

const History = require('../models/History');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(History), getHistory);

module.exports = router;
