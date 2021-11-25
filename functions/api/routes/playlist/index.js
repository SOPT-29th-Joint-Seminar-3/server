const express = require('express');
const router = express.Router();

router.post('/', require('./playlistPOST'));
router.get('/:playlistId', require('./playlistGET'));
router.post('/:playlistId/like',require('./playlistLikePOST'));

module.exports = router;