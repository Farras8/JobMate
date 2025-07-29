const { db, bucket } = require("../../config/firebase.config.js");
const { FieldValue } = require("firebase-admin/firestore");

const getDocuments = async (uid) => {
    const snapshot = await db.collection("users").doc(uid).collection("documents").orderBy("uploadedAt", "desc").get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const uploadDocument = async (uid, body, file) => {
    const { type, documentName, credentialId, issuedDate, expireDate } = body;

    if (!file || !type || !documentName) {
        const err = new Error("File, type, and documentName are required");
        err.status = 400;
        throw err;
    }

    const validTypes = ['cv', 'sertifikat'];
    if (!validTypes.includes(type.toLowerCase())) {
        const err = new Error("Invalid type. Must be 'cv' or 'sertifikat'");
        err.status = 400;
        throw err;
    }

    // 1. Upload file ke Cloud Storage
    const extension = file.mimetype.split('/')[1]; // misal: 'application/pdf' -> 'pdf'
    const fileName = `documents/${uid}-${Date.now()}.${extension}`;
    const bucketFile = bucket.file(fileName);
    await bucketFile.save(file.buffer, { metadata: { contentType: file.mimetype }, public: true });
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fileName)}`;

    // 2. Siapkan data untuk disimpan di Firestore berdasarkan tipe dokumen
    const dataToSave = {
        type: type.toLowerCase(),
        documentName,
        fileUrl: publicUrl,
        uploadedAt: FieldValue.serverTimestamp(), // Kirim "placeholder" timestamp
    };

    if (dataToSave.type === 'sertifikat') {
        if (!issuedDate) {
            const err = new Error("issuedDate is required for type 'sertifikat'");
            err.status = 400;
            throw err;
        }
        dataToSave.issuedDate = issuedDate;
        if (credentialId) dataToSave.credentialId = credentialId;
        if (expireDate) dataToSave.expireDate = expireDate;
    }

    // 3. Simpan data ke Firestore
    const docRef = await db.collection("users").doc(uid).collection("documents").add(dataToSave);
    
    // 4. Ambil kembali data yang baru dibuat untuk mendapatkan timestamp yang sebenarnya
    const newDocSnapshot = await docRef.get();
    const finalData = newDocSnapshot.data();

    // Ubah format Firestore Timestamp menjadi objek Date standar agar bisa di-serialize ke JSON
    if (finalData.uploadedAt) {
        finalData.uploadedAt = finalData.uploadedAt.toDate();
    }

    // 5. Kembalikan data final yang akurat
    return { id: docRef.id, ...finalData };
};

const updateDocument = async (uid, documentId, body, file) => {
    const { type, documentName, credentialId, issuedDate, expireDate } = body;
    const documentRef = db.collection("users").doc(uid).collection("documents").doc(documentId);
    const doc = await documentRef.get();
    if (!doc.exists) {
        const err = new Error("Document not found");
        err.status = 404;
        throw err;
    }

    const updateData = { updatedAt: FieldValue.serverTimestamp() };

    // Jika ada file baru, ganti file lama
    if (file) {
        const oldFileUrl = doc.data().fileUrl;
        if (oldFileUrl) {
            try {
                const oldFilePath = decodeURIComponent(oldFileUrl.split(`/${bucket.name}/`)[1]);
                await bucket.file(oldFilePath).delete();
            } catch (storageError) {
                console.error("Failed to delete old file from storage, but continuing:", storageError.message);
            }
        }
        const extension = file.mimetype.split('/')[1];
        const newFileName = `documents/${uid}-${Date.now()}.${extension}`;
        const bucketFile = bucket.file(newFileName);
        await bucketFile.save(file.buffer, { metadata: { contentType: file.mimetype }, public: true });
        updateData.fileUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(newFileName)}`;
    }

    // Update field teks
    if (documentName) updateData.documentName = documentName;

    // Logika untuk tipe
    const finalType = type ? type.toLowerCase() : doc.data().type;
    if (type) updateData.type = finalType;

    if (finalType === 'sertifikat') {
        if (issuedDate !== undefined) updateData.issuedDate = issuedDate;
        if (credentialId !== undefined) updateData.credentialId = credentialId;
        if (expireDate !== undefined) updateData.expireDate = expireDate;
    } else if (finalType === 'cv') {
        // Hapus field sertifikat jika tipe diubah menjadi CV
        updateData.issuedDate = FieldValue.delete();
        updateData.credentialId = FieldValue.delete();
        updateData.expireDate = FieldValue.delete();
    }

    if (Object.keys(updateData).length === 1 && !file) {
        const err = new Error("No valid fields to update");
        err.status = 400;
        throw err;
    }

    await documentRef.update(updateData);
    return updateData;
};


const deleteDocument = async (uid, documentId) => {
    const documentRef = db.collection("users").doc(uid).collection("documents").doc(documentId);
    const doc = await documentRef.get();
    if (!doc.exists) {
        const err = new Error("Document not found");
        err.status = 404;
        throw err;
    }

    const fileUrl = doc.data().fileUrl;
    if (fileUrl) {
        try {
            const filePath = decodeURIComponent(fileUrl.split(`/${bucket.name}/`)[1]);
            await bucket.file(filePath).delete();
        } catch (storageError) {
            console.error("Failed to delete file from storage, but continuing:", storageError.message);
        }
    }

    await documentRef.delete();
};


module.exports = {
    getDocuments,
    uploadDocument,
    updateDocument,
    deleteDocument,
};