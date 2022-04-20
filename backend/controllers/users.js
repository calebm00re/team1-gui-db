const userModels = require('../models/users.js');

const getFilters = async (firstName, lastName, email, id) => {
    filters = {};
    if(!(firstName == null || firstName == '')){
        filters.firstName = firstName;
    }
    if(!(lastName == null || lastName == '')){
        filters.lastName = lastName;
    }
    if(!(email == null || email == '')){
        filters.email = email;
    }
    if(!(id == null || id == '')){
        filters.id = id;
    }
    return filters;
}

const getUsers = async(firstName, lastName, email, id) => {
    try{
        const filters = await getFilters(firstName, lastName, email, id);
        const users = await userModels.getUsers(filters);
        return users;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getUsers
}