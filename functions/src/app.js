const express = require("express");
const cors = require("cors");

// Muat rute utama dari folder routes
const mainRouter = require("./api/routes/index.js");

const app = express();

// Terapkan middleware global
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Sambungkan semua rute API kita ke URL utama ('/')
app.use("/", mainRouter);

module.exports = app;