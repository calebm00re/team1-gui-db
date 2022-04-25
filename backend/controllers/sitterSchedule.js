const sitterScheduleModels = require('../models/sitterSchedule');

const getSitterSchedules = async (id, date, eventId) => {
  try{
    const filters = await makeFilters(id, eventId);
    const result = await sitterScheduleModels.getSitterSchedules(filters , date);
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
        const result = await sitterScheduleModels.updateSitterSchedule(eventID,filters);
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
    }   catch (error) {
        console.log(error);
    }
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
        const result = await sitterScheduleModels.deleteSitterSchedule(eventID);
        return result;
    }   catch (error) {
        console.log(error);
    }
};

const isSelf = async (sitterID, eventID) => {
    const event = getSitterSchedules(sitterID, null, eventID);
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