const knex = require('../database/knex.js');

const parentSchedule = 'parent_schedule';

//NOTE: I may be wrong but, you shouldn't have to change anything in this file.

const getParentSchedules = async (filters , date) => {
    const result = await knex(parentSchedule)
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


const updateParentSchedule = async (eventID,filters) => {
    const result = await knex(parentSchedule)
        .where('id', eventID)
        .update(filters);
    return result;
}

//NOTE: As I mentioned previously, as the event_description is an optional field it should not be included here.
//Instead, a call to updateParentSchedule should be made with the event_description as a parameter (even when made at the POST).
const createParentSchedule = async (sitterID, startTime, endTime) => {
    const result = await knex(parentSchedule)
        .insert({
            sitter_id: sitterID,
            start_time: startTime,
            end_time: endTime
        });
    return result;
}

const deleteParentSchedule = async (eventID) => {
    const result = await knex(parentSchedule)
        .where('id', eventID)
        .del();
    return result;
};

module.exports = {
    getParentSchedules,
    updateParentSchedule,
    createParentSchedule,
    deleteParentSchedule
};