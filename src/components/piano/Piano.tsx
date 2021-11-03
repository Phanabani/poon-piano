// REACT
import React, {
  FC,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

// LOCAL FILES
// Components
import { Key } from 'components/key/Key';
// Constants
import { KEY_BINDING_TO_NOTE, Note } from '../../constants';
// Interfaces & Types
import { KeyImage } from 'components/app/App';
// Hooks
import { useDesktopMode } from 'hooks';
// Styles
import 'components/piano/Piano.css';
// Utility functions
import {
  getKeyImage,
  getKeyMarginLeft,
  getKeyWidth,
  NoteToBuffers,
  playSound,
} from 'utils/misc';

interface NoteToBufferIndex {
  [note: string]: number;
}

interface PianoProps {
  noteToBuffers: NoteToBuffers;
  keyImages: KeyImage[];
}

export const Piano: FC<PianoProps> = ({
  noteToBuffers,
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
  const [noteToBufferIndex, setNoteToBufferIndex] =
    useState<NoteToBufferIndex>({});

  // HANDLERS
  const updateBufferIndexAndPlaySound = useCallback(
    (note: Note) => {
      setNotesPlaying({
        operation: 'start',
        note,
      });

      // Update the sample to be played the next time key/mouse/touch happens
      const currentSelectedBuffer = noteToBufferIndex[note];
      const nextNoteToBufferIndex = {
        ...noteToBufferIndex,
      };
      nextNoteToBufferIndex[note] += 1;
      if (
        nextNoteToBufferIndex[note] >
        noteToBuffers[note].length - 1
      ) {
        nextNoteToBufferIndex[note] = 0;
      }

      playSound(noteToBuffers[note][currentSelectedBuffer]);
      setNoteToBufferIndex(nextNoteToBufferIndex);
    },
    [noteToBufferIndex, noteToBuffers],
  );

  const onNotePlayEnd = (note: Note) => {
    setNotesPlaying({
      operation: 'end',
      note,
    });
  };

  // EFFECTS
  // Listen for key events in window
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const note = KEY_BINDING_TO_NOTE.get(event.key.toUpperCase());
      if (!event.repeat && note) {
        updateBufferIndexAndPlaySound(note as Note);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const note = KEY_BINDING_TO_NOTE.get(event.key.toUpperCase());
      if (!event.repeat && note) {
        setNotesPlaying({
          operation: 'end',
          note: note as Note,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [updateBufferIndexAndPlaySound]);

  // Defaults buffer index to 0 for all notes
  useEffect(() => {
    const defaultNoteToBufferIndex = Object.keys(
      noteToBuffers,
    ).reduce<NoteToBufferIndex>((nextNoteToBufferIndex, note) => {
      nextNoteToBufferIndex[note] = 0;
      return nextNoteToBufferIndex;
    }, {});
    setNoteToBufferIndex(defaultNoteToBufferIndex);
  }, [noteToBuffers]);

  return (
    <div className="piano">
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
                updateBufferIndexAndPlaySound(note);
              },
              onMouseUp: () => {
                onNotePlayEnd(note);
              },
              onTouchStart: () => {
                updateBufferIndexAndPlaySound(note);
              },
              onMouseOut: () => {
                onNotePlayEnd(note);
              },
              onTouchEnd: () => {
                onNotePlayEnd(note);
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
