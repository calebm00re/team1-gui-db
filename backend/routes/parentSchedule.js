const { application } = require('express');
const express = require('express');
const parentScheduleController = require('../controllers/parentSchedule');
const usersController = require('../controllers/users');
const sitterController = require('../controllers/sitter');

const router = express.Router();

//GET / returns all of the sitter's schedules (can filter by date and sitter ID or event ID)
router.get('/',async (req, res, next) => {
    try {
        const schedules = await parentScheduleController.getParentSchedules(req.query.id, req.query.date, req.query.eventId);
        res.status(200).json(schedules);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.toString()
        });
    }
});

//GET /Self returns all of the sitter's schedules (can filter by date)
router.get('/self',
    async (req, res, next) => {
        try {
            const doesSitterExist = await usersController.doesUserExist(req.user.email); //TODO check this against users
            if(doesSitterExist){
                const schedules = await parentScheduleController.getParentSchedules(req.user.id, req.query.date, null);
                res.status(200).json(schedules);
            } else {
                res.status(404).json({message: "Sitter not found"});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
    });

//TODO: ADD THE event_description field and allow it to be changed by the parent
router.put('/self/:eventID',
    async (req, res, next) => {
        try {
            const eventVal = req.params.eventID.split('=')[1];
            const canEdit = await parentScheduleController.isSelf(req.user.id,eventVal);
            if (canEdit) {
                const update = await parentScheduleController.updateParentSchedule(eventVal, req.body.event_description, req.body.startTime, req.body.endTime);
                
                if (update === "Event not found" || update === "No data to update") {
                    res.status(404).json({message: update});
                } else {
                    const result = await parentScheduleController.getParentSchedules(req.user.id, null, eventVal);
                    res.status(200).json(result);
                }
            } else {
                res.status(404).json({message: canEdit});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
    });

// POST /self creates a new schedule for the sitter
//TODO: expand this to allow for the addition of the event_description field
router.post('/self', async (req, res, next) => {
    try {
        const doesSitterExist = await usersController.doesSitterExist(req.user.email); //TODO check this against users
        if(doesSitterExist){
            const schedule = await parentScheduleController.createParentSchedule(req.user.id, req.body.startTime, req.body.endTime); //TODO: add event_description
            if(schedule.error === 'No data to create'){
                res.status(400).json({message: "No data to create"});
            }
            const result = await parentScheduleController.getParentSchedules(req.user.id, null, schedule);
            res.status(200).json(result);
        } else {
            res.status(404).json({message: "Sitter not found"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.toString()
        });
    }
});

// DELETE /self/:eventID deletes an entry in the schedule
router.delete('/self/:eventID',
    async (req, res, next) => {
        try {
            const canDelete = await parentScheduleController.isSelf(req.user.id, req.params.eventID);
            if(canDelete){
                const schedule = await parentScheduleController.deleteParentSchedule(req.params.eventID);
                res.status(204).json(schedule);
            } else {
                res.status(404).json({message: "Do not have permission to delete"});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
    });

module.exports = router;