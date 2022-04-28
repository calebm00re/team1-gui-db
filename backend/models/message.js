const knex = require('../database/knex.js');
const MESSAGE_TABLE = 'message';

const getMessagesFromUser = async(filter) => {
    return knex(MESSAGE_TABLE)
        .where(filter)
        .select('*');
}

const postMessage = async(parent_id,sitter_id,message,is_urgent,parent_sent,timeStamp)=>{
    const result = await knex(MESSAGE_TABLE)
        .insert(
            parent_id,
            sitter_id,
            message,
            is_urgent,
            parent_sent,
            timeStamp
        );
    return result;
}

module.exports = {
    getMessagesFromUser,
    postMessage
};