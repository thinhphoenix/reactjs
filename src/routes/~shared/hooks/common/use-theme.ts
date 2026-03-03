import { useContext } from 'react';
import {
  ThemeContext,
  type ThemeContextType,
} from '@/providers/theme-provider';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export type { Theme } from '@/providers/theme-provider';
