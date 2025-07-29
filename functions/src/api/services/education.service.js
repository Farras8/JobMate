const { db } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getEducationHistory = async (uid) => {
    const snapshot = await db.collection("users").doc(uid).collection("education").orderBy("startDate", "desc").get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addEducation = async (uid, eduData) => {
    const { level, institution, major, startDate, endDate, gpa } = eduData;

    if (!level || !institution || !major || !startDate) {
        const err = new Error("Missing required fields (level, institution, major, startDate)");
        err.status = 400;
        throw err;
    }
    // Anda bisa menambahkan validasi lain di sini (format tanggal, dll.)

    const existingEduSnapshot = await db.collection("users").doc(uid).collection("education")
        .where("level", "==", level)
        .where("institution", "==", institution)
        .where("major", "==", major)
        .get();

    if (!existingEduSnapshot.empty) {
        const err = new Error("Education with the same level, institution, and major already exists");
        err.status = 409;
        throw err;
    }

    const dataToSave = {
        level,
        institution,
        major,
        startDate,
        endDate: endDate || null,
        gpa: gpa || null,
        createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("users").doc(uid).collection("education").add(dataToSave);
    return { id: docRef.id, ...dataToSave };
};

const updateEducation = async (uid, educationId, eduData) => {
    const educationRef = db.collection("users").doc(uid).collection("education").doc(educationId);
    const doc = await educationRef.get();
    if (!doc.exists) {
        const err = new Error("Education document not found");
        err.status = 404;
        throw err;
    }

    const updateData = { ...eduData, updatedAt: FieldValue.serverTimestamp() };
    await educationRef.update(updateData);
    return updateData;
};

const deleteEducation = async (uid, educationId) => {
    const educationRef = db.collection("users").doc(uid).collection("education").doc(educationId);
    const doc = await educationRef.get();
    if (!doc.exists) {
        const err = new Error("Education document not found");
        err.status = 404;
        throw err;
    }
    await educationRef.delete();
};

module.exports = {
    getEducationHistory,
    addEducation,
    updateEducation,
    deleteEducation,
};