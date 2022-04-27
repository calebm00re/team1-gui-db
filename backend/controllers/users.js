const userModels = require('../models/users.js');
const crypto = require('crypto');

const doesUserEmailExist = async(email) => {
    const sitters = await userModels.find({email: email});
    return sitters.length === 1;
}

const getUsers = async(firstName, lastName, email, id , location, startWorkTime, endWorkTime, minKidAge, maxKidAge, numKids) => {
    try {
        //This query could be broken down into exact matches
        //And range matches

        //first the exact matches
        const exactFilters = await getExactFilters(firstName, lastName, email, id, location);

        //then the range matches
        const rangeFilters = await getRangeFilters(startWorkTime, endWorkTime, minKidAge, maxKidAge, numKids);

        const result = await userModels.getUsers(exactFilters, rangeFilters);
        return result;
    } catch (err) {
        console.log(err);
    }
}

const getExactFilters = async (firstName, lastName, email, id, location) => {
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
    if(!(location == null || location == '')){
        filters.location = location;
    }
    return filters;
}

const getRangeFilters = async (startWorkTime, endWorkTime, minKidAge, maxKidAge, numKids) => {
    filters = {};
    if(!(startWorkTime == null || startWorkTime == '')){
        filters.startWorkTime = startWorkTime;
    }
    if(!(endWorkTime == null || endWorkTime == '')){
        filters.endWorkTime = endWorkTime;
    }
    if(!(minKidAge == null || minKidAge == '')){
        filters.minKidAge = minKidAge;
    }
    if(!(maxKidAge == null || maxKidAge == '')){
        filters.maxKidAge = maxKidAge;
    }
    if(!(numKids == null || numKids == '')){
        filters.numKids = numKids;
    }
    return filters;
}


const updateUser = async(id, firstName, lastName, email, password, bio , imgurl, location, startWorkTime, endWorkTime, minKidAge, maxKidAge, numKids) => {
    try{
        //the first check is to see if the user exists
        //recall all of the other parameters change the values of account
        const user = await userModels.find({id: id});
        if(user.length === 0){
            return {
                error: "User account Does not exist"
            };
        }
        //checks to see if the user inputed items to change
        if((firstName == null || firstName == '') && (lastName == null || lastName == '') && (email == null || email == '') && (password == null || password == '') && (bio == null || bio == '') && (imgurl == null || imgurl == '') && (location == null || location == '') && (startWorkTime == null || startWorkTime == '') && (endWorkTime == null || endWorkTime == '') && (minKidAge == null || minKidAge == '') && (maxKidAge == null || maxKidAge == '') && (numKids == null || numKids == '')){
            return {
                error: "No changes entered"
            };
        }
        //checks to see if another account has the email which the account is being changed to
        if(email != null && email != ''){
            const emailExists = await doesUserEmailExist(email);
            if(emailExists){
                return {
                    error: "Changes conflict with existing user"
                };
            }
        }
        //if the password is being changed, the password is hashed
        salt = null //have to declare here.
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
        const filters = await getUpdateFilters(firstName, lastName, email, bio, password, salt, imgurl, location, startWorkTime, endWorkTime, minKidAge, maxKidAge, numKids);
        console.log("Reached here 2");
        console.log(filters);
        const result = await userModels.updateUser(id, filters);
        return result;

    } catch (error) {
        console.log(error);
    }
}

const getUpdateFilters = async (firstName, lastName, email, bio, password, salt , imgurl , location, startWorkTime, endWorkTime, minKidAge, maxKidAge, numKids) => {
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
    if(!(imgurl == null || imgurl == '')){
        filters.imgurl = imgurl;
    }
    if(!(location == null || location == '')){
        filters.location = location;
    }
    if(!(startWorkTime == null || startWorkTime == '')){
        filters.startWorkTime = startWorkTime;
    }
    if(!(endWorkTime == null || endWorkTime == '')){
        filters.endWorkTime = endWorkTime;
    }
    if(!(minKidAge == null || minKidAge == '')){
        filters.minKidAge = minKidAge;
    }
    if(!(maxKidAge == null || maxKidAge == '')){
        filters.maxKidAge = maxKidAge;
    }
    if(!(numKids == null || numKids == '')){
        filters.numKids = numKids;
    }
    return filters;
}

const deleteUser = async(id) => {
    try{
        const result = await userModels.deleteUser(id);
        return result;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    doesUserEmailExist,
    getUsers,
    deleteUser,
    updateUser
}