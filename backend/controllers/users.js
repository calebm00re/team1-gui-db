const userModels = require('../models/users.js');
const crypto = require("crypto");
const knex = require("../database/knex");
//const {NULL} = require("mysql/lib/protocol/constants/types");


//checks if the email entered is valid
const checkIfValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("Is valid email:", re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
};


const createNewUser = async (firstName, lastName, email, password) => {
    if(firstName == null || lastName == null || email == null || password == null){
        return {
            error: "Incomplete input"
        }
    }
    console.log('Raw password:', password);
    //generates a random salt
    const salt = "DB_SALT";
    console.log('Password salt', salt);
    // const hashedPassword = await bcrypt.hash(password, salt);
    //hashes the password with the salt using sha256
    const hashedPassword = crypto.createHash('sha256').update(salt + password).digest('hex');
    console.log('Hashed password', hashedPassword);
    //checks to see if email given is a valid email
    const isValidEmail = checkIfValid(email);
    if (!isValidEmail) {
        return {
            error: 'Invalid email'
        }
    }

    //checks to see if the user already exists

    const isUnique = await userModels.isUnique(email);
    if (!isUnique) {
        return {
            error: 'User already exists'
        }
    }

    const result = await userModels.createNewUser(firstName, lastName, email, hashedPassword,salt);
    return result;
}

module.exports = {
    createNewUser
}