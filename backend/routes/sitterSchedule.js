const { application } = require('express');
const express = require('express');
const sitterScheduleController = require('../controllers/sitterSchedule');
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//GET / returns all of the sitter's schedules (can filter by date and sitter ID or event ID)
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

//GET /Self returns all of the sitter's schedules (can filter by date)
router.get('/self', authenticateWithClaims("sitter"),
    async (req, res, next) => {
        try {
            const schedules = await sitterScheduleController.getSitterSchedules(req.user.id, req.query.date , null);
            res.status(200).json(schedules);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
});


router.put('/self/:eventID',authenticateWithClaims("sitter"),
    async (req, res, next) => {
        try {
            const canEdit = await sitterScheduleController.isSelf(req.user.id, req.params.eventID);
            if(canEdit){
                const update = await sitterScheduleController.updateSitterSchedule(req.params.eventID, req.body.startTime, req.body.endTime);
                if(update.error === "Event not found" || update.error === "No date to update"){
                    res.status(404).json({
                        message: update.error
                    });
                } else {
                    const result = await sitterScheduleController.getSitterSchedules(req.user.id, null, req.params.eventID);
                    res.status(200).json(result);
                }
            } else {
                res.status(404).json({message: "Cannot edit schedule"});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
    });

// POST /self creates a new schedule for the sitter
router.post('/self', authenticateWithClaims("sitter"),
    async (req, res, next) => {
        try {
            const schedule = await sitterScheduleController.createSitterSchedule(req.user.id, req.body.startTime, req.body.endTime);
            if(schedule.error === 'No data to create'){
                res.status(400).json({message: "No data to create"});
            }
            const result = await sitterScheduleController.getSitterSchedules(req.user.id, null, schedule);
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.toString()
            });
        }
    });

// DELETE /self/:eventID deletes an entry in the schedule
router.delete('/self/:eventID', authenticateWithClaims("sitter"),
    async (req, res, next) => {
        try {
            const canDelete = await sitterScheduleController.isSelf(req.user.id, req.params.eventID);
            if(canDelete){
                const schedule = await sitterScheduleController.deleteSitterSchedule(req.params.eventID);
                res.status(204); //a successful deletion returns no content
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