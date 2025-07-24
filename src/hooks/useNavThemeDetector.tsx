import * as React from "react"
import Lenis from '@studio-freight/lenis'

export function useNavThemeDetector(navRef: React.RefObject<HTMLElement>, lenis: Lenis | null) {
  const [navTheme, setNavTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    if (!lenis || !navRef.current) return;

    const darkSections = Array.from(document.querySelectorAll('[data-theme="dark"]'));

    const onScroll = () => {
      const navRect = navRef.current!.getBoundingClientRect();
      const navCenterY = (navRect.top + navRect.bottom) / 2;
      const navCenterX = window.innerWidth / 2;
      let el: HTMLElement | null = document.elementFromPoint(navCenterX, navCenterY) as HTMLElement;
      let theme: string | null = null;
      while (el && el !== document.body && !theme) {
        theme = el.getAttribute('data-theme');
        el = el.parentElement as HTMLElement;
      }
      setNavTheme(theme === 'dark' ? 'dark' : 'light');
    };

    lenis.on('scroll', onScroll);
    
    // Initial check
    onScroll();

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, navRef]);

  return navTheme;
} 