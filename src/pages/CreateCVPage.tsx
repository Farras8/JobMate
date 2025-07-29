import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  ArrowLeft, 
  GraduationCap, 
  Briefcase, 
  FolderOpen,
  Settings,
  Eye,
  Loader2,
  AlertCircle,
  Award
} from 'lucide-react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingChatbot from '../components/FloatingChatbot';
import { fetchProfileResume, generateCVPDF, type CVData, type CVFilters } from '../services/CVService';
import ResumePreview from '../components/ResumePreview';
import { getEducation, type EducationData } from '../services/EducationService';
import { getExperience, type ExperienceData } from '../services/ExperienceService';
import { getPortfolioProjects, type PortfolioProject } from '../services/PortfolioService';

const CreateCVPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Data states
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [allEducation, setAllEducation] = useState<EducationData[]>([]);
  const [allExperience, setAllExperience] = useState<ExperienceData[]>([]);
  const [allPortfolio, setAllPortfolio] = useState<PortfolioProject[]>([]);
  const [allCertificates, setAllCertificates] = useState<CVData['certificates']>([]);
  
  // Selected items for CV
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<string[]>([]);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  
  // UI states
  const [currentStep, setCurrentStep] = useState<'select' | 'preview'>('select');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all data on component mount
  const loadAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch all resume data without filters to get all certificates
      const resumeData = await fetchProfileResume();
      const [education, experience, portfolio] = await Promise.all([
        getEducation(),
        getExperience(),
        getPortfolioProjects()
      ]);
      
      setAllEducation(education);
      setAllExperience(experience);
      setAllPortfolio(portfolio);
      setAllCertificates(resumeData.certificates || []);
      
      // Auto-select all items initially
      setSelectedEducation(education.map(item => item.id).filter(id => id !== undefined) as string[]);
      setSelectedExperience(experience.map(item => item.id).filter(id => id !== undefined) as string[]);
      setSelectedPortfolio(portfolio.map(item => item.id).filter(id => id !== undefined) as string[]);
      setSelectedCertificates(resumeData.certificates?.map(item => item.id).filter(id => id !== undefined) as string[]);
      
    } catch (err: unknown) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat data profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Generate CV preview
  const generatePreview = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const filters: CVFilters = {
        educationIds: selectedEducation,
        experienceIds: selectedExperience,
        portfolioIds: selectedPortfolio,
        certificateIds: selectedCertificates
      };
      
      const data = await fetchProfileResume(filters);
      setCvData(data);
      setCurrentStep('preview');
      
    } catch (err: unknown) {
      console.error('Error generating preview:', err);
      setError(err instanceof Error ? err.message : 'Gagal membuat preview CV');
    } finally {
      setIsLoading(false);
    }
  };

  // Download CV as PDF
  const downloadCV = async () => {
    if (!cvData) return;
    
    try {
      setIsGenerating(true);
      
      // Generate PDF blob using html2canvas + jsPDF
      const pdfBlob = await generateCVPDF(cvData);
      
      // Create download link for PDF file
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `CV-${cvData.fullName?.replace(/\s+/g, '-') || 'Resume'}.pdf`;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      Swal.fire({
        title: 'CV Berhasil Diunduh!',
        text: 'CV Anda telah berhasil diunduh dalam format PDF yang ATS-friendly dan siap untuk digunakan melamar kerja.',
        icon: 'success',
        confirmButtonText: 'Mengerti',
        customClass: { popup: 'rounded-xl' }
      });
      
    } catch (err: unknown) {
      console.error('Error downloading CV:', err);
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat mengunduh CV';
      Swal.fire({
        title: 'Gagal Mengunduh',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: { popup: 'rounded-xl' }
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle selection handlers
  const toggleEducationSelection = (id: string) => {
    setSelectedEducation(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleExperienceSelection = (id: string) => {
    setSelectedExperience(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const togglePortfolioSelection = (id: string) => {
    setSelectedPortfolio(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleCertificateSelection = (id: string) => {
    setSelectedCertificates(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Check if enough content is selected
  const hasEnoughContent = () => {
    return selectedEducation.length > 0 || 
           selectedExperience.length > 0 || 
           selectedPortfolio.length > 0 || 
           selectedCertificates.length > 0;
  };

  if (isLoading && currentStep === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadAllData}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  if (currentStep === 'preview') {
                    setCurrentStep('select');
                  } else {
                    navigate('/profile/edit');
                  }
                }}
                className="p-2 hover:bg-white/60 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <FileText size={16} className="text-blue-600" />
                  <span>ATS-Optimized CV</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Create Your CV
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Buat CV professional yang optimal untuk sistem ATS dengan data profile Anda
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentStep === 'select' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
              }`}>
                <Settings size={16} />
                <span className="font-medium">Pilih Konten</span>
              </div>
              
              <div className="w-8 h-0.5 bg-gray-300"></div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentStep === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <Eye size={16} />
                <span className="font-medium">Preview & Download</span>
              </div>
            </div>
          </div>

          {/* Content Selection Step */}
          {currentStep === 'select' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">Petunjuk Pembuatan CV</h3>
                    <p className="text-amber-700 text-sm">
                      Karena CV hanya dapat muat dalam 1 halaman A4, pilih dengan bijak pengalaman, pendidikan, 
                      proyek, dan sertifikat yang paling relevan dengan posisi yang Anda lamar. Fokus pada kualitas daripada kuantitas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Selection */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Pendidikan</h3>
                    <p className="text-sm text-gray-600">Pilih riwayat pendidikan yang akan ditampilkan</p>
                  </div>
                </div>

                {allEducation.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <GraduationCap size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Belum ada data pendidikan</p>
                    <button
                      onClick={() => navigate('/profile/edit?section=education')}
                      className="mt-2 text-blue-500 hover:text-blue-600 text-sm underline"
                    >
                      Tambah data pendidikan
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allEducation.map((edu) => (
                      <label
                        key={edu.id}
                        aria-label={`Select ${edu.level} ${edu.major} from ${edu.institution}`}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start justify-between ${
                          selectedEducation.includes(edu.id!)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{edu.level} {edu.major}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">
                            {edu.startDate} - {edu.endDate || 'Sekarang'}
                            {edu.gpa && ` • GPA: ${edu.gpa}`}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedEducation.includes(edu.id!)}
                          onChange={() => toggleEducationSelection(edu.id!)}
                          className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience Selection */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Briefcase size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Pengalaman Kerja</h3>
                    <p className="text-sm text-gray-600">Pilih pengalaman kerja yang akan ditampilkan</p>
                  </div>
                </div>

                {allExperience.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Briefcase size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Belum ada data pengalaman kerja</p>
                    <button
                      onClick={() => navigate('/profile/edit?section=experience')}
                      className="mt-2 text-blue-500 hover:text-blue-600 text-sm underline"
                    >
                      Tambah data pengalaman
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allExperience.map((exp) => (
                      <label
                        key={exp.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start justify-between ${
                          selectedExperience.includes(exp.id!)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 bg-white'
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                          <p className="text-gray-600">{exp.company} • {exp.employmentType}</p>
                          <p className="text-sm text-gray-500">
                            {exp.startDate} - {exp.endDate || 'Sekarang'}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{exp.description}</p>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedExperience.includes(exp.id!)}
                          onChange={() => toggleExperienceSelection(exp.id!)}
                          className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Portfolio Selection */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FolderOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Proyek & Portfolio</h3>
                    <p className="text-sm text-gray-600">Pilih proyek yang akan ditampilkan</p>
                  </div>
                </div>

                {allPortfolio.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FolderOpen size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Belum ada data portfolio</p>
                    <button
                      onClick={() => navigate('/profile/edit?section=portfolio')}
                      className="mt-2 text-blue-500 hover:text-blue-600 text-sm underline"
                    >
                      Tambah data portfolio
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allPortfolio.map((portfolio) => (
                      <label
                        key={portfolio.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start justify-between ${
                          selectedPortfolio.includes(portfolio.id!)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 bg-white'
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{portfolio.title}</h4>
                          {portfolio.description && (
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{portfolio.description}</p>
                          )}
                          {portfolio.technologies && portfolio.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {portfolio.technologies.slice(0, 3).map((tech, techIndex) => (
                                <span
                                  key={`${portfolio.id}-tech-${techIndex}`}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {portfolio.technologies.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{portfolio.technologies.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedPortfolio.includes(portfolio.id!)}
                          onChange={() => togglePortfolioSelection(portfolio.id!)}
                          className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Certificate Selection */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Sertifikat</h3>
                    <p className="text-sm text-gray-600">Pilih sertifikat yang akan ditampilkan</p>
                  </div>
                </div>

                {allCertificates.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Award size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Belum ada data sertifikat</p>
                    <button
                      onClick={() => navigate('/profile/edit?section=certificates')}
                      className="mt-2 text-blue-500 hover:text-blue-600 text-sm underline"
                    >
                      Tambah data sertifikat
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allCertificates.map((cert) => (
                      <label
                        key={cert.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start justify-between ${
                          selectedCertificates.includes(cert.id!)
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-gray-200 hover:border-yellow-300 bg-white'
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{cert.documentName}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(cert.issuedDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                            {cert.expireDate ? ` - ${new Date(cert.expireDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}` : ' - Tidak kedaluwarsa'}
                            {cert.credentialId && ` • Credential ID: ${cert.credentialId}`}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedCertificates.includes(cert.id!)}
                          onChange={() => toggleCertificateSelection(cert.id!)}
                          className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-500"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Generate Preview Button */}
              <div className="text-center">
                <button
                  onClick={generatePreview}
                  disabled={!hasEnoughContent() || isLoading}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    hasEnoughContent() && !isLoading
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Membuat Preview...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>Buat Preview CV</span>
                    </div>
                  )}
                </button>
                
                {!hasEnoughContent() && (
                  <p className="text-sm text-gray-500 mt-2">
                    Pilih minimal satu item untuk membuat CV
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Preview Step */}
          {currentStep === 'preview' && cvData && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Preview Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Preview CV</h2>
                <p className="text-gray-600">
                  Berikut adalah tampilan CV yang akan didownload. Format ini mengikuti standar ATS-friendly.
                </p>
              </div>

              {/* CV Preview - Exact same as PDF output */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-600 text-center">
                    ✅ Format ATS-Friendly • 📄 Siap untuk PDF • 🎯 Optimized untuk HR Systems
                  </p>
                </div>
                
                {/* Resume Preview Component - matches exactly what will be in PDF */}
                <div className="p-8">
                  <ResumePreview cvData={cvData} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep('select')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Kembali Edit
                </button>
                
                <button
                  onClick={downloadCV}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Membuat PDF...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Download size={16} />
                      <span>Download PDF</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <FloatingChatbot />
      <Footer />
    </div>
  );
};

export default CreateCVPage;