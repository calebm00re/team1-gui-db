const { application } = require('express');
const express = require('express');
const messageController = require('../controllers/message');
const userController = require("../controllers/users");
const sitterController = require("../controllers/sitter");

const router = express.Router();

//The /self is to indicate only messages which pertain to the user are retained (standard for schema in rest of tables)
router.get('/self', async(req, res, next) => {
    try {
        //From <Here> to (see below), this should be spun off into a request to the controller about what type of user it is and if they are valid
        //The result of this should be a tuple with the values of userID and sitterID respectivly (or an error)
        let ifExist; //NOTE: This is a problem for the future, but, the issue of existance as a problem can be resolved by implementing refresh tokens and nullifing tokens at logout
        let isParent = 1;

        // check role of user and if user email exists
        if (req.user.claims[0] === "user") {
        } else  if (req.user.claims[0] === "sitter") {
            isParent = 0;
        } else {
            res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (ifExist) {
            let parent_id = req.user.id;
            let sitter_id = req.body.otherID;

            if (isParent == 0) {
                //This case indicates that "user" is a sitter, so we need to make sure they get passed in second in the function
                parent_id = req.body.otherID;
                sitter_id = req.user.id;
            }
            //<Here>
            const result = await messageController.getMessages(parent_id,sitter_id,req.body.is_urgent,req.body.time);

            if (result.error == "Missing data") {
                res.status(404).json(result.error);
            }

            res.status(200).json(result);
        }
        //If the user doesn't exist, then we should return an error
        else {
            res.status(404).json({
                message: "User does not exist"
            });
        }
    } 
    catch (err){
        console.error('Failed to get message info:', err);
        res.status(500).json({ message: err.toString() });
    }
})

router.post('/', async(req, res, next) => {
    try{
        //Same as for the GET route, I think the identfiyng who is who should be done in the controller
        let ifExist; //NOTE: This is a problem for the future, but, the issue of existance as a problem can be resolved by implementing refresh tokens and nullifing tokens at logout
        let isParent = 1;

        // check role of user and if user email exists
        if (req.user.claims[0] == "user") {
            isParent = 1;
        } else  if (req.user.claims[0] == "sitter") {
            isParent = 0;
        } else {
            res.status(401).json({
                message: "Unauthorized"
            });
        }

        // check if user/sitter exists in database
        if (ifExist) {
            let parent_id = req.user.id;
            let sitter_id = req.body.otherID;
            
            // check if user is actually a sitter
            if(isParent == 0) {
                //This case indicates that "user" is a sitter, so we need to make sure they get passed in second in the function
                parent_id = req.body.otherID;
                sitter_id = req.user.id;
            }

            //adjust this call by droping the timestamp. Do we really want frontend (or trust some random user) to send this?
            const result = await messageController.postMessage(parent_id, sitter_id, req.body.message,req.body.is_urgent,isParent, req.body.timestamp);
            
            // check possible errors
            if (result.error == "Missing data") {
                res.status(404).json(result.error);
            }

            res.status(200).json(result);
        } else {
            res.status(401);
        }
    }
    catch(err){

        console.error('Failed to post message:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
})

module.exports = router;