const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmark.controller.js");


// Terapkan middleware otentikasi untuk semua rute di file ini


// Rute untuk /bookmarks
router.get("/bookmarks", bookmarkController.handleGetBookmarks);
router.post("/bookmarks", bookmarkController.handleAddBookmark);
router.delete("/bookmarks/:id", bookmarkController.handleDeleteBookmark);

// Rute untuk /bookmarked (berdasarkan jobId)
router.delete("/bookmarked/:jobId", bookmarkController.handleDeleteBookmarkByJobId);

module.exports = router;