import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Lenis and GSAP integration for smooth scrolling and scroll-trigger updates
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Update ScrollTrigger on scroll for GSAP
lenis.on('scroll', ScrollTrigger.update);

// Ensure ScrollTrigger always knows the correct scroll height
window.addEventListener('load', () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

createRoot(document.getElementById("root")!).render(<App />);
