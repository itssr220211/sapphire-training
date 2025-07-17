import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed bottom-24 left-4 right-4 z-50 lg:hidden">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              {['Home', 'About', 'Solutions', 'Industries', 'Testimonials', 'Contact'].map(item => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())} 
                  className="text-left text-gray-700 hover:text-sapphire transition-colors py-2 font-medium hover:glow-text"
                >
                  {item}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-sapphire hover:bg-sapphire/90 text-white mt-4 w-full rounded-full"
              >
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Extended with Logo */}
      <nav className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/20 backdrop-blur-xl rounded-full shadow-2xl border border-white/30 animate-glow-border' 
          : 'bg-white rounded-full shadow-lg border border-gray-200'
      }`}>
        <div className="flex items-center px-8 py-3 space-x-8">
          {/* Logo Icon on the Left */}
          <div className="flex items-center">
            <img 
              alt="Sapphire Training Solutions" 
              src="/lovable-uploads/dc785b32-7742-48f3-a331-ceb7e7f5a270.png" 
              className="h-12 w-12 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] hover:scale-110" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Home', 'About', 'Solutions', 'Industries', 'Testimonials'].map(item => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())} 
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-full ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-gray-900 hover:bg-white/30 hover:glow-text' 
                    : 'text-gray-700 hover:text-sapphire hover:bg-sapphire/10'
                }`}
              >
                {item}
              </button>
            ))}
            
            {/* Contact Button */}
            <Button 
              onClick={() => scrollToSection('contact')} 
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:glow-button ${
                isScrolled 
                  ? 'bg-gray-800 hover:bg-gray-900 text-white border border-gray-600' 
                  : 'bg-sapphire hover:bg-sapphire/90 text-white'
              }`}
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-800 hover:bg-white/30' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default ModernHeader;