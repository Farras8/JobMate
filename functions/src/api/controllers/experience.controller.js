const experienceService = require("../services/experience.service.js");

const handleGetExperienceHistory = async (req, res) => {
    try {
        const experienceList = await experienceService.getExperienceHistory(req.user.uid);
        res.status(200).json({ experience: experienceList });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get experience history", details: err.message });
    }
};

const handleAddExperience = async (req, res) => {
    try {
        const newExperience = await experienceService.addExperience(req.user.uid, req.body);
        res.status(201).json({ message: "Experience added successfully", experience: newExperience });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to add experience", details: err.message });
    }
};

const handleUpdateExperience = async (req, res) => {
    try {
        await experienceService.updateExperience(req.user.uid, req.params.id, req.body);
        res.status(200).json({ message: "Experience updated successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to update experience", details: err.message });
    }
};

const handleDeleteExperience = async (req, res) => {
    try {
        await experienceService.deleteExperience(req.user.uid, req.params.id);
        res.status(200).json({ message: "Experience deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to delete experience", details: err.message });
    }
};

module.exports = {
    handleGetExperienceHistory,
    handleAddExperience,
    handleUpdateExperience,
    handleDeleteExperience,
};