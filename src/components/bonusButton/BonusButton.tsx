// REACT
import React, { FC, useContext, useState } from 'react';

// LOCAL FILES
// Context
import { ThemeContext } from 'context';
// Styles
import 'components/bonusButton/BonusButton.css';
// Utility functions
import { NoteToBuffers, playSound } from 'utils/misc';

interface BonusButtonProps {
  noteToBuffers: NoteToBuffers;
}

export const BonusButton: FC<BonusButtonProps> = ({
  noteToBuffers,
}) => {
  // HOOKS
  const theme = useContext(ThemeContext);

  // LOCAL STATE
  const [bufferIndex, setBufferIndex] = useState(0);

  // HANDLERS
  const onClick = () => {
    playSound(noteToBuffers.other[bufferIndex]);
    let nextBufferIndex = bufferIndex + 1;
    if (nextBufferIndex > noteToBuffers.other.length - 1) {
      nextBufferIndex = 0;
    }
    setBufferIndex(nextBufferIndex);
  };

  // TODO: Colour scheme for button based on theme
  return (
    <button className="bonus-button" onClick={onClick} type="button">
      {theme === 'sharky' ? 'Bonus Bleh' : 'Bonus Sound'}
    </button>
  );
};
