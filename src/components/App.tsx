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
import { BonusButton, Piano } from '.';
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
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
};

export const App: VoidFunctionComponent = () => {
  // LOCAL STATE
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      },
    );
  }, [theme]);

  // CONDITIONAL RENDERING
  // TODO: Loading spinner?
  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          ...styles.app,
          backgroundImage: `url(${images.background})`,
        }}
      >
        <Piano noteToSounds={noteToSounds} keyImages={images.keys} />
        <BonusButton noteToSounds={noteToSounds} />
      </div>
    </ThemeContext.Provider>
  );
};
