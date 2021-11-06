// REACT
import React, { CSSProperties, FC, useContext } from 'react';

// LOCAL FILES
// Context
import { ThemeContext } from 'context';
// Utility functions
import { NoteToSounds } from 'utils';

const styles: { [key: string]: CSSProperties } = {
  bonusButton: {
    backgroundColor: '#40b9eb', // TODO: Change based on theme
    color: 'white',
    border: '1px solid white',
    marginTop: '16px',
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
