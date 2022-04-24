const knex = require('../database/knex.js');
const userModels = require("./users");

const sitterTable = 'sitter';


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

const find = async(filters) => {
    const result = await knex(sitterTable)
        .where(filters)
        .select('*');
    return result;
}


const getSitters = async (exactFilters, rangeFilters) => {
    const result = await knex(sitterTable)

                         .where(exactFilters)
        .andWhere(function() {
            if(rangeFilters.price != null) {
                this.where('price', '<=', rangeFilters.price);
            }
            if(rangeFilters.age != null) {
                this.where('age', '<=', rangeFilters.age);
            }
        })
                         .select('*');
    return result;
}

const updateSitter = async (id, filters) => {
    const result = await knex(sitterTable)
        .where({id: id})
        .update(filters);
    return result;
}

const deleteUser = async (id) => {
    const result = await knex(sitterTable)
        .where({id: id})
        .del();
    return result;
}


module.exports = {
    createNewUser,
    find,
    getSitters,
    updateSitter,
    deleteUser
}