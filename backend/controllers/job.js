const jobModels = require('../models/job');
const userController = require('./users');
const sitterController = require('./sitter');
const sitterScheduleModels = require('../models/sitterSchedule');
const parentScheduleModels = require('../models/parentSchedule');
const blockController = require('./block');



const createJob = async (parentID, sitterID, startTime, endTime) => {
    //check if the user has all the necessary info to make a job
    if(parentID == null || sitterID == null || startTime == null || endTime == null) {
        return {
            error: "missing info"
        }
    }
    //check that the sitter hasn't blocked the user
    const isParentBlocked = await blockController.hasBlocked(parentID, sitterID);
    if(isParentBlocked) {
        return {
            error: "sitter blocked"
        }
    }
    //delete the time which matches the time of the job (from both the user and sitter's schedule)
    await sitterScheduleModels.removeFromSitterSchedule(sitterID, startTime, endTime);
    await parentScheduleModels.removeFromParentSchedule(parentID, startTime, endTime);
    //create the job
    let job = await jobModels.createJob(parentID, sitterID, startTime, endTime);
    job.error = "";
    return job;
};


const getJobs = async (parentID, sitterID, date) => {
    const filters = await makeFilters(parentID, sitterID);
    const query = await jobModels.getJobs(filters, date);
    const result = await addUserAndSitterInfo(query); //call needs to be done at GET call due to updates
    return result;
};

const makeFilters = async (parentID, sitterID) => {
    filters = {};
    if(parentID != null) {
        filters.parent_id = parentID;
    }
    if(sitterID != null) {
        filters.sitter_id = sitterID;
    }
    return filters;
}

const addUserAndSitterInfo = async (query) => {
    let result = query;
    //iterates through each result in the query
    for(let i = 0; i < result.length; i++){
        //first we are going to ge the user object from the userID
        const user = await userController.getUsers(null, null, null, result[i].parent_id, null, null, null, null, null, null);
        result[i].user = user[0];
        //then we are going to get the sitter object from the sitterID
        const sitter = await sitterController.getSitters(null, null, null, result[i].sitter_id, null, null, null);
        result[i].sitter = sitter[0];
    }
    return result;
};


module.exports = {
    getJobs,
    createJob
};