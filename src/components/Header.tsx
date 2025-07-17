
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
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
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/045d2aa9-9dad-495c-8845-65600722be95.png" 
              alt="Sapphire Training Solutions" 
              className="h-8 w-8"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-sapphire">SAPPHIRE</span>
              <div className="text-xs text-slate-grey tracking-wider">TRAINING SOLUTIONS</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-sapphire transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-sapphire transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-gray-700 hover:text-sapphire transition-colors"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('industries')}
              className="text-gray-700 hover:text-sapphire transition-colors"
            >
              Industries
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-sapphire transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-sapphire transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-sapphire hover:bg-sapphire/90 text-white px-6 py-2 rounded-lg transition-all hover:shadow-lg"
            >
              Talk to Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-sapphire"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-sapphire transition-colors py-2"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-sapphire transition-colors py-2"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('solutions')}
                className="text-left text-gray-700 hover:text-sapphire transition-colors py-2"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection('industries')}
                className="text-left text-gray-700 hover:text-sapphire transition-colors py-2"
              >
                Industries
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-gray-700 hover:text-sapphire transition-colors py-2"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-sapphire transition-colors py-2"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-sapphire hover:bg-sapphire/90 text-white mt-4 w-full"
              >
                Talk to Us
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
