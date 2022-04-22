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
        const userDoesExist = await userController.userDoesExist(null,null,null,req.user.id);
        if(userDoesExist){
            const result = await userController.getUsers(null, null, null,req.user.id);
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
router.put('/self', async (req, res, next) => {
    try {
        const result = await userController.updateUser(req.user.id, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.bio, req.body.imgurl);
        if (result.error === "User account Does not exist") {
            res.status(400).json({message: result.error});
        } else if (result.error === "No changes entered") {
            res.status(400).json({message: result.error});
        } else if (result.error === "Changes conflict with existing user") {
            res.status(400).json({message: result.error});
        } else {
            const output = await userController.getUsers(null, null, null, req.user.id);
            res.status(200).json(output[0]);
        }
    } catch (err) {
        console.error('Failed to update user info:', err);
        res.status(500).json({ message: err.toString() });
    }
});

//DEL /users/self -- deletes the user's information
router.delete('/self', async (req, res, next) => {
    try{
        const userDoesExist = await userController.userDoesExist(null, null, null, req.user.id);
        if(userDoesExist) {
            const result = await userController.deleteUser(req.user.id);
            res.status(204).json({ message: 'User deleted' });
        } else {
            res.status(400).json({ message: 'User does not exist' });
        }
    } catch (err) {
        console.error('Failed to delete user info:', err);
        res.status(500).json({ message: err.toString() });
    }
});


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