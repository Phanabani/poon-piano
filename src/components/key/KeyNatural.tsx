// REACT
import React, { FC, useContext } from 'react';

// LOCAL FILES
// Context
import { ThemeContext } from 'context';
// Hooks
import { useKeySizeAndMargin } from 'hooks';
// Styles
import 'components/key/Key.css';
// Utility functions
import { getKeyImage } from 'utils';

export interface KeyProps {
  label: string;
  position: number;
  isPlaying: boolean;
  eventHandlers: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onTouchStart: () => void;
    onMouseOut: () => void;
    onTouchEnd: () => void;
  };
}

export const KeyNatural: FC<KeyProps> = ({
  label,
  position,
  isPlaying,
  eventHandlers,
}) => {
  // HOOKS
  const { theme } = useContext(ThemeContext);
  const { width, marginLeft } = useKeySizeAndMargin(position, false);

  return (
    <div
      className="key"
      {...eventHandlers}
      style={{
        width: `${width}%`,
        marginLeft: `${marginLeft}%`,
      }}
    >
      <img
        alt="Piano key"
        src={getKeyImage(theme, false, isPlaying)}
      />
      <span className="label">{label}</span>
    </div>
  );
};
