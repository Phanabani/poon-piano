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
  audioContext,
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

export const App: VoidFunctionComponent = () => {
  // LOCAL STATE
  const [startButtonShowing, showStartButton] = useState(true);
  const [audioDecoding, setAudioDecoding] = useState(true);
  // TODO: Allow user to select theme
  const [theme /* setTheme */] = useState('sharky');
  const [images, setImages] = useState<ThemeImages>({
    background: '',
    keys: [],
  });
  const [noteToSounds, setNoteToSounds] = useState<NoteToSounds>({});

  // EFFECTS
  useEffect(() => {
    // Access correct set of images/sounds for selected theme
    const noteToNoteFiles = processNoteModules(
      theme,
      THEME_TO_NOTE_MODULES[theme],
    );
    const imageFiles = processImageModules(
      THEME_TO_IMAGE_MODULES[theme],
    );

    // Convert imported modules (audio files) into Sounds (class)
    processFilesIntoSounds(noteToNoteFiles).then(
      (nextNoteToSounds) => {
        setImages(imageFiles);
        setNoteToSounds(nextNoteToSounds);
        setAudioDecoding(false);
      },
    );
  }, [theme]);

  // HANDLERS
  const onStartClick = () => {
    audioContext.resume();
    showStartButton(false);
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
        {!startButtonShowing && !audioDecoding && (
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
