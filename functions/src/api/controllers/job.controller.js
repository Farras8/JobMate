const jobService = require("../services/job.service.js");

const handleAddJobs = async (req, res) => {
  try {
    await jobService.addJobs(req.body);
    res.status(201).json({ message: "Jobs added successfully" });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to add jobs", details: err.message });
  }
};

const handleGetJobs = async (req, res) => {
  try {
    const jobs = await jobService.getJobs(req.query);
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to get jobs", details: err.message });
  }
};

const handleGetRecentJobs = async (req, res) => {
  try {
    const jobs = await jobService.getRecentJobs();
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to get recent jobs", details: err.message });
  }
};

const handleGetJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json(job);
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to get job details", details: err.message });
  }
};

module.exports = {
  handleAddJobs,
  handleGetJobs,
  handleGetRecentJobs,
  handleGetJobById,
};