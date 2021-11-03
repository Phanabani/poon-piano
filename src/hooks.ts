// REACT
import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  // LOCAL STATE
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // EFFECTS
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export const useDesktopMode = (): boolean => {
  // HOOKS
  const { width: windowWidth } = useWindowSize();

  // LOCAL STATE
  const [isDesktopMode, setDesktopMode] = useState(false);

  // EFFECTS
  useEffect(() => {
    setDesktopMode(windowWidth >= 1400);
  }, [windowWidth]);

  return isDesktopMode;
};
