// REACT
import { useEffect, useState } from 'react';

// LOCAL FILES
// Constants
import { Note, NOTES } from './constants';
// Utility functions
import { getBaseKeyWidth } from 'utils';

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  // LOCAL STATE
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
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

export const useKeyWidth = (note: Note): string => {
  // HOOKS
  const { width, height } = useWindowSize();

  const baseKeyWidth = getBaseKeyWidth(width > height);
  return note.includes('sharp')
    ? `${baseKeyWidth}%`
    : `${(baseKeyWidth * 12) / 7}%`;
};

export const useKeyMarginLeft = (note: Note): string => {
  // HOOKS
  const { width, height } = useWindowSize();

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
