// REACT
import React, {
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
import { BonusButton } from 'components/bonusButton/BonusButton';
import { Piano } from 'components/piano/Piano';
// Context
import { ThemeContext } from 'context';
// Styles
import 'components/app/App.css';
// Utility functions
import {
  processImageModules,
  processNoteModules,
} from 'utils/import';
import { loadSoundsForTheme, NoteToBuffers } from 'utils/misc';

export interface KeyImage {
  accidental: boolean;
  active: boolean;
  image: string;
}

export interface ThemeImages {
  background: string;
  keys: KeyImage[];
}

export const App: VoidFunctionComponent = () => {
  // LOCAL STATE
  const [loading, setLoading] = useState(true);
  // TODO: Allow user to select theme
  const [theme /* setTheme */] = useState('sharky');
  const [images, setImages] = useState<ThemeImages>({
    background: '',
    keys: [],
  });
  const [noteToBuffers, setNoteToBuffers] = useState<NoteToBuffers>(
    {},
  );

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

    // Process note files into audio buffers
    loadSoundsForTheme(noteToNoteFiles).then((nextNoteToBuffers) => {
      setImages(imageFiles);
      setNoteToBuffers(nextNoteToBuffers);
      setLoading(false);
    });
  }, [theme]);

  // TODO: Loading spinner?
  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className="app"
        style={{
          backgroundImage: `url(${images.background})`,
        }}
      >
        <Piano
          noteToBuffers={noteToBuffers}
          keyImages={images.keys}
        />
        <BonusButton noteToBuffers={noteToBuffers} />
      </div>
    </ThemeContext.Provider>
  );
};
