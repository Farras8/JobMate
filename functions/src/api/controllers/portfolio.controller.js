const portfolioService = require("../services/portfolio.service.js");

const handleGetPortfolio = async (req, res) => {
    try {
        const projects = await portfolioService.getPortfolio(req.user.uid);
        res.status(200).json({ projects });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get portfolio", details: err.message });
    }
};

const handleAddPortfolioProject = async (req, res) => {
    try {
        const newProject = await portfolioService.addPortfolioProject(req.user.uid, req.body);
        res.status(201).json({ message: "Portfolio project added successfully", project: newProject });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to add portfolio project", details: err.message });
    }
};

const handleUpdatePortfolioProject = async (req, res) => {
    try {
        await portfolioService.updatePortfolioProject(req.user.uid, req.params.id, req.body);
        res.status(200).json({ message: "Portfolio project updated successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to update portfolio project", details: err.message });
    }
};

const handleDeletePortfolioProject = async (req, res) => {
    try {
        await portfolioService.deletePortfolioProject(req.user.uid, req.params.id);
        res.status(200).json({ message: "Portfolio project deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to delete portfolio project", details: err.message });
    }
};

module.exports = {
    handleGetPortfolio,
    handleAddPortfolioProject,
    handleUpdatePortfolioProject,
    handleDeletePortfolioProject,
};