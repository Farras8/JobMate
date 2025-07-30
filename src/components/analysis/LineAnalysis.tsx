import React from 'react';
import { CheckCircle, XCircle, FileText, User, BookOpen } from 'lucide-react';

const sections = [
    {
        title: 'Data Pribadi',
        icon: User,
        content: (
            <>
                <p><strong>Budi Santoso</strong></p>
                <p>Pemasaran Digital</p>
                <p>-</p>
                <p>-</p>
            </>
        ),
        working: ['Informasi kontak lengkap dan jelas.'],
        improvement: ['Format kurang rapi, sebaiknya dibuat lebih ringkas dan profesional. Gunakan format poin yang lebih terstruktur. Tambahkan tautan LinkedIn jika tersedia.']
    },
    {
        title: 'Pendidikan',
        icon: BookOpen,
        content: (
            <>
                <p><strong>Universitas XYZ</strong></p>
                <p>S1 Manajemen Bisnis</p>
                <p>IPK: 3.8/4.0, Aktif di organisasi mahasiswa</p>
            </>
        ),
        working: ['Mencantumkan universitas, jurusan, IPK, dan aktivitas organisasi.'],
        improvement: ['Format kurang rapi dan terstruktur. Sebaiknya gunakan poin dan format yang lebih konsisten. Tambahkan informasi tentang prestasi akademik jika ada.']
    },
    {
        title: 'Tentang Saya / Ringkasan',
        icon: FileText,
        content: (
            <>
                <p><strong>Ringkasan</strong></p>
                <p>Memiliki keahlian kuat dalam SEO, SEM, dan media sosial...</p>
            </>
        ),
        working: ['Menunjukkan pengalaman dan keahlian di bidang pemasaran digital.'],
        improvement: ['Terlalu umum. Sebaiknya lebih spesifik dan kuantifikasi pencapaian. Gunakan kata kerja aksi yang kuat dan fokus pada hasil yang dicapai.']
    },
    {
        title: 'Pengalaman Kerja',
        icon: FileText,
        content: (
            <>
                <p><strong>CV Cipta Karya</strong></p>
                <p>Digital Marketing Specialist, 2020-2023</p>
                <p>Mengelola kampanye pemasaran digital.</p>
            </>
        ),
        working: ['Mencantumkan perusahaan, posisi, dan periode kerja.'],
        improvement: ['Deskripsi tanggung jawab kurang detail dan terukur. Sebaiknya gunakan metode STAR (Situation, Task, Action, Result) untuk menjelaskan pencapaian. Kuantifikasi hasil yang dicapai dengan data (angka) sebanyak mungkin.']
    },
    {
        title: 'Keterampilan',
        icon: FileText,
        content: (
            <>
                <p><strong>Keterampilan</strong></p>
                <p>SEO, SEM, Media Sosial, Google Analytics</p>
            </>
        ),
        working: ['Mencantumkan keahlian yang relevan dengan bidang pemasaran digital.'],
        improvement: ['Keterampilan terlalu umum. Sebaiknya lebih spesifik dan berikan contoh penerapan keahlian tersebut. Pertimbangkan untuk mengelompokkan keterampilan berdasarkan kategori (misalnya, keahlian teknis, keahlian lunak).']
    }
];

const LineAnalysis: React.FC = () => {
    const totalIssues = sections.reduce((sum, section) => sum + section.improvement.length, 0);
    const totalWorking = sections.reduce((sum, section) => sum + section.working.length, 0);

    return (
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-900/10 p-4 sm:p-6 lg:p-8 relative overflow-hidden mx-auto max-w-6xl">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 blur-2xl"></div>
            
            <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">Line-by-Line Resume Analysis</h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Analisis detail setiap bagian resume dengan saran perbaikan spesifik</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200/50 text-blue-700 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm self-start sm:self-auto">
                        <FileText size={12} className="text-blue-600 sm:w-3.5 sm:h-3.5" />
                        <span>{sections.length} Sections</span>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {sections.map((section, idx) => {
                        const IconComponent = section.icon;
                        return (
                            <div key={idx} className="group bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full -translate-y-4 translate-x-4 sm:-translate-y-6 sm:translate-x-6 blur-sm"></div>
                                <div className="relative space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <h4 className="text-base sm:text-lg font-bold text-gray-800">{section.title}</h4>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm text-gray-700 space-y-1 shadow-sm">
                                        {section.content}
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 border border-green-200/50 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-md relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full -translate-y-2 translate-x-2 sm:-translate-y-3 sm:translate-x-3 blur-sm"></div>
                                            <div className="relative">
                                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                                    </div>
                                                    <h5 className="font-bold text-green-700 text-sm sm:text-base">What's Working</h5>
                                                    <span className="text-xs bg-green-200/50 text-green-700 px-2 py-0.5 rounded-full font-medium ml-auto">{section.working.length}</span>
                                                </div>
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    {section.working.map((item, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-green-800">
                                                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                                            <span className="leading-relaxed">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-red-50 to-orange-100/50 border border-red-200/50 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-md relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full -translate-y-2 translate-x-2 sm:-translate-y-3 sm:translate-x-3 blur-sm"></div>
                                            <div className="relative">
                                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                                    </div>
                                                    <h5 className="font-bold text-red-700 text-sm sm:text-base">Needs Improvement</h5>
                                                    <span className="text-xs bg-red-200/50 text-red-700 px-2 py-0.5 rounded-full font-medium ml-auto">{section.improvement.length}</span>
                                                </div>
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    {section.improvement.map((item, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-red-800">
                                                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                                            <span className="leading-relaxed">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">Analysis Summary</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                                    <span className="text-gray-600">{totalWorking} strengths identified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                                    <span className="text-gray-600">{totalIssues} areas for improvement</span>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Focus on addressing the improvement areas to significantly enhance your resume's impact and ATS compatibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LineAnalysis;