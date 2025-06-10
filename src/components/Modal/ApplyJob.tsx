// src/components/Modal/ApplyJobModal.tsx
import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import Swal from 'sweetalert2';
import { submitApplication } from '../../services/ApplicationService';
import { X, UploadCloud, Send, FileText, StickyNote, Building2, Briefcase } from 'lucide-react';

interface ApplyJobModalProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  onClose: () => void;
  onApplySuccess: () => void;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ jobId, jobTitle, companyName, onClose, onApplySuccess }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [base64Resume, setBase64Resume] = useState<string>('');
  const [coverLetter, setCoverLetter] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        Swal.fire('Format Salah', 'Hanya file PDF yang diizinkan.', 'error');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        Swal.fire('Ukuran Terlalu Besar', 'Ukuran file PDF maksimal 5MB.', 'error');
        e.target.value = '';
        return;
      }
      setResumeFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64Resume(result.split(',')[1]); // Ambil hanya bagian base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!resumeFile || !base64Resume) {
      Swal.fire('File Dibutuhkan', 'Mohon unggah CV/Resume Anda dalam format PDF.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await submitApplication({
        jobId,
        resumeFile: base64Resume,
        coverLetter,
        notes,
      });
      onApplySuccess(); // Panggil callback sukses
      onClose(); // Tutup modal
    } catch (err: any) {
      console.error("Failed to submit application:", err);
      setError(err.message || "Gagal mengirim lamaran. Mungkin Anda sudah pernah melamar untuk posisi ini.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 lg:p-6">
      <div className="relative bg-white backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden border border-gray-100/50">
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-50"></div>
        
        {/* Header Section */}
        <div className="relative p-6 lg:p-8 border-b border-gray-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/30">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-md">
                  <Briefcase size={20} className="text-blue-600 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">Lamar Pekerjaan</h2>
                  <p className="text-sm lg:text-base text-gray-600 mt-1">Kirim lamaran Anda sekarang</p>
                </div>
              </div>
              
              {/* Job Info Cards */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100/50 shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase size={14} className="text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">{jobTitle}</p>
                    <p className="text-xs text-gray-500">Posisi</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100/50 shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 size={14} className="text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">{companyName}</p>
                    <p className="text-xs text-gray-500">Perusahaan</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/80 backdrop-blur-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 border border-gray-200/50"
            >
              <X size={20} className="lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="relative flex-grow overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Upload CV Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-100 to-green-200 rounded-md lg:rounded-lg flex items-center justify-center flex-shrink-0">
                <UploadCloud size={12} className="text-green-600 lg:w-3.5 lg:h-3.5" />
              </div>
              <label htmlFor="resumeFile" className="text-sm lg:text-base font-semibold text-gray-700">
                Unggah CV/Resume <span className="text-red-500">*</span>
              </label>
            </div>
            
            <div className="relative group">
              <input
                id="resumeFile"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-100 file:to-blue-200 file:text-blue-700 hover:file:from-blue-200 hover:file:to-blue-300 file:transition-all file:duration-300 file:cursor-pointer file:shadow-md hover:file:shadow-lg border-2 border-dashed border-gray-300 rounded-xl lg:rounded-2xl p-4 lg:p-6 focus-within:border-blue-300 focus-within:bg-blue-50/30 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/20"
                required
              />
              {!resumeFile && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                  <UploadCloud size={24} className="mb-2" />
                  <p className="text-sm font-medium">PDF, Maksimal 5MB</p>
                </div>
              )}
            </div>
            
            {resumeFile && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4 flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-800 truncate">{resumeFile.name}</p>
                  <p className="text-xs text-green-600">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Cover Letter Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-md lg:rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={12} className="text-purple-600 lg:w-3.5 lg:h-3.5" />
              </div>
              <label htmlFor="coverLetter" className="text-sm lg:text-base font-semibold text-gray-700">
                Cover Letter <span className="text-gray-400 text-sm">(Opsional)</span>
              </label>
            </div>
            
            <div className="relative">
              <textarea
                id="coverLetter"
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Jelaskan mengapa Anda adalah kandidat yang tepat untuk posisi ini. Ceritakan pengalaman, keahlian, dan motivasi Anda..."
                className="w-full px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base rounded-xl lg:rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-blue-300 focus:from-blue-50 focus:to-purple-50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none shadow-sm focus:shadow-md"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {coverLetter.length}/1000
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-amber-100 to-amber-200 rounded-md lg:rounded-lg flex items-center justify-center flex-shrink-0">
                <StickyNote size={12} className="text-amber-600 lg:w-3.5 lg:h-3.5" />
              </div>
              <label htmlFor="notes" className="text-sm lg:text-base font-semibold text-gray-700">
                Catatan Tambahan <span className="text-gray-400 text-sm">(Opsional)</span>
              </label>
            </div>
            
            <div className="relative">
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Informasi tambahan yang ingin Anda sampaikan kepada perekrut. Misalnya ketersediaan mulai kerja, ekspektasi gaji, atau hal lain yang relevan..."
                className="w-full px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base rounded-xl lg:rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-blue-300 focus:from-blue-50 focus:to-purple-50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none shadow-sm focus:shadow-md"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {notes.length}/500
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200/50 text-red-700 p-4 rounded-xl lg:rounded-2xl text-sm lg:text-base shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <X size={12} className="text-red-600" />
                </div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}
        </form>

        {/* Footer Section */}
        <div className="relative p-6 lg:p-8 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-end lg:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full lg:w-auto px-6 lg:px-8 py-3 lg:py-4 border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-800 hover:bg-gray-50 rounded-xl lg:rounded-2xl font-semibold transition-all duration-300 text-sm lg:text-base hover:scale-105 shadow-sm hover:shadow-md"
            >
              Batal
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !resumeFile}
              className="group w-full lg:w-auto bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm lg:text-base hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2 lg:space-x-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Mengirim Lamaran...</span>
                </>
              ) : (
                <>
                  <Send size={16} className="group-hover:rotate-12 transition-transform duration-200 lg:w-5 lg:h-5" />
                  <span>Kirim Lamaran</span>
                </>
              )}
            </button>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;