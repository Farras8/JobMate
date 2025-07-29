const profileService = require("../services/profile.service.js");

const handleGetProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.user.uid);
    res.status(200).json(profile);
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to fetch profile", details: err.message });
  }
};

const handleUpdateProfile = async (req, res) => {
  try {
    const updatedData = await profileService.updateProfile(req.user.uid, req.body, req.file);
    res.status(200).json({ message: "Profile updated successfully", updatedFields: Object.keys(updatedData) });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to update profile", details: err.message });
  }
};

const handleDeleteProfilePhoto = async (req, res) => {
  try {
    await profileService.deleteProfilePhoto(req.user.uid);
    res.status(200).json({ message: "Profile photo deleted successfully" });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to delete profile photo", details: err.message });
  }
};

const handleGetProfileForResume = async (req, res) => {
    try {
        const resumeData = await profileService.getProfileForResume(req.user.uid, req.query);
        res.status(200).json(resumeData);
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to fetch profile for resume", details: err.message });
    }
};

module.exports = {
  handleGetProfile,
  handleUpdateProfile,
  handleDeleteProfilePhoto,
  handleGetProfileForResume
};