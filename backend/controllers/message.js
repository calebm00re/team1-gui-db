const userController = require('../controllers/users');
const sitterModel = require('../models/sitter');
const userModels = require("../models/users");
const blockModels = require("../models/block");
const messageModels = require("../models/message");

// check if role is valid
const checkRoleValid = async (userToken,otherID) => {
    // check if tokenUserID and id2 are null
    if (userToken == null || otherID == null) {
        return {error: "Missing data"};
    }
    role = userToken.claims[0];
    tokenUserID = userToken.id;

    // check if role is user/sitter
    if (role == "user") {
        return {
            parentId: tokenUserID,
            sitterId: otherID,
            isParent: 1,
            error: null
        };
    } else if (role == "sitter") {
        return {
            parentId: otherID,
            sitterId: tokenUserID,
            isParent: 0,
            error: null
        }
    } else {
        return {error: "Unauthorized"};
    }
}

// post new message between sitter and user
const postMessage = async (parentId,sitterId,message,parentSent, isUrgent) => {
    try{
        if (parentId == null || sitterId == null || message == null || parentSent == null) {
            return {error: "Missing data"};
        }

        if(isUrgent == null){
            isUrgent = 0;
        }

        const result = await messageModels.postMessage(parentId,sitterId,message,parentSent, isUrgent);
        result.error = null;
        return result;
    }
    catch(error){
        console.log(error);
    }
}

//This is used by the GET to make determinations about which filters to make
const makeFilter = async(parentId,sitterId,message,isUrgent,parentSent) => {
    const filters = {};

    if (parentId != null) {
        filters.parent_id = parentId;
    }
    if (sitterId != null) {
        filters.sitter_id = sitterId;
    }
    if (message != null) {
        filters.message = message;
    }
    if (isUrgent != null) {
        filters.is_urgent = isUrgent;
    }
    if (parentSent != null)  {
        filters.parent_sent = parentSent;
    }
    return filters;
}


// get all messages from user and sitter
const getMessages = async(tokenUserID, otherID, urgent, messageID) =>{
    try {

        const filter = await makeFilter(parentId,sitterId,null,isUrgent,null);
        const result = await messageModels.getMessagesFromUser(filter);
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkRoleValid,
    getMessages,
    postMessage,
    makeFilter
}
