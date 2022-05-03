const knex = require('../database/knex.js');

rateTable = 'rate_parent';

const createNewRating = async (sitterID, parentID, rating, comment) => {
    console.log("sitterID: ", sitterID);
    const result = await knex(rateTable).insert({
        sitter_id: 19,
        parent_id: parentID,
        rating: rating,
        comment: comment,
        time_stamp: new Date().toISOString()
    });
    return result;
};

module.exports = {
    createNewRating
};