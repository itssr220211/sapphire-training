"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import '@fontsource/sansation';

// Utility function for class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Utility function to shuffle an array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Logo data for Sapphire Training Solutions clients
const clientLogos = [
  { id: 1, name: "Adani Group", src: "Logos/Adani_Group_logo.png" },
  { id: 2, name: "Alliance Airlines", src: "Logos/Alliance_Airlines_logo.png" },
  { id: 3, name: "Bata", src: "Logos/Bata_logo.png" },
  { id: 4, name: "BBJ Construction", src: "Logos/BBJ_Construction_logo.png" },
  { id: 5, name: "BHEL", src: "Logos/BHEL_logo.png" },
  { id: 6, name: "Blossom Kochhar", src: "Logos/Blossom_Kochhar_logo.jpg" },
  { id: 7, name: "Border Roads Organisation", src: "Logos/Border_Roads_Organisation_BRO_logo.png" },
  { id: 8, name: "Cafe Coffee Day", src: "Logos/Cafe_Coffee_Day_logo.png" },
  { id: 9, name: "Citibank", src: "Logos/Citibank_logo.png" },
  { id: 10, name: "Club One Air", src: "Logos/Club_One_Air_logo.png" },
  { id: 11, name: "DVC Damodar Valley Corporation", src: "Logos/DVC_Damodar_Valley_Corporation_logo.png" },
  { id: 12, name: "EY Ernst Young", src: "Logos/EY_Ernst_Young_logo.png" },
  { id: 13, name: "Flipkart", src: "Logos/Flipkart_logo.svg" },
  { id: 14, name: "Frankfinn Institute", src: "Logos/Frankfinn_Institute_logo.png" },
  { id: 15, name: "GPI Great Plains", src: "Logos/GPI_Great_Plains_Industries_logo.png" },
  { id: 16, name: "Jackson", src: "Logos/Jackson_logo.svg" },
  { id: 17, name: "KFC", src: "Logos/KFC_logo.png" },
  { id: 18, name: "Maruti Suzuki", src: "Logos/Maruti_Suzuki_logo.png" },
  { id: 19, name: "NBCC", src: "Logos/NBCC_logo.png" },
  { id: 20, name: "NFL National Fertilizers", src: "Logos/NFL_National_Fertilizers_logo.png" },
  { id: 21, name: "NHPC", src: "Logos/NHPC_logo.png" },
  { id: 22, name: "NIIT", src: "Logos/NIIT_logo.svg" },
  { id: 23, name: "Pizza Hut", src: "Logos/Pizza_Hut_logo.svg" },
  { id: 24, name: "Prasar Bharati", src: "Logos/Prasar_Bharati_logo.png" },
  { id: 25, name: "Samsung", src: "Logos/Samsung_logo.png" },
  { id: 26, name: "Sterlite Technologies", src: "Logos/Sterlite_Technologies_logo.png" },
  { id: 27, name: "THDC India Limited", src: "Logos/THDC_India_Limited_logo.png" },
  { id: 28, name: "UEI Global", src: "Logos/UEI_Global_logo.png" },
  { id: 29, name: "Woodward", src: "Logos/Woodward_logo.png" },
  { id: 30, name: "Eureka Forbes", src: "Logos/Eureka-Forbes-logo.png" },
  { id: 31, name: "MDLR Airlines", src: "Logos/mdlr-airlines-logo.png" }
];

interface LogoCarouselProps {
  logos?: typeof clientLogos;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({
  logos = clientLogos,
  speed = 25,
  pauseOnHover = true,
  className = "",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);

  // Shuffle logos on mount for random order
  const [shuffledLogos] = useState(() => shuffleArray(logos));
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...shuffledLogos, ...shuffledLogos];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationId: number;

