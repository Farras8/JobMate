import React from 'react';
import { Sparkles, Lightbulb, CheckCircle, XCircle, Plus, Target } from 'lucide-react';

const usedKeywords = [
    'Project Management', 'Data Analysis', 'Team Leadership', 'Strategic Planning',
    'Budget Management', 'Risk Assessment', 'Quality Assurance', 'Client Relations',
    'Process Improvement', 'Microsoft Excel', 'Timeline Management',
];

const missingKeywords = [
    'Agile Methodology', 'Stakeholder Management', 'Process Improvement', 'Cross-functional',
    'KPI Tracking', 'Change Management', 'Performance Metrics', 'Digital Transformation',
];

const suggestedKeywords = [
    'Business Intelligence', 'ROI Analysis', 'Lean Six Sigma', 'JIRA/Confluence',
    'Gantt Charts', 'Cost–Benefit Analysis', 'Deliverable Management',
    'Risk Mitigation', 'Scope Management',
];

const KeywordAnalysis: React.FC = () => {
    const totalKeywords = usedKeywords.length + missingKeywords.length;
    const keywordCoverage = Math.round((usedKeywords.length / totalKeywords) * 100);

    return (
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-xl shadow-purple-900/10 p-3 sm:p-4 md:p-6 lg:p-8 mt-6 md:mt-10 relative overflow-hidden mx-2 sm:mx-4 lg:mx-0 max-w-full">
            {/* Background Pattern - Fully responsive */}
            <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-100 to-purple-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-30 blur-2xl"></div>
            
            <div className="relative">
                {/* Header - Enhanced mobile responsiveness */}
                <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 leading-tight">Keyword Analysis</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight">Analisis kata kunci untuk optimasi ATS dan industry matching</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-purple-100 border border-yellow-200/50 text-yellow-700 px-3 py-2 md:px-4 md:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm self-start md:self-auto">
                        <Target size={12} className="text-yellow-600 flex-shrink-0" />
                        <span className="whitespace-nowrap">{keywordCoverage}% Coverage</span>
                    </div>
                </div>

                {/* Keyword Sections - Enhanced spacing and sizing */}
                <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                    {/* Used Keywords */}
                    <div className="group bg-gradient-to-br from-green-50 to-emerald-100/50 border border-green-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/20 rounded-full -translate-y-2 translate-x-2 sm:-translate-y-4 sm:translate-x-4 blur-sm"></div>
                        
                        <div className="relative">
                            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-800 leading-tight">Keywords You're Using Effectively</h4>
                                    <p className="text-xs sm:text-sm md:text-base text-green-600 font-medium leading-tight">{usedKeywords.length} kata kunci terdeteksi dengan baik</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                                {usedKeywords.map((kw, idx) => (
                                    <span 
                                        key={kw} 
                                        className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 max-w-full"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <CheckCircle size={8} className="sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                                        <span className="truncate max-w-[100px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-none">{kw}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Missing Keywords */}
                    <div className="group bg-gradient-to-br from-red-50 to-orange-100/50 border border-red-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/20 rounded-full -translate-y-2 translate-x-2 sm:-translate-y-4 sm:translate-x-4 blur-sm"></div>
                        
                        <div className="relative">
                            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                    <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-800 leading-tight">Missing Important Keywords</h4>
                                    <p className="text-xs sm:text-sm md:text-base text-red-600 font-medium leading-tight">{missingKeywords.length} kata kunci penting yang belum ada</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                                {missingKeywords.map((kw, idx) => (
                                    <span 
                                        key={kw} 
                                        className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 max-w-full"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <XCircle size={8} className="sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                                        <span className="truncate max-w-[100px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-none">{kw}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Suggested Keywords */}
                    <div className="group bg-gradient-to-br from-blue-50 to-purple-100/50 border border-blue-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/20 rounded-full -translate-y-2 translate-x-2 sm:-translate-y-4 sm:translate-x-4 blur-sm"></div>
                        
                        <div className="relative">
                            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-800 leading-tight">Suggested Keywords for Your Industry</h4>
                                    <p className="text-xs sm:text-sm md:text-base text-blue-600 font-medium leading-tight">{suggestedKeywords.length} rekomendasi untuk meningkatkan relevansi</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                                {suggestedKeywords.map((kw, idx) => (
                                    <span 
                                        key={kw} 
                                        className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 max-w-full"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <Plus size={8} className="sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                                        <span className="truncate max-w-[100px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-none">{kw}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips Section - Enhanced mobile layout */}
                <div className="mt-4 sm:mt-6 lg:mt-8 bg-gradient-to-r from-yellow-50 to-amber-50/50 border border-yellow-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">Keyword Optimization Tips</h4>
                            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base text-gray-600">
                                <div className="flex items-start gap-2">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                    <span className="leading-relaxed">Aim for 2–3 mentions of your most important keywords throughout your resume</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                    <span className="leading-relaxed">Use keywords naturally in context, don't just list them</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                    <span className="leading-relaxed">Match keywords from job descriptions you're targeting</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                    <span className="leading-relaxed">Include both acronyms and full forms (e.g., "KPI" and "Key Performance Indicators")</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordAnalysis;