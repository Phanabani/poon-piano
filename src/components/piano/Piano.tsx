// REACT
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  VoidFunctionComponent,
} from 'react';

// LOCAL FILES
// Components
import { KeyAccidental, KeyNatural } from 'components/key';
// Constants
import {
  KEY_BINDING_TO_MIDI_VALUE,
  KEY_POSITION_TO_NOTE,
} from '../../constants';
// Context
import { ThemeContext } from 'context';
// Styles
import 'components/piano/Piano.css';
// Utility functions
import {
  loadSoundsForTheme,
  MidiValueToBuffer,
  playSound,
} from 'utils';

const audioContext = new AudioContext();

export const Piano: VoidFunctionComponent = () => {
  // HOOKS
  const { theme } = useContext(ThemeContext);

  // LOCAL STATE
  const [notesPlaying, setNotesPlaying] = useReducer(
    (
      currentNotesPlaying: number[],
      action: {
        operation: 'start' | 'end';
        midiValue: number;
      },
    ) => {
      const { operation, midiValue } = action;

      switch (operation) {
        case 'start':
          return [...new Set([...currentNotesPlaying, midiValue])];
        case 'end':
          return currentNotesPlaying.filter(
            (note) => note !== midiValue,
          );
        default:
          return currentNotesPlaying;
      }
    },
    [],
  );
  const [loadingSounds, setLoadingSounds] = useState(true);
  const [midiValueToBuffer, setMidiValueToBuffer] =
    useState<MidiValueToBuffer>({});

  // HANDLERS
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const midiValue = KEY_BINDING_TO_MIDI_VALUE.get(
        event.key.toUpperCase(),
      );
      if (!event.repeat && midiValue) {
        setNotesPlaying({
          operation: 'start',
          midiValue,
        });
        playSound(audioContext, midiValueToBuffer[midiValue]);
      }
    },
    [midiValueToBuffer],
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const midiValue = KEY_BINDING_TO_MIDI_VALUE.get(
      event.key.toUpperCase(),
    );
    if (!event.repeat && midiValue) {
      setNotesPlaying({
        operation: 'end',
        midiValue,
      });
    }
  }, []);

  const onNotePlayStart = (midiValue: number) => {
    setNotesPlaying({
      operation: 'start',
      midiValue,
    });
    playSound(audioContext, midiValueToBuffer[midiValue]);
  };

  const onNotePlayEnd = (midiValue: number) => {
    setNotesPlaying({
      operation: 'end',
      midiValue,
    });
  };

  // EFFECTS
  // Listen for key events in window
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    loadSoundsForTheme(theme, audioContext).then(
      (nextMidiValueToBuffer) => {
        setMidiValueToBuffer(nextMidiValueToBuffer);
        setLoadingSounds(false);
      },
    );
  }, [theme]);

  if (loadingSounds) {
    return null;
  }

  return (
    <div className="piano">
      {[...KEY_BINDING_TO_MIDI_VALUE.entries()].map((entry) => {
        const [key, midiValue] = entry;
        const keyPosition = midiValue % 12;
        const isAccidentalNote =
          KEY_POSITION_TO_NOTE[keyPosition].includes('#');

        const KeyComponent = isAccidentalNote
          ? KeyAccidental
          : KeyNatural;
        return (
          <KeyComponent
            key={midiValue}
            label={key}
            position={keyPosition}
            isPlaying={notesPlaying.includes(midiValue)}
            eventHandlers={{
              onMouseDown: () => {
                onNotePlayStart(midiValue);
              },
              onMouseUp: () => {
                onNotePlayEnd(midiValue);
              },
              onTouchStart: () => {
                onNotePlayStart(midiValue);
              },
              onMouseOut: () => {
                onNotePlayEnd(midiValue);
              },
              onTouchEnd: () => {
                onNotePlayEnd(midiValue);
              },
            }}
          />
        );
      })}
    </div>
  );
};
