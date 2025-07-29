const { db } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getPreferences = async (uid) => {
    const docRef = db.collection("users").doc(uid).collection("preferences").doc("default");
    const doc = await docRef.get();
    if (!doc.exists) {
        const err = new Error("Preferences not found");
        err.status = 404;
        throw err;
    }
    return { id: doc.id, ...doc.data() };
};

const setPreferences = async (uid, prefData) => {
    const { jobCategories, locations, salaryExpectation, jobTypes } = prefData;
    if (!Array.isArray(jobCategories) || !Array.isArray(locations) || !Array.isArray(jobTypes)) {
        const err = new Error("jobCategories, locations, and jobTypes must be arrays");
        err.status = 400;
        throw err;
    }

    const dataToSave = {
        jobCategories,
        locations,
        salaryExpectation,
        jobTypes,
        updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = db.collection("users").doc(uid).collection("preferences").doc("default");
    // Gunakan set dengan merge true agar bisa membuat atau update
    await docRef.set(dataToSave, { merge: true });
    return dataToSave;
};

module.exports = {
    getPreferences,
    setPreferences,
};