import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center py-16">
        <img src="https://placehold.co/300x200/FF6347/FFFFFF?text=404&font=montserrat" alt="404 Not Found" className="mb-6 rounded-lg shadow-md" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
        <RouterLink to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Kembali ke Beranda
        </RouterLink>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
