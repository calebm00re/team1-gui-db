const sitterScheduleModels = require('../models/sitterSchedule');
const sitterController = require('../controllers/sitter');

const createSitterSchedule = async (id, startTime, endTime) => {
    try {
        if(id == null || startTime == null || endTime == null){
            return {
                error: 'No data to create'
            };
        }
        result = await sitterScheduleModels.createSitterSchedule(id, startTime, endTime);
        result.error = '';
        return result;
    }catch (error) {
        console.log(error);
    }
};

const getSitterSchedules = async (id, date, eventId) => {
  try{
    const filters = await makeFilters(id, eventId);
    const query = await sitterScheduleModels.getSitterSchedules(filters , date);
    const result = await addSitterInfo(query);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const makeFilters = async (id, eventID) => {
  const filters = {};
  if(id != null){
      filters.sitter_id = id;
  }
  if(eventID != null){
      filters.id = eventID;
  }
  return filters;
}

//Added at the request of Caleb Moore
const addSitterInfo = async (query) => {
    result = query;
    //the first step is iterating through each result of the query
    for(let i = 0; i < result.length; i++){
        //the second step is getting the sitter id from the result
        const sitterID = result[i].sitter_id;
        //the third step is getting the sitter name from the sitter controller
        const sitters = await sitterController.getSitters(null, null, null, sitterID, null, null);
        //the fourth step is adding the sitter name to the result
        result[i].firstname = sitters[0].firstname;
        result[i].lastname = sitters[0].lastname;
        result[i].email = sitters[0].email;
        result[i].location = sitters[0].location;
        result[i].age = sitters[0].age;
        result[i].price = sitters[0].price;
        result[i].imgurl = sitters[0].imgurl;
        result[i].experience = sitters[0].experience;
    }
  return result;
}


const updateSitterSchedule = async (eventID, startTime, endTime) => {
    try{
        const event = await sitterScheduleModels.getSitterSchedules({id: eventID}, null);
        if(event.length === 0){
            return {
                error: 'Event not found'
            };
        }
        if(eventID == null && startTime == null && endTime == null){
            return {
                error: 'No data to update'
            };
        }
        const filters = await getUpdateFilters(startTime, endTime);
        result = await sitterScheduleModels.updateSitterSchedule(eventID,filters);
        result.error = "";
        return result;
    } catch (error) {
        console.log(error);
    }
};

const getUpdateFilters = async (startTime, endTime) => {
    const filters = {};
    if(startTime != null){
        filters.start_time = startTime;
    }
    if(endTime != null){
        filters.end_time = endTime;
    }
    return filters;
};


const deleteSitterSchedule = async (eventID) => {
    try {
        //first we need to check if the event exists
        const event = await sitterScheduleModels.getSitterSchedules({id: eventID}, null);
        if(event.length === 0){
            return {
                error: 'Event not found'
            };
        }
        result = await sitterScheduleModels.deleteSitterSchedule(eventID);
        result.error = '';
        return result;
    }   catch (error) {
        console.log(error);
    }
};

const isSelf = async (sitterID, eventID) => {
    const event = await getSitterSchedules(sitterID, null, eventID);
    if(event.length === 0){
        return false;
    }
    return true;
}

module.exports = {
    getSitterSchedules,
    updateSitterSchedule,
    createSitterSchedule,
    deleteSitterSchedule,
    isSelf
};