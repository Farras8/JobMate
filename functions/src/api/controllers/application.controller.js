const applicationService = require("../services/application.service.js");

const handleGetApplications = async (req, res) => {
    try {
        const applications = await applicationService.getApplications(req.user.uid);
        res.status(200).json({ applications });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get applications", details: err.message });
    }
};

const handleGetApplicationById = async (req, res) => {
    try {
        const application = await applicationService.getApplicationById(req.user.uid, req.params.applicationId);
        res.status(200).json({ application });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get application details", details: err.message });
    }
};

const handleAddApplication = async (req, res) => {
    try {
        const newApplication = await applicationService.addApplication(req.user.uid, req.body, req.file);
        res.status(201).json({ message: "Application submitted successfully", application: newApplication });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to submit application", details: err.message });
    }
};

const handleDeleteApplication = async (req, res) => {
    try {
        await applicationService.deleteApplication(req.user.uid, req.params.applicationId);
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to delete application", details: err.message });
    }
};

module.exports = {
    handleGetApplications,
    handleGetApplicationById,
    handleAddApplication,
    handleDeleteApplication,
};