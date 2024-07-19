// models/BusinessProfile.js
const mongoose = require('mongoose');

const BusinessProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

const BusinessProfile = mongoose.model('BusinessProfile', BusinessProfileSchema);
module.exports = BusinessProfile;
