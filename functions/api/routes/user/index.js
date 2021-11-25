const express = require('express');
const router = express.Router();

router.get('/:userId', require('./userGET'))

module.exports = router;