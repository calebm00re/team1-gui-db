const knex = require('../database/knex.js');
//const bcrypt = require('bcrypt');
const crypto = require('crypto');

const USER_TABLE = 'users';



const createNewUser = async (firstName, lastName, email, password) => {
    console.log('Raw password:', password);
    //generates a random salt
    const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log('Password salt', salt);
    // const hashedPassword = await bcrypt.hash(password, salt);
    //hashes the password with the salt using sha256
    const hashedPassword = crypto.createHash('sha256').update(salt + password).digest('hex');
    console.log('Hashed password', hashedPassword);
    //checks to see if email given is a valid email
    const isValidEmail = checkIfValid(email);
    if (!isValidEmail) {
        throw new Error('Invalid email');
    }

    //checks to see if the user already exists
    const isNotFirst = await knex(USER_TABLE).where({email: email}).first();
    if (isNotFirst) {
        throw new Error('User already exists');
    }
    //inserts the new user into the database
    const query = knex(USER_TABLE).insert({lastName, firstName, email, password: hashedPassword, salt });
    const result = await query;
    return result;

};

const checkIfValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email });
    const result = await query;
    return result;
}

const authenticateUser = async (email, password) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return false;
    }
    const user = users[0];
 //   const validPassword = await bcrypt.compare(password, user.password);

    const validPassword = crypto.createHash('sha256').update(user.salt + password).digest('hex') === user.password;
    if (validPassword) {
        return true;
    }
    return false;
}

const getUserById = async (id) => {
    const query = knex(USER_TABLE).where({ id });
    const result = await query;
    return result;
}

module.exports = {
    createNewUser,
    findUserByEmail,
    authenticateUser,
    getUserById
};