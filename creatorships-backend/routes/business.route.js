// routes/businessProfile.js
const express = require('express');
const auth = require('../middleware/auth');
const { getBusinessProfile, createOrUpdateProfile,getAllBusinessProfile } = require('../controllers/business.controller');
const router = express.Router();

// Get Business Profile
router.get('/', auth, getBusinessProfile);

router.get('/all', getAllBusinessProfile);
// Create or Update Business Profile
router.post('/', auth, createOrUpdateProfile);

module.exports = router;
