const userController = require('../controllers/users');
const sitterModel = require('../models/sitter');
const userModels = require("../models/users");
const blockModels = require("../models/block");
const messageModels = require("../models/message");

//TODO: for consistency, make this call in the similar format as the other getFromTables controller functions (ie getUsers)
const getMessages = async(parentId,sitterId,isUrgent,timeStamp) =>{
    try {
        if (parentId == null || sitterId == null || isUrgent == null || timeStamp == null) {
            return {error: "Missing data"};
        }

        const filter = await makeFilter(parentId,sitterId,null,isUrgent,null,timeStamp);
        const result = await messageModels.getMessagesFromUser(filter);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//TODO: add in the checks descirbed in the route file and make the post controller in a similar format to the other post controllers
const postMessage = async (parentId,sitterId,message,isUrgent,parentSent,timeStamp) => {
    try{
        if (parentId == null || sitterId == null || message == null ||isUrgent == null || parentSent == null || timeStamp == null) {
            return {error: "Missing data"};
        
        }
        const result = await messageModels.postMessage(parentId,sitterId,message,isUrgent,parentSent,timeStamp);
        //mainly, the above means turning the call into having the one parameter updateFilters
        //TODO: also, you need to take note that while some of the items are required above, others are not.
        return result;
    }
    catch(error){
        console.log(error);
    }
}

const makeFilter = async(parentId,sitterId,message,isUrgent,parentSent,timeStamp) => {
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
    if (timeStamp != null) {
        filters.timestamp = timeStamp;
    }

    return filters;
}

module.exports = {
    getMessages,
    postMessage,
    makeFilter
}
