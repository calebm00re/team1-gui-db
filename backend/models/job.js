const knex = require('../database/knex.js');

const JOBS_TABLE = 'job';

const getJobs = async (filters, date) => {
    const jobs = await knex(JOBS_TABLE)
        .where(filters)
        .andWhere(function() {
            if(date != null){
                this.where('start_time', '<=', date + ' 23:59:59')
                    .andWhere('end_time', '>=', date);
            }
        })
        .select('*')
        .orderBy('time', 'desc');
}


module.exports = {
  getJobs
};