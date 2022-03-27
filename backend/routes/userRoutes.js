const express = require("express");
const router = express.Router();
const pool = require("../db");
const secret = 'dbgui3345';
const crypto = require('crypto');

router.post("/createUser", async (req, res) => {
    console.log('about tot try to post');
    pool.getConnection((err, connection) => {
        if (err) {
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error("Problem obtaining MySQL connection", err);
        res.status(400).send("Problem obtaining MySQL connection");
      } else {
        let userFirstName = req.body['firstName'];
        let userLastName = req.body['lastName'];
        let userEmail = req.body['email'];
        let userPassword = req.body['password'];
        let userBio = req.body['bio'];
        const hash = crypto.createHmac('sha256', secret).update(userPassword).digest('hex');
        // if there is no issue obtaining a connection, execute query
        connection.query(
          "INSERT INTO users(firstName, lastName, email, password, bio) VALUES(?,?,?,?,?)",
          [userFirstName, userLastName, userEmail, hash, userBio],
          (err, rows, fields) => {
            if (err) {
              logger.error("Error while posting user\n", err);
              res.status(400).json({
                data: [],
                error: "Error obtaining values",
              });
            } else {
              res.status(200).json({
                data: rows,
              });
            }
          }
        );
      }
      connection.release();
    });
  });

//creates a route to post a new user to the database with the given information
// router.post("/createUser", async (req, res) => {