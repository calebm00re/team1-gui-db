const { application } = require('express');
const express = require('express');
const parentScheduleController = require('../controllers/parentSchedule');
const usersController = require('../controllers/users');
const sitterController = require('../controllers/sitter');
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//GET / returns all of the sitter's schedules (can filter by date and sitter ID or event ID)
router.get('/',
    async (req, res, next) => {
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
router.get('/self', authenticateWithClaims("user"),
    async (req, res, next) => {
        try {
            const doesUserExist = await usersController.doesUserEmailExist(req.user.email);
            if(doesUserExist) {
                const schedules = await parentScheduleController.getParentSchedules(req.user.id, req.query.date, null);
                res.status(200).json(schedules); //users can have no schedules
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
    });

router.put('/self/:eventID',
    async (req, res, next) => {
        try {
            const eventID= req.params.eventID; //recall, /self/14 is a valid call but, /self/=14 is not a valid call
            const canEdit = await parentScheduleController.isSelf(req.user.id,eventID);
            if (canEdit) {
                //changes the inputs to be consistent with rest of the program
                const update = await parentScheduleController.updateParentSchedule(eventID, req.body.eventDescription, req.body.startTime, req.body.endTime);
                
                if (update === "Event not found" || update === "No data to update") {
                    res.status(404).json({message: update});
                } else {
                    const result = await parentScheduleController.getParentSchedules(req.user.id, null, eventID);
                    res.status(200).json(result);
                }
            } else {
                res.status(404).json({message: "User does not own this event"});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
    });

// POST /self creates a new schedule for the sitter
router.post('/self', async (req, res, next) => {
    try {
        const doesUserExist = await usersController.doesUserEmailExist(req.user.email);
        if(doesUserExist){
            const schedule = await parentScheduleController.createParentSchedule(req.user.id,req.body.eventDescription,req.body.startTime, req.body.endTime);
            if(schedule.error === "Missing data"){
                res.status(400).json({message: "Missing data"});
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
router.delete('/self/:eventID', authenticateWithClaims("user"),
    async (req, res, next) => {
        try {
            const canDelete = await parentScheduleController.isSelf(req.user.id, req.params.eventID);
            if(canDelete){
                const schedule = await parentScheduleController.deleteParentSchedule(req.params.eventID);

                if (schedule.error === "Event not found") {
                    res.status(404).json({message: schedule.error.toString()});
                }
                console.log("I made it here");

                res.status(204); //a 204 is a successful deletion (and returns no content)
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