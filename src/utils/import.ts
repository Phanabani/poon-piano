// LOCAL FILES
// Interfaces & Types
import { Note, NOTES, THEME_TO_VALID_INDICES } from '../constants';
import { ThemeImages } from 'components/app/App';

/*
  All imports will be in this format.
  default is path to file e.g. /static/media/A#4_0.e3b45d53.ogg
*/
export interface Module {
  __esModule: boolean;
  default: string;
  'Symbol(Symbol.toStringTag())': 'Module';
}

export const importAll = (r: any): Module[] => r.keys().map(r);

export const processImageModules = (
  modules: Module[],
): ThemeImages => {
  const themeImages: ThemeImages = {
    background: '',
    keys: [],
  };

  modules.forEach((module) => {
    const { default: path } = module;
    if (path.includes('background')) {
      themeImages.background = path;
    } else if (path.includes('key_black_pressed')) {
      themeImages.keys.push({
        accidental: true,
        active: true,
        image: path,
      });
    } else if (path.includes('key_black')) {
      themeImages.keys.push({
        accidental: true,
        active: false,
        image: path,
      });
    } else if (path.includes('key_white_pressed')) {
      themeImages.keys.push({
        accidental: false,
        active: true,
        image: path,
      });
    } else if (path.includes('key_white')) {
      themeImages.keys.push({
        accidental: false,
        active: false,
        image: path,
      });
    }
  });

  return themeImages;
};

export interface NoteToNoteFiles {
  [note: string]: string[];
}

export const processNoteModules = (
  theme: string,
  modules: Module[],
): NoteToNoteFiles => {
  const validNoteIndices = THEME_TO_VALID_INDICES[theme];
  return modules.reduce<NoteToNoteFiles>((previousValue, module) => {
    const { default: path } = module;
    const filePathSplit = path.split('/');
    const fileName = filePathSplit[filePathSplit.length - 1];
    const fileNameSplit = fileName.split('.');
    const noteIdSplit = fileNameSplit[0].split('_');
    const note = noteIdSplit[0] as Note;
    const noteIndex = Number(noteIdSplit[1]);

    if (
      !NOTES.includes(note) ||
      !validNoteIndices[note].includes(noteIndex)
    ) {
      if (typeof previousValue.other === 'undefined') {
        previousValue.other = [];
      }

      previousValue.other.push(path);
      return previousValue;
    }

    if (typeof previousValue[note] === 'undefined') {
      previousValue[note] = [];
    }

    previousValue[note].push(path);
    return previousValue;
  }, {});
};
