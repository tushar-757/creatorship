// routes/auth.js
const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { createUser, login , getLoggedInUser} = require('../controllers/user.controller');
const router = express.Router();

// Register User
router.post(
  '/register-user',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['creator', 'business']),
  ],
   createUser
);

// Login User
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
 login
);

// Get Authenticated User
router.get('/profile', auth, getLoggedInUser);

module.exports = router;
