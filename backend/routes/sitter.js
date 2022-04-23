const { application } = require('express');
const express = require('express');
const sitterController = require('../controllers/sitter.js');
const sitterModel = require('../models/sitter.js');
const userController = require("../controllers/users");

const router = express.Router();

//Routes go here

//TODO GET /sitter/ (returns all filters for given params)
router.get('/', async(req, res, next) => {
    try{
        const result = await sitterController.getSitters(req.query.firstName, req.query.lastName, req.query.email, req.query.id, req.query.location, req.query.price, req.query.age);
        res.status(200).json(result);
    }catch(err){
        console.error('Failed to get user info:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

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

//PUT /sitter/self (updates the content of the sitter's profile)
router.put('/self', async (req, res, next) => {
    try {
        const result = await sitterController.updateSitter(req.user.id, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.location, req.body.price, req.body.age, req.body.experience, req.body.image);
        if (result.error === "User account Does not exist") {
            res.status(400).json({message: result.error});
        } else if (result.error === "No changes entered") {
            res.status(400).json({message: result.error});
        } else if (result.error === "Changes conflict with existing user") {
            res.status(400).json({message: result.error});
        } else {
            const output = await sitterModel.find({id:req.user.id});
            res.status(200).json(output[0]);
        }
    } catch (err) {
        console.error('Failed to update user info:', err);
        res.status(500).json({ message: err.toString() });
    }
});


//(OPTIONAL) DELETE /sitter/self (deletes the content of the sitter's profile)
router.delete('/self', async (req, res, next) => {
    try{
        const sitterDoesExist = await sitterController.doesSitterExist(req.user.email);
        if(sitterDoesExist) {
            const result = await sitterModel.deleteUser(req.user.id);
            res.status(204).json({ message: 'User deleted' });
        } else {
            res.status(400).json({ message: 'User does not exist' });
        }
    } catch (err) {
        console.error('Failed to delete user info:', err);
        res.status(500).json({ message: err.toString() });
    }
});


module.exports = router;