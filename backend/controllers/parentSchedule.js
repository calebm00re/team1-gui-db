const parentScheduleModels = require('../models/parentSchedule');
const usersController = require('../controllers/users');

const createParentSchedule = async (id, event_description, startTime, endTime) => {
    try {
        //NOTE: as the event_description is optional, we need to check if it is null
        if(id == null || startTime == null || endTime == null){
            return {
                error:"Missing data"
            }; //this is aded for consistency with other routes
        }
        result = await parentScheduleModels.createParentSchedule(id, startTime, endTime);
        if (event_description != null) { //having a === null will not return true if the value is undefined
            const filters = await getUpdateFilters(event_description,null,null);
            await parentScheduleModels.updateParentSchedule(result.toString(), filters);
        }
        //Rather, if it exists, we make a call to the updateParentSchedule method (changing the value from null to the actual value)
        result.error = '';
        return result;
    }   catch (error) {
        console.log(error);
    }
};

const getParentSchedules = async (id, date, eventId) => {
    try{
        const filters = await makeFilters(id, eventId);
        const query = await parentScheduleModels.getParentSchedules(filters,date);
        const result = await addParentInfo(query);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const makeFilters = async (id, eventID) => {
    const filters = {};
    if(id != null){
        filters.parent_id = id;
    }
    if(eventID != null){
        filters.id = eventID;
    }
    return filters;
}

//request made at the request of Caleb Moore
const addParentInfo = async (query) => {
    result = query;
    //the first step is iterating through each result of the query
    for(i = 0; i < result.length; i++){
        //the second step is getting the sitter id from the result
        const parentID = result[i].parent_id;
        //the third step is getting the sitter name from the sitter controller
        const parents = await usersController.getUsers(null, null, null, parentID, null, null, null, null, null, null);
        //the fourth step is adding the sitter name to the result
        result[i].firstName = parents[0].firstName;
        result[i].lastName = parents[0].lastName;
        result[i].email = parents[0].email;
        result[i].location = parents[0].location;
        result[i].bio = parents[0].bio;
        result[i].imgurl = parents[0].imgurl;
        result[i].minKidAge = parents[0].minKidAge;
        result[i].maxKidAge = parents[0].maxKidAge;
        result[i].startWorkTime = parents[0].startWorkTime;
        result[i].endWorkTime = parents[0].endWorkTime;
        result[i].numKids = parents[0].numKids;
    }
    return result;
}

const updateParentSchedule = async (eventID, event_description, startTime, endTime) => {
    try{
        const filter = await makeFilters(null, eventID);
        const event = await parentScheduleModels.getParentSchedules(filter, null);
        if(event.length === 0){
            return {
                error: "Event not found"
            };
        }
        if(eventID == null && event_description == null && startTime == null && endTime == null){
            return {
                error: "No data to update"
            };
        }
        const filters = await getUpdateFilters(event_description,startTime,endTime);
        result = await parentScheduleModels.updateParentSchedule(eventID,filters);
        result.error = "";
        return result;
    } catch (error) {
        console.log(error);
    }
};

const getUpdateFilters = async (event_description,startTime, endTime) => {
    const filters = {};
    if(event_description != null){
        filters.event_description = event_description;
    }
    if(startTime != null){
        filters.start_time = startTime;
    }
    if(endTime != null){
        filters.end_time = endTime;
    }
    return filters;
};


const deleteParentSchedule = async (eventID) => {
    try {
        //first we need to check if the event exists
        const event = await parentScheduleModels.getParentSchedules({id:eventID}, null);

        if(event.length === 0){
            return {
                "error":"Event not found"
            };
        }
        
        result = await parentScheduleModels.deleteParentSchedule(eventID);
        result.error = '';
        return result;
    }   catch (error) {
        console.log(error);
    }
};

const isSelf = async (parentID, eventID) => {
    const event = await getParentSchedules(parentID, null, eventID);
    if(event.length === 0){
        return false;
    }
    return true;
}

module.exports = {
    getParentSchedules,
    updateParentSchedule,
    createParentSchedule,
    deleteParentSchedule,
    isSelf
};
