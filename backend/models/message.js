const knex = require('../database/knex.js');
const MESSAGE_TABLE = 'message';

const getMessagesFromUser = async(parentID,sitterID) =>{
    return knex(MESSAGE_TABLE)
        .where('parent_id' , parentID)
        .where('sitter_id', sitterID)
        .orderBy('timestamp');
}

const postMessage = async(parent_id, sitter_id,message, is_urgent, parent_sent, timestamp)=>{
    const result = await knex(MESSAGE_TABLE)
        .insert({
            parent_id: parent_id,
            sitter_id: sitter_id,
            message: message,
            is_urgent: is_urgent,
            parent_sent: parent_sent,
            timestamp: timestamp
        });
    return result;
}

module.exports = {
    getMessagesFromUser,
    postMessage
};