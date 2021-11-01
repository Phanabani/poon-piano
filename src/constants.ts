// LOCAL FILES
// Images
import sharkyBackgroundImage from 'assets/sharky/images/background.jpg';
import sharkyNaturalImage from 'assets/sharky/images/key_white.svg';
import sharkyAccidentalImage from 'assets/sharky/images/key_black.svg';
import sharkyNaturalPressedImage from 'assets/sharky/images/key_white_pressed.svg';
import sharkyAccidentalPressedImage from 'assets/sharky/images/key_black_pressed.svg';
// Sounds
import sharky0Sound1 from 'assets/sharky/sounds/Fall_0.ogg';
import sharky0Sound2 from 'assets/sharky/sounds/Fall_1.ogg';
import sharky0Sound3 from 'assets/sharky/sounds/Fall_2.ogg';
import sharky0Sound4 from 'assets/sharky/sounds/Fall_3.ogg';
import sharky0Sound5 from 'assets/sharky/sounds/Fall_4.ogg';
import sharky0Sound7 from 'assets/sharky/sounds/Fall_6.ogg';
import sharky0Sound8 from 'assets/sharky/sounds/Fall_7.ogg';
import sharky0Sound9 from 'assets/sharky/sounds/Fall_8.ogg';
import sharky0Sound10 from 'assets/sharky/sounds/Fall_9.ogg';
import sharky60Sound1 from 'assets/sharky/sounds/60_0.ogg';
import sharky61Sound1 from 'assets/sharky/sounds/61_0.ogg';
import sharky62Sound4 from 'assets/sharky/sounds/62_3.ogg';
import sharky63Sound1 from 'assets/sharky/sounds/63_0.ogg';
import sharky63Sound2 from 'assets/sharky/sounds/63_1.ogg';
import sharky63Sound3 from 'assets/sharky/sounds/63_2.ogg';
import sharky64Sound2 from 'assets/sharky/sounds/64_1.ogg';
import sharky64Sound8 from 'assets/sharky/sounds/64_7.ogg';
import sharky64Sound9 from 'assets/sharky/sounds/64_8.ogg';
import sharky65Sound5 from 'assets/sharky/sounds/65_4.ogg';
import sharky65Sound6 from 'assets/sharky/sounds/65_5.ogg';
import sharky66Sound2 from 'assets/sharky/sounds/66_1.ogg';
import sharky66Sound3 from 'assets/sharky/sounds/66_2.ogg';
import sharky66Sound4 from 'assets/sharky/sounds/66_3.ogg';
import sharky66Sound5 from 'assets/sharky/sounds/66_4.ogg';
import sharky66Sound12 from 'assets/sharky/sounds/66_11.ogg';
import sharky66Sound14 from 'assets/sharky/sounds/66_13.ogg';
import sharky67Sound2 from 'assets/sharky/sounds/67_1.ogg';
import sharky68Sound6 from 'assets/sharky/sounds/68_5.ogg';
import sharky68Sound8 from 'assets/sharky/sounds/68_7.ogg';
import sharky69Sound3 from 'assets/sharky/sounds/69_2.ogg';
import sharky69Sound5 from 'assets/sharky/sounds/69_4.ogg';
import sharky69Sound7 from 'assets/sharky/sounds/69_6.ogg';
import sharky69Sound8 from 'assets/sharky/sounds/69_7.ogg';
import sharky69Sound9 from 'assets/sharky/sounds/69_8.ogg';
import sharky69Sound10 from 'assets/sharky/sounds/69_9.ogg';
import sharky69Sound11 from 'assets/sharky/sounds/69_10.ogg';
import sharky69Sound12 from 'assets/sharky/sounds/69_11.ogg';
import sharky69Sound13 from 'assets/sharky/sounds/69_12.ogg';
import sharky69Sound14 from 'assets/sharky/sounds/69_13.ogg';
import sharky69Sound15 from 'assets/sharky/sounds/69_14.ogg';
import sharky69Sound17 from 'assets/sharky/sounds/69_16.ogg';
import sharky69Sound19 from 'assets/sharky/sounds/69_18.ogg';
import sharky69Sound20 from 'assets/sharky/sounds/69_19.ogg';
import sharky70Sound2 from 'assets/sharky/sounds/70_1.ogg';
// import sharky71Sound1 from 'assets/sharky/sounds/Fall_0.ogg'; // TODO: Add 71
import sharky72Sound2 from 'assets/sharky/sounds/72_1.ogg';
import sharky73Sound1 from 'assets/sharky/sounds/73_0.ogg';
import sharky73Sound3 from 'assets/sharky/sounds/73_2.ogg';
import sharky73Sound4 from 'assets/sharky/sounds/73_3.ogg';
import sharky74Sound1 from 'assets/sharky/sounds/74_0.ogg';
import sharky74Sound2 from 'assets/sharky/sounds/74_1.ogg';
import sharky74Sound4 from 'assets/sharky/sounds/74_3.ogg';
import sharky75Sound1 from 'assets/sharky/sounds/75_0.ogg';
import sharky75Sound3 from 'assets/sharky/sounds/75_2.ogg';
import sharky75Sound6 from 'assets/sharky/sounds/75_5.ogg';
import sharky76Sound3 from 'assets/sharky/sounds/76_2.ogg';
import sharky77Sound3 from 'assets/sharky/sounds/77_2.ogg';
// import sharky78Sound1 from 'assets/sharky/sounds/Fall_1.ogg'; // TODO: Add 78
// import sharky79Sound1 from 'assets/sharky/sounds/Fall_2.ogg'; // TODO: Add 79
// import sharky80Sound1 from 'assets/sharky/sounds/Fall_3.ogg'; // TODO: Add 80
// import sharky81Sound1 from 'assets/sharky/sounds/Fall_4.ogg'; // TODO: Add 81
// import sharky82Sound1 from 'assets/sharky/sounds/Fall_6.ogg'; // TODO: Add 82
// import sharky83Sound1 from 'assets/sharky/sounds/Fall_7.ogg'; // TODO: Add 83

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

