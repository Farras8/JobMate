import React from 'react';

const AuthHeader: React.FC = () => (
  <header className="bg-white shadow-sm py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
    <div className="container mx-auto flex items-center justify-between max-w-7xl">
      <div className="flex items-center">
        {/* Logo with consistent desktop size across all devices */}
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="h-12 sm:h-14 md:h-16 lg:h-17 xl:h-17 mr-3 object-contain transition-all duration-300 hover:scale-105" 
        />
        
        {/* Alternative: If you want exactly the same size on all devices, use this instead */}
        {/* 
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="h-17 mr-3 object-contain transition-all duration-300 hover:scale-105" 
        />
        */}
      </div>
      
      {/* Optional: Add some content on the right if needed */}
      {/* 
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        <span className="text-sm sm:text-base text-gray-600 hidden sm:inline">
          Welcome to JobMate
        </span>
      </div>
      */}
    </div>
  </header>
);

export default AuthHeader;