import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobSearch from '../components/JobSearchComp/JobSearch';
import FloatingChatbot from '../components/FloatingChatbot';

const JobSearchPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-blue-50 flex flex-col">
            <Navbar  />
            <main className="flex-grow">
                <JobSearch />

                {/* Nanti tambahin section lainnya di bawah sini */}
            </main>
            <FloatingChatbot/>
            <Footer />
        </div>
    );
};

export default JobSearchPage;