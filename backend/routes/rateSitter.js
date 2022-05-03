const express = require('express');
const rateSitterController = require('../controllers/rateSitterController');
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//POST /self (takes sitterId, parentId, rating, and comment)
router.post('/self', authenticateWithClaims("user"),
    async (req, res, next) => {
        try {
            console.log("Token ID: " + req.user.id);
            const post = await rateSitterController.createPost(req.user.id, req.body.sitterID, req.body.rating, req.body.comment);
            if(post.error != "") {
                res.status(400).json({message: post.error});
            }
            const result = await rateSitterController.getPosts(req.user.id, req.body.sitterID, req.body.rating, null, post[0]);
            res.status(200).json(result[0]);
        } catch (err) {
            console.error('Failed to get user info:', err);
            res.status(500).json({ message: err.toString() });
        }
        next();
    });

//GET (can sort based on sitterId, parentId, rating, or date)
router.get('/',
    async (req, res, next) =>
    {
        try {
            const result = await rateSitterController.getPosts(req.query.parentID, req.query.sitterID, req.query.rating, req.query.date, null);
            res.status(200).json(result);
        } catch (err) {
            console.error('Failed to get user info:', err);
            res.status(500).json({message: err.toString()});
        }
        next();
    });



module.exports = router;