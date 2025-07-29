const { db } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getPortfolio = async (uid) => {
    const snapshot = await db.collection("users").doc(uid).collection("portfolio").orderBy("createdAt", "desc").get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addPortfolioProject = async (uid, projectData) => {
    const { title, description, projectUrl, technologies } = projectData;
    if (!title) {
        const err = new Error("Missing title for the project");
        err.status = 400;
        throw err;
    }

    const dataToSave = {
        title,
        description: description || "",
        projectUrl: projectUrl || "",
        technologies: Array.isArray(technologies) ? technologies : [],
        createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("users").doc(uid).collection("portfolio").add(dataToSave);
    return { id: docRef.id, ...dataToSave };
};

const updatePortfolioProject = async (uid, projectId, projectData) => {
    const projectRef = db.collection("users").doc(uid).collection("portfolio").doc(projectId);
    const doc = await projectRef.get();
    if (!doc.exists) {
        const err = new Error("Portfolio project not found");
        err.status = 404;
        throw err;
    }

    const updateData = { ...projectData, updatedAt: FieldValue.serverTimestamp() };
    await projectRef.update(updateData);
    return updateData;
};

const deletePortfolioProject = async (uid, projectId) => {
    const projectRef = db.collection("users").doc(uid).collection("portfolio").doc(projectId);
    const doc = await projectRef.get();
    if (!doc.exists) {
        const err = new Error("Portfolio project not found");
        err.status = 404;
        throw err;
    }
    await projectRef.delete();
};

module.exports = {
    getPortfolio,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
};