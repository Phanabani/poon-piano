// REACT
import React, { FC, useContext } from 'react';

// LOCAL FILES
// Constants
import {
  THEME_TO_IMAGE_ARRAY,
  KEY_POSITION_TO_NOTE,
} from '../../constants';
// Context
import { ThemeContext } from 'context';
// Hooks
import { useKeySizeAndMargin } from 'hooks';
// Styles
import 'components/key/Key.css';

interface KeyProps {
  midiValue: number;
  active: boolean;
  usingTouchEvents: boolean;
  mouseEventHandler: (
    eventType: string,
    midiValue: number,
    isMouseClick: boolean,
  ) => void;
  touchEventHandler: (eventType: string, midiValue: number) => void;
}

export const Key: FC<KeyProps> = ({
  midiValue,
  active,
  usingTouchEvents,
  mouseEventHandler,
  touchEventHandler,
}) => {
  // DERIVED VARIABLES
  const keyPosition = midiValue % 12;
  const isAccidentalNote =
    KEY_POSITION_TO_NOTE[keyPosition].includes('#');

  // HOOKS
  const { theme } = useContext(ThemeContext);
  const { width, marginLeft } = useKeySizeAndMargin(
    keyPosition,
    isAccidentalNote,
  );

  // HELPER FUNCTIONS
  const getKeyImage = (): string | undefined => {
    const image = THEME_TO_IMAGE_ARRAY[theme]?.keys.find(
      (imageObject) =>
        imageObject.accidental === isAccidentalNote &&
        imageObject.active === active,
    )?.image;

    // TODO: Fallback image?
    return image;
  };

  return (
    <div
      className={`key${isAccidentalNote ? ' accidental' : ''}`}
      onMouseDown={
        usingTouchEvents
          ? undefined
          : () => {
              mouseEventHandler('mousedown', midiValue, true);
            }
      }
      onMouseUp={
        usingTouchEvents
          ? undefined
          : () => {
              mouseEventHandler('mouseup', midiValue, false);
            }
      }
      onMouseEnter={
        usingTouchEvents
          ? undefined
          : () => {
              mouseEventHandler('mouseenter', midiValue, false);
            }
      }
      onMouseLeave={
        usingTouchEvents
          ? undefined
          : () => {
              mouseEventHandler('mouseleave', midiValue, false);
            }
      }
      onTouchStart={
        usingTouchEvents
          ? () => {
              touchEventHandler('touchstart', midiValue);
            }
          : undefined
      }
      onTouchCancel={
        usingTouchEvents
          ? () => {
              touchEventHandler('touchcancel', midiValue);
            }
          : undefined
      }
      onTouchEnd={
        usingTouchEvents
          ? () => {
              touchEventHandler('touchend', midiValue);
            }
          : undefined
      }
      style={{
        width: `${width}%`,
        marginLeft: `${marginLeft}%`,
      }}
    >
      <img
        alt={`Piano key with MIDI value ${midiValue}`}
        className="keyImg"
        src={getKeyImage()}
      />
    </div>
  );
};
