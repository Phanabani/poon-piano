// REACT
import React, {
  CSSProperties,
  FC,
  useContext,
  useState,
} from 'react';

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

  // LOCAL STATE
  const [soundIndex, setSoundIndex] = useState(0);

  // HANDLERS
  const onClick = () => {
    // Stop sound that was playing previously
    let previousIndex = soundIndex - 1;
    if (previousIndex < 0) {
      previousIndex = noteToSounds.other.length - 1;
    }
    noteToSounds.other[previousIndex].stop();

    // Play current index
    noteToSounds.other[soundIndex].play();

    // Increment index so different sample plays next time
    let nextSoundIndex = soundIndex + 1;
    if (nextSoundIndex > noteToSounds.other.length - 1) {
      nextSoundIndex = 0;
    }
    setSoundIndex(nextSoundIndex);
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
