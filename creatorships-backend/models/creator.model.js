// models/CreatorProfile.js
const mongoose = require('mongoose');

const CreatorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  socialLinks: {
    youtube: String,
    instagram: String,
    twitter: String,
    tiktok: String,
  },
  skills: [String],
  portfolio: [String], // URLs or file references
});

const CreatorProfile = mongoose.model('CreatorProfile', CreatorProfileSchema);
module.exports = CreatorProfile;
