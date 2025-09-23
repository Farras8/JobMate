// src/components/analysis/JobRecommendations.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Building2, Clock, Loader2, AlertCircle, Target, Sparkles } from 'lucide-react';
import { type RecommendedJob } from '../../types';
import { type CVReviewResponse } from '../../services/CVReviewService';
import { fetchAllJobsForMatching } from '../../services/recommendationService';

interface JobRecommendationsProps {
  reviewResult: CVReviewResponse | null;
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({ reviewResult }) => {
  const [recommendations, setRecommendations] = useState<RecommendedJob[]>([]);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reviewResult && reviewResult.skills) {
      generateRecommendations();
    }
  }, [reviewResult]);

  const generateRecommendations = async () => {
    if (!reviewResult || !reviewResult.skills) return;

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setExtractedSkills([]);

    try {
      // 1. Ambil skills dari hasil review CV
      const allSkills = [...reviewResult.skills.hardSkills, ...reviewResult.skills.softSkills];
      setExtractedSkills(allSkills);

      if (allSkills.length === 0) {
        setError('Tidak ada skills yang terdeteksi dari CV Anda. Pastikan CV berisi informasi keahlian yang jelas.');
        return;
      }

      // 2. Ambil semua job data
      const allJobs = await fetchAllJobsForMatching();

      // 3. Buat Set dari skills untuk pencarian yang efisien
      const skillSet = new Set(allSkills.map(skill => skill.toLowerCase()));

      // 4. Hitung similarity score untuk setiap job
      const jobRecommendations = allJobs.map(job => {
        const requiredSkills = job.skillsRequired || [];
        
        // Temukan skill yang cocok
        const matchedSkills = requiredSkills.filter(skill =>
          skillSet.has(skill.toLowerCase())
        );

        // Hitung skor: (jumlah skill cocok) / (jumlah skill yang dibutuhkan)
        const score = requiredSkills.length > 0
          ? matchedSkills.length / requiredSkills.length
          : 0;

        return {
          ...job,
          similarityScore: score,
          matchedSkills: matchedSkills
        };
      })
        .filter(job => job.similarityScore > 0) // Hanya tampilkan yang punya kecocokan
        .sort((a, b) => b.similarityScore - a.similarityScore) // Urutkan dari skor tertinggi
        .slice(0, 10); // Ambil 10 teratas

      setRecommendations(jobRecommendations as RecommendedJob[]);

    } catch (err: any) {
      console.error('Error generating job recommendations:', err);
      setError(`Gagal menghasilkan rekomendasi: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
    if (score >= 0.4) return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200';
    return 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200';
  };

  const formatSalary = (salary: any) => {
    if (!salary || (!salary.min && !salary.max)) return 'Gaji tidak disebutkan';
    
    const currency = salary.currency || 'IDR';
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat('id-ID').format(num);
    };

    if (salary.min && salary.max) {
      return `${currency} ${formatNumber(salary.min)} - ${formatNumber(salary.max)}`;
    } else if (salary.min) {
      return `${currency} ${formatNumber(salary.min)}+`;
    } else if (salary.max) {
      return `Hingga ${currency} ${formatNumber(salary.max)}`;
    }
    return 'Gaji tidak disebutkan';
  };

  if (!reviewResult) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada CV</h3>
        <p className="text-gray-500">Upload CV terlebih dahulu untuk mendapatkan rekomendasi pekerjaan</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Menganalisis CV...</h3>
        <p className="text-gray-500">Sedang mencari pekerjaan yang sesuai dengan keahlian Anda</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-red-700 mb-2">Terjadi Kesalahan</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={generateRecommendations}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header dengan Skills yang Terdeteksi */}
      {extractedSkills.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200/30">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <Target size={16} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Skills Terdeteksi dari CV</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {extractedSkills.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hasil Rekomendasi */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Sparkles size={16} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Rekomendasi Pekerjaan ({recommendations.length})
            </h3>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-600">Tidak ada pekerjaan yang cocok ditemukan</p>
            <p className="text-sm text-gray-500 mt-1">Coba perbarui CV dengan keahlian yang lebih spesifik</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {recommendations.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors mb-1">
                      <Link to={`/jobdetail/${job.id}`} className="hover:underline">
                        {job.jobTitle}
                      </Link>
                    </h4>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Building2 size={14} className="mr-1" />
                        {job.companyName}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {job.location}
                      </div>
                      {job.postedAt && (
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {new Date(job.postedAt).toLocaleDateString('id-ID')}
                        </div>
                      )}
                    </div>
                  </div>
                  {job.similarityScore !== undefined && (
                    <div className={`text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${getScoreColor(job.similarityScore)}`}>
                      {(job.similarityScore * 100).toFixed(0)}% Match
                    </div>
                  )}
                </div>

                {/* Salary */}
                {job.salary && (
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                      {formatSalary(job.salary)}
                    </span>
                  </div>
                )}

                {/* Skills Required */}
                {job.skillsRequired && job.skillsRequired.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-bold text-gray-500 mb-2 uppercase">Skills Required</h5>
                    <div className="flex flex-wrap gap-2">
                      {job.skillsRequired.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200/50"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skillsRequired.length > 5 && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                          +{job.skillsRequired.length - 5} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Matched Skills */}
                {job.matchedSkills && job.matchedSkills.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-bold text-gray-500 mb-2 uppercase">Keahlian Cocok</h5>
                    <div className="flex flex-wrap gap-2">
                      {job.matchedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Description */}
                {job.jobDescription && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {job.jobDescription}
                  </p>
                )}

                {/* Action Button */}
                <div className="flex justify-end">
                  <Link
                    to={`/jobdetail/${job.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Briefcase size={16} className="mr-2" />
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRecommendations;