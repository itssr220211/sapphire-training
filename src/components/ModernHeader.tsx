import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavBehavior } from '@/hooks/useNavBehavior';
import { cn } from '@/lib/utils';
import Lenis from '@studio-freight/lenis';

interface ModernHeaderProps {
  lenis: Lenis | null;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ lenis }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { theme: navTheme, isNavHidden } = useNavBehavior(navRef, lenis);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-8 lg:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 rounded-t-3xl flex flex-col items-center"
          >
            <div className="flex flex-col items-center space-y-6">
              {['Home', 'About', 'Solutions', 'Industries', 'Testimonials'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-semibold text-white hover:text-blue-300 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-12 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <AnimatePresence>
        {!isMobileMenuOpen && (
          <motion.nav
            ref={navRef}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: isNavHidden ? 100 : 0, opacity: isNavHidden ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ x: "-50%" }}
            className={cn(
              "fixed bottom-6 left-1/2 z-50",
              isScrolled
                ? 'bg-white/20 backdrop-blur-xl rounded-full shadow-2xl border border-white/30'
                : 'bg-white rounded-full shadow-lg border border-gray-200'
            )}
          >
            <div className="flex items-center px-6 py-3 space-x-6">
              <button onClick={() => scrollToSection('home')} className="flex items-center">
                <img
                  alt="Sapphire Training Solutions"
                  src="/lovable-uploads/dc785b32-7742-48f3-a331-ceb7e7f5a270.png"
                  className="h-12 w-12 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] hover:scale-110"
                />
              </button>

              <div className="hidden lg:flex items-center space-x-4">
                {['Clients', 'About', 'Solutions', 'Industries', 'Testimonials'].map(item => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item === 'Clients' ? 'clients' : item.toLowerCase())}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 hover:scale-105 px-4 py-2 rounded-full",
                      navTheme === 'dark'
                        ? "text-white hover:bg-white/20"
                        : "text-gray-900 hover:text-sapphire hover:bg-sapphire/10"
                    )}
                  >
                    {item}
                  </button>
                ))}

                <Button
                  onClick={() => scrollToSection('contact')}
                  className={cn(
                    "px-6 py-2 rounded-full font-semibold transition-colors duration-300 hover:scale-105",
                    navTheme === 'dark'
                      ? 'bg-white hover:bg-gray-200 text-gray-900'
                      : 'bg-sapphire hover:bg-sapphire/90 text-white'
                  )}
                >
                  Contact
                </Button>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-3 rounded-full transition-colors duration-300",
                  navTheme === 'dark'
                    ? "text-white hover:bg-white/20"
                    : "text-gray-900 hover:bg-gray-100"
                )}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernHeader;