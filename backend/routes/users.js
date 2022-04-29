const { application } = require('express');
const express = require('express');
const userController = require('../controllers/users.js');
const userModel = require('../models/users.js');
const {authenticateWithClaims} = require("../middleware/auth");

/**
 * https://expressjs.com/en/guide/routing.html#express-router
 *
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */
const router = express.Router();

//ROUTES FOR USERS

//GET /users -- returns all users for a given search parameter
router.get('/',
    async(req, res, next) => {
    try{
        const result = await userController.getUsers(req.query.firstName, req.query.lastName, req.query.email, req.query.id, req.query.location, req.query.startWorkTime, req.query.endWorkTime, req.query.minKidAge, req.query.maxKidAge, req.query.numKids);
        res.status(200).json(result);
    }catch(err){
        console.error('Failed to get user info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

//GET /users/self -- returns the current user information (basically just a call to the GET /users route with the current user's ID)
router.get('/self', authenticateWithClaims("user"),
    async(req, res, next) => {
    try{
        const result = await userModel.find({id: req.user.id});
        res.status(200).json(result[0]);
    }catch(err){
        console.error('Failed to get user info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

//PUT /users/self -- updates the user's information
router.put('/self', authenticateWithClaims("user"),
    async (req, res, next) => {
    try {
        const result = await userController.updateUser(req.user.id, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.bio, req.body.imgurl, req.body.location, req.body.startWorkTime, req.body.endWorkTime, req.body.minKidAge, req.body.maxKidAge, req.body.numKids);
        if (result.error === "User account Does not exist") { //This is useful in the case of deletion of account after token has been issued
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

//DELETE /users/self -- deletes the user's information
router.delete('/self', authenticateWithClaims("user"),
    async (req, res, next) => {
    try{
        const result = await userController.deleteUser(req.user.id);
        res.status(204).json({ message: 'User deleted' });
    } catch (err) {
        console.error('Failed to delete user info:', err);
        res.status(500).json({ message: err.toString() });
    }
});


module.exports = router;