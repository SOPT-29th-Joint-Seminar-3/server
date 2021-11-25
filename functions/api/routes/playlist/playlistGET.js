const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { playlistDB } = require('../../../db');

module.exports = async (req, res) => {

    let client;
    const { playlistId } = req.params;
    
    try {
        client = await db.connect(req);
        const playlist = await playlistDB.getPlaylistById(client,playlistId);
        const songs = await playlistDB.getPlaylistSongsById(client, playlistId);
        const total = songs.length;
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ALL_USERS_SUCCESS, { ...playlist, total, songs }));
    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};