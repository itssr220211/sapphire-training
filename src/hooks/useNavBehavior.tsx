import * as React from "react"
import Lenis from '@studio-freight/lenis'

export function useNavBehavior(navRef: React.RefObject<HTMLElement>, lenis: Lenis | null) {
  const [behavior, setBehavior] = React.useState({ theme: "light", isNavHidden: false });

  React.useEffect(() => {
    if (!lenis || !navRef.current) return;

    const footer = document.querySelector('footer');

    const onScroll = () => {
      if (!navRef.current || !footer) return;
      const navRect = navRef.current.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      // 1. Hide Detection: Hide nav if its top touches the footer's top
      const shouldHide = navRect.top >= footerRect.top;

      // 2. Theme Detection (Unchanged)
      const navCenterY = (navRect.top + navRect.bottom) / 2;
      const navCenterX = window.innerWidth / 2;
      let el: HTMLElement | null = document.elementFromPoint(navCenterX, navCenterY) as HTMLElement;
      let currentTheme: string | null = null;
      while (el && el !== document.body && !currentTheme) {
        currentTheme = el.getAttribute('data-theme');
        el = el.parentElement as HTMLElement;
      }
      const newTheme = currentTheme === 'dark' ? 'dark' : 'light';

      // 3. Update state
      setBehavior({ theme: newTheme, isNavHidden: shouldHide });
    };

    lenis.on('scroll', onScroll);
    onScroll(); // Initial check

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, navRef]);

  return behavior;
} 