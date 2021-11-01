// LOCAL FILES
// Constants
import {
  THEME_TO_IMAGE_ARRAY,
  THEME_TO_NOTE_FILES,
} from './constants';

export const loadSoundFromFile = (
  file: string,
  context: AudioContext,
): Promise<AudioBuffer> =>
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

export interface MidiValueToBuffer {
  [midiValue: number]: AudioBuffer;
}

export const loadSoundsForTheme = async (
  theme: string,
  context: AudioContext,
): Promise<MidiValueToBuffer> => {
  const midiValueToUrl = THEME_TO_NOTE_FILES[theme];
  const promiseArr: Promise<AudioBuffer>[] = [];
  const midiValues = Object.keys(midiValueToUrl);
  midiValues.forEach((midiValue) => {
    promiseArr.push(
      loadSoundFromFile(midiValueToUrl[Number(midiValue)], context),
    );
  });

  const audioBufferArray = await Promise.all(promiseArr);
  return audioBufferArray.reduce<MidiValueToBuffer>(
    (midiValueToBuffer, buffer, index) => {
      midiValueToBuffer[Number(midiValues[index])] = buffer;
      return midiValueToBuffer;
    },
    {},
  );
};

export const playSound = (
  context: AudioContext,
  buffer: AudioBuffer,
): void => {
  const gainNode = context.createGain();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNode);
  gainNode.connect(context.destination);
  gainNode.gain.setValueAtTime(0.8, context.currentTime);
  source.start(context.currentTime);
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
