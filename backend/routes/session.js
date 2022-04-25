const express = require('express');
const sessionController = require('../controllers/session');
const userModel = require('../models/users.js');

/**
 * https://expressjs.com/en/guide/routing.html#express-router
 *
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */
const router = express.Router();

router.post('/users/register', async (req, res, next) => {
    try {
        const body = req.body;
        //    const result = await req.models.user.createNewUser(body.email, body.password);
        // const result = await req.models.createNewUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password
        //calls the createNewUser function in the users.js file of the models folder and return the result
        const result = await sessionController.createNewUser(body.firstName, body.lastName, body.email, body.password);
        console.log("Result of createNewUser: ", result);
        if(result.error === "Invalid email"){
            console.log("Invalid email");
            res.status(400).json({message: "Invalid email"});
        } else if(result.error === "User already exists") {
            console.log("User already exists");
            res.status(400).json({message: "User already exists"});
        } else if(result.error === "Incomplete input") {
            console.log("Incomplete input");
            res.status(400).json({message:"Incomplete input"});
        } else {
            console.log("User created");
            //Note: we don't need to authenticate the user here because the user is already created
            //Also, the role is not added to the table because it can change every session
            const token = await sessionController.generateAuthToken(body.email, 'user'); //the role is hardcoded to user
            res.status(201).json({"accessToken": token});
        }

    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})


router.post('/users/login', async (req, res, next) => {
    try {
        const body = req.body;
        //console.log("Email,Password:" ,body.email,body.password);
        const result = await sessionController.authenticateUser(body.email, body.password);
        console.log("result of authenticateUser: ", result);
        if(result.error === "Email or password is missing"){
            res.status(400).json({
                error: result.error
            });
        }
        else if(result.error === "Invalid credentials"){
            res.status(401).json({
                error: result.error
            });
        }
        else{
            //generates a session token
            console.log("User has been AUTHENTICATED");
            const token = await sessionController.generateAuthToken(body.email, 'user'); //this role is hardcoded to user based on route
            res.status(200).json({"accessToken": token});
        }
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})



router.post('/sitter/register', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        //    const result = await req.models.user.createNewUser(body.email, body.password);
        // const result = await req.models.createNewUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password
        //calls the createNewUser function in the users.js file of the models folder and return the result
        const result = await sessionController.createNewSitter(body.firstName, body.lastName, body.email, body.password);
        console.log("Result of createNewUser: ", result);
        if(result.error === "Invalid email"){
            console.log("Invalid email");
            res.status(400).json({message: "Invalid email"});
        } else if(result.error === "User already exists") {
            console.log("User already exists");
            res.status(400).json({message: "User already exists"});
        } else if(result.error === "Incomplete input") {
            console.log("Incomplete input");
            res.status(400).json({message:"Incomplete input"});
        } else {
            console.log("User created");
            //Note: we don't need to authenticate the user here because the user is already created
            //Also, the role is not added to the table because it can change every session
            const token = await sessionController.generateAuthToken(body.email, 'sitter'); //the role is hardcoded to user
            res.status(201).json({"accessToken": token});
        }

    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

//POST /sitter/login
router.post('/sitter/login', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await sessionController.authenticateSitter(body.email, body.password);
        console.log("result of authenticateUser: ", result);
        if(result.error === "Email or password is missing"){
            res.status(400).json({
                error: result.error
            });
        }
        else if(result.error === "Invalid credentials"){
            res.status(401).json({
                error: result.error
            });
        }
        else{
            //generates a session token
            console.log("User has been AUTHENTICATED");
            const token = await sessionController.generateAuthToken(body.email, 'sitter'); //this role is hardcoded to user based on route
            res.status(200).json({"accessToken": token});
        }
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})



module.exports = router;