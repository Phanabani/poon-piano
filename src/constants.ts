// LOCAL FILES
// Images
import sharkyBackgroundImage from 'assets/sharky/images/background.jpg';
import sharkyNaturalImage from 'assets/sharky/images/key_white.svg';
import sharkyAccidentalImage from 'assets/sharky/images/key_black.svg';
import sharkyNaturalPressedImage from 'assets/sharky/images/key_white_pressed.svg';
import sharkyAccidentalPressedImage from 'assets/sharky/images/key_black_pressed.svg';
// Sounds
import sharky60Sound from 'assets/sharky/sounds/60.mp3';
import sharky61Sound from 'assets/sharky/sounds/61.mp3';
import sharky62Sound from 'assets/sharky/sounds/62.mp3';
import sharky63Sound from 'assets/sharky/sounds/63.mp3';
import sharky64Sound from 'assets/sharky/sounds/64.mp3';
import sharky65Sound from 'assets/sharky/sounds/65.mp3';
import sharky66Sound from 'assets/sharky/sounds/66.mp3';
import sharky67Sound from 'assets/sharky/sounds/67.mp3';
import sharky68Sound from 'assets/sharky/sounds/68.mp3';
import sharky69Sound from 'assets/sharky/sounds/69.mp3';
import sharky70Sound from 'assets/sharky/sounds/70.mp3';
import sharky71Sound from 'assets/sharky/sounds/71.mp3';
import sharky72Sound from 'assets/sharky/sounds/72.mp3';
import sharky73Sound from 'assets/sharky/sounds/73.mp3';
import sharky74Sound from 'assets/sharky/sounds/74.mp3';
import sharky75Sound from 'assets/sharky/sounds/75.mp3';
import sharky76Sound from 'assets/sharky/sounds/76.mp3';
import sharky77Sound from 'assets/sharky/sounds/77.mp3';
import sharky78Sound from 'assets/sharky/sounds/78.mp3';
import sharky79Sound from 'assets/sharky/sounds/79.mp3';
import sharky80Sound from 'assets/sharky/sounds/80.mp3';
import sharky81Sound from 'assets/sharky/sounds/81.mp3';
import sharky82Sound from 'assets/sharky/sounds/82.mp3';
import sharky83Sound from 'assets/sharky/sounds/83.mp3';

export const KEY_BINDING_TO_MIDI_VALUE = new Map([
  ['Z', 60], // C4
  ['S', 61], // C#4
  ['X', 62], // D4
  ['D', 63], // D#4
  ['C', 64], // E4
  ['V', 65], // F4
  ['G', 66], // F#4
  ['B', 67], // G4
  ['H', 68], // G#4
  ['N', 69], // A4
  ['J', 70], // A#4
  ['M', 71], // B4
  ['Q', 72], // C5
  ['2', 73], // C#5
  ['W', 74], // D5
  ['3', 75], // D#5
  ['E', 76], // E5
  ['R', 77], // F5
  ['5', 78], // F#5
  ['T', 79], // G5
  ['6', 80], // G#5
  ['Y', 81], // A5
  ['7', 82], // A#5
  ['U', 83], // B5
]);

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

export interface MidiValueToURL {
  [midiValue: number]: string;
}

export const THEME_TO_NOTE_FILES: {
  [theme: string]: MidiValueToURL;
} = {
  sharky: {
    60: sharky60Sound,
    61: sharky61Sound,
    62: sharky62Sound,
    63: sharky63Sound,
    64: sharky64Sound,
    65: sharky65Sound,
    66: sharky66Sound,
    67: sharky67Sound,
    68: sharky68Sound,
    69: sharky69Sound,
    70: sharky70Sound,
    71: sharky71Sound,
    72: sharky72Sound,
    73: sharky73Sound,
    74: sharky74Sound,
    75: sharky75Sound,
    76: sharky76Sound,
    77: sharky77Sound,
    78: sharky78Sound,
    79: sharky79Sound,
    80: sharky80Sound,
    81: sharky81Sound,
    82: sharky82Sound,
    83: sharky83Sound,
  },
};
