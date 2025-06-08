// src/pages/ApplicationDetailPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplicationDetail from '../components/ApplicationComp/ApplicationDetail';
import { getApplicationDetail, type AppliedJob } from '../services/ApplicationService';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

const ApplicationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [application, setApplication] = useState<AppliedJob | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadApplicationDetail = useCallback(async () => {
        if (!id) {
            setError("ID Lamaran tidak valid atau tidak ditemukan.");
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            const data = await getApplicationDetail(id);
            if (data) {
                setApplication(data);
            } else {
                setError("Detail lamaran tidak ditemukan.");
            }
        } catch (err: any) {
            setError(err.message || 'Gagal memuat detail lamaran.');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadApplicationDetail();
    }, [loadApplicationDetail]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Enhanced Back Button */}
                    <div className="mb-6 lg:mb-8">
                        <Link 
                            to="/applications" 
                            className="group inline-flex items-center text-purple-700 hover:text-purple-900 transition-all duration-300 font-semibold bg-white/60 backdrop-blur-sm px-4 py-2.5 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl border border-purple-100/50 hover:border-purple-200/70 hover:bg-white/80 text-sm lg:text-base"
                        >
                            <ArrowLeft size={18} className="lg:hidden mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                            <ArrowLeft size={20} className="hidden lg:block mr-2 lg:mr-3 group-hover:-translate-x-1 transition-transform duration-200" />
                            Kembali ke Riwayat Lamaran
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="bg-white backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/20"></div>
                            <div className="relative flex justify-center items-center h-64 lg:h-80">
                                <div className="text-center">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl shadow-purple-900/20 mb-4 lg:mb-6">
                                        <Loader2 className="animate-spin h-8 w-8 lg:h-10 lg:w-10 text-purple-600" />
                                    </div>
                                    <p className="text-sm lg:text-base text-gray-600 font-medium">Memuat detail lamaran...</p>
                                </div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-white backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-red-200/50 overflow-hidden p-6 lg:p-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-red-50/20"></div>
                            <div className="relative text-center">
                                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl shadow-red-900/20 mb-4 lg:mb-6">
                                    <AlertCircle size={24} className="lg:hidden text-red-600" />
                                    <AlertCircle size={28} className="hidden lg:block text-red-600" />
                                </div>
                                <div className="text-lg lg:text-xl font-bold text-red-800 mb-2">Gagal Memuat Data</div>
                                <p className="text-sm lg:text-base text-red-600 max-w-md mx-auto">{error}</p>
                            </div>
                        </div>
                    ) : application ? (
                        <ApplicationDetail application={application} />
                    ) : (
                        <div className="bg-white backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden p-8 lg:p-12">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-50/20"></div>
                            <div className="relative text-center">
                                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl shadow-gray-900/20 mb-4 lg:mb-6">
                                    <AlertCircle size={24} className="lg:hidden text-gray-600" />
                                    <AlertCircle size={28} className="hidden lg:block text-gray-600" />
                                </div>
                                <div className="text-lg lg:text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</div>
                                <p className="text-sm lg:text-base text-gray-500">Data lamaran tidak ditemukan.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ApplicationDetailPage;