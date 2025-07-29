const { db, bucket } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getApplications = async (uid) => {
    const snapshot = await db.collection("users").doc(uid).collection("applications").orderBy("appliedAt", "desc").get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getApplicationById = async (uid, applicationId) => {
    const docRef = db.collection("users").doc(uid).collection("applications").doc(applicationId);
    const doc = await docRef.get();
    if (!doc.exists) {
        const err = new Error("Application not found");
        err.status = 404;
        throw err;
    }
    return { id: doc.id, ...doc.data() };
};

const addApplication = async (uid, body, file) => {
    const { jobId, coverLetter, notes } = body;
    if (!jobId || !file) {
        const err = new Error("jobId and a resume file are required");
        err.status = 400;
        throw err;
    }

    const existingApp = await db.collection("users").doc(uid).collection("applications").where("jobId", "==", jobId).get();
    if (!existingApp.empty) {
        const err = new Error("You have already applied for this job.");
        err.status = 409;
        throw err;
    }

    // Langsung gunakan buffer dari 'file' object
    const fileName = `resumes/${uid}-${Date.now()}.pdf`;
    const bucketFile = bucket.file(fileName);

    await bucketFile.save(file.buffer, {
        metadata: { contentType: 'application/pdf' },
        public: true
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fileName)}`;
    const dataToSave = {
        jobId,
        appliedAt: FieldValue.serverTimestamp(),
        status: "pending",
        resumeUrl: publicUrl,
        resumeFileName: fileName, // Simpan nama file untuk proses delete
        coverLetter: coverLetter || "",
        notes: notes || "",
    };

    const docRef = await db.collection("users").doc(uid).collection("applications").add(dataToSave);
    
    // Ambil kembali data untuk mendapatkan timestamp yang akurat
    const newDocSnapshot = await docRef.get();
    const finalData = newDocSnapshot.data();
    finalData.appliedAt = finalData.appliedAt.toDate();

    return { id: docRef.id, ...finalData };
};

const deleteApplication = async (uid, applicationId) => {
    const docRef = db.collection("users").doc(uid).collection("applications").doc(applicationId);
    const doc = await docRef.get();
    if (!doc.exists) {
        const err = new Error("Application not found");
        err.status = 404;
        throw err;
    }

    const resumeFileName = doc.data().resumeFileName;
    if (resumeFileName) {
        try {
            await bucket.file(resumeFileName).delete();
        } catch (storageError) {
            console.error("Failed to delete resume file from storage, but continuing:", storageError.message);
        }
    }

    await docRef.delete();
};

module.exports = {
    getApplications,
    getApplicationById,
    addApplication,
    deleteApplication,
};