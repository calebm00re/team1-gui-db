const userController = require('../controllers/users');
const sitterController = require('../controllers/sitter');
const messageModels = require("../models/message");

// check if role is valid
const checkRoleValid = async (userToken,otherID) => {
    // check if tokenUserID and id2 are null
    if (userToken == null || otherID == null) {
        return {error: "Missing data"};
    }
    let role = userToken.claims[0];
    console.log("role: " + role);
    let tokenUserID = userToken.id;
    console.log("tokenUserID: " + tokenUserID);

    // check if role is user/sitter
    if (role == "user") {
        //now we check if the otherID is a sitterID
        let sitter = await sitterController.getSitters(null, null, null, otherID, null, null, null);
        if (sitter.length == 0) {
            return {error: "Invalid input"};
        }
        return {
            parentId: tokenUserID,
            sitterId: otherID,
            isParent: 1,
            error: null
        };
    } else if (role == "sitter") {
        //now we check if the otherID is a parentID
        let parent = await userController.getUsers(null, null, null, otherID, null , null, null, null, null,null);
        if (parent.length == 0) {
            return {error: "Invalid input"};
        }
        return {
            parentId: otherID,
            sitterId: tokenUserID,
            isParent: 0,
            error: null
        }
    } else {
        return {error: "Invalid input"};
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
// *(user token refers to the user of the API not the user user type)
const getMessages = async(userToken, otherID, urgent, messageID) =>{
    try {
        //First we want to check that otherID (if not null) is a valid user
        if(otherID != null){
            const isValid = await checkRoleValid(userToken,otherID);
            if(isValid.error != null){
                return {error: isValid.error};
            }
        }

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
