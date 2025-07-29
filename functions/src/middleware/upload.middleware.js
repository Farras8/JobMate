const multer = require("multer");

// Konfigurasi untuk upload GAMBAR (JPG, PNG)
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimal 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Hanya file gambar (JPG, PNG) yang diizinkan."));
    }
    cb(null, true);
  },
});

// Konfigurasi BARU untuk upload DOKUMEN (PDF)
const uploadPdf = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Maksimal 10MB untuk dokumen
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Hanya file PDF yang diizinkan."));
    }
    cb(null, true);
  },
});

module.exports = {
  uploadImage,
  uploadPdf,
};