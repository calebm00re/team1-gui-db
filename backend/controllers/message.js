const userController = require('../controllers/users');
const sitterModel = require('../models/sitter');
const userModels = require("../models/users");
const blockModels = require("../models/block");
const messageModels = require("../models/message");

//TODO: for consistency, make this call in the similar format as the other getFromTables controller functions (ie getUsers)
const getMessages = async(parent_id,sitter_id) =>{
    try{
        const result = await messageModels.getMessagesFromUser(parent_id,sitter_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO: add in the checks descirbed in the route file and make the post controller in a similar format to the other post controllers
const postMessage = async (parent_id, sitter_id,message, is_urgent, parent_sent, timestamp) => {
    try{
        const result = await messageModels.postMessage(parent_id, sitter_id,message, is_urgent, parent_sent, timestamp);
        //mainly, the above means turning the call into having the one parameter updateFilters
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