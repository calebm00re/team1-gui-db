const { application } = require('express');
const express = require('express');
const sitterScheduleController = require('../controllers/sitterSchedule');
const sitterController = require('../controllers/sitter');

const router = express.Router();

//TODO GET / returns all of the sitter's schedules (can filter by date and sitter ID or event ID)
router.get('/',  async  (req, res, next) => {
    try {
        const schedules = await sitterScheduleController.getSitterSchedules(req.query.id, req.query.date, req.query.eventId);
        res.status(200).json(schedules);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.toString()
        });
    }
});

//TODO GET /Self returns all of the sitter's schedules (can filter by date)
router.get('/self',
    async (req, res, next) => {
        try {
            const doesSitterExist = await sitterController.doesSitterExist(req.user.email);
            if(doesSitterExist){
                const schedules = await sitterScheduleController.getSitterSchedules(req.user.id, req.query.date , null);
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

//TODO PUT /self/:id updates the sitter's schedule (changes the start and end dates and times)
router.put('/self/:eventID',
    async (req, res, next) => {
        try {
            const doesSitterExist = await sitterController.doesSitterExist(req.user.email);
            if(doesSitterExist){
                const schedule = await sitterScheduleController.updateSitterSchedule(req.params.eventID, req.body.startTime, req.body.endTime);
                res.status(200).json(schedule);
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

//TODO POST /self creates a new schedule for the sitter
router.post('/self',
    async (req, res, next) => {
        try {
            const doesSitterExist = await sitterController.doesSitterExist(req.user.email);
            if(doesSitterExist){
                const schedule = await sitterScheduleController.createSitterSchedule(req.user.id, req.body.startTime, req.body.endTime);
                res.status(200).json(schedule);
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

//TODO DELETE /self/:eventID deletes an entry in the schedule
router.delete('/self/:eventID',
    async (req, res, next) => {
        try {
            const doesSitterExist = await sitterController.doesSitterExist(req.user.email);
            if(doesSitterExist){
                const schedule = await sitterScheduleController.deleteSitterSchedule(req.params.eventID);
                res.status(200).json(schedule);
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

module.exports = router;