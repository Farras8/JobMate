# API Troubleshooting Guide

## Masalah yang Ditemukan

### 1. CORS Policy Error
```
Access to fetch at 'https://faq-jobmate-api-11168120376.asia-southeast2.run.app/health' 
from origin 'http://localhost:5173' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### 2. API Endpoints 404
- `/health` endpoint tidak tersedia
- `/jobs/recent` endpoint tidak tersedia

### 3. Multiple API Base URLs
Aplikasi menggunakan 4 API yang berbeda:
1. **Main API**: `https://jobmate-api-11168120376.asia-southeast2.run.app`
2. **FAQ API**: `https://faq-jobmate-api-11168120376.asia-southeast2.run.app`
3. **ML API**: `https://jobmate-job-api-11168120376.asia-southeast2.run.app`
4. **CV Review API**: `https://cv-review-service-11168120376.asia-southeast2.run.app`

## Solusi yang Sudah Diterapkan

### 1. Environment Configuration
- Dibuat file `.env.local` untuk konfigurasi API
- Ditambahkan `VITE_DEV_MODE=true` untuk development

### 2. Error Handling Improvements
- **ChatbotService**: Ditambahkan pengecekan development mode
- **jobService**: Ditambahkan handling untuk 404 dan CORS errors
- Fallback mechanisms untuk mencegah aplikasi crash

### 3. Development Mode Protection
- Aplikasi akan skip API calls yang bermasalah saat development
- Menampilkan warning yang informatif di console

## Langkah Selanjutnya

### Untuk Backend/Server:
1. **Konfigurasi CORS** di semua API servers:
   ```javascript
   // Contoh untuk Express.js
   app.use(cors({
     origin: ['http://localhost:5173', 'https://your-production-domain.com'],
     credentials: true
   }));
   ```

2. **Pastikan Endpoints Tersedia**:
   - Implementasi `/health` endpoint
   - Implementasi `/jobs/recent` endpoint
   - Verifikasi semua endpoints yang digunakan aplikasi

3. **API Documentation**:
   - Dokumentasikan semua available endpoints
   - Pastikan konsistensi response format

### Untuk Frontend Development:
1. **Update .env.local** dengan konfigurasi yang benar
2. **Test API Endpoints** satu per satu
3. **Implementasi Retry Logic** untuk network failures
4. **Add Loading States** untuk better UX

### Untuk Production:
1. **Remove Development Mode** (`VITE_DEV_MODE=false`)
2. **Update CORS Configuration** di server
3. **Monitor API Health** dengan proper health checks
4. **Implement Error Tracking** (Sentry, LogRocket, etc.)

## Testing API Endpoints

Gunakan tools seperti Postman atau curl untuk test endpoints:

```bash
# Test health endpoint
curl -X GET "https://faq-jobmate-api-11168120376.asia-southeast2.run.app/health"

# Test recent jobs
curl -X GET "https://jobmate-api-11168120376.asia-southeast2.run.app/jobs/recent"
```

## Temporary Workaround

Sementara API belum diperbaiki, aplikasi akan:
- Skip health checks di development mode
- Return empty arrays untuk failed API calls
- Show informative warnings di console
- Prevent application crashes

## Contact

Jika masalah persists, hubungi:
- Backend team untuk CORS configuration
- DevOps team untuk server health checks
- API team untuk endpoint availability