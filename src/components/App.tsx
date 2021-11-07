// REACT
import React, {
  CSSProperties,
  useEffect,
  useState,
  VoidFunctionComponent,
} from 'react';

// LOCAL FILES
// Assets
import {
  THEME_TO_IMAGE_MODULES,
  THEME_TO_NOTE_MODULES,
} from 'assets';
// Components
import { BonusButton, Piano, StartButton } from '.';
// Context
import { ThemeContext } from 'context';
// Utility functions
import {
  NoteToSounds,
  processFilesIntoSounds,
  processImageModules,
  processNoteModules,
  ThemeImages,
} from 'utils';

const styles: { [key: string]: CSSProperties } = {
  app: {
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
};

let audioContext: AudioContext;

export const App: VoidFunctionComponent = () => {
  // LOCAL STATE
  const [startButtonShowing, showStartButton] = useState(true);
  // TODO: Allow user to select theme
  const [theme /* setTheme */] = useState('sharky');
  const [images, setImages] = useState<ThemeImages>({
    background: '',
    keys: [],
  });
  const [noteToSounds, setNoteToSounds] = useState<NoteToSounds>({});

  // EFFECTS
  useEffect(() => {
    // Access correct set of images for selected theme
    const imageFiles = processImageModules(
      THEME_TO_IMAGE_MODULES[theme],
    );
    setImages(imageFiles);
  }, [theme]);

  // HANDLERS
  const onStartClick = () => {
    /*
      Creating the audio context as a result of click.
      This gets around issue of needing a user action before playing sounds.
      Needs further investigation since it still isn't working
      on some devices (e.g. an iPhone 6+ I have on all browsers).
    */
    audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    audioContext.resume();
    showStartButton(false);

    // Access correct set of sounds for selected theme
    const noteToNoteFiles = processNoteModules(
      THEME_TO_NOTE_MODULES[theme],
    );

    // Convert imported modules (audio files) into Sounds (class)
    processFilesIntoSounds(audioContext, noteToNoteFiles).then(
      (nextNoteToSounds) => {
        setNoteToSounds(nextNoteToSounds);
      },
    );
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          ...styles.app,
          backgroundImage: `url(${images.background})`,
          justifyContent: startButtonShowing
            ? 'center'
            : 'flex-start',
        }}
      >
        {startButtonShowing && <StartButton onClick={onStartClick} />}
        {!startButtonShowing &&
          Object.keys(noteToSounds).length !== 0 && (
            <>
              <Piano
                noteToSounds={noteToSounds}
                keyImages={images.keys}
              />
              <BonusButton noteToSounds={noteToSounds} />
            </>
          )}
      </div>
    </ThemeContext.Provider>
  );
};
