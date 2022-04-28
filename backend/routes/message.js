const { application } = require('express');
const express = require('express');
const messageController = require('../controllers/message');
const userController = require("../controllers/users");

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
        //TODO: again, smarter way to do this using the roles in the token of the user
        let parent_id = req.user.id;
        let sitter_id = req.body.otherID;
        let parent_sent = 1;
        if(req.user.claims[0] !== "user"){
            //This case indicates that "user" is a sitter, so we need to make sure they get passed in second in the function
            parent_id = req.body.otherID;
            sitter_id = req.user.id;
            parent_sent = 0;
        }

        const result = await messageController.postMessage(parent_id, sitter_id, req.body.message,
            req.body.is_urgent, parent_sent, req.body.timestamp);
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