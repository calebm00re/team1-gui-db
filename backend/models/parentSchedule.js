const knex = require('../database/knex.js');

const parentSchedule = 'parent_schedule';

const createParentSchedule = async (parentID, startTime, endTime) => {
    const result = await knex(parentSchedule)
        .insert({
            parent_id: parentID,
            start_time: startTime,
            end_time: endTime
        });
    return result;
}


const getParentSchedules = async (filters, date) => {
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


const deleteParentSchedule = async (eventID) => {
    const result = await knex(parentSchedule)
        .where('id', eventID)
        .del();
    return result;
};


const removeFromParentSchedule = async (parentID, scheduleStartTime, scheduleEndTime) => {
    //a schedule should be removed if and only if
    const result = await knex(parentSchedule)
        .where(function() {
            this.where('parent_id', parentID)
                //(a) event_start is before schedule_end
                .andWhere('start_time', '<', scheduleEndTime)
                //(b) event_end is after schedule_start
                .andWhere('end_time', '>', scheduleStartTime);
        })
        .del();
};

module.exports = {
    getParentSchedules,
    updateParentSchedule,
    createParentSchedule,
    deleteParentSchedule,
    removeFromParentSchedule
};