const app = require('./app'); // Impor aplikasi Express dari app.js

// Cloud Run akan menyediakan variabel PORT secara otomatis.
// 8080 adalah port default jika dijalankan di luar Cloud Run.
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});