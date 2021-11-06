// REACT
import React, { CSSProperties, FC } from 'react';

const styles: { [key: string]: CSSProperties } = {
  title: {
    fontSize: '6rem',
    letterSpacing: 4,
    color: 'white',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#40b9eb', // TODO: Change based on theme
    color: 'white',
    border: '1px solid white',
    marginTop: '16px',
  },
};

interface StartButtonProps {
  onClick: () => void;
}

export const StartButton: FC<StartButtonProps> = ({ onClick }) => (
  <>
    <h1 style={styles.title}>Poon Piano</h1>
    <button
      id="startButton"
      onClick={onClick}
      style={styles.startButton}
      type="button"
    >
      Start
    </button>
  </>
);
