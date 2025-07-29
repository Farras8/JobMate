# Gunakan base image Node.js versi 18 yang ringan
FROM node:18-slim

# Tetapkan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan caching Docker agar 'npm install' tidak selalu dijalankan
COPY package*.json ./

# Instal dependensi aplikasi
RUN npm install --production

# Salin semua sisa kode sumber aplikasi Anda
COPY . .

# Beritahu dunia luar bahwa container ini akan menerima koneksi di port 8080
EXPOSE 8080

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD [ "npm", "start" ]