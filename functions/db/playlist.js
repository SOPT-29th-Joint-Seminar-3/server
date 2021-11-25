const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const createPlaylist = async(client, title, description) => {
    const { rows } = await client.query(
        `
        INSERT INTO playlist(title, description)
        VALUES ($1, $2)
        RETURNING *
        `
        ,[title, description]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
}

const getPlaylistById = async(client, playlist_id) => {
    const { rows } = await client.query(
        `
        SELECT * FROM playlist
        WHERE id = $1
        `
        ,[playlist_id]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
}

const getPlaylistSongsById = async(client, playlist_id) => {
    const { rows } = await client.query(
        `
        SELECT s.name, s.singer
        FROM "playlist_song" as "p"
        JOIN "song" as "s"
        ON p.song_id = s.id
        WHERE p.playlist_id = $1
        `
        ,[playlist_id]
    );
    return convertSnakeToCamel.keysToCamel(rows);
}
const createPlaylistLike = async(client, user_id, playlist_id) => {
    const { rows } = await client.query(
        `
        INSERT INTO "like"(user_id, playlist_id)
        VALUES ($1, $2)
        RETURNING *
        `
        ,[user_id, playlist_id]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
}





module.exports = { createPlaylist, getPlaylistById, getPlaylistSongsById, createPlaylistLike };