const jwt = require('jsonwebtoken');
const userModels = require('../models/users.js');
const userController = require('../controllers/users.js');
const sitterModels = require('../models/sitter.js');
const sitterController = require('../controllers/sitter.js');
const crypto = require("crypto");

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

    const doesExist = await userController.doesUserEmailExist(email);
    if (doesExist) {
        return {
            error: 'User already exists'
        }
    }


    const result = await userModels.createNewUser(firstName, lastName, email, hashedPassword,salt, null);
    return result;
}

const createNewSitter = async(firstName, lastName, email, password) => {
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

    const doesExist = await sitterController.doesSitterEmailExist(email);
    if (doesExist) {
        return {
            error: 'User already exists'
        }
    }

    //adjusted to be null at request of Caleb

    const result = await sitterModels.createNewUser(firstName, lastName, email, hashedPassword,salt, null);
    return result;
}

const generateAuthToken = async (email , role) => {

    const accessTokenSecret = 'mysupercoolsecret';
    //determine which lookup based on role
    if(role === 'sitter'){
        console.log("Sitter role");
        const users = await sitterModels.find({email : email});
        const accessToken = jwt.sign({...users[0], claims: [role]}, accessTokenSecret);
        return accessToken;
    }
    else if(role === 'user'){
        console.log("User role");
        const users = await userModels.find({email : email});
        const accessToken = jwt.sign({...users[0], claims: [role]}, accessTokenSecret);
        return accessToken;
    } else {
        return {
            error: 'Invalid role: ' + role
        }
    }

}

const authenticateUser = async (email, password) => {
    //checks to see if valid inputs are entered
    if(email == null || password == null) {
        return {
            error: 'Email or password is missing'
        };
    }
    const users = await userModels.find({email: email});
    console.log('Results of users query', users);
    //checks to see if user exists
    if (users.length === 0) {
        console.error(`No users matched the email: ${email}`);
        return {
            error: 'Invalid credentials'
        };
    }
    //if they do, checks to see if password is correct
    const authentication = await verifyPasswordUser(email, password);
    if(authentication === false){
        console.error(`Password for email: ${email} is incorrect`);
        return {
            error: 'Invalid credentials'
        };
    }
    return {
        error: ''
    };
}

const verifyPasswordUser = async (email, password) => {
    const user = await userModels.find({email: email});
    const storedPassword = user[0].password;
    const salt = user[0].salt;
    const hashedPassword = crypto.createHash('sha256').update(salt + password).digest('hex');
    console.log('Hashed password', hashedPassword);
    console.log('Stored password', storedPassword);

    return storedPassword === hashedPassword;
}

const authenticateSitter = async (email, password) => {
    //checks to see if valid inputs are entered
    if(email == null || password == null) {
        return {
            error: 'Email or password is missing'
        };
    }
    const sitters = await sitterModels.find({email:email});
    console.log('Results of sitter query', sitters);
    //checks to see if user exists
    if (sitters.length === 0) {
        console.error(`No sitters matched the email: ${email}`);
        return {
            error: 'Invalid credentials'
        };
    }
    //if they do, checks to see if password is correct
    const authentication = await verifyPasswordSitter(email, password);
    if(authentication === false){
        console.error(`Password for email: ${email} is incorrect`);
        return {
            error: 'Invalid credentials'
        };
    }
    return {
        error: ''
    };
}

const verifyPasswordSitter = async (email,password) => {
    const sitter = await sitterModels.find({email:email});
    const storedPassword = sitter[0].password;
    const salt = sitter[0].salt;
    const hashedPassword = crypto.createHash('sha256').update(salt + password).digest('hex');
    return storedPassword === hashedPassword;
}

module.exports = {
    authenticateUser,
    authenticateSitter,
    generateAuthToken,
    createNewUser,
    createNewSitter
}