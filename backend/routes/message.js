const { application } = require('express');
const express = require('express');
const messageController = require('../controllers/message');
const userController = require("../controllers/users");

const router = express.Router();

//The /self is to indicate only messages which pertain to the user are retained (standard for schema in rest of tables)
router.get('/self', async(req, res, next) => {
    try{
        //TODO: There is a smarter wat to do this using the roles in the token of the user
        //TODO: change the form of this from taking in all the messages from two users to return all messages from the *this user
        //and filtering by three optional query parameters: otherID, urgency, and date

        //console.log("Request's User:" , req.user.numKids);
        //console.log("Other ID:" , req.body.otherID);
        let parent_id = req.user.id;
        let sitter_id = req.body.otherID;
        //Model requires two arguments: (parent_id, sitter_id)
        if(req.user.numKids === undefined){
            //This case indicates that user is a sitter, so we need to make sure they get passed in second in the function
            parent_id = req.body.otherID;
            sitter_id = req.user.id;
        }

        const result = await messageController.getMessages(parent_id, sitter_id);
        res.status(200).json(result);
    }
    catch (err){
        console.error('Failed to get message info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})


router.post('/', async(req, res, next) => {
    try{
        //TODO: again, smarter way to do this using the roles in the token of the user
        let parent_id = req.user.id;
        let sitter_id = req.body.otherID;

        if(req.body.parent_sent === 0){
            parent_id = req.body.otherID;
            sitter_id = req.user.id;
        }

        const result = await messageController.postMessage(parent_id, sitter_id, req.body.message,
            req.body.is_urgent, req.body.parent_sent, req.body.timestamp);
        //TODO: add checks to see if the reciever exists and if all mandatory fields are filled in

        res.status(200).json(result);
    }
    catch(err){

        console.error('Failed to post message:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})

module.exports = router;