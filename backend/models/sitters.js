const knex = require('../database/knex.js');
const SITTER_TABLE = 'sitter';

const sitterExists = async (sitterID) => {
    const sitter = await knex(SITTER_TABLE).where({ sitterID }).first();
    return sitter ? true : false;
}

module.exports = {
    sitterExists
}
