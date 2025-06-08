// src/components/ApplicationComp/ApplicationDetail.tsx
import React from 'react';
import { type AppliedJob, type ApplicationStatus } from '../../services/ApplicationService';
import { Link } from 'react-router-dom';
import { 
    Clock, 
    Eye, 
    User, 
    CheckCircle, 
    XCircle, 
    AlertCircle, 
    Building2, 
    FileText, 
    Calendar,
    MessageSquare,
    StickyNote,
    ExternalLink,
    TrendingUp
} from 'lucide-react';

// --- Enhanced Status Badge Component ---
const getStatusClasses = (status: ApplicationStatus): string => {
    switch (status) {
        case 'pending':
            return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200/50 shadow-lg shadow-yellow-900/20';
        case 'reviewed':
            return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200/50 shadow-lg shadow-blue-900/20';
        case 'interview':
            return 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border border-indigo-200/50 shadow-lg shadow-indigo-900/20';
        case 'offered':
            return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-200/50 shadow-lg shadow-green-900/20';
        case 'rejected':
            return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200/50 shadow-lg shadow-red-900/20';
        default:
            return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200/50 shadow-lg shadow-gray-900/20';
    }
};

const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
        case 'pending': return <Clock size={16} className="lg:w-5 lg:h-5" />;
        case 'reviewed': return <Eye size={16} className="lg:w-5 lg:h-5" />;
        case 'interview': return <User size={16} className="lg:w-5 lg:h-5" />;
        case 'offered': return <CheckCircle size={16} className="lg:w-5 lg:h-5" />;
        case 'rejected': return <XCircle size={16} className="lg:w-5 lg:h-5" />;
        default: return <AlertCircle size={16} className="lg:w-5 lg:h-5" />;
    }
};

