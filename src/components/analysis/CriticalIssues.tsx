import React from 'react';
import { AlertTriangle, Zap, TrendingDown, Eye } from 'lucide-react';

const issues = [
    {
        title: 'Missing Quantified Achievements',
        description: 'Only 23% of your bullet points contain specific numbers or metrics. Top-performing resumes average 67% quantified statements.',
        badge: 'High Impact',
        badgeColor: 'from-red-500 to-red-600',
        badgeBg: 'from-red-100 to-red-200',
        button: 'See Detailed Fix',
        icon: TrendingDown,
        severity: 'high'
    },
    {
        title: 'Weak Professional Summary',
        description: 'Your summary is too generic and doesn\'t highlight your unique value proposition. It reads like a job description rather than a compelling personal brand statement.',
        badge: 'High Impact',
        badgeColor: 'from-red-500 to-red-600',
        badgeBg: 'from-red-100 to-red-200',
        button: 'See Detailed Fix',
        icon: Eye,
        severity: 'high'
    },
    {
        title: 'Inconsistent Formatting',
        description: 'Multiple formatting inconsistencies detected that could confuse ATS systems and hurt readability.',
        badge: 'Medium Impact',
        badgeColor: 'from-amber-500 to-orange-500',
        badgeBg: 'from-amber-100 to-orange-100',
        button: 'See Detailed Fix',
        icon: AlertTriangle,
        severity: 'medium'
    },
    {
        title: 'Missing Industry Keywords',
        description: 'Your resume lacks 73% of the most important keywords for your target role, significantly reducing your chances of passing ATS screening.',
        badge: 'High Impact',
        badgeColor: 'from-red-500 to-red-600',
        badgeBg: 'from-red-100 to-red-200',
        button: 'See Complete Keyword Analysis',
        icon: TrendingDown,
        severity: 'high'
    },
    {
        title: 'Outdated Contact Information Format',
        description: 'Your contact section uses an outdated format that doesn\'t optimize for modern ATS parsing and mobile viewing.',
        badge: 'Low Impact',
        badgeColor: 'from-yellow-400 to-yellow-500',
        badgeBg: 'from-yellow-100 to-yellow-200',
        button: 'See Modern Format',
        icon: AlertTriangle,
        severity: 'low'
    },
];

const CriticalIssues: React.FC = () => {
    const getSeverityColors = (severity: string) => {
        switch (severity) {
            case 'high':
                return {
                    bg: 'from-red-50 to-red-100/50',
                    border: 'border-red-200/50',
                    iconBg: 'from-red-500 to-red-600'
                };
            case 'medium':
                return {
                    bg: 'from-amber-50 to-orange-50',
                    border: 'border-amber-200/50',
                    iconBg: 'from-amber-500 to-orange-500'
                };
            case 'low':
                return {
                    bg: 'from-yellow-50 to-yellow-100/50',
                    border: 'border-yellow-200/50',
                    iconBg: 'from-yellow-400 to-yellow-500'
                };
            default:
                return {
                    bg: 'from-gray-50 to-gray-100/50',
                    border: 'border-gray-200/50',
                    iconBg: 'from-gray-500 to-gray-600'
                };
        }
    };

    const highImpactCount = issues.filter(issue => issue.severity === 'high').length;

    return (
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl lg:rounded-3xl shadow-xl shadow-red-900/10 p-4 sm:p-6 lg:p-8 mt-6 lg:mt-10 relative overflow-hidden mx-auto max-w-7xl">
            {/* Background Pattern - Responsive positioning */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-100 to-red-100 rounded-full opacity-30 blur-2xl"></div>
            
            <div className="relative">
                {/* Header - Responsive layout */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Critical Issues Analysis</h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-tight">Masalah yang perlu segera diperbaiki untuk meningkatkan performa resume</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-red-100 to-orange-100 border border-red-200/50 text-red-700 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold shadow-sm w-fit">
                        <Zap size={12} className="text-red-600 sm:w-3.5 sm:h-3.5" />
                        <span>{highImpactCount} High Priority</span>
                    </div>
                </div>

                {/* Issues Grid - Responsive spacing */}
                <div className="space-y-3 sm:space-y-4">
                    {issues.map((issue, idx) => {
                        const IconComponent = issue.icon;
                        const colors = getSeverityColors(issue.severity);
                        
                        return (
                            <div 
                                key={idx} 
                                className={`group bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 transform hover:scale-[1.01] lg:hover:scale-[1.02] hover:shadow-xl relative overflow-hidden`}
                            >
                                {/* Background decoration - Responsive size */}
                                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full -translate-y-3 translate-x-3 sm:-translate-y-4 sm:translate-x-4 lg:-translate-y-6 lg:translate-x-6 blur-sm"></div>
                                
                                <div className="relative">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                            {/* Icon - Responsive size */}
                                            <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r ${colors.iconBg} rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mt-0.5 sm:mt-1`}>
                                                <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                    <h4 className="text-sm sm:text-base font-bold text-gray-800 leading-tight">{issue.title}</h4>
                                                    {/* Badge on mobile - moved to header */}
                                                    <div className={`sm:hidden inline-flex items-center space-x-1 bg-gradient-to-r ${issue.badgeBg} border border-current/20 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm w-fit`}>
                                                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${issue.badgeColor} rounded-full`}></div>
                                                        <span>{issue.badge}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 pr-2">{issue.description}</p>
                                                
                                                {/* Action Button - Responsive size */}
                                                <button className="inline-flex items-center gap-2 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg lg:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105">
                                                    <Zap size={12} className="sm:w-3.5 sm:h-3.5" />
                                                    <span className="whitespace-nowrap">{issue.button}</span>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Impact Badge - Hidden on mobile, shown on desktop */}
                                        <div className={`hidden sm:inline-flex items-center space-x-1 bg-gradient-to-r ${issue.badgeBg} border border-current/20 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex-shrink-0`}>
                                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${issue.badgeColor} rounded-full`}></div>
                                            <span>{issue.badge}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary Footer - Responsive design */}
                <div className="mt-6 lg:mt-8 bg-gradient-to-r from-red-50 to-orange-50/50 border border-red-200/50 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">Priority Action Required</h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Terdapat {highImpactCount} masalah dengan dampak tinggi yang perlu segera diperbaiki. 
                                Mengatasi issue-issue ini dapat meningkatkan peluang lolos ATS screening hingga 40-60%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CriticalIssues;