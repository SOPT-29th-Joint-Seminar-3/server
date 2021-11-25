const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/playlist', require('./playlist'));
module.exports = router;