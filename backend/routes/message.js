const { application } = require('express');
const express = require('express');
const messageController = require('../controllers/message');
const userController = require("../controllers/users");
const sitterController = require("../controllers/sitter");

const router = express.Router();

//The /self is to indicate only messages which pertain to the user are retained (standard for schema in rest of tables)
router.get('/self', async(req, res, next) => {
    try{
        let parent_id = req.user.id;
        let sitter_id = req.body.otherID;
        let is_urgent = req.body.is_urgent;
        let time = req.body.time;
        //Model requires two arguments: (parent_id, sitter_id)
        if(req.user.claims[0] !== "user"){
            //This case indicates that "user" is a sitter, so we need to make sure they get passed in second in the function
            parent_id = req.body.otherID;
            sitter_id = req.user.id;
        }
        //console.log(parent_id +" "+ sitter_id +" "+ is_urgent +" "+ time);

        const result = await messageController.getMessages(parent_id, sitter_id, is_urgent, time);
        res.status(200).json(result);
    }
    catch (err){
        console.error('Failed to get message info:', err);
        res.status(500).json({ message: err.toString() });
    }
    //next();
})

router.post('/', async(req, res, next) => {
    try{
        let ifExist;
        let isParent = 1;

        // check role of user and if user email exists
        if (req.user.claims[0] == "user") {
            ifExist = await userController.doesUserEmailExist(req.user.email);
        } else {
            ifExist = await sitterController.doesSitterEmailExist(req.user.email);
            isParent = 0;
        }

        // check if user/sitter exists in database
        if (ifExist) {
            //TODO: again, smarter way to do this using the roles in the token of the user
            let parent_id = req.user.id;
            let sitter_id = req.body.otherID;
            
            // check if user is actually a sitter
            if(isParent == 0) {
                //This case indicates that "user" is a sitter, so we need to make sure they get passed in second in the function
                parent_id = req.body.otherID;
                sitter_id = req.user.id;
            }

            const result = await messageController.postMessage(parent_id, sitter_id, req.body.message,req.body.is_urgent,isParent, req.body.timestamp);
            
            // check possible errors
            if (result.error == "Missing data") {
                res.status(401).json(result.error);
            }

            res.status(200).json(result);
        }
    }
    catch(err){

        console.error('Failed to post message:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})

module.exports = router;