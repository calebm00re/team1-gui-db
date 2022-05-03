const knex = require('../database/knex.js');
const MESSAGE_TABLE = 'message';

const postMessage = async(parent_id,sitter_id,message,parent_sent, is_urgent) => {
    const result = await knex(MESSAGE_TABLE)
        .insert({
            parent_id,
            sitter_id,
            message,
            is_urgent,
            parent_sent,
            timestamp: new Date().toISOString()
        });

    return result;
}

const getMessagesFromUser = async(filter) => {
    return knex(MESSAGE_TABLE)
        .where(filter)
        .select('*')
        .orderBy('timestamp', 'desc');
}


module.exports = {
    getMessagesFromUser,
    postMessage
};