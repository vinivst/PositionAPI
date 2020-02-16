const express = require('express');
const {
  getRecomendations,
  addRecomendation,
  deleteRecomendation
} = require('../controllers/recomendations');

const Recomendation = require('../models/Recomendation');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//Import protect middleware from auth.js
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    authorize('admin'),
    advancedResults(Recomendation),
    getRecomendations
  )
  .post(protect, authorize('admin'), addRecomendation);

router
  .route('/:symbol')
  .delete(protect, authorize('admin'), deleteRecomendation);

module.exports = router;
