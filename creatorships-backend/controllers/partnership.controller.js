const Partnership = require('../models/partnership.model');
const CreatorProfile = require('../models/creator.model');
const BusinessProfile = require('../models/business.model');

const getAllPartnerships = async (req, res) => {
  try {
    const partnerships = await Partnership.find().populate('creator business');
    res.json(partnerships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const getMyPartnerships = async (req, res) => {
  try {
    const partnerships = await Partnership.find({
      $or: [{ creator: req.user.id }, { business: req.user.id }],
    }).populate('creator business');
    res.json(partnerships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const createPartnership = async (req, res) => {
  const { creatorId, businessId, equityStake, terms, endDate } = req.body;

  try {
    const creator = await CreatorProfile.findById(creatorId);
    const business = await BusinessProfile.findById(businessId);

    if (!creator || !business) {
      return res.status(404).json({ msg: 'Creator or Business not found' });
    }

    const newPartnership = new Partnership({
      creator: creator._id,
      business: business._id,
      equityStake,
      terms,
      endDate,
    });

    const partnership = await newPartnership.save();
    res.json(partnership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const updatePartnership = async (req, res) => {
  const { equityStake, terms, endDate, status } = req.body;

  try {
    let partnership = await Partnership.findById(req.params.id);

    if (!partnership) {
      return res.status(404).json({ msg: 'Partnership not found' });
    }

    partnership.equityStake = equityStake;
    partnership.terms = terms;
    partnership.endDate = endDate;
    partnership.status = status;

    await partnership.save();
    res.json(partnership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getAllPartnerships,
  getMyPartnerships,
  createPartnership,
  updatePartnership,
}