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
  .get(advancedResults(Recomendation), getRecomendations)
  .post(addRecomendation);
//.post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:symbol')
  //.get(getBootcamp)
  //.put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(deleteRecomendation);

module.exports = router;
