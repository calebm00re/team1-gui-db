const knex = require('../database/knex.js');
// const bcrypt = require('bcrypt');

const USER_TABLE = 'users';



const createNewUser = async (firstName, lastName, email, password) => {
    console.log('Raw password:', password);
 //   const salt = await bcrypt.genSalt(10);
    const salt = "salt";
    console.log('Password salt', salt);
    // const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPassword = password;
    console.log('Hashed password', hashedPassword);

    //checks to see if the user already exists
    const user = await knex(USER_TABLE).where({email: email}).first();
    if (user) {
        throw new Error('User already exists');
    }
    //inserts the new user into the database
    const query = knex(USER_TABLE).insert({lastName, firstName, email, password: hashedPassword });
    const result = await query;
    return result;

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
    const validPassword = password === user.password;
    if (validPassword) {
        return true;
    }
    return false;
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


module.exports = {
    createNewUser,
    findUserByEmail,
    authenticateUser
};