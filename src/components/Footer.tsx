import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-12 text-sm text-gray-700">
        {/* Kiri - Logo & Deskripsi */}
        <div className="max-w-sm">
            <img src="/logo.png" alt="DisaBisa Logo" className="h-15 mb-4" />
            <p className="text-gray-600">
            Tempat terbaik untuk melatih keterampilan dan menemukan lowongan pekerjaan inklusif
            </p>
        </div>

        {/* Kanan - Semua Link */}
        <div className="flex flex-col sm:flex-row gap-12">
          <div>
            <h3 className="font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:underline">Tentang JobMate</Link></li>
              <li><Link to="/jobsearch" className="hover:underline">JobSearch</Link></li>
              <li><Link to="/companies" className="hover:underline">Perusahaan</Link></li>
              <li><Link to="/rekomendasi" className="hover:underline">Rekomendasi</Link></li>
              <li><Link to="/cvreview" className="hover:underline">CV Review</Link></li>
              <li><Link to="/services/ai-interview" className="hover:underline">AI Interview</Link></li>
              <li><Link to="/services/jobmodul" className="hover:underline">JobModul</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="space-y-1">
              <li><button className="hover:underline bg-transparent p-0 text-left">Contact us</button></li>
              <li><button className="hover:underline bg-transparent p-0 text-left">My account</button></li>
            </ul>
          </div>
        </div>
        </div>

      {/* Social & Copyright */}
      <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-col md:flex-row items-center justify-between border-t pt-4 border-gray-200">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="/facebook.png" alt="Facebook" className="h-10 w-10" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src="/linkedin.png" alt="LinkedIn" className="h-10 w-10" /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src="/twitter.png" alt="Twitter" className="h-10 w-10" /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="/instagram.png" alt="Instagram" className="h-10 w-10" /></a>
        </div>
        <p className="text-xs text-gray-500">
          Copyright © 2025 all rights reserved JobMate
        </p>
      </div>
    </footer>
  );
};

export default Footer;
