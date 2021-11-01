// LOCAL FILES
// Constants
import {
  THEME_TO_IMAGE_ARRAY,
  THEME_TO_NOTE_FILES,
} from './constants';

const context = new AudioContext();

const loadSoundFromFile = (file: string): Promise<AudioBuffer> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = () => {
      context.decodeAudioData(
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

export interface MidiValueToBuffers {
  [midiValue: number]: AudioBuffer[];
}

export const loadSoundsForTheme = async (
  theme: string,
): Promise<MidiValueToBuffers> => {
  const midiValueToFiles = THEME_TO_NOTE_FILES[theme];
  const promiseArr: Promise<AudioBuffer[]>[] = [];
  const midiValues = Object.keys(midiValueToFiles);
  midiValues.forEach((midiValue) => {
    promiseArr.push(
      loadSoundsFromFiles(midiValueToFiles[Number(midiValue)]),
    );
  });

  const audioBufferArray = await Promise.all(promiseArr);
  return audioBufferArray.reduce<MidiValueToBuffers>(
    (midiValueToBuffers, buffer, index) => {
      midiValueToBuffers[Number(midiValues[index])] = buffer;
      return midiValueToBuffers;
    },
    {},
  );
};

export const playSound = (buffer: AudioBuffer): void => {
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

export const getKeyImage = (
  theme: string,
  isAccidentalNote: boolean,
  isNotePlaying: boolean,
): string | undefined => {
  const image = THEME_TO_IMAGE_ARRAY[theme]?.keys.find(
    (imageObject) =>
      imageObject.accidental === isAccidentalNote &&
      imageObject.active === isNotePlaying,
  )?.image;

  // TODO: Fallback image?
  return image;
};
