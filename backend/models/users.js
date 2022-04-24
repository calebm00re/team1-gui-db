const knex = require('../database/knex.js');
//const bcrypt = require('bcrypt');
const crypto = require('crypto');

const USER_TABLE = 'users';

const isUnique = async (email) => {
  const user = await knex(USER_TABLE).where({email}).first();
  return user ? false : true;
};



const createNewUser = async (firstName, lastName, email, hashedPassword , salt, imgurl) => {
    //inserts the new user into the database
    const query = knex(USER_TABLE).insert({lastName, firstName, email, password: hashedPassword, salt, imgurl});
    const result = await query;
    //adds the error property to the result object when there isn't an errorresult["error"] = "none";
    return result;
};



const findUserByEmail = async (email) => {
    const query = knex(USER_TABLE).where({ email });
    const result = await query;
    return result;
}

const authenticateUser = async (email, password) => {
    const users = await findUserByEmail(email);
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

getIDFromEmail = async (email) => { //so, this doesn't work when I set it to be constant
    const users = await findUserByEmail(email); //checks that email is valid
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return -1;
    }
    const user = users[0];
    return user.id;
}

const getUsers = async (filters) => {
    return knex(USER_TABLE)
        .where(filters)
        .select('id', 'firstName', 'lastName', 'email','bio', 'imgurl');
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
    isUnique,
    createNewUser,
    findUserByEmail,
    authenticateUser,
    getUserById,
    getIDFromEmail,
    getUsers,
    deleteUser,
    updateUser
};