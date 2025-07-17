
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
      <AnimatedHero />
      <SapphireLogoCarousel />
      <ModernAboutSection />
      <InteractiveSolutions />
      <IndustriesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
