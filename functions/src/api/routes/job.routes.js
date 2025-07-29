const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller.js");

router.post("/", jobController.handleAddJobs);
router.get("/", jobController.handleGetJobs);
router.get("/recent", jobController.handleGetRecentJobs);
router.get("/:id", jobController.handleGetJobById);

module.exports = router;