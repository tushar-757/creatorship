const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const CreatorProfile = require('../models/creator.model');
const BusinessProfile = require('../models/business.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const createUser = async (req, res) => {
  // console.log("secret key",process.env.JWT_SECRET);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role, ...profileData } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let user = await User.findOne({ email }).session(session);
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        username,
        email,
        password,
        role,
      });

      await user.save({ session });

      if (role === 'creator') {
        const creatorProfile = new CreatorProfile({
          user: user._id,
          ...profileData,
        });
        await creatorProfile.save({ session });
      } else if (role === 'business') {
        const businessProfile = new BusinessProfile({
          user: user._id,
          ...profileData,
        });
        await businessProfile.save({ session });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

         await session.commitTransaction();
      session.endSession();

    } catch (err) {
      console.error(err.message);
      await session.abortTransaction();
      session.endSession();
      res.status(500).send('Server error');
    }
}

const login =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}

const getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server error');
    }
 }

module.exports ={
    createUser,
    login,
    getLoggedInUser
}