const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill.controller.js");

// TIDAK perlu 'authenticate' di sini

// Hard Skills Pengguna
router.get("/hard-skills", skillController.handleGetUserSkills('hard-skills'));
router.post("/hard-skills", skillController.handleAddUserSkills('hard-skills'));
router.patch("/hard-skills", skillController.handleUpdateUserSkills('hard-skills'));
router.delete("/hard-skills", skillController.handleDeleteUserSkills('hard-skills'));

// Soft Skills Pengguna
router.get("/soft-skills", skillController.handleGetUserSkills('soft-skills'));
router.post("/soft-skills", skillController.handleAddUserSkills('soft-skills'));
router.patch("/soft-skills", skillController.handleUpdateUserSkills('soft-skills'));
router.delete("/soft-skills", skillController.handleDeleteUserSkills('soft-skills'));

module.exports = router;