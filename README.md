# JobMate REST API

REST API Backend untuk JobMate—dibangun dengan Express.js untuk menangani fungsionalitas inti seperti manajemen akun pengguna, endpoint lowongan pekerjaan, dan data profil/CV.

## 🌐 Deployment

**API Base URL:** `https://jobseeker-capstone-705829099986.asia-southeast2.run.app`

## 📖 Dokumentasi API

Dokumentasi lengkap beserta contoh request dan response tersedia di Postman:
**[Lihat Dokumentasi Postman](https://documenter.getpostman.com/view/36349178/2sB2qfAJyP)**

---

## 🔐 Otentikasi

Semua endpoint yang memerlukan data pengguna (profil, lamaran, dll.) dilindungi dan membutuhkan otentikasi. Kirimkan token yang Anda dapatkan di setiap request pada header `Authorization`.

**Format:** `Authorization: Bearer <ID_TOKEN_PENGGUNA>`

*(Catatan: Token didapatkan dari sisi frontend setelah pengguna login melalui Firebase Authentication).*

---

## Endpoints

### 🏢 Perusahaan & Pekerjaan (Publik)
- `GET /companies` - Mendapatkan daftar semua perusahaan (mendukung filter `city` & `minActiveJobCount`).
- `GET /companies/:id/detail` - Mendapatkan detail satu perusahaan.
- `GET /jobs` - Mencari dan memfilter lowongan pekerjaan.
- `GET /jobs/recent` - Mendapatkan 3 lowongan pekerjaan terbaru.
- `GET /jobs/:id` - Mendapatkan detail satu lowongan pekerjaan.

### 👤 Profil Pengguna
- `GET /profile` - Mengambil informasi utama profil pengguna.
- `PATCH /profile` - Memperbarui detail profil (termasuk upload foto).
- `DELETE /profile/photo` - Menghapus foto profil.

### 🎓 Pendidikan & Pengalaman
- `GET /education` - Mengambil riwayat pendidikan.
- `POST /education` - Menambah data pendidikan baru.
- `PATCH /education/:id` - Mengubah data pendidikan.
- `DELETE /education/:id` - Menghapus data pendidikan.
- `GET /experience` - Mengambil riwayat pengalaman kerja.
- `POST /experience` - Menambah data pengalaman baru.
- `PATCH /experience/:id` - Mengubah data pengalaman.
- `DELETE /experience/:id` - Menghapus data pengalaman.

### 🛠️ Skills, Portofolio & Preferensi
- `GET /hard-skills` - Mengambil daftar hard skill pengguna.
- `POST /hard-skills` - Menambah hard skill baru (mendukung batch).
- `GET /soft-skills` - Mengambil daftar soft skill pengguna.
- `POST /soft-skills` - Menambah soft skill baru (mendukung batch).
- `GET /portfolio` - Mengambil daftar portofolio.
- `POST /portfolio` - Menambah proyek portofolio baru.
- `PATCH /portfolio/:id` - Mengubah proyek portofolio.
- `DELETE /portfolio/:id` - Menghapus proyek portofolio.
- `GET /preferences` - Mengambil preferensi pekerjaan.
- `POST /preferences` - Mengatur preferensi pekerjaan.

### 📄 Dokumen, Lamaran & Bookmark
- `POST /upload-document` - Mengunggah dokumen baru (CV atau Sertifikat).
- `GET /upload-document` - Mengambil daftar dokumen yang sudah diunggah.
- `DELETE /upload-document/:documentId` - Menghapus dokumen.
- `GET /bookmarks` - Mengambil daftar pekerjaan yang di-bookmark.
- `POST /bookmarks` - Menambah bookmark baru.
- `DELETE /bookmarked/:jobId` - Menghapus bookmark berdasarkan ID pekerjaan.
- `GET /applications` - Mengambil riwayat lamaran.
- `POST /applications` - Mengajukan lamaran kerja baru (dengan upload CV).
- `DELETE /applications/:applicationId` - Menghapus/membatalkan lamaran.

### 📄 Agregator Resume
- `GET /profile-resume` - Mengambil data gabungan dari profil, skill, pendidikan, pengalaman, dan portofolio untuk ditampilkan sebagai resume. Mendukung filter berdasarkan ID.

## 💻 Teknologi yang Digunakan

- **Framework**: Express.js
- **Bahasa**: Node.js
- **Deployment**: Google Cloud Run
- **Database**: Google Firestore
- **Penyimpanan File**: Google Cloud Storage