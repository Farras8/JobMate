const express = require("express");
const router = express.Router();
const educationController = require("../controllers/education.controller.js");

// Terapkan middleware otentikasi untuk semua rute di file ini


router.get("/", educationController.handleGetEducationHistory);
router.post("/", educationController.handleAddEducation);
router.patch("/:id", educationController.handleUpdateEducation);
router.delete("/:id", educationController.handleDeleteEducation);

module.exports = router;