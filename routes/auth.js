const express = require('express');
const { login } = require('../controllers/auth');

const router = express.Router();

//Import protect middleware from auth.js
const { protect } = require('../middleware/auth');

router.route('/login').post(login);

module.exports = router;
