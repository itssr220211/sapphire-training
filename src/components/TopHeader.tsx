
import React, { useState, useEffect } from 'react';

const TopHeader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Hide header when scrolling down (fade starts immediately)
      setIsVisible(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="flex justify-center pt-6">
        <div className="relative group">
          <img 
            src="/lovable-uploads/92e11cf9-7dbb-41a2-b4f2-38b20aef02c8.png" 
            alt="Sapphire Training Solutions" 
            className="h-40 w-auto drop-shadow-lg transition-all duration-300 group-hover:scale-110 relative z-10"
          />
          <img 
            src="/lovable-uploads/92e11cf9-7dbb-41a2-b4f2-38b20aef02c8.png" 
            alt="" 
            className="absolute inset-0 h-40 w-auto blur-sm scale-105 opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 filter brightness-150"
            style={{ filter: 'brightness(1.5) blur(2px)' }}
          />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
