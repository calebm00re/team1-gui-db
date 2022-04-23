const { application } = require('express');
const express = require('express');
const sitterController = require('../controllers/sitter.js');
const sitterModel = require('../models/sitter.js');
const userController = require("../controllers/users");

const router = express.Router();

//Routes go here

//TODO GET /sitter/ (returns all filters for given params)

//GET /sitter/self (returns the content of the sitter's profile)
router.get('/self', async(req, res, next) => {
    try{
        const sitterDoesExist = await sitterController.doesSitterExist(req.user.email);
        if(sitterDoesExist){
            console.log("Sitter exists");
            const result = await sitterModel.find({id : req.user.id});
            res.status(200).json(result[0]);
        }else{
            res.status(500).json({ message: 'Failed to get user info' });
        }
    }catch(err){
        console.error('Failed to get user info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

//TODO PUT /sitter/self (updates the content of the sitter's profile)


//(OPTIONAL) DELETE /sitter/self (deletes the content of the sitter's profile)



module.exports = router;