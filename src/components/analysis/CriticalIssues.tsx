import React from 'react';
import { AlertTriangle, TrendingDown, Zap } from 'lucide-react';

interface Issue {
    title: string;
    description: string;
    impact: 'Tinggi' | 'Sedang' | 'Rendah';
}

interface CriticalIssuesProps {
    issues?: Issue[];
}

const CriticalIssues: React.FC<CriticalIssuesProps> = ({ issues = [] }) => {
    const getIssueConfig = (impact: string) => {
        switch (impact) {
            case 'Tinggi':
                return {
                    badge: 'Tinggi Impact',
                    badgeColor: 'from-red-500 to-red-600',
                    badgeBg: 'from-red-100 to-red-200',
                    icon: TrendingDown,
                    severity: 'high'
                };
            case 'Sedang':
                return {
                    badge: 'Sedang Impact',
                    badgeColor: 'from-amber-500 to-orange-500',
                    badgeBg: 'from-amber-100 to-orange-100',
                    icon: AlertTriangle,
                    severity: 'medium'
                };
            case 'Rendah':
                return {
                    badge: 'Rendah Impact',
                    badgeColor: 'from-yellow-400 to-yellow-500',
                    badgeBg: 'from-yellow-100 to-yellow-200',
                    icon: Zap,
                    severity: 'low'
                };
            default:
                return {
                    badge: 'Unknown Impact',
                    badgeColor: 'from-gray-400 to-gray-500',
                    badgeBg: 'from-gray-100 to-gray-200',
                    icon: AlertTriangle,
                    severity: 'medium'
                };
        }
    };

    const getSeverityColors = (severity: string) => {
        switch (severity) {
            case 'high':
                return { bg: 'from-red-50 to-orange-100/50', border: 'border-red-200/50', iconBg: 'from-red-500 to-red-600' };
            case 'medium':
                return { bg: 'from-amber-50 to-orange-50', border: 'border-amber-200/50', iconBg: 'from-amber-500 to-orange-500' };
            case 'low':
                return { bg: 'from-yellow-50 to-yellow-100/50', border: 'border-yellow-200/50', iconBg: 'from-yellow-400 to-yellow-500' };
            default:
                return { bg: 'from-gray-50 to-gray-100/50', border: 'border-gray-200/50', iconBg: 'from-gray-500 to-gray-600' };
        }
    };

    const highImpactCount = issues.filter(issue => issue.impact === 'Tinggi').length;

    return (
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl lg:rounded-3xl shadow-xl shadow-red-900/10 p-4 sm:p-6 lg:p-8 relative overflow-hidden mx-auto max-w-7xl">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-100 to-red-100 rounded-full opacity-30 blur-2xl"></div>
            
            <div className="relative">
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

                <div className="space-y-3 sm:space-y-4">
                    {issues.map((issue, idx) => {
                        const config = getIssueConfig(issue.impact);
                        const IconComponent = config.icon;
                        const colors = getSeverityColors(config.severity);
                        
                        return (
                            <div key={idx} className={`group bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 transform hover:scale-[1.01] lg:hover:scale-[1.02] hover:shadow-xl relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full -translate-y-3 translate-x-3 sm:-translate-y-4 sm:translate-x-4 lg:-translate-y-6 lg:translate-x-6 blur-sm"></div>
                                <div className="relative">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                            <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r ${colors.iconBg} rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mt-0.5 sm:mt-1`}>
                                                <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                    <h4 className="text-sm sm:text-base font-bold text-gray-800 leading-tight">{issue.title}</h4>
                                                    <div className={`sm:hidden inline-flex items-center space-x-1 bg-gradient-to-r ${config.badgeBg} border border-current/20 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm w-fit`}>
                                                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${config.badgeColor} rounded-full`}></div>
                                                        <span>{config.badge}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 pr-2">{issue.description}</p>
                                            </div>
                                        </div>
                                        <div className={`hidden sm:inline-flex items-center space-x-1 bg-gradient-to-r ${config.badgeBg} border border-current/20 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex-shrink-0`}>
                                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${config.badgeColor} rounded-full`}></div>
                                            <span>{config.badge}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

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