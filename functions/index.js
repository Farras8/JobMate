const functions = require("firebase-functions");
const app = require("./src/app"); // Impor aplikasi Express dari struktur baru kita

// Ekspor aplikasi Express sebagai satu Cloud Function bernama 'app'
// Nama 'app' sesuai dengan yang terakhir Anda gunakan (exports.app)
exports.app = functions.https.onRequest(app);