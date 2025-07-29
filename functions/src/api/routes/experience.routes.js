const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience.controller.js");


// Terapkan middleware otentikasi untuk semua rute di file ini


router.get("/", experienceController.handleGetExperienceHistory);
router.post("/", experienceController.handleAddExperience);
router.patch("/:id", experienceController.handleUpdateExperience);
router.delete("/:id", experienceController.handleDeleteExperience);

module.exports = router;