const { application } = require('express');
const express = require('express');
const rateParentRoutes = require("../controllers/rateParent.js");
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//POST /self (takes sitterId, parentId, rating, and comment)
router.post('/self', authenticateWithClaims("sitter"),
    async (req, res, next) => {
        try {
            console.log("Token ID: " + req.user.id);
            const post = await rateParentRoutes.createPost(req.user.id, req.body.parentID, req.body.rating, req.body.comment);
            if(post.error != "") {
                res.status(400).json({message: post.error});
            }
            //TODO: have the return of POST be the information just added to the DB
        //    const result = await rateParentRoutes.getPosts(req.user.id, req.body.parentID, req.body.rating, null, post);
            res.status(200).json(post);
        } catch (err) {
            console.error('Failed to get user info:', err);
            res.status(500).json({ message: err.toString() });
        }
        next();
});

//TODO: GET (can sort based on sitterId, parentId, rating, or date)
router.get('/',
    async (req, res, next) =>
{
    try {
        const result = await rateParentRoutes.getPosts(req.query.sitterID, req.query.parentID, req.query.rating, req.query.date, null);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get user info:', err);
        res.status(500).json({message: err.toString()});
    }
    next();
});



module.exports = router;