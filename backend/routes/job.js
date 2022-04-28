const { application } = require('express');
const express = require('express');
const jobController = require('../controllers/job');
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//TODO: POST job/ - create a new job (user needs to pass in sitterID, startTime, endTime)
router.post('/', authenticateWithClaims("user"),
    async (req, res, next) => {
    try {
                //TODO: check if the user has all the necessary info to make a job
                //TODO: check that the sitter is able to make the job (based on their schedule)
                //TODO: check that the sitter hasn't blocked the user
                //TODO: delete the time which matches the time of the job (from both the user and sitter's schedule)
                //TODO: create the job
                //TODO: display the job
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.toString()
        });
    }
});

//TODO: GET job/self - get all jobs for the current user (can be a user of either type) (can filter by date)
router.get('/self',
    async (req, res, next) => {
    try{
        //TODO: identify the type of user based on the claims
        //TODO: use that info the optional date parameter to get the jobs for that user
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.toString()
        });
    }
});

module.exports = router;