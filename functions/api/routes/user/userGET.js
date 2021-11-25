const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { likeDB } = require('../../../db');

module.exports = async (req, res) => {

    let client;
    const { userId } = req.params;
    
    try {
        client = await db.connect(req);
        const likes = await likeDB.getAllUsersPlaylistbyId(client,userId);
        const counts = {
            "likeCount": 55,
		    "saveCount" :12,
		    "recentPlayedCount": 127,
		    "mostPlayedCount": 87
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ALL_USERS_SUCCESS, { ...counts, likes }));
    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};