const express = require('express');
const sessionController = require('../controllers/session');

/**
 * https://expressjs.com/en/guide/routing.html#express-router
 *
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */
const router = express.Router();

//changed the path from /session/login to /session for simplicity
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await sessionController.authenticateUser(body.email, body.password);
        console.log("result of authenticateUser: ", result);
        if(result.error == "Email or password is missing"){
            res.status(400).json({
                error: result.error
            });
        }
        else if(result.error == "Invalid credentials"){
            res.status(401).json({
                error: result.error
            });
        }
        else{
            //generates a session token

        }
    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})


module.exports = router;