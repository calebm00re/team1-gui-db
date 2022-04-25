const knex = require('../database/knex.js');
const SITTER_TABLE = 'sitter';

//This file will need to exist at some point that is not now.
/*
const sitterExists = async (sitterID) => {
    const sitter = await knex(SITTER_TABLE).where({ sitterID }).first();
    return sitter ? true : false;
}
 */

module.exports = {
   // sitterExists
}
