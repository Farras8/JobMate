const { db, bucket } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getProfile = async (uid) => {
  const snap = await db.collection("users").doc(uid).collection("user_personal").doc("info").get();
  if (!snap.exists) {
    const err = new Error("Profile not found");
    err.status = 404;
    throw err;
  }
  return { uid, ...snap.data() };
};

const updateProfile = async (uid, body, file) => {
    const data = {};
    const allowedFields = ["fullName", "phoneNumber", "city", "linkedin", "github", "instagram", "portfolioSite", "username", "status"];
    
    allowedFields.forEach((field) => {
        if (body[field] !== undefined) data[field] = body[field];
    });

    // Logika upload file sekarang menggunakan object 'file' dari multer
    if (file) {
        // Dapatkan ekstensi file dari mimetype, contoh: 'image/png' -> 'png'
        const extension = file.mimetype.split('/')[1];
        const fileName = `profile-photos/${uid}-${Date.now()}.${extension}`;
        const bucketFile = bucket.file(fileName);
        
        // Simpan buffer file langsung (tidak perlu decode Base64)
        await bucketFile.save(file.buffer, { metadata: { contentType: file.mimetype }, public: true });
        
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fileName)}`;
        data.photoUrl = publicUrl;
        
        // Logika untuk hapus foto lama tetap sama
        const userDocRef = db.collection("users").doc(uid).collection("user_personal").doc("info");
        const userDoc = await userDocRef.get();
        if (userDoc.exists && userDoc.data().photoUrl) {
            try {
                const oldPhotoUrl = userDoc.data().photoUrl;
                const oldFilePath = decodeURIComponent(oldPhotoUrl.split("/o/")[1].split("?")[0]);
                await bucket.file(oldFilePath).delete();
            } catch (err) { 
                console.error("Failed to delete old photo, but continuing update:", err);
            }
        }
    }

    if (Object.keys(data).length === 0 && !file) {
        const err = new Error("No valid fields to update");
        err.status = 400;
        throw err;
    }

    data.updatedAt = FieldValue.serverTimestamp();
    const userDocRef = db.collection("users").doc(uid).collection("user_personal").doc("info");
    await userDocRef.set(data, { merge: true });
    return data;
};


const deleteProfilePhoto = async (uid) => {
    const userDocRef = db.collection("users").doc(uid).collection("user_personal").doc("info");
    const userDoc = await userDocRef.get();

    if (!userDoc.exists || !userDoc.data().photoUrl) {
        const err = new Error("No profile photo to delete");
        err.status = 400;
        throw err;
    }

    const photoUrl = userDoc.data().photoUrl;
    const filePath = decodeURIComponent(photoUrl.split(`/${bucket.name}/`)[1]);

    await bucket.file(filePath).delete();
    await userDocRef.update({ photoUrl: FieldValue.delete() });
};

const getProfileForResume = async (uid, queryParams) => {
    const { educationIds, experienceIds, portfolioIds } = queryParams;

    // Helper function to get filtered data from a sub-collection
    const getFilteredData = async (collectionName, selectedIds) => {
        const collectionRef = db.collection("users").doc(uid).collection(collectionName);
        if (!selectedIds) {
            const snapshot = await collectionRef.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        
        const idsArray = Array.isArray(selectedIds) ? selectedIds : selectedIds.split(',');
        if (idsArray.length === 0) return [];

        const promises = idsArray.map(id => collectionRef.doc(id.trim()).get());
        const docSnaps = await Promise.all(promises);
        return docSnaps.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
    };
    const [
        personalInfoDoc, 
        education, 
        experience, 
        portfolio, 
        hardSkills, 
        softSkills,
        certificateDocs 
    ] = await Promise.all([
        db.collection("users").doc(uid).collection("user_personal").doc("info").get(),
        getFilteredData("education", educationIds),
        getFilteredData("experience", experienceIds),
        getFilteredData("portfolio", portfolioIds),
        getFilteredData("hard-skills", null),
        getFilteredData("soft-skills", null),
        db.collection("users").doc(uid).collection("documents").where("type", "==", "sertifikat").get()
    ]);

    if (!personalInfoDoc.exists) {
        const err = new Error("User profile not found");
        err.status = 404;
        throw err;
    }
    const certificates = certificateDocs.docs.map(doc => {
        const data = doc.data();
        return {
            documentName: data.documentName,
            credentialId: data.credentialId || null, 
            issuedDate: data.issuedDate,
            expireDate: data.expireDate || null,   
            fileUrl: data.fileUrl                 
        };
    });

    return {
        ...personalInfoDoc.data(),
        education,
        experience,
        portfolio,
        hardSkills,
        softSkills,
        certificates, 
    };
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfilePhoto,
  getProfileForResume
};