import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Upload, FileText, Sparkles, Zap, Target, CheckCircle, ArrowRight, Loader2, AlertTriangle, BarChart3 } from 'lucide-react';
import FloatingChatbot from '../components/FloatingChatbot';
import { reviewCV } from '../services/CVReviewService';
import type { CVReviewResponse } from '../services/CVReviewService';
import OverallScoreCard from '../components/analysis/OverallScoreCard';
import CriticalIssues from '../components/analysis/CriticalIssues';
import Strengths from '../components/analysis/Strengths';
import KeywordAnalysis from '../components/analysis/KeywordAnalysis';
import LineAnalysis from '../components/analysis/LineAnalysis';
import ActionPlan from '../components/analysis/ActionPlan';

const CvReviewPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [reviewResult, setReviewResult] = useState<CVReviewResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('Critical Issues');

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (file.type === 'application/pdf') {
                setSelectedFile(file);
                setError(null);
            } else {
                setError('Hanya file PDF yang diizinkan');
                setSelectedFile(null);
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError(null);
        } else {
            setError('Hanya file PDF yang diizinkan');
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await reviewCV(selectedFile);
            setReviewResult(result);
        } catch (err) {
            setError('Terjadi kesalahan saat menganalisis CV. Silakan coba lagi.');
            console.error('CV analysis error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getTabIcon = (tabName: string) => {
        switch (tabName) {
            case 'Critical Issues':
                return <AlertTriangle size={16} className="text-red-600" />;
            case 'Strengths':
                return <CheckCircle size={16} className="text-green-600" />;
            case 'Keywords':
                return <Target size={16} className="text-blue-600" />;
            case 'Line Analysis':
                return <BarChart3 size={16} className="text-purple-600" />;
            case 'Action Plan':
                return <Zap size={16} className="text-orange-600" />;
            default:
                return null;
        }
    };

    if (reviewResult) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-32 left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-20 right-32 w-36 h-36 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-40 left-1/4 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
                    <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-300"></div>
                </div>

                <Navbar />

                <main className="max-w-6xl mx-auto px-4 py-16 relative z-10">
                    {/* Header Section */}
                    <section className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                            <BarChart3 size={14} className="text-blue-600" />
                            <span>Analisis Komprehensif</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight mb-4">
                            Hasil Analisis CV
                        </h1>
                        
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                            <Sparkles size={14} className="text-green-600" />
                            <span>Hasil Analisis Mendalam</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                            Breakdown komprehensif dari performa resume Anda di semua metrik kunci dengan rekomendasi perbaikan yang actionable
                        </p>
                    </section>

                    {/* Score Card Section */}
                    <section className="mb-12">
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <OverallScoreCard 
                                overallScore={reviewResult.overall_score}
                                scores={reviewResult.scores}
                            />
                        </div>
                    </section>

                    {/* Analysis Tabs Section */}
                    <section className="mb-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/10 p-8 border border-gray-200/50">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
                                    <Target size={14} className="text-purple-600" />
                                    <span>Analisis Detail</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight">
                                    Breakdown Analisis Resume
                                </h2>
                                <p className="text-gray-600 text-sm mt-2">
                                    Pilih kategori untuk melihat analisis mendalam
                                </p>
                            </div>

                            {/* Tabs */}
                            <div className="mb-8">
                                <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100/80 rounded-2xl backdrop-blur-sm">
                                    {['Critical Issues', 'Strengths', 'Keywords', 'Line Analysis', 'Action Plan'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                                                activeTab === tab
                                                    ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg shadow-blue-900/30'
                                                    : 'bg-white/80 text-gray-700 hover:bg-white hover:text-blue-600 shadow-sm hover:shadow-md'
                                            }`}
                                        >
                                            <div className={`transition-transform duration-300 ${activeTab === tab ? 'scale-110' : 'group-hover:scale-110'}`}>
                                                {getTabIcon(tab)}
                                            </div>
                                            <span>{tab}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="animate-fade-in-up">
                                {activeTab === 'Critical Issues' && (
                                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200/30">
                                        <CriticalIssues issues={reviewResult.issues} />
                                    </div>
                                )}
                                {activeTab === 'Strengths' && (
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/30">
                                        <Strengths strengths={reviewResult.strengths} />
                                    </div>
                                )}
                                {activeTab === 'Keywords' && (
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/30">
                                        <KeywordAnalysis keywords={reviewResult.keywords} />
                                    </div>
                                )}
                                {activeTab === 'Line Analysis' && (
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/30">
                                        <LineAnalysis lineByLine={reviewResult.line_by_line} />
                                    </div>
                                )}
                                {activeTab === 'Action Plan' && (
                                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200/30">
                                        <ActionPlan actionPlan={reviewResult.action_plan} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="text-center">
                        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={32} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Resume Anda Sudah Dianalisis!</h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Gunakan insight dan rekomendasi di atas untuk meningkatkan kualitas resume Anda. 
                                Semakin tinggi skor ATS, semakin besar peluang Anda lolos screening awal.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button 
                                    onClick={() => {
                                        setReviewResult(null);
                                        setSelectedFile(null);
                                        setActiveTab('Critical Issues');
                                    }}
                                    className="bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
                                >
                                    Analisis CV Lain
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
                <FloatingChatbot />
                <Footer />

                <style>{`
                    @keyframes fade-in-up {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .animate-fade-in-up {
                        animation: fade-in-up 0.5s ease-out;
                    }
                `}</style>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-32 w-36 h-36 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
            </div>

            <Navbar />

            <main className="flex-grow px-4 py-16 relative z-10">
                {/* Header Section */}
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Target size={14} className="text-blue-600" />
                        <span>Analisis CV Berbasis ATS</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight mb-6">
                        Analisis CV dengan Teknologi ATS
                    </h1>
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Sparkles size={14} className="text-green-600" />
                        <span>Gratis & Instan!</span>
                    </div>

                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        Optimalkan CV-mu agar terbaca oleh Applicant Tracking System (ATS) dan tingkatkan peluang suksesmu dalam melamar kerja dengan analisis mendalam dan saran perbaikan.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12">
                    {/* Upload Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/10 p-8 w-full max-w-lg mx-auto lg:mx-0 border border-gray-200/50">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Upload size={32} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload CV Anda</h2>
                            <p className="text-xs text-gray-500">
                                Unggah file dalam format PDF dengan ukuran maksimal 25 MB
                            </p>
                        </div>

                        {/* Drop Zone */}
                        <div 
                            className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-300 p-8 rounded-2xl text-center mb-6 bg-gradient-to-br from-gray-50 to-blue-50/30 hover:from-blue-50 hover:to-purple-50/30 group cursor-pointer"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('cv-upload')?.click()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    document.getElementById('cv-upload')?.click();
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label="Upload CV file"
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FileText size={24} className="text-blue-600" />
                            </div>
                            {selectedFile ? (
                                <div>
                                    <p className="text-sm text-green-600 font-medium mb-2">
                                        File terpilih: {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Ukuran: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm text-gray-600 font-medium mb-2">
                                        Seret file ke sini atau <span className="text-blue-600 font-semibold hover:underline">Browse</span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Format: PDF • Maksimal: 25 MB
                                    </p>
                                </div>
                            )}
                        </div>

                        <input
                            id="cv-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                        />

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="text-xs text-gray-400 text-center mb-6 flex items-center justify-center gap-2">
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <span>Atau seret file langsung ke area di atas</span>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button 
                                onClick={() => {
                                    setSelectedFile(null);
                                    setError(null);
                                }}
                                className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAnalyze}
                                disabled={!selectedFile || isLoading}
                                className="flex-1 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Menganalisis...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap size={18} />
                                        <span>Analisis Sekarang!</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Features & Illustration Section */}
                    <div className="w-full max-w-2xl mx-auto lg:mx-0">
                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                                    <CheckCircle size={24} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Analisis ATS</h3>
                                <p className="text-sm text-gray-600">Periksa kompatibilitas CV dengan sistem ATS perusahaan</p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                                    <Target size={24} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Saran Perbaikan</h3>
                                <p className="text-sm text-gray-600">Dapatkan rekomendasi untuk meningkatkan kualitas CV</p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                                    <Sparkles size={24} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Gratis & Cepat</h3>
                                <p className="text-sm text-gray-600">Analisis instan tanpa biaya dan registrasi</p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                                    <ArrowRight size={24} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Hasil Detail</h3>
                                <p className="text-sm text-gray-600">Laporan komprehensif dengan skor dan analisis mendalam</p>
                            </div>
                        </div>

                        {/* Illustration */}
                        <div className="hidden lg:block bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                            <img
                                src="/cv-illustration.png"
                                alt="CV Review Illustration"
                                className="w-full rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="max-w-4xl mx-auto mt-20 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/10 p-8 border border-gray-200/50">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <Zap size={18} className="text-white" />
                            </div>
                            Mengapa Memilih Analisis CV Kami?
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Dengan teknologi AI terdepan, kami menganalisis CV Anda seperti yang dilakukan oleh sistem ATS perusahaan.
                            Dapatkan insight mendalam tentang kekuatan dan area yang perlu diperbaiki, lengkap dengan panduan
                            step-by-step untuk optimasi maksimal.
                        </p>
                    </div>
                </div>
            </main>
            <FloatingChatbot />
            <Footer />
        </div>
    );
};

export default CvReviewPage;