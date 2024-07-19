const CreatorProfile = require('../models/creator.model');

const getCreatorProfile = async (req, res) => {
  try {
    const profile = await CreatorProfile.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// get all creators
const getAllCreators = async (req, res) => {
  try {
    const creators = await CreatorProfile.find().populate('user', ['username', 'email']);
    res.json(creators);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const createOrUpdateProfile =async (req, res) => {
  const { bio, socialLinks, skills, portfolio } = req.body;

  const profileFields = {
    user: req.user.id,
    bio,
    socialLinks,
    skills: Array.isArray(skills) ? skills : skills.split(',').map((skill) => skill.trim()),
    portfolio: Array.isArray(portfolio) ? portfolio : portfolio.split(',').map((item) => item.trim()),
  };

  try {
    let profile = await CreatorProfile.findOne({ user: req.user.id });

    if (profile) {
      profile = await CreatorProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new CreatorProfile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports={
    getCreatorProfile,
    createOrUpdateProfile,
    getAllCreators
}