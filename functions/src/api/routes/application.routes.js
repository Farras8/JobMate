const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller.js");
const { uploadPdf } = require("../../middleware/upload.middleware.js");

// Terapkan middleware otentikasi untuk semua rute di file ini
router.get("/", applicationController.handleGetApplications);
router.post("/", uploadPdf.single('resumeFile'), applicationController.handleAddApplication);
router.get("/:applicationId", applicationController.handleGetApplicationById);
router.delete("/:applicationId", applicationController.handleDeleteApplication);

module.exports = router;