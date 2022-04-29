const { application } = require('express');
const express = require('express');
const jobController = require('../controllers/job');
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//TODO: POST job /self - create a new job (user needs to pass in sitterID, startTime, endTime)
router.post('/self', authenticateWithClaims("user"),
    async (req, res, next) => {
    try {
        const job = await jobController.createJob(req.user.id, req.body.sitterID, req.body.startTime, req.body.endTime);
        if(job.error === "missing info") {
            res.status(400).json({message: job.error.toString()});
        } else if(job.error === "sitter not available") {
            res.status(400).json({message: job.error.toString()});
        } else if(job.error === "sitter not found") {
            res.status(400).json({message: job.error.toString()});
        } else if(job.error === "sitter blocked"){
            res.status(400).json({message: job.error.toString()});
        } else {
            //displays the job
            const result = await jobController.getJobs(req.user.id, req.body.sitterID, req.body.startTime);
            res.status(200).json(result[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.toString()
        });
    }
});

//GET job /self - get all jobs for the current user (can be a user of either type) (can filter by date)
router.get('/self',
    async (req, res, next) => {
    try{
        if(req.user.claims[0] === "user"){
            const jobs = await jobController.getJobs(req.user.id, req.query.sitterID, req.query.date);
            res.status(200).json(jobs);
        } else if(req.user.claims[0] === "sitter"){
            const jobs = await jobController.getJobs(req.query.parentID, req.user.id, req.query.date);
            res.status(200).json(jobs);
        } else {
            res.status(401).json({
                message: "You are not authorized to view this page"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.toString()
        });
    }
});


module.exports = router;