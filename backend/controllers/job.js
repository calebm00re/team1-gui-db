const jobModels = require('../models/job');

const getJobs = async (userID, sitterID, date) => {
    //TODO: make a query which returns all of the jobs that are associated with the userID and sitterID
};

const createJob = async (userID, sitterID, startTime, endTime) => {
    //TODO: check if the user has all the necessary info to make a job
    //TODO: check that the sitter is able to make the job (based on their schedule)
    //TODO: check that the sitter hasn't blocked the user
    //TODO: delete the time which matches the time of the job (from both the user and sitter's schedule)
    //TODO: create the job
};

module.exports = {
    getJobs,
    createJob
};