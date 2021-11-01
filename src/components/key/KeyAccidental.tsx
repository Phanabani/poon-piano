// REACT
import React, { FC, useContext } from 'react';

// LOCAL FILES
// Context
import { ThemeContext } from 'context';
// Hooks
import { useKeySizeAndMargin } from 'hooks';
// Interfaces
import { KeyProps } from 'components/key/KeyNatural';
// Styles
import 'components/key/Key.css';
// Utility functions
import { getKeyImage } from 'utils';

export const KeyAccidental: FC<KeyProps> = ({
  label,
  position,
  isPlaying,
  eventHandlers,
}) => {
  // HOOKS
  const { theme } = useContext(ThemeContext);
  const { width, marginLeft } = useKeySizeAndMargin(position, true);

  return (
    <div
      className="key accidental"
      {...eventHandlers}
      style={{
        width: `${width}%`,
        marginLeft: `${marginLeft}%`,
      }}
    >
      <img
        alt="Piano key"
        src={getKeyImage(theme, true, isPlaying)}
      />
      <span className="label">{label}</span>
    </div>
  );
};
