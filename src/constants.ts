export const NOTES = [
  'C4',
  'Csharp4',
  'D4',
  'Dsharp4',
  'E4',
  'F4',
  'Fsharp4',
  'G4',
  'Gsharp4',
  'A4',
  'Asharp4',
  'B4',
  'C5',
  'Csharp5',
  'D5',
  'Dsharp5',
  'E5',
  'F5',
  'Fsharp5',
  'G5',
  'Gsharp5',
  'A5',
  'Asharp5',
  'B5',
] as const;

export type Note = typeof NOTES[number];

/*
  Using a map to preserve order of notes.
  This makes it simple to loop through and render them in order.
*/
export const KEY_BINDING_TO_NOTE = new Map<string, Note>([
  ['Z', 'C4'],
  ['S', 'Csharp4'],
  ['X', 'D4'],
  ['D', 'Dsharp4'],
  ['C', 'E4'],
  ['V', 'F4'],
  ['G', 'Fsharp4'],
  ['B', 'G4'],
  ['H', 'Gsharp4'],
  ['N', 'A4'],
  ['J', 'Asharp4'],
  ['M', 'B4'],
  ['Q', 'C5'],
  ['2', 'Csharp5'],
  ['W', 'D5'],
  ['3', 'Dsharp5'],
  ['E', 'E5'],
  ['R', 'F5'],
  ['5', 'Fsharp5'],
  ['T', 'G5'],
  ['6', 'Gsharp5'],
  ['Y', 'A5'],
  ['7', 'Asharp5'],
  ['U', 'B5'],
]);
