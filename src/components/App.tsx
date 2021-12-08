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
import { BonusButton, KeyBindingModal, Piano, StartButton } from '.';
// Constants
import {
  MAX_PIANO_WIDTH,
  Note,
  NOTE_TO_KEY_BINDING_PRESET_1,
  NoteToKeyBinding,
} from '../constants';
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
  buttonContainer: {
    width: '100%',
    maxWidth: MAX_PIANO_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '16px',
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
  const [noteToKeyBinding, setNoteToKeyBinding] =
    useState<NoteToKeyBinding>(NOTE_TO_KEY_BINDING_PRESET_1);

  // EFFECTS
  useEffect(() => {
    // Access correct set of images for selected theme
    const imageFiles = processImageModules(
      THEME_TO_IMAGE_MODULES[theme],
    );
    setImages(imageFiles);
  }, [theme]);

  useEffect(() => {
    // Restore user's saved key bindings
    const savedKeyBindings = localStorage.getItem('keyBindings');
    if (savedKeyBindings) {
      setNoteToKeyBinding(JSON.parse(savedKeyBindings));
    }
  }, []);

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

  const onKeyBindingChange = (note: Note, key: string) => {
    const nextNoteToKeyBinding = {
      ...noteToKeyBinding,
      [note]: key,
    };

    setNoteToKeyBinding(nextNoteToKeyBinding);

    // Update saved key bindings
    localStorage.setItem(
      'keyBindings',
      JSON.stringify(nextNoteToKeyBinding),
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
                noteToKeyBinding={noteToKeyBinding}
              />
              <div style={styles.buttonContainer}>
                <BonusButton noteToSounds={noteToSounds} />
                <KeyBindingModal
                  noteToKeyBinding={noteToKeyBinding}
                  onChange={onKeyBindingChange}
                />
              </div>
            </>
          )}
      </div>
    </ThemeContext.Provider>
  );
};
