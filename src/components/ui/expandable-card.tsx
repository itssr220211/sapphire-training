"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  [key: string]: any;
}

// Utility to robustly reset scrollTop, retrying if needed
const ensureScrollTop = (element: HTMLElement | null, maxAttempts = 5) => {
  let attempts = 0;
  const tryReset = () => {
    if (!element || attempts >= maxAttempts) return;
    // Force reflow (optional, sometimes helps)
    const currentDisplay = element.style.display;
    element.style.display = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.display = currentDisplay;
    // Set scroll position to the top
    element.scrollTop = 0;
    // If not at top, try again next frame
    if (element.scrollTop > 0) {
      attempts++;
      requestAnimationFrame(tryReset);
    }
  };
  // Start after a small delay to allow animations to begin
  setTimeout(() => {
    requestAnimationFrame(tryReset);
  }, 10);
};

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();
  const [isClient, setIsClient] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  React.useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.focus();
        }
      }, 0);
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [active]);

  // Robust scroll reset after card is expanded
  React.useEffect(() => {
    if (active) {
      const scrollableContent = document.querySelector('.expandable-card-content') as HTMLElement | null;
      ensureScrollTop(scrollableContent);
    }
  }, [active]);

  // Prevent background scroll on overlay
  const preventScroll = (e: React.UIEvent | React.WheelEvent | React.TouchEvent | React.KeyboardEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Prevent scroll chaining (overscroll) on card content
  const stopScrollChaining = (e: React.WheelEvent | React.TouchEvent) => {
    const el = contentRef.current;
    if (!el) return;
    if (e.type === 'wheel') {
      const wheel = e as React.WheelEvent;
      const atTop = el.scrollTop === 0 && wheel.deltaY < 0;
      const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight && wheel.deltaY > 0;
      if (atTop || atBottom) {
        e.preventDefault();
        e.stopPropagation();
      }
    } else if (e.type === 'touchmove') {
      // For touch, always prevent propagation to avoid scroll chaining
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <>
      {isClient && createPortal(
        <>
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-md h-full w-full z-40"
                onWheel={preventScroll}
                onTouchMove={preventScroll}
                onKeyDown={preventScroll}
                style={{ touchAction: 'none' }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {active && (
              <div
                className={cn(
                  "fixed inset-0 grid place-items-center z-50 sm:mt-16 before:pointer-events-none",
                )}
                onWheel={preventScroll}
                onTouchMove={preventScroll}
                onKeyDown={preventScroll}
              >
                <motion.div
                  layoutId={`card-${title}-${id}`}
                  ref={cardRef}
                  className={cn(
                    "w-full max-w-[850px] h-full flex flex-col overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] sm:rounded-t-3xl bg-background shadow-sm border border-border relative",
                    classNameExpanded,
                  )}
                  {...props}
                >
                  <motion.div layoutId={`image-${title}-${id}`}>
                    <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[70px] before:z-50 before:bg-gradient-to-t before:from-background">
                      <img
                        src={src}
                        alt={title}
                        className="w-full h-80 object-cover object-center"
                      />
                    </div>
                  </motion.div>
                  <div className="relative px-6 sm:px-8 h-full">
                    <motion.div
                      ref={contentRef}
                      tabIndex={0}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="expandable-card-content text-muted-foreground text-base pb-10 flex flex-col items-start gap-4 overflow-y-auto h-full hide-scrollbar focus:outline-none"
                      style={{ height: '100%' }}
                      onWheel={stopScrollChaining}
                      onTouchMove={stopScrollChaining}
                    >
                      {children}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
        className={cn(
          "p-3 flex flex-col justify-between items-center bg-background shadow-sm border border-border rounded-2xl cursor-pointer hover:shadow-md transition-shadow relative group overflow-hidden",
          className,
        )}
      >
        {/* Cursor following blue LED border effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.15), transparent 70%)`,
          }}
        />
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2"
          style={{
            borderImage: `radial-gradient(100px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.8), transparent 70%) 1`,
            background: `radial-gradient(100px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.1), transparent 70%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor'
          }}
        />
        <div className="flex gap-4 flex-col">
          <motion.div layoutId={`image-${title}-${id}`}>
            <img
              src={src}
              alt={title}
              className="w-64 h-56 rounded-lg object-cover object-center"
            />
          </motion.div>
          <div className="flex justify-between items-center w-64">
            <div className="flex flex-col flex-1 min-w-0">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-muted-foreground md:text-left text-sm font-medium truncate"
              >
                {description}
              </motion.p>
              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="text-foreground md:text-left font-semibold text-sm truncate"
              >
                {title}
              </motion.h3>
            </div>
            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className={cn(
                "h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-border transition-colors duration-300 focus:outline-none ml-2",
                className,
              )}
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}