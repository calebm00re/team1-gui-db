const knex = require('../database/knex.js');

const blockSitter = async (parentID, sitterID) => {
    const result = await knex('block').insert({
        parent_id: parentID,
        sitter_id: sitterID
    });
    return result;
}

const blockList = async (parentID, sitterID) => {
    const result = await knex('block').where({parent_id: parentID, sitter_id: sitterID});
    return result;
}

module.exports = {
    blockSitter,
    blockList
}