// src/components/JobSearchComp/PaginationJobs.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalJobs: number;
    jobsPerPage: number;
    onPageChange: (page: number) => void;
}

const PaginationJobs: React.FC<PaginationProps> = ({ currentPage, totalJobs, jobsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const halfPages = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > halfPages + 1) {
                pages.push('...');
            }
            
            let startPage = Math.max(2, currentPage - halfPages + 1);
            let endPage = Math.min(totalPages - 1, currentPage + halfPages - 1);

            if (currentPage <= halfPages) {
                endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
            }
            if (currentPage > totalPages - halfPages) {
                startPage = Math.max(2, totalPages - maxPagesToShow + 2);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - halfPages) {
                pages.push('...');
            }

            pages.push(totalPages);
        }
        return pages;
    };
    
    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-center mt-12">
            <nav className="relative bg-white/80 backdrop-blur-sm border border-gray-100/50 rounded-3xl p-2 shadow-lg shadow-blue-500/5" aria-label="Pagination">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/20 rounded-3xl"></div>
                
                <ul className="relative flex items-center space-x-1">
                    {/* Previous Button */}
                    <li>
                        <button 
                            onClick={() => onPageChange(currentPage - 1)} 
                            disabled={currentPage === 1} 
                            className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-gray-500 bg-white/50 rounded-2xl border border-gray-200/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/50 disabled:hover:text-gray-500 disabled:hover:border-gray-200/50 disabled:hover:shadow-none transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                        >
                            <ChevronLeft size={16} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    
                    {/* Desktop Page Numbers */}
                    <div className="hidden sm:flex items-center space-x-1">
                        {pageNumbers.map((page, index) => (
                            <li key={`${page}-${index}`}>
                                {page === '...' ? (
                                    <span className="flex items-center justify-center w-12 h-12 text-gray-400 font-medium">
                                        ...
                                    </span>
                                ) : (
                                    <button 
                                        onClick={() => onPageChange(page as number)} 
                                        className={`group relative flex items-center justify-center w-12 h-12 font-semibold rounded-2xl border transition-all duration-300 hover:scale-105 ${
                                            currentPage === page 
                                                ? 'text-white bg-gradient-to-r from-blue-900 to-blue-800 border-blue-800 shadow-lg shadow-blue-900/25' 
                                                : 'text-gray-600 bg-white/50 border-gray-200/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-500/10'
                                        }`}
                                    >
                                        {currentPage === page && (
                                            <div className="absolute inset-0 rounded-2xl bg-blue-900/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                                        )}
                                        <span className="relative">{page}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </div>

                    {/* Mobile Page Indicator */}
                    <li className="sm:hidden">
                        <div className="flex items-center justify-center px-4 h-10 sm:h-12 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/25">
                            <span>{currentPage}</span>
                            <span className="text-blue-200 font-normal mx-2">/</span>
                            <span>{totalPages}</span>
                        </div>
                    </li>
                    
                    {/* Next Button */}
                    <li>
                        <button 
                            onClick={() => onPageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages} 
                            className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-gray-500 bg-white/50 rounded-2xl border border-gray-200/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/50 disabled:hover:text-gray-500 disabled:hover:border-gray-200/50 disabled:hover:shadow-none transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                        >
                            <ChevronRight size={16} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default PaginationJobs;