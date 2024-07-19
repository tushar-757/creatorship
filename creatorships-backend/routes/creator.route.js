// routes/creatorProfile.js
const express = require('express');
const auth = require('../middleware/auth');
const { getCreatorProfile, createOrUpdateProfile, getAllCreators} = require("../controllers/creator.controller")
const router = express.Router();

// Get Creator Profile
router.get('/', auth , getCreatorProfile);

//get all creators
router.get('/all' , getAllCreators);
// Create or Update Creator Profile
router.post('/', auth , createOrUpdateProfile);

module.exports = router;
