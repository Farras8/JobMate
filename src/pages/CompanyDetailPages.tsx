// src/pages/CompanyDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompanyDetail from '../components/CompaniesComp/CompanyDetail';
import { fetchCompanyById, type Company } from '../services/CompanyService';
import { Loader2, AlertCircle, ArrowLeft, Building2, Sparkles } from 'lucide-react';

const CompanyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [company, setCompany] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const loadCompanyDetail = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const data = await fetchCompanyById(id);
                    setCompany(data);
                } catch (err: any) {
                    setError(err.message || 'Gagal memuat detail perusahaan.');
                } finally {
                    setIsLoading(false);
                }
            };
            loadCompanyDetail();
        } else {
            setError("ID Perusahaan tidak ditemukan.");
            setIsLoading(false);
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 flex flex-col relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/10 rounded-full blur-3xl"></div>
            </div>

            <Navbar />
            
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Enhanced Back Button */}
                    <div className="mb-8">
                        <Link 
                            to="/companies" 
                            className="group inline-flex items-center bg-white/80 backdrop-blur-sm hover:bg-white text-blue-600 hover:text-blue-800 px-6 py-3 rounded-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="font-semibold">Kembali ke Daftar Perusahaan</span>
                        </Link>
                    </div>

                    {/* Enhanced Loading State */}
                    {isLoading ? (
                        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-100/50 rounded-3xl shadow-2xl shadow-blue-500/5 overflow-hidden">
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20"></div>
                            
                            <div className="relative flex flex-col justify-center items-center h-96 p-8">
                                {/* Animated loading spinner with enhanced styling */}
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                        <Loader2 className="animate-spin h-10 w-10 text-white" />
                                    </div>
                                    {/* Pulse ring effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-blue-500/30 scale-110 animate-pulse"></div>
                                </div>
                                
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Memuat Detail Perusahaan</h3>
                                    <p className="text-gray-600">Silakan tunggu sebentar...</p>
                                </div>

                                {/* Loading animation dots */}
                                <div className="flex space-x-2 mt-6">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    ) : error ? (
                        /* Enhanced Error State */
                        <div className="relative bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-3xl shadow-2xl shadow-red-500/5 overflow-hidden">
                            {/* Error gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-orange-50/20"></div>
                            
                            <div className="relative p-12 text-center">
                                {/* Error icon with enhanced styling */}
                                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/25">
                                    <AlertCircle size={32} className="text-white" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-red-700 mb-4">Terjadi Kesalahan</h3>
                                <p className="text-red-600 text-lg mb-8 max-w-md mx-auto">{error}</p>
                                
                                {/* Retry button */}
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <span>Coba Lagi</span>
                                </button>
                            </div>
                        </div>
                    ) : company ? (
                        /* Company Detail with enhanced container */
                        <div className="relative">
                            {/* Header section with company preview */}
                            <div className="mb-8 bg-white/60 backdrop-blur-sm border border-gray-100/50 rounded-3xl p-8 shadow-lg shadow-blue-500/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                            <Building2 size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-800">Detail Perusahaan</h1>
                                            <p className="text-gray-600">Informasi lengkap tentang perusahaan</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                                        <Sparkles size={16} className="text-blue-500" />
                                        <span className="text-sm font-semibold text-blue-700">Premium</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main company detail component */}
                            <CompanyDetail company={company} />
                        </div>
                    ) : (
                        /* Enhanced No Data State */
                        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-100/50 rounded-3xl shadow-2xl shadow-blue-500/5 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-blue-50/20"></div>
                            
                            <div className="relative p-16 text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-500/25">
                                    <Building2 size={32} className="text-white" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-700 mb-4">Data Tidak Ditemukan</h3>
                                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                                    Maaf, data perusahaan yang Anda cari tidak dapat ditemukan.
                                </p>
                                
                                <Link 
                                    to="/companies"
                                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <ArrowLeft size={18} className="mr-2" />
                                    <span>Kembali ke Daftar</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default CompanyDetailPage;