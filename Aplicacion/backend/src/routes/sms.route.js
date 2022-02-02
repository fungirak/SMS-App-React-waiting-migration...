const express = require('express');
const router = express.Router();
require('dotenv').config();
const smsController = require('../controllers/sms.controller');


// Rutas
router.post('/sms', smsController.newSms );
// router.post('/MessageStatus', smsController.notification);

module.exports = router;