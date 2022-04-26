const sitterModel = require('../models/sitter');
const crypto = require("crypto");
const userModels = require("../models/users");

const doesSitterExist = async (email) => {
 const users = await sitterModel.find({email : email });
 return users.length === 1;
}

const getSitters = async (firstName, lastName, email, id, location, price, age) =>  {
    try {
        //this query can be broken down into multiple queries
        //the first of the exact matches ie firstName, lastName, email, id, location
        //the second of the range matches ie price, age

        //first of the exact matches
        const exactFilters = await getExactFilters(firstName, lastName, email, id, location);

        //second of the range matches
        const rangeFilters = await getRangeFilters(price, age);


        //combine the two filters during the query
        const result = await sitterModel.getSitters(exactFilters, rangeFilters);
        return result;
    } catch (error) {
        console.log(error);
    }

}

const getExactFilters = async (firstName, lastName, email, id, location) => {
    filters = {};

    if(firstName != null && firstName != ''){
        filters.firstName = firstName;
    }
    if(lastName != null && lastName != ''){
        filters.lastName = lastName;
    }
    if(email != null && email != ''){
        filters.email = email;
    }
    if(id != null && id != ''){
        filters.id = id;
    }
    if(location != null && location != ''){
        filters.location = location;
    }
    return filters;
}

const getRangeFilters = async (price, age) => {
    filters = {};
    if(price != null && price != ''){
        filters.price = price;
    }
    if(age != null && age != ''){
        filters.age = age;
    }
    return filters;
}

const updateSitter = async (id, firstName, lastName, email, password, location, price, age, experience, imgurl) => {
    try {

        //the first check is to see if the sitter exists
        //recall all of the other parameters change the values of account
        const sitter = await sitterModel.find({id: id});
        if (sitter.length === 0) {
            return {
                error: "User account Does not exist"
            };
        }
        //checks to see if the user inputed items to change
        if ((firstName == null || firstName == '') && (lastName == null || lastName == '') && (email == null || email == '') && (password == null || password == '') && (location == null || location == '') && (price == null || price == '') && (age == null || age == '') && (experience == null || experience == "") && (imgurl == null || imgurl == '')) {
            return {
                error: "No changes entered"
            };
        }
        //checks to see if another account has the email which the account is being changed to
        if (email != null && email != '') {
            const emailExists = await doesSitterExist(email);
            if (emailExists) {
                return {
                    error: "Changes conflict with existing user"
                };
            }
        }
        //if the password is being changed, the password is hashed
        salt = null //have to declare here.
        if (password != null) {
            if (password == '') {
                password = null; //for filter usage later
            } else {
                salt = 'DB_SALT';
                console.log("Plaintext password: " + password);
                password = crypto.createHash('sha256').update(salt + password).digest('hex');
            }
        }
        console.log("Reached here 1");
        const filters = await getUpdateFilters(firstName, lastName, email, password, salt, imgurl, location, price, age, experience);
        console.log("Reached here 2");
        console.log(filters);
        const result = await sitterModel.updateSitter(id, filters);
        return result;
    } catch (error) {
        console.log(error);
    }

}

const getUpdateFilters = async (firstName, lastName, email, password, salt, imgurl, location, price, age, experience) => {
    const filters = {};
    if(firstName != null && firstName != ''){
        filters.firstName = firstName;
    }
    if(lastName != null && lastName != ''){
        filters.lastName = lastName;
    }
    if(email != null && email != ''){
        filters.email = email;
    }
    if(password != null){
        filters.password = password;
    }
    if(salt != null){
        filters.salt = salt;
    }
    if(imgurl != null && imgurl != ''){
        filters.imgurl = imgurl;
    }
    if(location != null && location != ''){
        filters.location = location;
    }
    if(price != null && price != ''){
        filters.price = price;
    }
    if(age != null && age != ''){
        filters.age = age;
    }
    if(experience != null && experience != ''){
        filters.experience = experience;
    }
    return filters;
}

module.exports = {
    doesSitterExist,
    getSitters,
    updateSitter
}