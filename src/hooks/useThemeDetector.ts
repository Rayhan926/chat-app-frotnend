import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const systemThemeAtom = atom<boolean | null>(null);

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useAtom(systemThemeAtom);

  const getCurrentTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  useEffect(() => {
    setIsDarkTheme(getCurrentTheme());
  }, [setIsDarkTheme]);

  return isDarkTheme;
};

export default useThemeDetector;
