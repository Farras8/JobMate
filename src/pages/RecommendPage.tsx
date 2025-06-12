// src/pages/RecommendPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RecommendationHeader, RecommendationList } from '../components/RecommendComp/RecommendComponent';
// Hapus `fetchRecommendationsFromAPI`, kita tidak memakainya lagi
import { fetchUserSkills, fetchAllJobsForMatching } from '../services/recommendationService';
import { addBookmark, removeBookmarkByJobId, getBookmarks } from '../services/bookmarkService';
import { type JobData, type RecommendedJob, type UserSkill } from '../types';
import Swal from 'sweetalert2';
import { Loader2 } from 'lucide-react';
import { auth } from '../services/firebase';
import FloatingChatbot from '../components/FloatingChatbot';

const RecommendPage: React.FC = () => {
  const [userSkills, setUserSkills] = useState<{ hardSkills: UserSkill[], softSkills: UserSkill[] }>({ hardSkills: [], softSkills: [] });
  const [allJobs, setAllJobs] = useState<JobData[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedJob[]>([]);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<Set<string>>(new Set());

  const [isLoading, setIsLoading] = useState(true);
  const [isRecommending, setIsRecommending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [togglingBookmarkId, setTogglingBookmarkId] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [skillsData, jobsData, bookmarksData] = await Promise.all([
        fetchUserSkills(),
        fetchAllJobsForMatching(),
        getBookmarks()
      ]);
      setUserSkills(skillsData);
      setAllJobs(jobsData);
      setBookmarkedJobIds(new Set(bookmarksData.map(b => b.jobId)));
    } catch (err: any) {
      console.error("Error loading initial data for recommendations:", err);
      setError(err.message || "Gagal memuat data yang diperlukan untuk rekomendasi.");
      Swal.fire("Error", `Gagal memuat data: ${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  /**
   * FUNGSI UTAMA YANG DIPERBARUI
   * Logika rekomendasi sekarang sepenuhnya ada di sini (client-side).
   */
  const handleGetRecommendations = () => {
    if (userSkills.hardSkills.length === 0 && userSkills.softSkills.length === 0) {
      Swal.fire({
        title: "Keahlian Kosong",
        text: "Anda belum menambahkan keahlian pada profil. Silakan tambahkan terlebih dahulu untuk mendapatkan rekomendasi.",
        icon: "warning",
        confirmButtonText: "Tambah Keahlian",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/profile/edit', { state: { initialTab: 'skills' } });
        }
      });
      return;
    }

    setIsRecommending(true);
    setRecommendations([]);
    setError(null);

    setTimeout(() => {
      try {
        // 1. Buat satu Set dari semua skill pengguna untuk pencarian yang efisien
        const userSkillSet = new Set([
          ...userSkills.hardSkills.map(s => s.name.toLowerCase()),
          ...userSkills.softSkills.map(s => s.name.toLowerCase())
        ]);

        // 2. Proses semua pekerjaan untuk mencari kecocokan
        const jobRecommendations = allJobs.map(job => {
          const requiredSkills = job.skillsRequired || [];

          // Temukan skill yang cocok (irisan antara skill pengguna dan skill lowongan)
          const matchedSkills = requiredSkills.filter(skill =>
            userSkillSet.has(skill.toLowerCase())
          );

          // Hitung skor: (jumlah skill cocok) / (jumlah skill yang dibutuhkan)
          const score = requiredSkills.length > 0
            ? matchedSkills.length / requiredSkills.length
            : 0;

          return {
            ...job,
            similarityScore: score,
            matchedSkills: matchedSkills // Simpan skill yang cocok untuk ditampilkan di UI
          };
        })
          .filter(job => job.similarityScore > 0) // Hanya tampilkan yang punya kecocokan
          .sort((a, b) => b.similarityScore - a.similarityScore) // Urutkan dari skor tertinggi
          .slice(0, 10); // Ambil 10 teratas

        if (jobRecommendations.length === 0) {
          Swal.fire("Info", "Tidak ada rekomendasi pekerjaan yang cocok ditemukan berdasarkan keahlian Anda saat ini.", "info");
        }

        setRecommendations(jobRecommendations as RecommendedJob[]);

      } catch (err: any) {
        console.error("Error calculating recommendations:", err);
        setError(`Gagal menghitung rekomendasi: ${err.message}`);
      } finally {
        setIsRecommending(false);
      }
    }, 500);
  };

  const handleToggleBookmark = async (jobId: string) => {
    if (!auth.currentUser) {
      Swal.fire("Login Dibutuhkan", "Anda harus login untuk menyimpan lowongan.", "warning");
      return;
    }

    const isCurrentlyBookmarked = bookmarkedJobIds.has(jobId);
    setTogglingBookmarkId(jobId);

    try {
      if (isCurrentlyBookmarked) {
        await removeBookmarkByJobId(jobId);
        setBookmarkedJobIds(prevIds => {
          const newIds = new Set(prevIds);
          newIds.delete(jobId);
          return newIds;
        });
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Bookmark dihapus', showConfirmButton: false, timer: 2000, timerProgressBar: true });
      } else {
        await addBookmark(jobId);
        setBookmarkedJobIds(prevIds => new Set(prevIds).add(jobId));
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Lowongan disimpan', showConfirmButton: false, timer: 2000, timerProgressBar: true });
      }
    } catch (err: any) {
      console.error("Error toggling bookmark:", err);
      Swal.fire("Gagal", err.message || "Terjadi kesalahan saat memproses bookmark.", "error");
    } finally {
      setTogglingBookmarkId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <RecommendationHeader
            hardSkills={userSkills.hardSkills}
            softSkills={userSkills.softSkills}
            onGetRecommendations={handleGetRecommendations}
            isLoading={isRecommending || isLoading}
          />

          {error && !isLoading && (
            <div className="my-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md text-center">{error}</div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center text-gray-500 py-10">
              <Loader2 className="animate-spin mr-2" size={20} /> Memuat data awal...
            </div>
          ) : recommendations.length > 0 && !isRecommending ? (
            <RecommendationList
              recommendations={recommendations}
              bookmarkedJobIds={bookmarkedJobIds}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : !isRecommending && recommendations.length === 0 ? (
            <div className="text-center py-10 mt-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Klik tombol "Dapatkan Rekomendasi" untuk memulai.</p>
            </div>
          ) : null}
        </div>
      </main>
      <FloatingChatbot />
      <Footer />
    </div>
  );
};

export default RecommendPage;