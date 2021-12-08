export const NOTES = [
  'C4',
  'Cs4',
  'D4',
  'Ds4',
  'E4',
  'F4',
  'Fs4',
  'G4',
  'Gs4',
  'A4',
  'As4',
  'B4',
  'C5',
  'Cs5',
  'D5',
  'Ds5',
  'E5',
  'F5',
  'Fs5',
  'G5',
  'Gs5',
  'A5',
  'As5',
  'B5',
] as const;

export type Note = typeof NOTES[number];

export type NoteToKeyBinding = {
  [K in Note]: string;
};

// For QWERTY layout
export const NOTE_TO_KEY_BINDING_PRESET_1: NoteToKeyBinding = {
  C4: 'z',
  Cs4: 's',
  D4: 'x',
  Ds4: 'd',
  E4: 'c',
  F4: 'v',
  Fs4: 'g',
  G4: 'b',
  Gs4: 'h',
  A4: 'n',
  As4: 'j',
  B4: 'm',
  C5: 'q',
  Cs5: '2',
  D5: 'w',
  Ds5: '3',
  E5: 'e',
  F5: 'r',
  Fs5: '5',
  G5: 't',
  Gs5: '6',
  A5: 'y',
  As5: '7',
  B5: 'u',
};

export const NOTE_DISPLAY_NAMES: { [K in Note]: string } = {
  C4: 'C4',
  Cs4: 'C#4',
  D4: 'D4',
  Ds4: 'D#4',
  E4: 'E4',
  F4: 'F4',
  Fs4: 'F#4',
  G4: 'G4',
  Gs4: 'G#4',
  A4: 'A4',
  As4: 'A#4',
  B4: 'B4',
  C5: 'C5',
  Cs5: 'C#5',
  D5: 'D5',
  Ds5: 'D#5',
  E5: 'E5',
  F5: 'F5',
  Fs5: 'F#5',
  G5: 'G5',
  Gs5: 'G#5',
  A5: 'A5',
  As5: 'A#5',
  B5: 'B5',
};

export const MAX_PIANO_WIDTH = 1280;

export const VOLUME_FADE_TIME = 0.05;
