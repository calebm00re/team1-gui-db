const { application } = require('express');
const express = require('express');
const messageController = require('../controllers/message');
const userController = require("../controllers/users");
const sitterController = require("../controllers/sitter");
const { authenticateWithClaims } = require('../middleware/auth');

const router = express.Router();

//The /self is to indicate only messages which pertain to the user are retained (standard for schema in rest of tables)
router.get('/self', async(req, res, next) => {
    try {
        const roleCheckResult = await messageController.checkRoleValid(req.user.claims[0],req.user.id,req.body.otherID);

        // check if role is valid and if user/sitter exists in database
        if (roleCheckResult.error == "Missing data" || roleCheckResult.error == "Unauthorized") {
            res.status(400).json({message: roleCheckResult.error});
        } else {
            const result = await messageController.getMessages(roleCheckResult.parentId,roleCheckResult.sitterId,req.body.is_urgent);

            // check for possible errors
            if (result.error != null) {
                res.status(404).json(result.error);
            }

            res.status(200).json(result);
        }
    } 
    catch (err){
        console.error('Failed to get message info:', err);
        res.status(500).json({ message: err.toString() });
    }
})

// POST /self creates a new message between sitter and parent
router.post('/self', async(req, res, next) => {
    try {
        const roleCheckResult = await messageController.checkRoleValid(req.user.claims[0],req.user.id,req.body.otherID);

        // check if role is valid and if user/sitter exists in database
        if (roleCheckResult.error != null) {
            res.status(400).json({message: roleCheckResult.error});
        } else {
            const result = await messageController.postMessage(roleCheckResult.parentId,roleCheckResult.sitterId,req.body.message,roleCheckResult.isParent, req.body.isUrgent);
            
            // check possible errors
            if (result.error != null) {
                res.status(404).json(result.error);
            }

            res.status(200).json(result);
        }
    } 
    catch(err) {
        console.error('Failed to post message:', err);
        res.status(500).json({ message: err.toString() });
    }
})

module.exports = router;