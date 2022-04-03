const { application } = require('express');
const express = require('express');
const users = require('../models/users.js');


/**
 * https://expressjs.com/en/guide/routing.html#express-router
 *
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */
const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
    //    const result = await req.models.user.createNewUser(body.email, body.password);
       // const result = await req.models.createNewUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password
      //calls the createNewUser function in the users.js file of the models folder and return the result
        const result = await users.createNewUser(body.firstName, body.lastName, body.email, body.password);
        if(result.error === "Invalid email"){
            res.status(400).json({message: "Invalid email"});
        } else if(result.error === "User already exists"){
            res.status(400).json({message: "User already exists"});
        } else {
            res.status(201).json(result);
        }

    } catch (err) {
        console.error('Failed to create new user:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

/*
app.post('/register', (req, res) => {
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
        if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection');
        } else {
            // if there is no issue obtaining a connection, execute query and release connection
            let str = 'INSERT INTO `db`.`users` (`lastName`,`firstName`,`email`,`password`) VALUES(\'' + req.body.lastName + "," + req.body.firstName + "," + req.body.email + "," + req.body.password + '\')';
            console.log(str);
            connection.query('INSERT INTO `db`.`users` (`lastName`,`firstName`,`email`,`password`) VALUES(?,?,?,?)', [req.body.lastName, req.body.firstName, req.body.email, req.body.password],  function (err, rows, fields) {
                connection.release();

                if (err) {
                    // if there is an error with the query, log the error
                    logger.error("Problem inserting into test table: \n", err);
                    res.status(400).send('Problem inserting into table');
                } else {
                    res.status(200).send(`added ${req.body.firstName}  ${req.body.lastName} to the table!`);
                }
            });
        }
    });
});
*/
module.exports = router;