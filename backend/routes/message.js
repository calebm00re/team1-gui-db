const { application } = require('express');
const express = require('express');
const messageController = require('../controllers/message');
const userController = require("../controllers/users");
const sitterController = require("../controllers/sitter");
const { authenticateWithClaims } = require('../middleware/auth');

const router = express.Router();

// POST /self creates a new message between sitter and parent
router.post('/self', async(req, res, next) => {
    try {
        const roleCheckResult = await messageController.checkRoleValid(req.user,req.body.otherID);

        // check if role is valid and if user/sitter exists in database
        if (roleCheckResult.error != null) {
            res.status(400).json({message: roleCheckResult.error});
        } else {
            const result = await messageController.postMessage(roleCheckResult.parentId,roleCheckResult.sitterId,req.body.message,roleCheckResult.isParent, req.body.isUrgent);

            // check possible errors
            if (result.error != null) {
                res.status(404).json(result.error);
            }
            //return the newly created entry and add in the GETS for the sitter / parent
            const returnGET = await messageController.getMessages(req.user, null, null, result[0]);
            res.status(200).json(returnGET[0]);
        }
    }
    catch(err) {
        console.error('Failed to post message:', err);
        res.status(500).json({ message: err.toString() });
    }
})

//The /self is to indicate only messages which pertain to the user are retained (standard for schema in rest of tables)
router.get('/self', async(req, res, next) => {
    try {
        //pass in all of the query parameters (date, otherID, urgency, messageID) or none
        const result = await messageController.getMessages(req.user, req.query.otherID, req.query.urgent, req.query.messageID);
        // Pass an error if otherID is not null and is invalid
        if(result.error != null) {
            res.status(404).json({message: result.error});
        }
        res.status(200).json(result);
    } 
    catch (err){
        console.error('Failed to get message info:', err);
        res.status(500).json({ message: err.toString() });
    }
})


module.exports = router;