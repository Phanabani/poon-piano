// REACT
import React, {
  useContext,
  useState,
  VoidFunctionComponent,
} from 'react';

// LOCAL FILES
// Context
import { ThemeContext } from 'context';
// Styles
import 'components/bonusButton/BonusButton.css';
// Utility functions
import { playSound } from 'utils';
import { useMidiValueToBuffers } from 'hooks';

export const BonusButton: VoidFunctionComponent = () => {
  // HOOKS
  const { theme } = useContext(ThemeContext);
  const { midiValueToBuffers, loading } = useMidiValueToBuffers();

  // LOCAL STATE
  const [bufferIndex, setBufferIndex] = useState(0);

  // HANDLERS
  const onClick = () => {
    playSound(midiValueToBuffers[0][bufferIndex]);
    let nextBufferIndex = bufferIndex + 1;
    if (nextBufferIndex > midiValueToBuffers[0].length - 1) {
      nextBufferIndex = 0;
    }
    setBufferIndex(nextBufferIndex);
  };

  if (loading) {
    return null;
  }

  // TODO: Colour scheme for button based on theme
  return (
    <button className="bonus-button" onClick={onClick} type="button">
      {theme === 'sharky' ? 'Bonus Bleh' : 'Bonus Sound'}
    </button>
  );
};
