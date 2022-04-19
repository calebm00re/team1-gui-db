const jwt = require('jsonwebtoken');
const userModels = require('../models/users.js');

const generateAuthToken = async (email,role) => {

    const accessTokenSecret = 'The President\'s Scholar stole the President\'s cake';
    const users = await userModels.findUserByEmail(email);
    //TODO claims when roles are implemented
    const accessToken = jwt.sign({...users[0], claims: [role]}, accessTokenSecret);
    return accessToken;

}

const authenticateUser = async (email, password) => {
    //checks to see if valid inputs are entered
    if(email == null || password == null) {
        return {
            error: 'Email or password is missing'
        }
    }
    const users = await userModels.findUserByEmail(email);
    console.log('Results of users query', users);
    //checks to see if user exists
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return {
            error: 'Invalid credentials'
        }
    }
    //if they do, checks to see if password is correct
    const authentication = await userModels.authenticateUser(email, password);
    if(authentication === false){
        console.error(`Password for email: ${email} is incorrect`);
        return {
            error: 'Invalid credentials'
        }
    }
    return {
        error: ''
    }
}

module.exports = {
    authenticateUser
}