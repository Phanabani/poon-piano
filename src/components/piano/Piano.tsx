// REACT
import React, {
  useCallback,
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
// Hooks
import { useMidiValueToBuffers } from 'hooks';
// Styles
import 'components/piano/Piano.css';
// Utility functions
import { playSound } from 'utils';

interface MidiValueToBufferIndex {
  [midiValue: number]: number;
}

export const Piano: VoidFunctionComponent = () => {
  // HOOKS
  const { midiValueToBuffers, loading } = useMidiValueToBuffers();

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
  const [midiValueToBufferIndex, setMidiValueToBufferIndex] =
    useState<MidiValueToBufferIndex>({});

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

        // Update the sample to be played the next time key/mouse/touch happens
        const currentSelectedBuffer =
          midiValueToBufferIndex[midiValue];
        const nextMidiValueToBufferIndex = {
          ...midiValueToBufferIndex,
        };
        nextMidiValueToBufferIndex[midiValue] += 1;
        if (
          nextMidiValueToBufferIndex[midiValue] >
          midiValueToBuffers[midiValue].length - 1
        ) {
          nextMidiValueToBufferIndex[midiValue] = 0;
        }

        playSound(
          midiValueToBuffers[midiValue][currentSelectedBuffer],
        );
        setMidiValueToBufferIndex(nextMidiValueToBufferIndex);
      }
    },
    [midiValueToBuffers, midiValueToBufferIndex],
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
    const currentSelectedBuffer = midiValueToBufferIndex[midiValue];
    const nextMidiValueToBufferIndex = {
      ...midiValueToBufferIndex,
    };
    nextMidiValueToBufferIndex[midiValue] += 1;
    if (
      nextMidiValueToBufferIndex[midiValue] >
      midiValueToBuffers[midiValue].length - 1
    ) {
      nextMidiValueToBufferIndex[midiValue] = 0;
    }

    playSound(midiValueToBuffers[midiValue][currentSelectedBuffer]);
    setMidiValueToBufferIndex(nextMidiValueToBufferIndex);
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
    const defaultMidiValueToBufferIndex = Object.keys(
      midiValueToBuffers,
    ).reduce<MidiValueToBufferIndex>(
      (nextMidiValueToBufferIndex, midiValue) => {
        nextMidiValueToBufferIndex[Number(midiValue)] = 0;
        return nextMidiValueToBufferIndex;
      },
      {},
    );
    setMidiValueToBufferIndex(defaultMidiValueToBufferIndex);
  }, [midiValueToBuffers]);

  if (loading) {
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
