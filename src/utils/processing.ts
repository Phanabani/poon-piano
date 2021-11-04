// LOCAL FILES
// Classes
import { Sound } from 'classes';
// Interfaces & Types
import { Note, NOTES, THEME_TO_VALID_INDICES } from '../constants';
import { Module } from 'utils';

export interface KeyImage {
  accidental: boolean;
  active: boolean;
  image: string;
}

export interface ThemeImages {
  background: string;
  keys: KeyImage[];
}

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

const audioContext = new AudioContext();

const getBufferFromFile = (file: string): Promise<AudioBuffer> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = () => {
      audioContext.decodeAudioData(
        xhr.response,
        (buffer) => {
          resolve(buffer);
        },
        (error) => {
          reject(error);
        },
      );
    };
    xhr.onerror = () => {
      reject(new Error('Failed to load sound'));
    };
    xhr.send();
  });

const getBuffersFromFiles = (
  files: string[],
): Promise<AudioBuffer[]> => {
  const promiseArr: Promise<AudioBuffer>[] = [];
  files.forEach((file) => {
    promiseArr.push(getBufferFromFile(file));
  });

  return Promise.all(promiseArr);
};

export interface NoteToSounds {
  [note: string]: Sound[];
}

export const processFilesIntoSounds = async (
  noteToNoteFiles: NoteToNoteFiles,
): Promise<NoteToSounds> => {
  const promiseArr: Promise<AudioBuffer[]>[] = [];
  const notes = Object.keys(noteToNoteFiles);
  notes.forEach((note) => {
    promiseArr.push(getBuffersFromFiles(noteToNoteFiles[note]));
  });

  const audioBufferArray = await Promise.all(promiseArr);
  return audioBufferArray.reduce<NoteToSounds>(
    (noteToSounds, buffers, index) => {
      noteToSounds[notes[index]] = buffers.map(
        (buffer) => new Sound(audioContext, buffer),
      );
      return noteToSounds;
    },
    {},
  );
};
