const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
let { PythonShell } = require('python-shell');

// @desc        Get all subscriptions
// @route       GET /api/v1/subscriptions
// @access      Private
exports.getSubscriptions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Update Subscription Status
// @route       POST /api/v1/subscriptions
// @access      Private
exports.addSubscription = asyncHandler(async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const signature = req.header('X-WC-Webhook-Signature');

  const hash = crypto
    .createHmac('SHA256', secret)
    .update(req.rawBody)
    .digest('base64');

  if (hash === signature) {
    if (req.body.status == 'pending') {
      const subscription = await Subscription.create({
        phone: req.body.billing.phone,
        status: req.body.status,
        first_name: req.body.billing.first_name,
        last_name: req.body.billing.last_name,
        email: req.body.billing.email
      });

      res.status(200).json({
        match: true,
        data: subscription
      });
    } else if (req.body.status == 'active') {
      const subscription = await Subscription.findOneAndUpdate(
        {
          phone: req.body.billing.phone
        },
        { status: req.body.status },
        {
          new: true
        }
      );

      //Faz chamada a API do Telegram para adicionar número no canal
      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '../utils/',
        args: [
          req.body.billing.phone,
          req.body.billing.first_name,
          req.body.billing.last_name
        ]
      };

      PythonShell.run('addUserTelegram.py', options, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
      });

      res.status(200).json({
        match: true,
        data: subscription
      });
    } else if (req.body.status == 'pending-cancel') {
      const subscription = await Subscription.findOneAndUpdate(
        {
          phone: req.body.billing.phone
        },
        { status: req.body.status },
        {
          new: true
        }
      );

      res.status(200).json({
        match: true,
        data: subscription
      });
    } else if (req.body.status == 'on-hold') {
      const subscription = await Subscription.findOneAndUpdate(
        {
          phone: req.body.billing.phone
        },
        { status: req.body.status },
        {
          new: true
        }
      );

      //Faz chamada a API do Telegram para remover número no canal
      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '../utils/',
        args: [
          req.body.billing.phone,
          req.body.billing.first_name,
          req.body.billing.last_name
        ]
      };

      PythonShell.run('banUserTelegram.py', options, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
      });

      res.status(200).json({
        match: true,
        data: subscription
      });
    } else if (req.body.status == 'cancelled') {
      const subscription = await Subscription.findOneAndDelete({
        phone: req.body.billing.phone
      });

      //Faz chamada a API do Telegram para remover número no canal
      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '../utils/',
        args: [
          req.body.billing.phone,
          req.body.billing.first_name,
          req.body.billing.last_name
        ]
      };

      PythonShell.run('banUserTelegram.py', options, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
      });

      res.status(200).json({
        match: true,
        data: subscription
      });
    }
  } else {
    res.status(401).json({
      match: false
    });
  }
});
