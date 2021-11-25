const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllUsersPlaylistbyId = async(client, user_id) => {
    const { rows } = await client.query(
        `
        SELECT p.id, p.title, p.description 
        FROM "like" as "l"
        JOIN
        "playlist" as "p"
        ON l.playlist_id = p.id
        WHERE user_id = $1
        `
        ,[user_id]
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

module.exports = { getAllUsersPlaylistbyId };