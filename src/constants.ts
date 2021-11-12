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

/*
  Using a map to preserve order of notes.
  This makes it simple to loop through and render them in order.
*/
export const KEY_BINDING_TO_NOTE = new Map<string, Note>([
  ['Z', 'C4'],
  ['S', 'Cs4'],
  ['X', 'D4'],
  ['D', 'Ds4'],
  ['C', 'E4'],
  ['V', 'F4'],
  ['G', 'Fs4'],
  ['B', 'G4'],
  ['H', 'Gs4'],
  ['N', 'A4'],
  ['J', 'As4'],
  ['M', 'B4'],
  ['Q', 'C5'],
  ['2', 'Cs5'],
  ['W', 'D5'],
  ['3', 'Ds5'],
  ['E', 'E5'],
  ['R', 'F5'],
  ['5', 'Fs5'],
  ['T', 'G5'],
  ['6', 'Gs5'],
  ['Y', 'A5'],
  ['7', 'As5'],
  ['U', 'B5'],
]);

export const MAX_PIANO_WIDTH = 1280;