    const animate = () => {
      if (!isPaused) {
        scrollPosition.current += speed / 60; // 60fps
        if (scrollPosition.current >= scrollElement.scrollWidth / 2) {
          scrollPosition.current = 0;
        }
        scrollElement.scrollLeft = scrollPosition.current;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, speed]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex overflow-hidden whitespace-nowrap"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 mx-12 flex items-center justify-center h-20 w-40"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-h-full max-w-full object-contain transition-all duration-300 ease-in-out hover:brightness-125 hover:drop-shadow-lg"
              loading="lazy"
              onError={(e) => {
                // Fallback to display company name if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.logo-text')) {
                  const textDiv = document.createElement('div');
                  textDiv.className = 'logo-text text-sm font-medium text-foreground/60 text-center px-2';
                  textDiv.textContent = logo.name;
                  parent.appendChild(textDiv);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const SMARTER_LETTERS = ['S','M','A','R','T','E','R'];

const SapphireLogoCarousel: React.FC = () => {
  const headlineRef = React.useRef<HTMLDivElement>(null);
  const brandsGotRef = React.useRef<HTMLSpanElement>(null);
  const smarterRef = React.useRef<HTMLSpanElement>(null);
  const yourNextRef = React.useRef<HTMLSpanElement>(null);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.7 } });
    tl.fromTo(headlineRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0,
      scrollTrigger: {
        trigger: headlineRef.current,
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
      }
    })
    .fromTo(brandsGotRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0,
      scrollTrigger: {
        trigger: brandsGotRef.current,
        start: 'top 80%',
        end: 'top 60%',
        scrub: true,
      }
    })
    .fromTo(smarterRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0,
      scrollTrigger: {
        trigger: smarterRef.current,
        start: 'top 80%',
        end: 'top 60%',
        scrub: true,
      }
    })
    .fromTo(yourNextRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0,
      scrollTrigger: {
        trigger: yourNextRef.current,
        start: 'top 80%',
        end: 'top 60%',
        scrub: true,
      }
    })
    .fromTo(carouselRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0,
      scrollTrigger: {
        trigger: carouselRef.current,
        start: 'top 80%',
        end: 'top 60%',
        scrub: true,
      }
    });
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <section id="clients" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 flex flex-col items-center gap-y-6">
            <span ref={brandsGotRef} className="block opacity-0">These brands got</span>
            <motion.span
              ref={smarterRef}
              className="block opacity-0 px-8 relative text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-500 to-blue-800 bg-[length:300%_100%] uppercase text-5xl lg:text-7xl font-bold italic min-w-fit overflow-x-visible tracking-wider"
              style={{ fontFamily: 'Sansation, sans-serif', fontWeight: 700, fontStyle: 'italic' }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], transition: { repeat: Infinity, duration: 6, ease: "linear" } }}
            >
              <span className="absolute inset-0 -z-10 pointer-events-none rounded-xl" aria-hidden="true">
                <motion.span
                  className="block w-full h-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-600 blur-2xl opacity-40 animate-pulse"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], transition: { repeat: Infinity, duration: 6, ease: "linear" } }}
                  style={{ backgroundSize: '300% 100%' }}
                />
              </span>
              <span className="inline-flex items-center justify-center gap-x-2 min-w-fit overflow-x-visible">
                {SMARTER_LETTERS.map((char, i) => {
                    // Reduce scale for edge letters to prevent overflow
                    const edgeScale = (i === 0 || i === SMARTER_LETTERS.length - 1) ? 1.15 : 1.25;
                    return (
                      <motion.span
                        key={i}
                        className="inline-block relative mx-1"
                        animate={
                          hovered === null
                            ? { scale: 1, filter: 'drop-shadow(0 2px 12px #3b82f6)' }
                            : hovered === i
                              ? { scale: edgeScale, filter: 'drop-shadow(0 0 48px #3b82f6) drop-shadow(0 0 32px #60a5fa) drop-shadow(0 0 32px #a5b4fc)' }
                              : Math.abs(i - hovered) === 1
                                ? { scale: 1.1, filter: 'drop-shadow(0 2px 16px #3b82f6)' }
                                : { scale: 1, filter: 'drop-shadow(0 2px 8px #3b82f6)' }
                        }
                        transition={{ type: 'spring', stiffness: 200, damping: 24, ease: 'easeInOut' }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
              </span>
            </motion.span>
            <span ref={yourNextRef} className="block opacity-0 text-gray-900 text-2xl lg:text-4xl font-semibold">
              You're next.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join the ranks of industry leaders who've transformed their teams with Sapphire Training Solutions.
          </p>
        </div>
        {/* Logo Carousel */}
        <div ref={carouselRef} className="relative opacity-0">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <LogoCarousel
            logos={clientLogos}
            speed={25}
            pauseOnHover={true}
            className="py-12"
          />
        </div>
      </div>
    </section>
  );
};

export default SapphireLogoCarousel;