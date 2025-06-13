import React from 'react';
import { BadgeCheck, BarChart3, Award, Target, Zap, CheckCircle } from 'lucide-react';

const Strengths: React.FC = () => {
    const strengthsData = [
        {
            title: 'Strong Action Verbs',
            description: 'Resume menggunakan variasi action verbs yang kuat, menunjukkan inisiatif dan ownership.',
            icon: Zap,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50',
            borderColor: 'border-green-200/50'
        },
        {
            title: 'Relevant Industry Keywords',
            description: 'Resume mengandung kata kunci industri yang membantu lolos ATS dan menarik recruiter.',
            icon: Target,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-200/50'
        },
        {
            title: 'Good Formatting',
            description: 'Layout resume bersih, terorganisir, dan mudah untuk di-scan.',
            icon: BarChart3,
            color: 'from-purple-500 to-violet-500',
            bgColor: 'from-purple-50 to-violet-50',
            borderColor: 'border-purple-200/50'
        },
        {
            title: 'Concise Bullet Points',
            description: 'Bullet points langsung dan berorientasi hasil, dengan minimal fluff.',
            icon: CheckCircle,
            color: 'from-orange-500 to-amber-500',
            bgColor: 'from-orange-50 to-amber-50',
            borderColor: 'border-orange-200/50'
        },
        {
            title: 'Professional Summary',
            description: 'Summary menguraikan value proposition Anda dengan cara yang compelling.',
            icon: Award,
            color: 'from-rose-500 to-pink-500',
            bgColor: 'from-rose-50 to-pink-50',
            borderColor: 'border-rose-200/50'
        },
        {
            title: 'Skills Section',
            description: 'Bagian skills terstruktur dengan baik dan highlight kekuatan teknis secara efektif.',
            icon: BadgeCheck,
            color: 'from-indigo-500 to-blue-500',
            bgColor: 'from-indigo-50 to-blue-50',
            borderColor: 'border-indigo-200/50'
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-xl shadow-green-900/10 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                {/* Background Pattern - Adjusted for mobile */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-30 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-2xl"></div>
                
                <div className="relative">
                    {/* Header - Mobile optimized */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                                <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Kekuatan Resume</h3>
                                <p className="text-xs sm:text-sm text-gray-600">Area yang sudah excel dalam resume Anda</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm self-start sm:self-auto">
                            <BadgeCheck size={12} className="text-green-600 sm:w-3.5 sm:h-3.5" />
                            <span>Top Strengths</span>
                        </div>
                    </div>

                    {/* Strengths Grid - Responsive layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {strengthsData.map((strength, idx) => {
                            const IconComponent = strength.icon;
                            
                            return (
                                <div 
                                    key={idx} 
                                    className={`group bg-gradient-to-br ${strength.bgColor} border ${strength.borderColor} rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 transform hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl relative overflow-hidden`}
                                >
                                    {/* Background decoration - Scaled for mobile */}
                                    <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full -translate-y-2 translate-x-2 sm:-translate-y-4 sm:translate-x-4 blur-sm"></div>
                                    
                                    <div className="relative">
                                        {/* Icon and Check Mark */}
                                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${strength.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                            </div>
                                            <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                <span className="hidden xs:inline">Excellent</span>
                                                <span className="xs:hidden">✓</span>
                                            </div>
                                        </div>

                                        {/* Title - Responsive text size */}
                                        <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">{strength.title}</h4>
                                        
                                        {/* Description - Better line height for mobile */}
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">{strength.description}</p>

                                        {/* Strength Indicator */}
                                        <div className="mt-3 sm:mt-4">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                                <span>Strength Level</span>
                                                <span>Excellent</span>
                                            </div>
                                            <div className="h-1.5 sm:h-2 w-full bg-white/60 rounded-full shadow-inner overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${strength.color} rounded-full transition-all duration-700 ease-out shadow-sm relative`}
                                                    style={{ width: '90%' }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary Footer - Mobile optimized */}
                    <div className="mt-6 sm:mt-8 bg-gradient-to-r from-gray-50 to-green-50/50 border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">Kekuatan Utama</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    Resume Anda menunjukkan kekuatan yang solid di berbagai area kunci. Pertahankan elemen-elemen 
                                    ini sambil fokus pada area improvement untuk hasil optimal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Strengths;