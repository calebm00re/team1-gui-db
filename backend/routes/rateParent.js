const { application } = require('express');
const express = require('express');
const rateParentRoutes = require("../controllers/rateParent.js");
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//TODO: POST /self (takes sitterId, parentId, rating, and comment)
router.post('/self', authenticateWithClaims("sitter"),
    async (req, res, next) => {
        try {
            const post = await rateParentRoutes.createPost(req.user.id, req.body.parentID, req.body.rating, req.body.comment);
            if(post.error === "Not enough data"){
                res.status(400).json({message: "Not enough data"});
            }
            const result = await rateParentRoutes.getPosts(req.user.id, req.body.parentID, req.body.rating, null);
            res.status(200).json(result);
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
        const result = await rateParentRoutes.getPosts(req.query.sitterID, req.query.parentID, req.query.rating, req.query.date);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get user info:', err);
        res.status(500).json({message: err.toString()});
    }
    next();
});

//TODO: PUT /self/:postID (can only update rating and comment. will update timestamp)
router.put('/self/:postID',
    async (req, res, next) => {
    try {
        const canEdit = await rateParentRoutes.isPostOwner(req.user.id, req.params.postID);
        if(canEdit){
            const update = await rateParentRoutes.updatePost(req.params.postID, req.body.rating, req.body.comment);
            const result = await rateParentRoutes.getPosts(req.user.id, null, null, req.params.postID);
        } else {
            res.status(403).json({message: "You do not have permission to edit this post"});
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get user info:', err);
        res.status(500).json({message: err.toString()});
    }

    });

//TODO DELETE /self/:postID (will delete post)


module.exports = router;