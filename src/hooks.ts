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

interface KeySizeAndMargin {
  width: number;
  marginLeft: number;
}

export const useKeySizeAndMargin = (
  keyPosition: number,
  isAccidentalNote: boolean,
): KeySizeAndMargin => {
  // HOOKS
  const isDesktopMode = useDesktopMode();

  // LOCAL STATE
  const [widthAndMargin, setWidthAndMargin] =
    useState<KeySizeAndMargin>({
      width: 0,
      marginLeft: 0,
    });

  // EFFECTS
  useEffect(() => {
    // Using 99.99999 to avoid percentages adding up to more than 100
    const defaultWidth = isDesktopMode
      ? 99.99999 / 24
      : 99.99999 / 12;
    let width = defaultWidth;
    let marginLeft = 0;
    if (isAccidentalNote) {
      marginLeft = -0.5 * defaultWidth;
    } else {
      // Non-accidental keys are wider
      width *= 12 / 7;

      // We need to move some non-accidental keys to the left as the accidental keys hover on top
      if (![0, 1, 5, 6].includes(keyPosition)) {
        marginLeft = -0.5 * defaultWidth;
      }
    }

    setWidthAndMargin({
      width,
      marginLeft,
    });
  }, [keyPosition, isAccidentalNote, isDesktopMode]);

  return widthAndMargin;
};
