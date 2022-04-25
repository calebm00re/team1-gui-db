const knex = require('../database/knex.js');
const MESSAGE_TABLE = 'message';

const getMessagesFromUser = async(parentID,sitterID) =>{
    return knex(MESSAGE_TABLE)
        .where('parent_id' , parentID)
        .where('sitter_id', sitterID);
}
module.exports = {
    getMessagesFromUser
};