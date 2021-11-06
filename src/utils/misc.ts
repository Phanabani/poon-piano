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

export const getBaseKeyWidth = (
  deviceInLandscape: boolean,
): number => {
  return deviceInLandscape ? 100 / 24 : 100 / 12;
};
