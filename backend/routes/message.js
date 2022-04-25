const { application } = require('express');
const express = require('express');
const messageController = require('../controllers/message');
const userController = require("../controllers/users");

const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        console.log("Request's User:" , req.user.numKids);
        console.log("Other ID:" , req.body.otherID);

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

module.exports = router;