const knex = require('../database/knex.js');

rateTable = 'rate_parent';

const createNewRating = async (sitterID, parentID, rating, comment) => {
    const result = await knex(rateTable).insert({
        sitter_id: sitterID,
        parent_id: parentID,
        rating: rating,
        comment: comment,
        time_stamp: new Date().toISOString()
    });
    return result;
};

const getPosts = async (filter, date) => {
    console.log(filter);
    console.log(date);
    const result = await knex(rateTable)
        .where(filter)
        .where(function() {
            if(date != null){
                this.where('time_stamp', '>=', date)
                    .andWhere('time_stamp', '<=', date + ' 23:59:59');
            }
        })
        .orderBy('time_stamp', 'desc');
    return result;
};

module.exports = {
    createNewRating,
    getPosts
};