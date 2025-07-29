const express = require("express");
const mainRouter = express.Router();
const authenticate = require("../../middleware/auth.middleware.js");

// --- Impor semua file rute dari setiap fitur ---
const skillRoutes = require("./skill.routes.js");
const companyRoutes = require("./company.routes.js");
const jobRoutes = require("./job.routes.js");
const profileRoutes = require("./profile.routes.js");
const userSkillRoutes = require("./user.skill.routes.js");
const educationRoutes = require("./education.routes.js");
const experienceRoutes = require("./experience.routes.js");
const portfolioRoutes = require("./portfolio.routes.js");
const preferencesRoutes = require("./preferences.routes.js");
const documentRoutes = require("./document.routes.js");
const bookmarkRoutes = require("./bookmark.routes.js");
const applicationRoutes = require("./application.routes.js");

// =======================================
// === 1. RUTE PUBLIK (Tidak Perlu Login) ===
// =======================================
mainRouter.use("/", skillRoutes); // Untuk /hard_skills_global & /soft_skills_global
mainRouter.use("/companies", companyRoutes);
mainRouter.use("/jobs", jobRoutes);


// =======================================
// === 2. RUTE PRIVAT (Wajib Login) ===
// =======================================
const privateRouter = express.Router();

// Terapkan middleware 'authenticate' HANYA SATU KALI di sini
privateRouter.use(authenticate);

// Pasang SEMUA rute privat ke privateRouter yang sudah dilindungi
privateRouter.use("/", profileRoutes);
privateRouter.use("/", userSkillRoutes);
privateRouter.use("/education", educationRoutes);
privateRouter.use("/experience", experienceRoutes);
privateRouter.use("/portfolio", portfolioRoutes);
privateRouter.use("/preferences", preferencesRoutes);
privateRouter.use("/upload-document", documentRoutes);
privateRouter.use("/", bookmarkRoutes);
privateRouter.use("/applications", applicationRoutes);

// Sambungkan router privat yang sudah aman ke router utama
mainRouter.use("/", privateRouter);


module.exports = mainRouter;