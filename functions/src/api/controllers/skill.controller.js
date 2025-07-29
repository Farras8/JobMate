const skillService = require("../services/skill.service.js");

const handleGetGlobalHardSkills = async (req, res) => {
  try {
    const hardSkills = await skillService.getGlobalSkills("hard_skills");
    res.status(200).json({ hard_skills: hardSkills });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Failed to get hard skills", details: err.message });
  }
};

const handleAddGlobalHardSkills = async (req, res) => {
  try {
    const addedSkills = await skillService.addGlobalSkills(
      "hard_skills",
      req.body
    );
    res
      .status(201)
      .json({ message: "Hard skills added successfully", addedSkills });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Failed to add hard skills", details: err.message });
  }
};

const handleGetGlobalSoftSkills = async (req, res) => {
  try {
    const softSkills = await skillService.getGlobalSkills("soft_skills");
    res.status(200).json({ soft_skills: softSkills });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Failed to get soft skills", details: err.message });
  }
};

const handleAddGlobalSoftSkills = async (req, res) => {
  try {
    const addedSkills = await skillService.addGlobalSkills(
      "soft_skills",
      req.body
    );
    res
      .status(201)
      .json({ message: "Soft skills added successfully", addedSkills });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: "Failed to add soft skills", details: err.message });
  }
};

const handleGetUserSkills = (collectionName) => async (req, res) => {
  try {
    const skills = await skillService.getUserSkills(req.user.uid, collectionName);
    res.status(200).json(skills);
  } catch (err) {
    res.status(err.status || 500).json({ error: `Failed to get user ${collectionName}`, details: err.message });
  }
};

const handleAddUserSkills = (collectionName) => async (req, res) => {
  try {
    const addedSkills = await skillService.addUserSkills(req.user.uid, collectionName, req.body);
    res.status(201).json({ message: `User ${collectionName} added successfully`, addedSkills });
  } catch (err) {
    res.status(err.status || 500).json({ error: `Failed to add user ${collectionName}`, details: err.message });
  }
};

const handleUpdateUserSkills = (collectionName) => async (req, res) => {
  try {
    await skillService.updateUserSkills(req.user.uid, collectionName, req.body);
    res.status(200).json({ message: `User ${collectionName} updated successfully` });
  } catch (err) {
    res.status(err.status || 500).json({ error: `Failed to update user ${collectionName}`, details: err.message });
  }
};

const handleDeleteUserSkills = (collectionName) => async (req, res) => {
  try {
    await skillService.deleteUserSkills(req.user.uid, collectionName, req.body.skillIds);
    res.status(200).json({ message: `User ${collectionName} deleted successfully` });
  } catch (err) {
    res.status(err.status || 500).json({ error: `Failed to delete user ${collectionName}`, details: err.message });
  }
};


module.exports = {
  handleGetGlobalHardSkills,
  handleAddGlobalHardSkills,
  handleGetGlobalSoftSkills,
  handleAddGlobalSoftSkills,
  handleGetUserSkills,     
  handleAddUserSkills,     
  handleUpdateUserSkills,  
  handleDeleteUserSkills
};