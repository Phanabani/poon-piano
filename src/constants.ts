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
  A mapping of which note samples are acceptable for use on piano keys.
  Any that aren't going to be tied to a piano key are added to 'other'
  which are played back using BonusButton.
*/
export const THEME_TO_VALID_INDICES: Record<
  string,
  Record<Note, number[]>
> = {
  sharky: {
    C4: [0],
    Csharp4: [0],
    D4: [3],
    Dsharp4: [0, 1, 2],
    E4: [1, 7, 8],
    F4: [4, 5],
    Fsharp4: [1, 2, 3, 4, 11, 13],
    G4: [1],
    Gsharp4: [5, 7],
    A4: [2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 19],
    Asharp4: [1],
    B4: [2, 4, 5, 9],
    C5: [1],
    Csharp5: [0, 2, 3],
    D5: [0, 1, 3],
    Dsharp5: [0, 2, 5],
    E5: [2],
    F5: [2],
    Fsharp5: [2],
    G5: [2],
    Gsharp5: [2],
    A5: [2],
    Asharp5: [2],
    B5: [2],
  },
};

// Using a map to preserve order of notes
export const KEY_BINDING_TO_NOTE = new Map([
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
