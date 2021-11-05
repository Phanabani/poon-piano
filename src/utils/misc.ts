// LOCAL FILES
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
export const getBaseKeyWidth = (
  deviceInLandscape: boolean,
): number => {
  return deviceInLandscape ? 99.99999 / 24 : 99.99999 / 12;
};
