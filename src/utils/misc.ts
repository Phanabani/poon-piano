// LOCAL FILES
// Constants
import { Note, NOTES } from '../constants';
// Interfaces & Types
import { KeyImage } from 'utils';

export const getKeyImage = (
  images: KeyImage[],
  isAccidentalNote: boolean,
  isNotePlaying: boolean,
): string => {
  const image = images.find(
    (imageObject) =>
      imageObject.accidental === isAccidentalNote &&
      imageObject.active === isNotePlaying,
  )?.image;

  // TODO: Fallback image?
  return image || '';
};

// Using 99.99999 to avoid percentages going over 100
const getBaseWidth = (isDesktopMode: boolean) =>
  isDesktopMode ? 99.99999 / 24 : 99.99999 / 12;

export const getKeyWidth = (
  isAccidentalNote: boolean,
  isDesktopMode: boolean,
): number => {
  const baseWidth = getBaseWidth(isDesktopMode);
  return isAccidentalNote ? baseWidth : (baseWidth * 12) / 7;
};

export const getKeyMarginLeft = (
  note: Note,
  isDesktopMode: boolean,
): number => {
  const baseWidth = getBaseWidth(isDesktopMode);

  let marginLeft = 0;
  if (note.includes('sharp')) {
    marginLeft = -0.5 * baseWidth;
  } else {
    // We need to move some non-accidental keys to the left as the accidental keys hover on top
    const previousNote =
      NOTES[
        NOTES.findIndex((noteIteration) => noteIteration === note) - 1
      ];
    if (previousNote?.includes('sharp')) {
      marginLeft = -0.5 * baseWidth;
    }
  }

  return marginLeft;
};
