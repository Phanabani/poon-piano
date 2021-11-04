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
import { KEY_BINDING_TO_NOTE, Note } from '../constants';
// Hooks
import { useDesktopMode } from 'hooks';
// Utility functions
import {
  getKeyImage,
  getKeyMarginLeft,
  getKeyWidth,
  KeyImage,
  NoteToSounds,
} from 'utils';

const styles: { [key: string]: CSSProperties } = {
  piano: {
    width: '100%',
    maxWidth: 1400,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
};

interface PianoProps {
  noteToSounds: NoteToSounds;
  keyImages: KeyImage[];
}

export const Piano: FC<PianoProps> = ({
  noteToSounds,
  keyImages,
}) => {
  // HOOKS
  const isDesktopMode = useDesktopMode();

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
      const note = KEY_BINDING_TO_NOTE.get(event.key.toUpperCase());
      if (!event.repeat && note) {
        updateSoundIndexAndPlaySound(note as Note);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const note = KEY_BINDING_TO_NOTE.get(event.key.toUpperCase());
      if (!event.repeat && note) {
        stopSound(note as Note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [stopSound, updateSoundIndexAndPlaySound]);

  return (
    <div style={styles.piano}>
      {[...KEY_BINDING_TO_NOTE.entries()].map((entry) => {
        const key = entry[0];
        const note = entry[1] as Note;
        const isAccidentalNote = note.includes('sharp');
        const isNotePlaying = notesPlaying.includes(note);
        const width = getKeyWidth(isAccidentalNote, isDesktopMode);
        const marginLeft = getKeyMarginLeft(note, isDesktopMode);

        return (
          <Key
            key={note}
            label={key}
            isAccidental={isAccidentalNote}
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
            style={{
              width: `${width}%`,
              marginLeft: `${marginLeft}%`,
            }}
          />
        );
      })}
    </div>
  );
};
