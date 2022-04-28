const parentScheduleModels = require('../models/parentSchedule');
const usersController = require('../controllers/users');
const sitterController = require('../controllers/sitter');

const getParentSchedules = async (id, date, eventId) => {
    try{
        const filters = await makeFilters(id, eventId);
        const query = await parentScheduleModels.getParentSchedules(filters,date);
        const result = await addParentName(query);
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

const addParentName = async (query) => {
    result = query;
    //the first step is iterating through each result of the query
    for(i = 0; i < result.length; i++){
        //TODO change this to make calls to the users methods instead
        //the second step is getting the sitter id from the result
        const sitterID = result[i].sitter_id;
        //the third step is getting the sitter name from the sitter controller
        const sitters = await sitterController.getSitters(null, null, null, sitterID, null, null, null);
        //the fourth step is adding the sitter name to the result
        result[i].firstName = sitters[0].firstname;
        result[i].lastName = sitters[0].lastname;
    }
    return result;
}

//TODO: add the event_description to list of fields
const updateParentSchedule = async (eventID, event_description, startTime, endTime) => {
    try{
        const filter = await makeFilters(null, eventID);
        const event = await parentScheduleModels.getParentSchedules(filter, null);
        if(event.length === 0){
            return "Event not found";
        }
        if(eventID == null && event_description == null && startTime == null && endTime == null){
            return "No data to update";
        }
        const filters = await getUpdateFilters(event_description,startTime,endTime);
        const result = await parentScheduleModels.updateParentSchedule(eventID,filters);
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

const createParentSchedule = async (id, event_description, startTime, endTime) => {
    try {
        //NOTE: as the event_description is optional, we need to check if it is null
        if(id == null || startTime == null || endTime == null){
            return {"error":"Missing data"}; //this is aded for consistency with other routes
        }
        result = await parentScheduleModels.createParentSchedule(id, startTime, endTime);
        console.log("First result: " + result);
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
