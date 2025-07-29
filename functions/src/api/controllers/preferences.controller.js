const preferencesService = require("../services/preferences.service.js");

const handleGetPreferences = async (req, res) => {
    try {
        const preferences = await preferencesService.getPreferences(req.user.uid);
        res.status(200).json({ preferences });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get preferences", details: err.message });
    }
};

const handleSetPreferences = async (req, res) => {
    try {
        const newPreferences = await preferencesService.setPreferences(req.user.uid, req.body);
        res.status(201).json({ message: "Preferences set/updated successfully", preferences: newPreferences });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to set preferences", details: err.message });
    }
};

module.exports = {
    handleGetPreferences,
    handleSetPreferences,
};