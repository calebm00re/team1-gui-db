const userController = require('../controllers/users');
const sitterModel = require('../models/sitter');
const userModels = require("../models/users");
const blockModels = require("../models/block");
const messageModels = require("../models/message");

const getMessages = async(parent_id,sitter_id) =>{
    try{
        const result = await messageModels.getMessagesFromUser(parent_id,sitter_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const postMessage = async (parent_id, sitter_id,message, is_urgent, parent_sent, timestamp) => {
    try{
        const result = await messageModels.postMessage(parent_id, sitter_id,message, is_urgent, parent_sent, timestamp);
        return result;
    }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    getMessages,
    postMessage
}