const knex = require('../database/knex.js');

const jobTable = 'job';

const createJob = async (parentID, sitterID, startTime, endTime) => {
    const result = await knex(jobTable)
        .insert({
            parent_id: parentID,
            sitter_id: sitterID,
            start_time: startTime,
            end_time: endTime
    });
    return result;
}

const getJobs = async (filters, date) => {
    const jobs = await knex(jobTable)
        .where(filters)
        .andWhere(function() {
            if(date != null){
                this.where('start_time', '<=', date + ' 23:59:59')
                    .andWhere('end_time', '>=', date);
            }
        })
        .select('*');
    return jobs;
}


module.exports = {
  getJobs,
  createJob
};