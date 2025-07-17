
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroLogo = document.getElementById('hero-top-logo');
      const centralLogo = document.getElementById('hero-central-logo');
      
      if (heroLogo) {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
          heroLogo.classList.add('fixed', 'top-4', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
          heroLogo.style.transform = 'translateX(-50%) scale(0.6)';
          heroLogo.style.opacity = '0.9';
        } else {
          heroLogo.classList.remove('fixed', 'top-4', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
          heroLogo.style.transform = 'scale(1)';
          heroLogo.style.opacity = '1';
        }
      }

      if (centralLogo) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 300);
        const scale = Math.max(0.5, 1 - scrollY / 600);
        centralLogo.style.opacity = opacity.toString();
        centralLogo.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Top Logo - Becomes Sticky */}
      <div className="flex justify-center pt-8 pb-4 transition-all duration-500" id="hero-top-logo">
        <img 
          src="/lovable-uploads/87257fef-495b-4594-bb30-29b61a598c38.png" 
          alt="Sapphire Training Solutions" 
          className="h-24 w-auto drop-shadow-lg"
        />
      </div>

      {/* Central Hero Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img 
          src="/lovable-uploads/87257fef-495b-4594-bb30-29b61a598c38.png" 
          alt="Sapphire Training Solutions" 
          className="h-32 w-auto opacity-30 animate-pulse"
          id="hero-central-logo"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 flex items-center">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Content - 60% */}
          <div className="lg:col-span-3 space-y-8 animate-fadeInUp">
            {/* Logo for Mobile */}
            <div className="lg:hidden flex flex-col items-center text-center mb-8">
              <img 
                src="/lovable-uploads/87257fef-495b-4594-bb30-29b61a598c38.png" 
                alt="Sapphire Training Solutions" 
                className="h-20 w-auto mb-4"
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering{' '}
                <span className="text-sapphire">Intelligence</span>{' '}
                at Work
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                Transform your workforce with premium training solutions designed for enterprise excellence. 
                From soft skills mastery to advanced data analytics.
              </p>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>1,200+ Professionals Trained</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Fortune 500 Trusted</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button 
                onClick={() => scrollToSection('solutions')}
                size="lg"
                className="bg-sapphire hover:bg-sapphire/90 text-white px-8 py-4 text-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Explore Solutions
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                size="lg"
                className="border-sapphire text-sapphire hover:bg-sapphire hover:text-white px-8 py-4 text-lg transition-all"
              >
                Talk to Us
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-12">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading organizations worldwide</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-lg font-semibold text-gray-400">Microsoft</div>
                <div className="text-lg font-semibold text-gray-400">Google</div>
                <div className="text-lg font-semibold text-gray-400">Amazon</div>
                <div className="hidden sm:block text-lg font-semibold text-gray-400">IBM</div>
              </div>
            </div>
          </div>

          {/* Visual - 40% */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              {/* Logo for Desktop */}
              <div className="hidden lg:block animate-float">
                <img 
                  src="/lovable-uploads/cb6c7757-2ba6-4d75-9379-00ed412e6065.png" 
                  alt="Sapphire Training Solutions" 
                  className="h-48 w-auto drop-shadow-2xl"
                />
              </div>
              
              {/* Geometric Background Elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 border border-sapphire/20 rotate-45 rounded-lg"></div>
                <div className="absolute top-8 left-8 w-48 h-48 border border-sapphire/10 rotate-45 rounded-lg"></div>
                <div className="absolute top-16 left-16 w-32 h-32 border border-sapphire/5 rotate-45 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-400 hover:text-sapphire transition-colors"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
