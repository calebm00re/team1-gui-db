const knex = require('../database/knex.js');
const userModels = require("./users");

const sitterTable = 'sitter';

const find = async(filters) => {
    const result = await knex(sitterTable)
                         .where(filters)
                         .select('*'); //TODO reduce the number of items selected to everything but the password & salt
    return result;
}

const createNewUser = async(firstName, lastName, email, password,salt, imgurl) => {
    const result = await knex(sitterTable)
                         .insert({
                             firstname: firstName,
                             lastname: lastName,
                             email: email,
                             password: password,
                             salt: salt,
                             imgurl: imgurl
                         });
    return result;
}

const updateSitter = async (id, filters) => {
    const result = await knex(sitterTable)
                         .where({id: id})
                         .update(filters);
    return result;
}



module.exports = {
    createNewUser,
    find,
    updateSitter
}