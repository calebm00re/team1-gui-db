const knex = require('../database/knex.js');

const sitterSchedule = 'sitter_schedule';

const getSitterSchedules = async (filters , date) => {
    const result = await knex(sitterSchedule)
        .where(filters)
        //TODO, implement  .andWhere('start_time'.date, '=', date)
        .select('*');
    return result;
}


const updateSitterSchedule = async (eventID,filters) => {
    const result = await knex(sitterSchedule)
        .where('id', eventID)
        .update(filters);
    return result;
}

const createSitterSchedule = async (sitterID, startTime, endTime) => {
    const result = await knex(sitterSchedule)
        .insert({
            sitter_id: sitterID,
            start_time: startTime,
            end_time: endTime
        });
    return result;
}

const deleteSitterSchedule = async (eventID) => {
    const result = await knex(sitterSchedule)
        .where('id', eventID)
        .del();
    return result;
};

module.exports = {
  getSitterSchedules,
  updateSitterSchedule,
  createSitterSchedule,
  deleteSitterSchedule
};