const jobModels = require('../models/job');
const userController = require('./users');
const sitterController = require('./sitter');

const createJob = async (parentID, sitterID, startTime, endTime) => {
    //TODO: check if the user has all the necessary info to make a job
    //TODO: check that the sitter is able to make the job (based on their schedule)
    //TODO: check that the sitter hasn't blocked the user
    //TODO: delete the time which matches the time of the job (from both the user and sitter's schedule)
    //TODO: create the job
    let job = await jobModels.createJob(parentID, sitterID, startTime, endTime);
    job.error = "";
    return job;
};

const getJobs = async (parentID, sitterID, date) => {
    //TODO: make a query which returns all of the jobs that are associated with the userID and sitterID
    const filters = await makeFilters(parentID, sitterID);
    const query = await jobModels.getJobs(filters, date);
    const result = await addUserAndSitterInfo(query);
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
        const user = await userController.getUsers(null, null, null, result[i].userID, null, null, null, null, null, null);
        result[i].user = user[0];
        //then we are going to get the sitter object from the sitterID
        const sitter = await sitterController.getSitters(null, null, null, result[i].sitterID, null, null, null);
        result[i].sitter = sitter[0];
    }
    return result;
};


module.exports = {
    getJobs,
    createJob
};