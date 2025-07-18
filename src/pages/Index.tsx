
import React, { useState } from 'react';
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

  const handleAnimationComplete = () => {
    setShowStartupAnimation(false);
  };

  if (showStartupAnimation) {
    return <StartupAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />
      <ScrollRevealSection><AnimatedHero /></ScrollRevealSection>
      <ScrollRevealSection><SapphireLogoCarousel /></ScrollRevealSection>
      <ScrollRevealSection><ModernAboutSection /></ScrollRevealSection>
      <ScrollRevealSection><InteractiveSolutions /></ScrollRevealSection>
      <ScrollRevealSection><IndustriesSection /></ScrollRevealSection>
      <ScrollRevealSection><TestimonialsSection /></ScrollRevealSection>
      <ScrollRevealSection><ContactSection /></ScrollRevealSection>
      <Footer />
    </div>
  );
};

export default Index;
