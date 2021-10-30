// REACT
import React, {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
  VoidFunctionComponent,
} from 'react';

// LOCAL FILES
// Components
import { Key } from 'components/key/Key';
// Constants
import { MIDI_VALUE_TO_KEY_BINDING } from '../../constants';
// Styles
import 'components/piano/Piano.css';

export const Piano: VoidFunctionComponent = () => {
  // LOCAL STATE
  const [usingTouchEvents, toggleTouchEventHandlers] =
    useState(false);
  const [activeKeys, updateActiveKeys] = useReducer(
    (
      currentKeys: number[],
      action: {
        operation: 'add' | 'remove';
        midiValue: number;
      },
    ) => {
      const { operation, midiValue } = action;

      switch (operation) {
        case 'add':
          return [...new Set([...currentKeys, midiValue])];
        case 'remove':
          return currentKeys.filter((el) => el !== midiValue);
        default:
          return currentKeys;
      }
    },
    [],
  );

  // HANDLERS
  const keyboardEventHandler = useCallback((event: KeyboardEvent) => {
    const keyPressed = event.key.toUpperCase();
    const midiValues = Object.keys(MIDI_VALUE_TO_KEY_BINDING);

    for (let i = 0; i < midiValues.length; i += 1) {
      const midiValue = Number(midiValues[i]);
      const keyBinding = MIDI_VALUE_TO_KEY_BINDING[midiValue];

      if (keyPressed === keyBinding) {
        switch (event.type) {
          case 'keydown':
            updateActiveKeys({
              operation: 'add',
              midiValue,
            });

            // TODO: Start playing note
            break;
          case 'keyup':
            updateActiveKeys({
              operation: 'remove',
              midiValue,
            });

            // TODO: Stop playing note
            break;
          default:
            break;
        }

        return;
      }
    }
  }, []);

  const mouseEventHandler = useCallback(
    (eventType: string, midiValue: number, isMouseClick: boolean) => {
      switch (eventType) {
        case 'mousedown':
        case 'mouseenter':
          if (isMouseClick) {
            updateActiveKeys({
              operation: 'add',
              midiValue,
            });
          }

          // TODO: Start playing note

          break;
        case 'mouseup':
        case 'mouseleave':
          updateActiveKeys({
            operation: 'remove',
            midiValue,
          });

          // TODO: Stop playing note
          break;
        default:
          break;
      }
    },
    [],
  );

  const touchEventHandler = useCallback(
    (eventType: string, midiValue: number) => {
      switch (eventType) {
        case 'touchstart':
          updateActiveKeys({
            operation: 'add',
            midiValue,
          });

          // TODO: Start playing note
          break;
        case 'touchcancel':
        case 'touchend':
          updateActiveKeys({
            operation: 'remove',
            midiValue,
          });

          // TODO: Stop playing note
          break;
        default:
          break;
      }
    },
    [],
  );

  // Proxy to determine whether we're on device with touch
  const onTouchStart = () => {
    toggleTouchEventHandlers(true);
  };

  // EFFECTS
  // Listen for key events in window
  useEffect(() => {
    window.addEventListener('keydown', keyboardEventHandler);
    window.addEventListener('keyup', keyboardEventHandler);

    return () => {
      window.removeEventListener('keydown', keyboardEventHandler);
      window.removeEventListener('keyup', keyboardEventHandler);
    };
  }, [keyboardEventHandler]);

  return (
    <div className="piano" onTouchStart={onTouchStart}>
      {Object.keys(MIDI_VALUE_TO_KEY_BINDING).map((key: string) => {
        // Object.keys is array of strings
        const midiValue = Number(key);

        return (
          <Key
            key={midiValue}
            midiValue={midiValue}
            active={activeKeys.includes(midiValue)}
            usingTouchEvents={usingTouchEvents}
            mouseEventHandler={mouseEventHandler}
            touchEventHandler={touchEventHandler}
          />
        );
      })}
    </div>
  );
};
