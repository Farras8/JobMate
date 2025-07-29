const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolio.controller.js");


// Terapkan middleware otentikasi untuk semua rute di file ini


router.get("/", portfolioController.handleGetPortfolio);
router.post("/", portfolioController.handleAddPortfolioProject);
router.patch("/:id", portfolioController.handleUpdatePortfolioProject);
router.delete("/:id", portfolioController.handleDeletePortfolioProject);

module.exports = router;