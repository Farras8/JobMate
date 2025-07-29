const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller.js");

// Endpoint-endpoint untuk resource 'companies'
router.post("/", companyController.handleAddCompanies);
router.get("/", companyController.handleGetCompanies); // URL ini menangani GET all dan GET with filter

// Endpoint utility
router.post("/updateActiveJobCount", companyController.handleUpdateActiveJobCount);

// Endpoint untuk satu company spesifik berdasarkan ID
router.get("/:id/detail", companyController.handleGetCompanyById);
router.patch("/:id", companyController.handleUpdateCompany);
router.delete("/:id", companyController.handleDeleteCompany);

module.exports = router;