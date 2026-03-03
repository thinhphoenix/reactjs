import type React from 'react';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Exclude<Theme, 'system'>;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'app-theme';

const isTheme = (value: string): value is Theme => {
  return value === 'light' || value === 'dark' || value === 'system';
};

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme && isTheme(storedTheme)) {
    return storedTheme;
  }

  return 'system';
};

const getSystemTheme = (): Exclude<Theme, 'system'> => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getResolvedTheme = (theme: Theme): Exclude<Theme, 'system'> => {
  return theme === 'system' ? getSystemTheme() : theme;
};

const setDocumentTheme = (theme: Exclude<Theme, 'system'>) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState<Exclude<Theme, 'system'>>(
    () => {
      if (typeof window === 'undefined') {
        return 'light';
      }

      return getResolvedTheme(getStoredTheme());
    },
  );

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  useEffect(() => {
    const nextResolvedTheme = getResolvedTheme(theme);

    setDocumentTheme(nextResolvedTheme);
    setResolvedTheme(nextResolvedTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      const resolvedSystemTheme = mediaQuery.matches ? 'dark' : 'light';

      setDocumentTheme(resolvedSystemTheme);
      setResolvedTheme(resolvedSystemTheme);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
