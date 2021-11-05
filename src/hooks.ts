// REACT
import { useEffect, useState } from 'react';

// LOCAL FILES
// Constants
import { Note, NOTES } from './constants';
// Utility functions
import { getBaseKeyWidth } from 'utils';

interface ScreenSize {
  width: number;
  height: number;
}

export const useScreenSize = () => {
  // LOCAL STATE
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: window.screen.availWidth,
    height: window.screen.availHeight,
  });

  // EFFECTS
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export const useKeyWidth = (note: Note): string => {
  // HOOKS
  const { width, height } = useScreenSize();

  const baseKeyWidth = getBaseKeyWidth(width > height);
  return note.includes('sharp')
    ? `${baseKeyWidth}%`
    : `${(baseKeyWidth * 12) / 7}%`;
};

export const useKeyMarginLeft = (note: Note): string => {
  // HOOKS
  const { width, height } = useScreenSize();

  const baseKeyWidth = getBaseKeyWidth(width > height);

  let marginLeft = 0;
  if (note.includes('sharp')) {
    marginLeft = -0.5 * baseKeyWidth;
  } else {
    // We need to move some non-accidental keys to the left as the accidental keys hover on top
    const previousNote =
      NOTES[
        NOTES.findIndex((noteIteration) => noteIteration === note) - 1
      ];
    if (previousNote?.includes('sharp')) {
      marginLeft = -0.5 * baseKeyWidth;
    }
  }

  return `${marginLeft}%`;
};
