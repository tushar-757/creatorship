// models/Partnership.js
const mongoose = require('mongoose');

const PartnershipSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreatorProfile',
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessProfile',
    required: true,
  },
  equityStake: {
    type: Number,
    required: true,
  },
  terms: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'terminated'],
    default: 'active',
  },
});

const Partnership = mongoose.model('Partnership', PartnershipSchema);
module.exports = Partnership;
