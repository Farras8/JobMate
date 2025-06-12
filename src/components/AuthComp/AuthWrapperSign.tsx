import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthWrapperSign: React.FC<Props> = ({ children }) => (
  <div className="w-full relative min-h-screen">
    {/* Pattern Background - Fully responsive */}
    <div
      className="w-full min-h-[200px] h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] bg-repeat"
      style={{
        backgroundImage: 'url("/pattern.png")',
        backgroundSize: 'auto',
      }}
    />

    {/* Card Container - Moved much higher up */}
    <div className="absolute top-0 xs:top-1 sm:top-2 md:top-3 lg:top-4 xl:top-6 2xl:top-8 w-full flex justify-center px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {children}
      </div>
    </div>

    {/* Alternative: Even higher positioning with negative margins if needed */}
    {/* Uncomment this and comment above if you want the form to overlap the header
    <div className="absolute -top-2 xs:-top-1 sm:top-0 md:top-1 lg:top-2 xl:top-4 w-full flex justify-center px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {children}
      </div>
    </div>
    */}

    {/* Ultra-minimal top spacing version */}
    {/* Uncomment this and comment the main one above for absolutely minimal top spacing
    <div className="absolute top-0 w-full flex justify-center px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 pt-1">
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {children}
      </div>
    </div>
    */}
  </div>
);

export default AuthWrapperSign;