const { application } = require('express');
const express = require('express');
const jobController = require('../controllers/job');
const {authenticateWithClaims} = require("../middleware/auth");

const router = express.Router();

module.exports = router;