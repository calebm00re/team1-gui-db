const knex = require('../database/knex.js');
//const bcrypt = require('bcrypt');
const crypto = require('crypto');

const USER_TABLE = 'users';



const createNewUser = async (firstName, lastName, email, password) => {
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

    const isNotFirst = await knex(USER_TABLE).where({email: email}).first();
    if (isNotFirst) {
        return {
            error: 'User already exists'
        }
    }
    //inserts the new user into the database
    const query = knex(USER_TABLE).insert({lastName, firstName, email, password: hashedPassword, salt });
    const result = await query;
    //adds the error property to the result object when there isn't an error
    result['error'] = "none";
    return result;

};

const checkIfValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("Is valid email:", re.test(String(email).toLowerCase()));
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

getIDFromEmail = async (email) => { //so, this doesn't work when I set it to be constant
    const users = await findUserByEmail(email); //checks that email is valid
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return -1;
    }
    const user = users[0];
    return user.id;
}



module.exports = {
    createNewUser,
    findUserByEmail,
    authenticateUser,
    getIDFromEmail
};