export interface MidiValueToFiles {
  [midiValue: number]: string[];
}

export const THEME_TO_NOTE_FILES: {
  [theme: string]: MidiValueToFiles;
} = {
  sharky: {
    0: [
      sharky0Sound1,
      sharky0Sound2,
      sharky0Sound3,
      sharky0Sound4,
      sharky0Sound5,
      sharky0Sound7,
      sharky0Sound8,
      sharky0Sound9,
      sharky0Sound10,
    ],
    60: [sharky60Sound1],
    61: [sharky61Sound1],
    62: [sharky62Sound4],
    63: [sharky63Sound1, sharky63Sound2, sharky63Sound3],
    64: [sharky64Sound2, sharky64Sound8, sharky64Sound9],
    65: [sharky65Sound5, sharky65Sound6],
    66: [
      sharky66Sound2,
      sharky66Sound3,
      sharky66Sound4,
      sharky66Sound5,
      sharky66Sound12,
      sharky66Sound14,
    ],
    67: [sharky67Sound2],
    68: [sharky68Sound6, sharky68Sound8],
    69: [
      sharky69Sound3,
      sharky69Sound5,
      sharky69Sound7,
      sharky69Sound8,
      sharky69Sound9,
      sharky69Sound10,
      sharky69Sound11,
      sharky69Sound12,
      sharky69Sound13,
      sharky69Sound14,
      sharky69Sound15,
      sharky69Sound17,
      sharky69Sound19,
      sharky69Sound20,
    ],
    70: [sharky70Sound2],
    71: [sharky60Sound1],
    72: [sharky72Sound2],
    73: [sharky73Sound1, sharky73Sound3, sharky73Sound4],
    74: [sharky74Sound1, sharky74Sound2, sharky74Sound4],
    75: [sharky75Sound1, sharky75Sound3, sharky75Sound6],
    76: [sharky76Sound3],
    77: [sharky77Sound3],
    78: [sharky60Sound1],
    79: [sharky60Sound1],
    80: [sharky60Sound1],
    81: [sharky60Sound1],
    82: [sharky60Sound1],
    83: [sharky60Sound1],
  },
};
