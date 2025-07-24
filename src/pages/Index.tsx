
import React, { useState, useEffect } from 'react';
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

  const handleAnimationComplete = () => {
    setShowStartupAnimation(false);
  };

  if (showStartupAnimation) {
    return <StartupAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ModernHeader lenis={lenis} />
      <div data-theme="dark"><ScrollRevealSection><AnimatedHero /></ScrollRevealSection></div>
      <ScrollRevealSection><SapphireLogoCarousel /></ScrollRevealSection>
      <ScrollRevealSection><ModernAboutSection /></ScrollRevealSection>
      <div data-theme="dark"><ScrollRevealSection><InteractiveSolutions /></ScrollRevealSection></div>
      <div data-theme="dark"><ScrollRevealSection><IndustriesSection /></ScrollRevealSection></div>
      <div data-theme="dark"><ScrollRevealSection><TestimonialsSection /></ScrollRevealSection></div>
      <ScrollRevealSection><ContactSection /></ScrollRevealSection>
      <div data-theme="dark"><Footer /></div>
    </div>
  );
};

export default Index;
