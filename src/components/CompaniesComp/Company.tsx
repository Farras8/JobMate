// src/components/CompaniesComp/Company.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { type Company } from '../../services/CompanyService';
import { Briefcase, MapPin, Users, TrendingUp, ArrowRight } from 'lucide-react';

const CompanyCard: React.FC<{ company: Company }> = ({ company }) => {
    return (
        <div className="group relative bg-white backdrop-blur-sm border border-gray-100/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-200/30">
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-4">
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                        {/* Enhanced Logo */}
                        <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-blue-50 text-black flex items-center justify-center text-xl sm:text-2xl font-bold rounded-2xl shadow-lg shadow-blue-900/25 group-hover:shadow-xl group-hover:shadow-blue-900/30 transition-all duration-300 group-hover:scale-105">
                                {company.companyName.charAt(0).toUpperCase()}
                            </div>
                            {/* Pulse ring effect */}
                            <div className="absolute inset-0 rounded-2xl bg-blue-900/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
                        </div>

                        {/* Company Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors duration-300 truncate" title={company.companyName}>
                                {company.companyName}
                            </h3>
                            <div className="flex items-center text-gray-500 mb-2 sm:mb-3">
                                <MapPin size={14} className="mr-2 text-blue-500 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium truncate">{company.city}</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Action Button - Hidden on tablet */}
                    <Link 
                        to={`/companies/${company.id}`} 
                        className="hidden xl:flex items-center space-x-2 bg-blue-900 hover:bg-blue-800 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-2xl text-xs lg:text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn flex-shrink-0"
                    >
                        <span>Lihat Profil</span>
                        <ArrowRight size={12} className="lg:w-4 lg:h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6">
                    <p className="text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm group-hover:text-gray-700 transition-colors duration-300">
                        {company.aboutCompany}
                    </p>
                </div>

                {/* Stats and Tags */}
                <div className="space-y-3 sm:space-y-4">
                    {/* Job Count Highlight */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                <Briefcase size={14} className="sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-900">{company.activeJobCount}</p>
                                <p className="text-xs font-medium text-gray-500">Lowongan Aktif</p>
                            </div>
                        </div>
                        
                        {/* Growth Indicator */}
                        <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                            <TrendingUp size={10} className="sm:w-3 sm:h-3" />
                            <span className="text-xs font-semibold hidden sm:inline">Aktif Merekrut</span>
                            <span className="text-xs font-semibold sm:hidden">Aktif</span>
                        </div>
                    </div>

                    {/* Industry Tag */}
                    {company.industry && (
                        <div className="flex items-center">
                            <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl max-w-full">
                                <Users size={12} className="sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{company.industry}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile/Tablet Action Button */}
                <div className="mt-4 sm:mt-6 xl:hidden">
                    <Link 
                        to={`/companies/${company.id}`} 
                        className="flex items-center justify-center space-x-2 w-full bg-blue-900 hover:bg-blue-800 text-white py-3 sm:py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform active:scale-95 shadow-lg"
                    >
                        <span className="hidden sm:inline">Lihat Profil Perusahaan</span>
                        <span className="sm:hidden">Lihat Profil</span>
                        <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </Link>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
    );
};

export default CompanyCard;