const { application } = require('express');
const express = require('express');
const rateParentRoutes = require("../controllers/rateParent.js");
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

//TODO: POST /self (takes sitterId, parentId, rating, and comment)
router.post('/self', authenticateWithClaims("sitter"),
    async (req, res, next) => {
        try {
            const post = await rateParentRoutes.createPost(req.user.id, req.body.parentId, req.body.rating, req.body.comment);
            if(post.error === "Not enough data"){
                res.status(400).json({message: "Not enough data"});
            }
            const result = await rateParentRoutes.getPosts(req.user.id, req.body.parentId, req.body.rating, null);
            res.status(200).json(result);
        } catch (err) {
            console.error('Failed to get user info:', err);
            res.status(500).json({ message: err.toString() });
        }
        next();
});

//TODO: GET (can sort based on sitterId, parentId, rating, or date)

//TODO: PUT /self/:postID (can only update rating and comment. will update timestamp)

//TODO DELETE /self/:postID (will delete post)


module.exports = router;