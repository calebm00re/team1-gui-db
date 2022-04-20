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

//ROUTES FOR USERS

//GET /users -- returns all users for a given search perameter
//Can search based off of firstName, lastName, email, or ID
router.get('/', async(req, res, next) => {
    try{
        const result = await userController.getUsers(req.query.firstName, req.query.lastName, req.query.email, req.query.id);
        res.status(200).json(result);
    }catch(err){
        console.error('Failed to get user info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

//GET /users/self -- returns the current user information (basically just a call to the GET /users route with the current user's ID)
router.get('/self', async(req, res, next) => {
    try{
        const result = await userController.getUsers(null, null, null,req.user.id);
        if(result.length === 1){
            res.status(200).json(result[0]);
        }else{
            res.status(500).json({ message: 'Failed to get user info' });
        }
    }catch(err){
        console.error('Failed to get user info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

//PUT /users/self -- updates the user's information

//DEL /users/self -- deletes the user's information


//This route is superflous once the GET /users route is implemented
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



module.exports = router;