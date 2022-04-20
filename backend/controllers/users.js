const userModels = require('../models/users.js');
const crypto = require('crypto');

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

const getUpdateFilters = async (firstName, lastName, email, bio, password, salt) => {
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
    if(!(bio == null || bio == '')){
        filters.bio = bio;
    }
    if(!(password == null || password == '')){
        filters.password = password;
        filters.salt = salt;
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

const userDoesExist = async(firstName, lastName, email, id) => {
    try{
        const filters = await getFilters(firstName, lastName, email, id);
        const users = await userModels.getUsers(filters);
        if(users.length === 1){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(id) => {
    try{
        const result = await userModels.deleteUser(id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async(id, firstName, lastName, email, password, bio) => {
    try{
        salt = null //have to declare here.
        //the first check is to see if the user exists
        //recall all of the other parameters change the values of account
        const userExists = await userDoesExist(null, null, null, id);
        if(!userExists){
            return {
                error: "User account Does not exist"
            };
        }
        //checks to see if the user inputed items to change
        if((firstName == null || firstName == '') && (lastName == null || lastName == '') && (email == null || email == '') && (password == null || password == '') && (bio == null || bio == '')){
            return {
                error: "No changes entered"
            };
        }
        //checks to see if another account has the email which the account is being changed to
        if(email != null && email != ''){
            const emailExists = await userDoesExist(null, null, email, null);
            if(emailExists){
                return {
                    error: "Changes conflict with existing user"
                };
            }
        }
        //if the password is being changed, the password is hashed
        if(password != null){
            if(password == ''){
                password = null;
            } else {
                salt = 'DB_SALT';
                console.log("Plaintext password: " + password);
                password = crypto.createHash('sha256').update(salt + password).digest('hex');
            }
        }
        console.log("Reached here 1");
        const filters = await getUpdateFilters(firstName, lastName, email, bio, password, salt);
        console.log("Reached here 2");
        console.log(filters);
        const result = await userModels.updateUser(id, filters);
        return result;

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getUsers,
    userDoesExist,
    deleteUser,
    updateUser
}