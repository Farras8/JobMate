const { db } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getExperienceHistory = async (uid) => {
    const snapshot = await db.collection("users").doc(uid).collection("experience").orderBy("startDate", "desc").get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addExperience = async (uid, expData) => {
    const { position, company, description, employmentType, startDate, endDate } = expData;

    if (!position || !company || !description || !employmentType || !startDate) {
        const err = new Error("Missing required fields");
        err.status = 400;
        throw err;
    }
    // Anda bisa menambahkan validasi lain di sini jika perlu

    const dataToSave = {
        position,
        company,
        description,
        employmentType: employmentType.toLowerCase(),
        startDate,
        endDate: endDate || null,
        createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("users").doc(uid).collection("experience").add(dataToSave);
    return { id: docRef.id, ...dataToSave };
};

const updateExperience = async (uid, experienceId, expData) => {
    const experienceRef = db.collection("users").doc(uid).collection("experience").doc(experienceId);
    const doc = await experienceRef.get();
    if (!doc.exists) {
        const err = new Error("Experience document not found");
        err.status = 404;
        throw err;
    }

    const updateData = { ...expData, updatedAt: FieldValue.serverTimestamp() };
    await experienceRef.update(updateData);
    return updateData;
};

const deleteExperience = async (uid, experienceId) => {
    const experienceRef = db.collection("users").doc(uid).collection("experience").doc(experienceId);
    const doc = await experienceRef.get();
    if (!doc.exists) {
        const err = new Error("Experience document not found");
        err.status = 404;
        throw err;
    }
    await experienceRef.delete();
};

module.exports = {
    getExperienceHistory,
    addExperience,
    updateExperience,
    deleteExperience,
};