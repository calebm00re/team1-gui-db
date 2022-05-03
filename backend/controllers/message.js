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
const makeFilter = async(userToken,otherID, urgent, messageID) => {
    const filters = {};

    let role = userToken.claims[0];
    if(role == "user"){
        filters.parent_id = userToken.id;
        if(otherID != null){
            filters.sitter_id = otherID;
        }
    }
    else if(role == "sitter"){
        filters.sitter_id = userToken.id;
        if(otherID != null){
            filters.parent_id = otherID;
        }
    }

    if (messageID != null) {
        filters.id = messageID; //primary key
    }
    if (urgent != null) {
        filters.is_urgent = urgent;
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

        //Now we want to make the filters

        const filter = await makeFilter(userToken,otherID, urgent, messageID);
        const result = await messageModels.getMessagesFromUser(filter);
        console.log("I am here");
        //Now we want to add to the return message info about each of the users.
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkRoleValid,
    getMessages,
    postMessage
}
