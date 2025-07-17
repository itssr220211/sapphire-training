
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
        <img 
          src="/lovable-uploads/92e11cf9-7dbb-41a2-b4f2-38b20aef02c8.png" 
          alt="Sapphire Training Solutions" 
          className="h-32 w-auto drop-shadow-lg transition-all duration-300 hover:scale-105"
        />
      </div>
    </header>
  );
};

export default TopHeader;
