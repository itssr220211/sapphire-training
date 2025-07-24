
import React, { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StartupAnimation from '@/components/StartupAnimation';
import ModernHeader from '@/components/ModernHeader';
import AnimatedHero from '@/components/AnimatedHero';
import SapphireLogoCarousel from '@/components/SapphireLogoCarousel';
import ModernAboutSection from '@/components/ModernAboutSection';
import InteractiveSolutions from '@/components/InteractiveSolutions';
import IndustriesSection from '@/components/IndustriesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollRevealSection from '@/components/ScrollRevealSection';

const Index = () => {
  const [showStartupAnimation, setShowStartupAnimation] = useState(true);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const revealSectionRef = useRef<HTMLDivElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [logoLoaded, setLogoLoaded] = useState(true);

  useEffect(() => {
    const lenisInstance = new Lenis();
    setLenis(lenisInstance);

    gsap.registerPlugin(ScrollTrigger);
    lenisInstance.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current || !revealSectionRef.current) return;
      const footer = document.querySelector('footer');
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const footerBottom = footerRect.bottom + scrollY;
      // The reveal area is 100vh
      const maxReveal = windowHeight;
      const scrollPastFooter = scrollY + windowHeight - footerBottom;
      const progress = Math.max(0, Math.min(1, scrollPastFooter / maxReveal));
      setRevealProgress(progress);
      // Move main content up as user scrolls past footer
      if (mainContentRef.current) {
        mainContentRef.current.style.transform = `translateY(-${progress * maxReveal}px)`;
      }
      // Fade in the hidden section as it is revealed
      if (revealSectionRef.current) {
        revealSectionRef.current.style.opacity = progress > 0 ? `${progress}` : '0';
      }
    };
    // Throttle scroll for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleAnimationComplete = () => {
    setShowStartupAnimation(false);
  };

  // Error handling for logo image
  const handleLogoError = () => setLogoLoaded(false);

  if (showStartupAnimation) {
    return <StartupAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="curtain-reveal-container">
      <div className="main-content-wrapper" ref={mainContentRef}>
        {/* Layer 1: fixed logo */}
        <div className="fixed-logo-background">
          <img src="/branding/logo-bg.png" alt="Background Logo" className="background-logo-img" />
        </div>
        {/* Layer 2: scrollable content */}
        <div id="page-wrapper" className="min-h-screen bg-white">
          <ModernHeader lenis={lenis} />
          <div data-theme="dark"><AnimatedHero /></div>
          <SapphireLogoCarousel />
          <ModernAboutSection />
          <InteractiveSolutions />
          <IndustriesSection />
          <div data-theme="dark"><TestimonialsSection /></div>
          <ContactSection />
          <div data-theme="dark"><Footer /></div>
          <div style={{height: '100vh', width: '100vw', background: 'transparent', pointerEvents: 'none'}} />
        </div>
      </div>
      <div className="hidden-reveal-section" ref={revealSectionRef} style={{ opacity: 0 }}>
        <div className="logo-container">
          {logoLoaded ? (
            <img src="/branding/logo-bg.png" alt="Logo" className="reveal-logo" onError={handleLogoError} />
          ) : (
            <div style={{ color: '#fff', fontSize: '2rem', textAlign: 'center' }}>Logo failed to load</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
