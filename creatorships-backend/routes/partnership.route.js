// routes/partnerships.js
const express = require('express');
const auth = require('../middleware/auth');
const { getAllPartnerships, getMyPartnerships, createPartnership, updatePartnership } = require('../controllers/partnership.controller');

const router = express.Router();

// Get all partnerships
router.get('/', getAllPartnerships);

// Get partnerships for a specific user
router.get('/user', auth, getMyPartnerships);

// Create partnership
router.post('/', auth, createPartnership);

// Update partnership
router.put('/:id', auth, updatePartnership);

module.exports = router;
