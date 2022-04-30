const userController = require('../controllers/users');
const sitterModel = require('../models/sitter');
const userModels = require("../models/users");
const blockModels = require("../models/block");
const messageModels = require("../models/message");

// check if role is valid
const checkRoleValid = async (role,id1,id2) => {
    // check if id1 and id2 are null
    if (id1 == null || id2 == null) {
        return {error: "Missing data"};
    }

    // check if role is user/sitter
    if (role == "user") {
        return {
            parentId: id1,
            sitterId: id2,
            isParent: 1,
            error: null
        };
    } else if (role == "sitter") {
        return {
            parentId: id2,
            sitterId: id1,
            isParent: 0,
            error: null
        }
    } else {
        return {error: "Unauthorized"};
    }
}

const getMessages = async(parentId,sitterId,isUrgent) =>{
    try {
        // check if any param vars are null
        if (parentId == null || sitterId == null || isUrgent == null) {
            return {error: "Missing data"};
        }

        const filter = await makeFilter(parentId,sitterId,null,isUrgent,null);
        const result = await messageModels.getMessagesFromUser(filter);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO: add in the checks descirbed in the route file and make the post controller in a similar format to the other post controllers
const postMessage = async (parentId,sitterId,message,isUrgent,parentSent) => {
    try{
        //The stories assert that the isUrgent is optional and set by default to not urgent
        if (parentId == null || sitterId == null || message == null ||isUrgent == null || parentSent == null) {
            return {error: "Missing data"};
        }

        const result = await messageModels.postMessage(parentId,sitterId,message,isUrgent,parentSent);
        result.error = null;
        //mainly, the above means turning the call into having the one parameter updateFilters
        //TODO: also, you need to take note that while some of the items are required above, others are not.
        return result;
    }
    catch(error){
        console.log(error);
    }
}

//There should probably be more than one of these.
//See the way that I do it in the other controllers
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

module.exports = {
    checkRoleValid,
    getMessages,
    postMessage,
    makeFilter
}
