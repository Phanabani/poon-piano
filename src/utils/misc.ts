// LOCAL FILES
// Constants
import { Note, NOTES } from '../constants';
// Interfaces & Types
import { KeyImage } from 'components/app/App';
import { NoteToNoteFiles } from 'utils/import';

const audioContext = new AudioContext();

const loadSoundFromFile = (file: string): Promise<AudioBuffer> =>
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

const loadSoundsFromFiles = (
  files: string[],
): Promise<AudioBuffer[]> => {
  const promiseArr: Promise<AudioBuffer>[] = [];
  files.forEach((file) => {
    promiseArr.push(loadSoundFromFile(file));
  });

  return Promise.all(promiseArr);
};

export interface NoteToBuffers {
  [note: string]: AudioBuffer[];
}

export const loadSoundsForTheme = async (
  noteToNoteFiles: NoteToNoteFiles,
): Promise<NoteToBuffers> => {
  const promiseArr: Promise<AudioBuffer[]>[] = [];
  const notes = Object.keys(noteToNoteFiles);
  notes.forEach((note) => {
    promiseArr.push(loadSoundsFromFiles(noteToNoteFiles[note]));
  });

  const audioBufferArray = await Promise.all(promiseArr);
  return audioBufferArray.reduce<NoteToBuffers>(
    (noteToBuffers, buffer, index) => {
      noteToBuffers[notes[index]] = buffer;
      return noteToBuffers;
    },
    {},
  );
};

export const playSound = (buffer: AudioBuffer): void => {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
};

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

export const getKeyWidth = (
  isAccidentalNote: boolean,
  isDesktopMode: boolean,
): number => {
  const defaultWidth = isDesktopMode ? 99.99999 / 24 : 99.99999 / 12;

  return isAccidentalNote ? defaultWidth : (defaultWidth * 12) / 7;
};

export const getKeyMarginLeft = (
  note: Note,
  isDesktopMode: boolean,
): number => {
  const defaultWidth = isDesktopMode ? 99.99999 / 24 : 99.99999 / 12;

  let marginLeft = 0;
  if (note.includes('sharp')) {
    marginLeft = -0.5 * defaultWidth;
  } else {
    // We need to move some non-accidental keys to the left as the accidental keys hover on top
    const previousNote =
      NOTES[
        NOTES.findIndex((noteIteration) => noteIteration === note) - 1
      ];
    if (previousNote?.includes('sharp')) {
      marginLeft = -0.5 * defaultWidth;
    }
  }

  return marginLeft;
};
