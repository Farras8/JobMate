// src/pages/CompaniesPage.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompanyCard from '../components/CompaniesComp/Company';
import CompanySearch from '../components/CompaniesComp/CompanySearch';
import PaginationCompany from '../components/CompaniesComp/PaginationCompany';
import { fetchCompanies, type Company } from '../services/CompanyService';
import { Building, AlertCircle, Loader2 } from 'lucide-react';
import FloatingChatbot from '../components/FloatingChatbot';

const COMPANIES_PER_PAGE = 9;

const CompanyList: React.FC<{ companies: Company[] }> = ({ companies }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
            <CompanyCard key={company.id} company={company} />
        ))}
    </div>
);

const CompaniesPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Fungsi untuk memuat atau memfilter perusahaan
    const loadCompanies = useCallback(async (filters = {}) => {
        setIsLoading(true);
        setError(null);
        setCurrentPage(1); // Selalu reset ke halaman pertama saat filter baru
        try {
            const data = await fetchCompanies(filters);
            setCompanies(data);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat data perusahaan.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Memuat semua perusahaan saat halaman pertama kali dibuka
    useEffect(() => {
        loadCompanies();
    }, [loadCompanies]);

    const handleSearch = (filters: { searchTerm: string, city: string, minJobs: number }) => {
        // API hanya mendukung minActiveJobCount, jadi filter city (LIKE) dilakukan di frontend
        const apiFilters: { minActiveJobCount?: number } = {};
        if (filters.minJobs > 0) apiFilters.minActiveJobCount = filters.minJobs;

        loadCompanies(apiFilters).then(() => {
            setCompanies(prev => {
                let filtered = prev;

                // Filter city LIKE/contains
                if (filters.city) {
                    filtered = filtered.filter(company =>
                        company.city?.toLowerCase().includes(filters.city.toLowerCase())
                    );
                }

                // Filter nama perusahaan LIKE/contains
                if (filters.searchTerm) {
                    filtered = filtered.filter(company =>
                        company.companyName.toLowerCase().includes(filters.searchTerm.toLowerCase())
                    );
                }

                return filtered;
            });
        });
    };


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * COMPANIES_PER_PAGE;
        const lastPageIndex = firstPageIndex + COMPANIES_PER_PAGE;
        return companies.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, companies]);

    const totalPages = Math.ceil(companies.length / COMPANIES_PER_PAGE);

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                <CompanySearch onSearch={handleSearch} isLoading={isLoading} />

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg flex items-center justify-center gap-2">
                        <AlertCircle /> {error}
                    </div>
                ) : currentTableData.length > 0 ? (
                    <>
                        <CompanyList companies={currentTableData} />
                        <PaginationCompany
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <div className="text-center text-gray-500 py-16">
                        <p>Tidak ada perusahaan yang ditemukan dengan kriteria tersebut.</p>
                    </div>
                )}
            </main>
            <FloatingChatbot/>
            <Footer />
        </div>
    );
};

export default CompaniesPage;
