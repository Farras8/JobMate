// src/components/BookmarkComp/BookmarkComponents.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type EnrichedBookmark } from '../../services/bookmarkService';
import { type DisplayJob } from '../../services/jobService';
import { getApplications } from '../../services/ApplicationService'; // Import untuk get lamaran
import { auth } from '../../services/firebase';
import Swal from 'sweetalert2';
import { 
    MapPin, 
    Clock, 
    Building2,
    CircleDollarSign,
    Trash2,
    Bookmark as BookmarkIcon,
    ExternalLink,
    ArrowRight,
    Star,
    TrendingUp,
    CheckCircle
} from 'lucide-react';

// --- Job Card Component ---
interface BookmarkJobCardProps {
  bookmark: EnrichedBookmark;
  onRemoveBookmark: (bookmarkId: string, jobTitle: string) => void;
  isApplied?: boolean; // New prop to indicate if job is applied
}

const BookmarkJobCard: React.FC<BookmarkJobCardProps> = ({ bookmark, onRemoveBookmark, isApplied = false }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { jobDetails } = bookmark;

  if (!jobDetails) return null; // Should not happen if filtered in parent

  const handleRemoveClick = () => {
    Swal.fire({
      title: 'Hapus Lowongan?',
      text: `Anda yakin ingin menghapus "${jobDetails.title}" dari lowongan tersimpan?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
      customClass: { 
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setIsRemoving(true);
        onRemoveBookmark(bookmark.id, jobDetails.title || 'lowongan ini');
      }
    });
  };

  const formatSalaryForCard = (salary?: DisplayJob['salary']): string | null => {
    if (!salary || typeof salary.min !== 'number' || typeof salary.max !== 'number') return null;
    const min = (salary.min / 1000000);
    const max = (salary.max / 1000000);
    const format = (val: number) => val % 1 === 0 ? val.toString() : val.toFixed(1);
    return `${salary.currency || 'IDR'} ${format(min)}jt - ${format(max)}jt`;
  };

  const getJobTypeTagClass = (type: string): string => {
      const lower = (type || '').toLowerCase().replace('-', '');
      if (lower.includes('fulltime')) return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-200/50';
      if (lower.includes('parttime')) return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-200/50';
      if (lower.includes('freelance')) return 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700 border border-teal-200/50';
      if (lower.includes('internship') || lower.includes('magang')) return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200/50';
      if (lower.includes('contract') || lower.includes('kontrak')) return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-200/50';
      return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200/50';
  };
  
  const timeSince = (date?: Date): string => {
    if(!date) return '-';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " hari lalu";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " jam lalu";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " menit lalu";
    return "Baru saja";
  }

  const postedText = jobDetails.posted || timeSince(jobDetails.postedDate);
  const formattedSalary = formatSalaryForCard(jobDetails.salary);

  return (
    <div className={`group relative bg-white backdrop-blur-sm border rounded-3xl lg:rounded-3xl rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 p-4 sm:p-6 lg:p-8
      ${isApplied ? 'border-green-200/50 bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20 hover:shadow-green-500/10' : 'border-gray-100/50 hover:shadow-blue-500/10 hover:border-blue-200/30'}`}>
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isApplied ? 'bg-gradient-to-br from-green-50/40 via-transparent to-emerald-50/30' : 'bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20'}`}></div>
      

      
      {/* Remove Bookmark Button */}
      <button
        onClick={handleRemoveClick}
        disabled={isRemoving}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 group-hover:scale-110 shadow-lg z-10 bg-red-100 text-red-600 hover:bg-red-200 shadow-red-500/20"
        aria-label="Hapus dari Bookmark"
      >
        {isRemoving ? (
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : (
          <Trash2 size={16} className="sm:w-5 sm:h-5 mx-auto" />
        )}
      </button>

      {/* Company Logo and Job Details */}
      <div className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 ${isApplied ? 'mt-10 sm:mt-0' : ''}`}>
        {/* Enhanced Company Logo */}
        <div className="relative group/logo w-full sm:w-auto flex justify-center sm:justify-start">
          <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl bg-blue-50 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold shadow-lg shadow-blue-900/20 group-hover:shadow-xl group-hover:shadow-blue-900/25 transition-all duration-300 group-hover:scale-105">
            {jobDetails.companyLogo ? 
              <img src={jobDetails.companyLogo} alt={jobDetails.companyName} className="w-full h-full object-contain rounded-xl lg:rounded-2xl"/> : 
              <span className="text-blue-700">{jobDetails.companyName.charAt(0).toUpperCase()}</span>
            }
          </div>
          {/* Pulse ring effect */}
          <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-blue-900/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
        </div>

        <div className="flex-grow w-full sm:pr-16 lg:pr-20">
          {/* Job Title */}
          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3 transition-colors duration-300 text-center sm:text-left ${isApplied ? 'group-hover:text-green-700' : 'group-hover:text-blue-700'}`}>{jobDetails.title}</h3>
          
          {/* Job Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 size={14} className="sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-xs sm:text-sm truncate">{jobDetails.companyName}</p>
                <p className="text-xs text-gray-500">Perusahaan</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="sm:w-4 sm:h-4 text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-xs sm:text-sm truncate">{jobDetails.location}</p>
                <p className="text-xs text-gray-500">Lokasi</p>
              </div>
            </div>
            
            {formattedSalary && (
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <CircleDollarSign size={14} className="sm:w-4 sm:h-4 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs sm:text-sm text-green-600 truncate">{formattedSalary}</p>
                  <p className="text-xs text-gray-500">Gaji</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-xs sm:text-sm truncate">{postedText}</p>
                <p className="text-xs text-gray-500">Dipublikasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Job Type Tags */}
      {jobDetails.type && jobDetails.type.length > 0 && (
        <div className="relative mt-4 sm:mt-5 lg:mt-6 mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 mb-2 sm:mb-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-md lg:rounded-lg flex items-center justify-center">
              <TrendingUp size={12} className="sm:w-3.5 sm:h-3.5 lg:w-3.5 lg:h-3.5 text-indigo-600" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Tipe Pekerjaan</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {jobDetails.type.map((typeStr, index) => (
              <span key={index} className={`text-xs sm:text-sm px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl lg:rounded-2xl font-semibold transition-all duration-200 hover:scale-105 ${getJobTypeTagClass(typeStr)}`}>
                {typeStr}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Skills Tags */}
      {jobDetails.skillsRequired && jobDetails.skillsRequired.length > 0 && (
        <div className="relative mt-4 sm:mt-5 lg:mt-6 mb-4 sm:mb-5 lg:mb-6">
          <div className="flex items-center space-x-2 mb-2 sm:mb-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-sky-100 to-sky-200 rounded-md lg:rounded-lg flex items-center justify-center">
              <Star size={12} className="sm:w-3.5 sm:h-3.5 lg:w-3.5 lg:h-3.5 text-sky-600" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Keahlian Dibutuhkan</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {jobDetails.skillsRequired.slice(0, window.innerWidth < 640 ? 3 : 5).map((skill, index) => (
              <span key={index} className="bg-gradient-to-r from-sky-100 to-sky-200 text-sky-700 text-xs sm:text-sm px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl lg:rounded-2xl font-semibold border border-sky-200/50 transition-all duration-200 hover:scale-105">
                {skill}
              </span>
            ))}
            {jobDetails.skillsRequired.length > (window.innerWidth < 640 ? 3 : 5) && (
              <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs sm:text-sm px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl lg:rounded-2xl font-semibold border border-gray-200/50">
                +{jobDetails.skillsRequired.length - (window.innerWidth < 640 ? 3 : 5)} lainnya
              </span>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Action Button */}
      <div className="relative mt-6 sm:mt-7 lg:mt-8 pt-4 sm:pt-5 lg:pt-6 border-t border-gray-100">
        {isApplied ? (
          <div className="w-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-semibold flex items-center justify-center gap-2 sm:gap-3 border border-green-200/50 shadow-sm text-sm sm:text-base">
            <CheckCircle size={16} className="sm:w-4.5 sm:h-4.5 lg:w-4.5 lg:h-4.5" />
            <span>Lamaran Terkirim</span>
          </div>
        ) : (
          <Link 
            to={`/jobdetail/${jobDetails.id}`} 
            className="group/link w-full bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <ExternalLink size={16} className="sm:w-4.5 sm:h-4.5 lg:w-4.5 lg:h-4.5 group-hover/link:rotate-12 transition-transform duration-200" />
            <span>Lihat Detail</span>
            <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${isApplied ? 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600' : 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700'}`}></div>
    </div>
  );
};

// --- Bookmark List Component ---
interface BookmarkListProps {
  bookmarks: EnrichedBookmark[];
  isLoading: boolean;
  error?: string | null;
  onRemoveBookmark: (bookmarkId: string, jobTitle: string) => void;
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, isLoading, error, onRemoveBookmark }) => {
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Fetch applied jobs when component mounts
    if (auth.currentUser && bookmarks.length > 0) {
      getApplications()
        .then(applications => {
          setAppliedJobIds(new Set(applications.map(app => app.jobId)));
        })
        .catch(err => console.error("Failed to fetch applications:", err));
    }
  }, [bookmarks]);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 animate-pulse">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl lg:rounded-2xl mx-auto sm:mx-0"></div>
              <div className="flex-grow space-y-3 sm:space-y-4 w-full">
                <div className="h-6 sm:h-7 lg:h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-full sm:w-3/4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg lg:rounded-xl"></div>
                    <div className="space-y-1 flex-1">
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 sm:w-24"></div>
                      <div className="h-2 sm:h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 sm:w-16"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg lg:rounded-xl"></div>
                    <div className="space-y-1 flex-1">
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 sm:w-20"></div>
                      <div className="h-2 sm:h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-10 sm:w-12"></div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1.5 sm:space-x-2">
                  <div className="h-6 sm:h-7 lg:h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl lg:rounded-2xl w-16 sm:w-20"></div>
                  <div className="h-6 sm:h-7 lg:h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl lg:rounded-2xl w-20 sm:w-24"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 sm:py-16 text-red-600 bg-red-50 rounded-xl lg:rounded-2xl border border-red-200 mx-2 sm:mx-4">
        <div className="text-base sm:text-lg font-semibold mb-2">Gagal Memuat Data</div>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100">
        {/* Enhanced empty state with gradient background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 rounded-2xl lg:rounded-3xl"></div>
          <div className="relative">
            <div className="w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-xl shadow-blue-900/20 mb-4 sm:mb-5 lg:mb-6">
              <BookmarkIcon size={32} className="sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-blue-600" strokeWidth={1.5}/>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">Tidak Ada Lowongan Tersimpan</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-7 lg:mb-8 max-w-sm sm:max-w-md mx-auto leading-relaxed">
              Anda belum menyimpan lowongan pekerjaan apapun. Mulai jelajahi dan simpan lowongan yang menarik untuk Anda.
            </p>
            <Link 
              to="/jobsearch" 
              className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold py-3 sm:py-3.5 lg:py-4 px-6 sm:px-7 lg:px-8 rounded-xl lg:rounded-2xl hover:from-blue-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <span>Cari Lowongan</span>
              <ArrowRight size={16} className="sm:w-4.5 sm:h-4.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {bookmarks.map(bookmark => (
        <BookmarkJobCard 
          key={bookmark.id} 
          bookmark={bookmark} 
          onRemoveBookmark={onRemoveBookmark} 
          isApplied={appliedJobIds.has(bookmark.jobId)}
        />
      ))}
    </div>
  );
};