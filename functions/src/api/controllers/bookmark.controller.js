const bookmarkService = require("../services/bookmark.service.js");

const handleGetBookmarks = async (req, res) => {
    try {
        const bookmarks = await bookmarkService.getBookmarks(req.user.uid);
        res.status(200).json({ bookmarks });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get bookmarks", details: err.message });
    }
};

const handleAddBookmark = async (req, res) => {
    try {
        const newBookmark = await bookmarkService.addBookmark(req.user.uid, req.body.jobId);
        res.status(201).json({ message: "Bookmark added successfully", bookmark: newBookmark });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to add bookmark", details: err.message });
    }
};

const handleDeleteBookmark = async (req, res) => {
    try {
        await bookmarkService.deleteBookmark(req.user.uid, req.params.id);
        res.status(200).json({ message: "Bookmark deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to delete bookmark", details: err.message });
    }
};

const handleDeleteBookmarkByJobId = async (req, res) => {
    try {
        await bookmarkService.deleteBookmarkByJobId(req.user.uid, req.params.jobId);
        res.status(200).json({ message: "Bookmark(s) deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to delete bookmark", details: err.message });
    }
};

module.exports = {
    handleGetBookmarks,
    handleAddBookmark,
    handleDeleteBookmark,
    handleDeleteBookmarkByJobId,
};