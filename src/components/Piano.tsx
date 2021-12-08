// REACT
import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

// LOCAL FILES
// Components
import { Key } from '.';
// Constants
import {
  MAX_PIANO_WIDTH,
  Note,
  NoteToKeyBinding,
  NOTES,
} from '../constants';
// Hooks
import { useWindowSize } from 'hooks';
// Utility functions
import { getKeyImage, KeyImage, NoteToSounds } from 'utils';

const styles: { [key: string]: CSSProperties } = {
  piano: {
    width: '100%',
    maxWidth: MAX_PIANO_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

interface PianoProps {
  noteToSounds: NoteToSounds;
  keyImages: KeyImage[];
  noteToKeyBinding: NoteToKeyBinding;
}

export const Piano: FC<PianoProps> = ({
  noteToSounds,
  keyImages,
  noteToKeyBinding,
}) => {
  // HOOKS
  const { width, height } = useWindowSize();

  // LOCAL STATE
  const [notesPlaying, setNotesPlaying] = useReducer(
    (
      currentNotesPlaying: Note[],
      action: {
        operation: 'start' | 'end';
        note: Note;
      },
    ) => {
      const { operation, note } = action;

      switch (operation) {
        case 'start':
          return [...new Set([...currentNotesPlaying, note])];
        case 'end':
          return currentNotesPlaying.filter(
            (notePlaying) => notePlaying !== note,
          );
        default:
          return currentNotesPlaying;
      }
    },
    [],
  );

  // DERIVED VARIABLES
  const deviceInLandscape = width > height;
  const notesToRender = deviceInLandscape
    ? NOTES
    : [...NOTES.slice(12), ...NOTES.slice(0, 12)];

  // HANDLERS
  const updateSoundIndexAndPlaySound = useCallback(
    (note: Note) => {
      setNotesPlaying({
        operation: 'start',
        note,
      });

      noteToSounds[note].play();
    },
    [noteToSounds],
  );

  const stopSound = useCallback(
    (note: Note) => {
      setNotesPlaying({
        operation: 'end',
        note,
      });

      noteToSounds[note].stop();
    },
    [noteToSounds],
  );

  // EFFECTS
  // Listen for key events in window
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const playedNote = (
        Object.keys(noteToKeyBinding) as Note[]
      ).find((note) => noteToKeyBinding[note] === key);

      if (!event.repeat && playedNote) {
        updateSoundIndexAndPlaySound(playedNote);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      const playedNote = (
        Object.keys(noteToKeyBinding) as Note[]
      ).find((note) => noteToKeyBinding[note] === key);

      if (!event.repeat && playedNote) {
        stopSound(playedNote);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [noteToKeyBinding, stopSound, updateSoundIndexAndPlaySound]);

  return (
    <div
      style={{
        ...styles.piano,
        flexWrap: deviceInLandscape ? 'nowrap' : 'wrap',
      }}
    >
      {notesToRender.map((note) => {
        const key = noteToKeyBinding[note];
        const isAccidentalNote = note.includes('s');
        const isNotePlaying = notesPlaying.includes(note);

        return (
          <Key
            key={note}
            label={key}
            note={note}
            isAccidental={note.includes('s')}
            eventHandlers={{
              onMouseDown: () => {
                updateSoundIndexAndPlaySound(note);
              },
              onMouseUp: () => {
                stopSound(note);
              },
              onTouchStart: () => {
                updateSoundIndexAndPlaySound(note);
              },
              onMouseOut: () => {
                stopSound(note);
              },
              onTouchEnd: () => {
                stopSound(note);
              },
            }}
            image={getKeyImage(
              keyImages,
              isAccidentalNote,
              isNotePlaying,
            )}
          />
        );
      })}
    </div>
  );
};
