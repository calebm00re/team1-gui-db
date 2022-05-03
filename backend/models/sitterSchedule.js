const knex = require('../database/knex.js');

const sitterSchedule = 'sitter_schedule';

const createSitterSchedule = async (sitterID, startTime, endTime) => {
    const result = await knex(sitterSchedule)
        .insert({
            sitter_id: sitterID,
            start_time: startTime,
            end_time: endTime
        });
    return result;
}

const getSitterSchedules = async (filters , date) => {
    const result = await knex(sitterSchedule)
        .where(filters)
        .andWhere(function() {
            if(date != null){
                this.where('start_time', '>=' , date)
                    .andWhere('start_time', '<=', date + ' 23:59:59');
            }
        })
        .select('*');
    return result;
}


const updateSitterSchedule = async (eventID,filters) => {
    const result = await knex(sitterSchedule)
        .where('id', eventID)
        .update(filters);
    return result;
}


const deleteSitterSchedule = async (eventID) => {
    const result = await knex(sitterSchedule)
        .where('id', eventID)
        .del();
    return result;
};

const removeFromSitterSchedule = async (sitterID, scheduleStartTime, scheduleEndTime) => {
    //a schedule should be removed if and only if
    const result = await knex(sitterSchedule)
             .where('sitter_id', sitterID)
                //(a) event_start is before schedule_end
             .andWhere('start_time', '<=', scheduleEndTime)
                //(b) event_end is after schedule_start
             .andWhere('end_time', '>=', scheduleStartTime)
             .del();
};

module.exports = {
  getSitterSchedules,
  updateSitterSchedule,
  createSitterSchedule,
  deleteSitterSchedule,
  removeFromSitterSchedule
};