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

/**
 * Not particularly accurate but worst case scenario is some desktop
 * users with smaller screens don't see key labels.
 * Piano component re-renders when window size changes so no need to
 * make this a hook as it's only used in Key component.
 */
export const isMobileDevice = (): boolean =>
  window.matchMedia('only screen and (max-width: 1280px)').matches;