const getStatusText = (status: ApplicationStatus): string => {
    switch (status) {
        case 'pending': return 'Menunggu';
        case 'reviewed': return 'Ditinjau';
        case 'interview': return 'Wawancara';
        case 'offered': return 'Diterima';
        case 'rejected': return 'Ditolak';
        default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
};

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => (
    <div className={`inline-flex items-center gap-2 lg:gap-3 text-sm lg:text-base font-semibold px-4 py-2.5 lg:px-6 lg:py-3 rounded-2xl lg:rounded-3xl transition-all duration-300 hover:scale-105 ${getStatusClasses(status)}`}>
        {getStatusIcon(status)}
        <span>{getStatusText(status)}</span>
    </div>
);

const ApplicationDetail: React.FC<{ application: AppliedJob }> = ({ application }) => {
    const { jobDetails } = application;

    const formatDate = (dateValue?: any): string => {
        if (!dateValue) return '-';
        if (typeof dateValue === 'object' && dateValue !== null && '_seconds' in dateValue) {
            const date = new Date(dateValue._seconds * 1000);
            return date.toLocaleDateString('id-ID', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
        try {
            return new Date(dateValue).toLocaleDateString('id-ID', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } catch (e) {
            return 'Tanggal tidak valid';
        }
    };
    
    return (
        <div className="group relative bg-white backdrop-blur-sm border border-gray-100/50 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-purple-500/10">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/20"></div>
            
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-br from-purple-50 via-indigo-50/80 to-pink-50/40 p-6 lg:p-10 border-b border-gray-100/50">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-indigo-900/5 to-pink-900/5"></div>
                <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 mb-6">
                        {/* Company Logo */}
                        <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl bg-white shadow-xl shadow-purple-900/20 flex items-center justify-center text-2xl lg:text-3xl font-bold border border-purple-100/50 group-hover:shadow-2xl group-hover:shadow-purple-900/25 transition-all duration-300 group-hover:scale-105">
                                {jobDetails?.companyLogo ? 
                                    <img src={jobDetails.companyLogo} alt={jobDetails.companyName} className="w-full h-full object-contain rounded-2xl lg:rounded-3xl"/> : 
                                    <span className="text-purple-700">{jobDetails?.companyName?.charAt(0).toUpperCase()}</span>
                                }
                            </div>
                        </div>

                        {/* Job Info */}
                        <div className="flex-grow text-center lg:text-left">
                            <p className="text-xs lg:text-sm font-semibold text-purple-700 mb-2 lg:mb-3 uppercase tracking-wider">Detail Lamaran</p>
                            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2 lg:mb-3 group-hover:text-purple-700 transition-colors duration-300">
                                {jobDetails?.title || "Judul Pekerjaan Tidak Diketahui"}
                            </h1>
                            <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3 text-lg lg:text-xl text-gray-700 font-semibold mb-4 lg:mb-6">
                                <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                                    <Building2 size={14} className="lg:hidden text-purple-700" />
                                    <Building2 size={16} className="hidden lg:block text-purple-700" />
                                </div>
                                <span>{jobDetails?.companyName}</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3 mb-6">
                                <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                    <TrendingUp size={14} className="lg:hidden text-green-700" />
                                    <TrendingUp size={16} className="hidden lg:block text-green-700" />
                                </div>
                                <span className="text-sm lg:text-base font-semibold text-gray-700">Status Lamaran:</span>
                            </div>
                            <StatusBadge status={application.status} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative p-6 lg:p-10 space-y-8 lg:space-y-12">
                {/* Informasi Lamaran */}
                <section className="group/section">
                    <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/20">
                            <Calendar size={18} className="lg:hidden text-purple-700" />
                            <Calendar size={20} className="hidden lg:block text-purple-700" />
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover/section:text-purple-700 transition-colors duration-300">
                            Informasi Lamaran
                        </h2>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-50/50 to-purple-50/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100/50 shadow-inner">
                        <div className="space-y-4 lg:space-y-6">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                                <div className="flex items-center gap-2 lg:gap-3 text-gray-600 font-semibold text-sm lg:text-base w-full lg:w-48 flex-shrink-0">
                                    <Clock size={16} className="lg:w-5 lg:h-5 text-purple-700" />
                                    <span>Tanggal Melamar</span>
                                </div>
                                <span className="text-gray-900 font-medium text-sm lg:text-base bg-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg border border-gray-200/50">
                                    {formatDate(application.appliedAt)}
                                </span>
                            </div>
                            
                            {application.coverLetter && (
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="flex items-center gap-2 lg:gap-3 text-gray-600 font-semibold text-sm lg:text-base">
                                        <MessageSquare size={16} className="lg:w-5 lg:h-5 text-purple-700" />
                                        <span>Surat Lamaran (Cover Letter)</span>
                                    </div>
                                    <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border-l-4 border-purple-500 shadow-sm border border-gray-200/50">
                                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm lg:text-base">
                                            {application.coverLetter}
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {application.notes && (
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="flex items-center gap-2 lg:gap-3 text-gray-600 font-semibold text-sm lg:text-base">
                                        <StickyNote size={16} className="lg:w-5 lg:h-5 text-purple-700" />
                                        <span>Catatan Tambahan</span>
                                    </div>
                                    <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border-l-4 border-indigo-500 shadow-sm border border-gray-200/50">
                                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm lg:text-base">
                                            {application.notes}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                
                {/* Dokumen Terlampir */}
                <section className="group/section">
                    <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <FileText size={18} className="lg:hidden text-blue-700" />
                            <FileText size={20} className="hidden lg:block text-blue-700" />
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover/section:text-blue-700 transition-colors duration-300">
                            Dokumen Terlampir
                        </h2>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-50/50 to-blue-50/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100/50 shadow-inner">
                        <a 
                            href={application.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group/link inline-flex items-center gap-3 lg:gap-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base shadow-blue-500/20"
                        >
                            <FileText size={18} className="lg:hidden group-hover/link:rotate-12 transition-transform duration-300" />
                            <FileText size={20} className="hidden lg:block group-hover/link:rotate-12 transition-transform duration-300" />
                            <span>Lihat CV/Resume yang Dikirim</span>
                            <ExternalLink size={16} className="lg:hidden group-hover/link:translate-x-1 transition-transform duration-200" />
                            <ExternalLink size={18} className="hidden lg:block group-hover/link:translate-x-1 transition-transform duration-200" />
                        </a>
                    </div>
                </section>
                
                {/* Link kembali ke detail pekerjaan */}
                <div className="pt-6 lg:pt-8 border-t border-gray-200/50">
                    <Link 
                        to={`/jobdetail/${application.jobId}`} 
                        className="group/link inline-flex items-center gap-2 lg:gap-3 text-purple-700 hover:text-purple-900 font-semibold transition-all duration-300 bg-purple-50/50 hover:bg-purple-100/70 px-4 py-2.5 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl border border-purple-200/50 hover:border-purple-300/70 text-sm lg:text-base"
                    >
                        <span>Lihat kembali detail lowongan pekerjaan</span>
                        <ExternalLink size={16} className="lg:hidden group-hover/link:translate-x-1 transition-transform duration-200" />
                        <ExternalLink size={18} className="hidden lg:block group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
            
            {/* Bottom gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-700"></div>
        </div>
    );
};

export default ApplicationDetail;