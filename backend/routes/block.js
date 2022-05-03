const { application } = require('express');
const express = require('express');
const blockController = require('../controllers/block');
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

// route for blocking sitter from parent
//The route header /block/:id is again my fault
router.post('/self', authenticateWithClaims("sitter"),
    async (req,res,next) => {
    try {
        const sitterID = req.user.id; //This should be a user token
        console.log("The sitter ID is: " + sitterID);
        const parentID = req.body.parentID; //this is the parameter which needs to be passed in the body
        console.log("The user ID is: " + parentID);
        const result = await blockController.blockSitter(parentID, sitterID);

        if (result.error === "User does not exist") {
            res.status(400).json({message: result.error});
        }
        //Note: The output from the controller is the primary key of the block which the user doesn't care about
        res.status(200).json({message: "Successfully blocked user"});

    } catch (err) {
        res.status(500).json({message: err.toString()});
    }

    next();
});


//Ok, so, I though about this more and this route is not necessary..
//That isn't your fault, it's mine. But, make sure that I go over why with you.
//But, a controller for this should be created.

/*
router.get('/', async (req,res,next) => {
    try {
        const userID = req.headers.authorization.userID;
        const blockList = await blockController.getBlockList(userID);
        res.status(200).json(blockList);
    } catch (err) {
        res.status(500).json({message: err.toString( )});
    }

    next();
});
 */

module.exports = router;