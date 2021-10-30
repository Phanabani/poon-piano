// LOCAL FILES
// Images
import sharkyBackgroundImage from 'assets/sharky/images/background.jpg';
import sharkyNaturalImage from 'assets/sharky/images/key_white.svg';
import sharkyAccidentalImage from 'assets/sharky/images/key_black.svg';
import sharkyNaturalPressedImage from 'assets/sharky/images/key_white_pressed.svg';
import sharkyAccidentalPressedImage from 'assets/sharky/images/key_black_pressed.svg';

export const MIDI_VALUE_TO_KEY_BINDING: {
  [index: number]: string;
} = {
  60: 'Z', // C4
  61: 'S', // C#4
  62: 'X', // D4
  63: 'D', // D#4
  64: 'C', // E4
  65: 'V', // F4
  66: 'G', // F#4
  67: 'B', // G4
  68: 'H', // G#4
  69: 'N', // A4
  70: 'J', // A#4
  71: 'M', // B4
  72: 'Q', // C5
  73: '2', // C#5
  74: 'W', // D5
  75: '3', // D#5
  76: 'E', // E5
  77: 'R', // F5
  78: '5', // F#5
  79: 'T', // G5
  80: '6', // G#5
  81: 'Y', // A5
  82: '7', // A#5
  83: 'U', // B5
};

export const KEY_POSITION_TO_NOTE: {
  [keyPosition: number]: string;
} = {
  0: 'C',
  1: 'C#',
  2: 'D',
  3: 'D#',
  4: 'E',
  5: 'F',
  6: 'F#',
  7: 'G',
  8: 'G#',
  9: 'A',
  10: 'A#',
  11: 'B',
};

export const THEME_TO_IMAGE_ARRAY: {
  [theme: string]: {
    background: string;
    keys: {
      accidental: boolean;
      active: boolean;
      image: string;
    }[];
  };
} = {
  sharky: {
    background: sharkyBackgroundImage,
    keys: [
      {
        accidental: false,
        active: false,
        image: sharkyNaturalImage,
      },
      {
        accidental: false,
        active: true,
        image: sharkyNaturalPressedImage,
      },
      {
        accidental: true,
        active: false,
        image: sharkyAccidentalImage,
      },
      {
        accidental: true,
        active: true,
        image: sharkyAccidentalPressedImage,
      },
    ],
  },
};
