const { db } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getBookmarks = async (uid) => {
    const snapshot = await db.collection("users").doc(uid).collection("bookmarks").orderBy("bookmarkedAt", "desc").get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addBookmark = async (uid, jobId) => {
    if (!jobId) {
        const err = new Error("Missing jobId");
        err.status = 400;
        throw err;
    }

    const dataToSave = {
        jobId,
        bookmarkedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("users").doc(uid).collection("bookmarks").add(dataToSave);
    return { id: docRef.id, ...dataToSave };
};

const deleteBookmark = async (uid, bookmarkId) => {
    const docRef = db.collection("users").doc(uid).collection("bookmarks").doc(bookmarkId);
    const doc = await docRef.get();
    if (!doc.exists) {
        const err = new Error("Bookmark not found");
        err.status = 404;
        throw err;
    }
    await docRef.delete();
};

const deleteBookmarkByJobId = async (uid, jobId) => {
    const bookmarksRef = db.collection("users").doc(uid).collection("bookmarks");
    const snapshot = await bookmarksRef.where("jobId", "==", jobId).get();

    if (snapshot.empty) {
        const err = new Error("Bookmark for the specified job ID not found");
        err.status = 404;
        throw err;
    }

    const batch = db.batch();
    snapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
};

module.exports = {
    getBookmarks,
    addBookmark,
    deleteBookmark,
    deleteBookmarkByJobId,
};