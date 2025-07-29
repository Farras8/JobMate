const express = require("express");
const router = express.Router();
const preferencesController = require("../controllers/preferences.controller.js");


// Terapkan middleware otentikasi untuk semua rute di file ini


router.get("/", preferencesController.handleGetPreferences);
router.post("/", preferencesController.handleSetPreferences);
router.patch("/", preferencesController.handleSetPreferences);

module.exports = router;