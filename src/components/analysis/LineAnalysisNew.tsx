import React from 'react';
import { CheckCircle, XCircle, FileText, User, BookOpen, AlertTriangle } from 'lucide-react';

interface LineByLineAnalysisItem {
    section: string;
    needs_improvement: string;
}

interface LineAnalysisProps {
    lineByLine?: LineByLineAnalysisItem[];
}

const LineAnalysis: React.FC<LineAnalysisProps> = ({ lineByLine = [] }) => {
    const getSectionIcon = (section: string) => {
        if (section.toLowerCase().includes('about') || section.toLowerCase().includes('summary')) {
            return User;
        }
        if (section.toLowerCase().includes('education')) {
            return BookOpen;
        }
        return FileText;
    };

    const getSectionColor = (section: string) => {
        const colorSchemes = [
            { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200/50', icon: 'from-blue-500 to-cyan-500' },
            { bg: 'from-purple-50 to-pink-50', border: 'border-purple-200/50', icon: 'from-purple-500 to-pink-500' },
            { bg: 'from-green-50 to-emerald-50', border: 'border-green-200/50', icon: 'from-green-500 to-emerald-500' },
            { bg: 'from-orange-50 to-yellow-50', border: 'border-orange-200/50', icon: 'from-orange-500 to-yellow-500' },
        ];
        return colorSchemes[section.length % colorSchemes.length];
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-xl shadow-purple-900/10 p-4 sm:p-6 lg:p-8 relative overflow-hidden mx-auto max-w-7xl">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-2xl"></div>
            
            <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Line-by-Line Analysis</h3>
                            <p className="text-xs sm:text-sm text-gray-600">Analisis detail untuk setiap bagian dalam resume Anda</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 text-purple-700 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold shadow-sm self-start sm:self-auto">
                        <AlertTriangle size={12} className="text-purple-600 sm:w-3.5 sm:h-3.5" />
                        <span>{lineByLine.length} Sections</span>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {lineByLine.map((item, idx) => {
                        const IconComponent = getSectionIcon(item.section);
                        const colors = getSectionColor(item.section);
                        
                        return (
                            <div key={`section-${idx}`} className={`group bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full -translate-y-4 translate-x-4 sm:-translate-y-6 sm:translate-x-6 blur-sm"></div>
                                <div className="relative">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${colors.icon} rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2 leading-tight">{item.section}</h4>
                                            <div className="mb-3 sm:mb-4">
                                                <div className="flex items-start gap-2">
                                                    <XCircle size={14} className="text-orange-600 mt-0.5 flex-shrink-0" />
                                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                        <span className="font-medium text-orange-700">Needs Improvement:</span> {item.needs_improvement}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="inline-flex items-center gap-2 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105">
                                                <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                                                <span>See Fix Suggestions</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-50 to-pink-50/50 border border-purple-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">Section Optimization Guide</h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Setiap bagian resume memiliki peran penting dalam menarik perhatian rekruter. 
                                Perbaiki area yang teridentifikasi untuk meningkatkan overall impact resume Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LineAnalysis;
