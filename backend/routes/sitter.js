const { application } = require('express');
const express = require('express');
const sitterController = require('../controllers/sitter.js');

const router = express.Router();

//Routes go here

//TODO GET /sitter/ (returns all filters for given params)

//TODO GET /sitter/self (returns the content of the sitter's profile)

//TODO PUT /sitter/self (updates the content of the sitter's profile)

//(OPTIONAL) DELETE /sitter/self (deletes the content of the sitter's profile)



module.exports = router;