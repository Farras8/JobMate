const educationService = require("../services/education.service.js");

const handleGetEducationHistory = async (req, res) => {
    try {
        const educationList = await educationService.getEducationHistory(req.user.uid);
        res.status(200).json({ education: educationList });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get education history", details: err.message });
    }
};

const handleAddEducation = async (req, res) => {
    try {
        const newEducation = await educationService.addEducation(req.user.uid, req.body);
        res.status(201).json({ message: "Education added successfully", education: newEducation });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to add education", details: err.message });
    }
};

const handleUpdateEducation = async (req, res) => {
    try {
        await educationService.updateEducation(req.user.uid, req.params.id, req.body);
        res.status(200).json({ message: "Education updated successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to update education", details: err.message });
    }
};

const handleDeleteEducation = async (req, res) => {
    try {
        await educationService.deleteEducation(req.user.uid, req.params.id);
        res.status(200).json({ message: "Education deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to delete education", details: err.message });
    }
};

module.exports = {
    handleGetEducationHistory,
    handleAddEducation,
    handleUpdateEducation,
    handleDeleteEducation,
};