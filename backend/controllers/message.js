const userController = require('../controllers/users');
const sitterModel = require('../models/sitter');
const userModels = require("../models/users");
const blockModels = require("../models/block");
const messageModels = require("../models/message");

const getMessages = async(id,otherID) =>{
    try{

        const result = await messageModels.getMessagesFromUser(id,otherID);
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMessages
}