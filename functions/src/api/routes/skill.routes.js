const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill.controller.js");

// Rute Publik (tanpa otentikasi)
router.get("/hard_skills_global", skillController.handleGetGlobalHardSkills);
router.post("/hard_skills_global", skillController.handleAddGlobalHardSkills);
router.get("/soft_skills_global", skillController.handleGetGlobalSoftSkills);
router.post("/soft_skills_global", skillController.handleAddGlobalSoftSkills);

module.exports = router;