const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Inisialisasi service yang akan digunakan
const db = admin.firestore();
const storage = new Storage();
const bucket = storage.bucket("jobmate-465516.firebasestorage.app"); // Ganti dengan nama bucket Anda jika berbeda

// Ekspor instance agar bisa digunakan di file lain
module.exports = {
  admin,
  db,
  bucket,
};