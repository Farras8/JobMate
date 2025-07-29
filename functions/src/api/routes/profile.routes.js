const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller.js");
const { uploadImage } = require("../../middleware/upload.middleware.js"); 


// Semua rute di bawah ini akan memerlukan token otentikasi


router.get("/profile", profileController.handleGetProfile);
router.patch("/profile", uploadImage.single('photo'), profileController.handleUpdateProfile);
router.delete("/profile/photo", profileController.handleDeleteProfilePhoto);
router.get("/profile-resume", profileController.handleGetProfileForResume); 

module.exports = router;