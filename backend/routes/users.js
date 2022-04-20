const { application } = require('express');
const express = require('express');
const userController = require('../controllers/users.js');
const userModel = require('../models/users.js');


/**
 * https://expressjs.com/en/guide/routing.html#express-router
 *
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */
const router = express.Router();





//get id route. Given the email of a of a user, return the id of that user
router.get('/id/:email', async (req, res, next) => {
    try {
        const email = req.params.email;


        const result = await userModel.getIDFromEmail(email);
        if(result === -1){
            res.status(300).json({message: "User not found"});
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        console.error('Failed to get user id:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

//get user by id
router.get('/info/:id', async(req, res, next) => {
    try{
        const id = req.params.id;
        console.log("Id is: " + id);
        const result = await userModel.getUserById(id);
        //console.log("Result is: " + result.json);
        if(result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(400).json({
                message: "User not found"
            });
        }
    }catch(err){
        console.error('Failed to get user info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

module.exports = router;