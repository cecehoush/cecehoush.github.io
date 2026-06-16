import { createContext, useContext, useLayoutEffect, useState } from 'react';

const ThemeContext = createContext(null);

// Which light-mode scheme is active. MUST be kept in sync with the uncommented
// scheme block in src/styles/global.css (Currently active: A).
// Options: 'a' (Cool Blue-White) | 'c' (Lavender Mist) | 'd' (Hybrid Dark Cards) | 'e' (Slate Stone)
// Only scheme 'd' uses this at runtime (to swap project-card text to light over
// the dark cards); the rest are driven purely by the CSS block you uncomment.
const LIGHT_SCHEME = 'a';

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  // Reflect theme + scheme on the root element so [data-theme]/[data-scheme]
  // overrides apply. useLayoutEffect (not useEffect) so the attributes are set
  // during commit, before Hero's passive effect reads the CSS vars.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = isDark ? 'dark' : 'light';
    root.dataset.scheme = LIGHT_SCHEME;
  }, [isDark]);

  const toggle = () => setIsDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
