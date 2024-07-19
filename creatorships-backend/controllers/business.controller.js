const BusinessProfile = require('../models/business.model');

const getBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const getAllBusinessProfile = async (req, res) => {
  try {
    const profiles = await BusinessProfile.find().populate('user', ['username', 'email']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
const createOrUpdateProfile = async (req, res) => {
  const { companyName, industry, website, description } = req.body;

  const profileFields = {
    user: req.user.id,
    companyName,
    industry,
    website,
    description,
  };

  try {
    let profile = await BusinessProfile.findOne({ user: req.user.id });

    if (profile) {
      profile = await BusinessProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new BusinessProfile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getBusinessProfile,
  createOrUpdateProfile,
  getAllBusinessProfile
}