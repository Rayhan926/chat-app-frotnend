import { themeAtom } from '@atoms';
import { THEME_KEY } from '@config/constants';
import { getLocal, setLocal } from '@lib/localstorage';
import { Theme } from '@types';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import useThemeDetector from './useThemeDetector';

const useTheme = () => {
  const isDarkTheme = useThemeDetector();
  const [theme, _setTheme] = useAtom(themeAtom);

  const setTheme = useCallback(
    (thm: Theme) => {
      _setTheme(thm);
      setLocal(THEME_KEY, thm);

      if (thm === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    [_setTheme],
  );

  const mqListener = useCallback(
    (e: any) => {
      setTheme(e.matches ? 'dark' : 'light');
    },
    [setTheme],
  );

  useEffect(() => {
    if (isDarkTheme === null) return;

    const getThemeFromLocalStorage =
      getLocal(THEME_KEY) || (isDarkTheme ? 'dark' : 'light');

    setTheme(getThemeFromLocalStorage);

    document.body.style.opacity = '1';
    document.body.style.pointerEvents = 'auto';
  }, [setTheme, isDarkTheme]);

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addEventListener('change', mqListener);
    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, [mqListener]);

  return {
    theme,
    setTheme,
    isLightTheme: theme === 'light',
    isDarkTheme: theme === 'dark',
  };
};

export default useTheme;
