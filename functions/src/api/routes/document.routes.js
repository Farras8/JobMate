const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller.js");
const { uploadPdf } = require("../../middleware/upload.middleware.js");

// Terapkan middleware otentikasi untuk semua rute di file ini

router.get("/", documentController.handleGetDocuments);
router.post("/", uploadPdf.single('document'), documentController.handleUploadDocument);
router.patch("/:documentId", uploadPdf.single('document'), documentController.handleUpdateDocument);
router.delete("/:documentId", documentController.handleDeleteDocument);

module.exports = router;