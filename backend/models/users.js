const knex = require('../database/knex.js');
//const bcrypt = require('bcrypt');
const crypto = require('crypto');

const USER_TABLE = 'users';


const createNewUser = async (firstName, lastName, email, hashedPassword , salt, imgurl) => {
    //inserts the new user into the database
    const result = await knex(USER_TABLE)
        .insert({
            lastName,
            firstName,
            email, password: hashedPassword,
            salt,
            imgurl
        });
    //adds the error property to the result object when there isn't an errorresult["error"] = "none";
    return result;
};

//This is the basic lookup function (useful for basic things)
const find = async(filters) => {
    const result = await knex(USER_TABLE)
        .where(filters)
        .select('*');
    return result;
};


//This is the through search function
const getUsers = async (exactFilters, rangeFilters) => {
    return knex(USER_TABLE)
        .where(exactFilters)
        .andWhere(function() {
            if(rangeFilters.startWorkTime != null){
                this.where('startWorkTime', '>=', rangeFilters.startWorkTime);
            }
            if(rangeFilters.endWorkTime != null){
                this.where('endWorkTime', '<=', rangeFilters.endWorkTime);
            }
            if(rangeFilters.minKidAge != null){
                this.where('minKidAge', '>=', rangeFilters.minKidAge);
            }
            if(rangeFilters.maxKidAge != null){
                this.where('maxKidAge', '<=', rangeFilters.maxKidAge);
            }
            if(rangeFilters.numKids != null){
                this.where('numKids', '<=', rangeFilters.numKids);
            }
        })
        .select('*');
}

const updateUser = async (id, filters) => {
    return knex(USER_TABLE)
        .where({ id })
        .update(filters);
}

const deleteUser = async(id) => {
    const query = knex(USER_TABLE).where({id}).del();
    const result = await query;
    return result;
}


module.exports = {
    createNewUser,
    find,
    getUsers,
    deleteUser,
    updateUser
};