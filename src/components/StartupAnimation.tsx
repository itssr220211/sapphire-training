import React, { useState, useEffect } from 'react';

interface StartupAnimationProps {
  onComplete: () => void;
}

const StartupAnimation: React.FC<StartupAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timeline = [
      { delay: 0, phase: 1 }, // Logo appears
      { delay: 1500, phase: 2 }, // Company name appears  
      { delay: 3500, phase: 3 }, // Start fade out
      { delay: 4500, phase: 4 } // Complete animation
    ];

    const timeouts = timeline.map(({ delay, phase }) =>
      setTimeout(() => setPhase(phase), delay)
    );

    // Auto-complete after 4.5 seconds
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const skipAnimation = () => {
    onComplete();
  };

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-sapphire to-blue-900 flex items-center justify-center transition-opacity duration-1000 ${phase === 3 ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sapphire/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className={`transform transition-all duration-1000 ease-out ${
          phase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}>
          <div className="relative">
            <img 
              src="/lovable-uploads/b11c7bc1-0f60-478d-abe0-fc0aaf31dbcb.png" 
              alt="Sapphire Diamond Logo" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto drop-shadow-2xl"
            />
            {/* Glow Effect */}
            <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-blue-400/20 blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Company Name Animation */}
        <div className={`mt-8 transform transition-all duration-1000 ease-out delay-300 ${
          phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
              Sapphire
            </span>
            <span className="block text-blue-200 text-3xl md:text-4xl font-semibold mt-2">
              Training Solutions
            </span>
          </h1>
          
          {/* Animated Underline */}
          <div className={`w-32 h-1 bg-gradient-to-r from-blue-300 to-white mx-auto mt-4 transform transition-all duration-700 delay-700 ${
            phase >= 2 ? 'scale-x-100' : 'scale-x-0'
          }`}></div>
        </div>

        {/* Subtle Loading Indicator */}
        <div className={`mt-12 transform transition-all duration-500 ${
          phase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={skipAnimation}
        className="absolute bottom-8 right-8 px-4 py-2 text-white/60 hover:text-white text-sm transition-colors duration-300 border border-white/20 rounded-full hover:border-white/40"
      >
        Skip Animation
      </button>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StartupAnimation;