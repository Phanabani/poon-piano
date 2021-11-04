// REACT
import React, { CSSProperties, FC, useContext } from 'react';

// LOCAL FILES
// Context
import { ThemeContext } from 'context';
// Utility functions
import { NoteToSounds } from 'utils';

const styles: { [key: string]: CSSProperties } = {
  bonusButton: {
    backgroundColor: '#40b9eb',
    color: 'white',
    marginTop: '16px',
    padding: '8px 16px',
    fontFamily: 'inherit',
    border: '1px solid white',
    borderRadius: '16px',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
};

interface BonusButtonProps {
  noteToSounds: NoteToSounds;
}

export const BonusButton: FC<BonusButtonProps> = ({
  noteToSounds,
}) => {
  // HOOKS
  const theme = useContext(ThemeContext);

  // HANDLERS
  const onClick = () => {
    noteToSounds.other.play(true);
  };

  // TODO: Colour scheme for button based on theme
  return (
    <button
      onClick={onClick}
      style={styles.bonusButton}
      type="button"
    >
      {theme === 'sharky' ? 'Bonus Bleh' : 'Bonus Sound'}
    </button>
  );
};
