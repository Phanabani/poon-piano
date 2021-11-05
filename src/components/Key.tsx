// REACT
import React, { CSSProperties, FC } from 'react';

// LOCAL FILES
// Interfaces & Types
import { Note } from '../constants';
// Hooks
import { useKeyMarginLeft, useKeyWidth } from 'hooks';

const styles: { [key: string]: CSSProperties } = {
  key: {
    cursor: 'pointer',
    position: 'relative',
  },
  accidental: {
    zIndex: 1,
  },
  label: {
    backgroundColor: '#333',
    color: 'white',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '3px',
    borderRadius: '50%',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
  },
  image: {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
  },
};

export interface KeyProps {
  label: string;
  note: Note;
  isAccidental: boolean;
  eventHandlers: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onTouchStart: () => void;
    onMouseOut: () => void;
    onTouchEnd: () => void;
  };
  image: string;
}

export const Key: FC<KeyProps> = ({
  label,
  note,
  isAccidental,
  eventHandlers,
  image,
}) => {
  // HOOKS
  const width = useKeyWidth(note);
  const marginLeft = useKeyMarginLeft(note);

  // DERIVED VARIABLES
  let combinedStyles: CSSProperties = {
    ...styles.key,
    width,
    marginLeft,
  };

  if (isAccidental) {
    combinedStyles = {
      ...combinedStyles,
      ...styles.accidental,
    };
  }

  return (
    <div
      className={`key${isAccidental ? ' accidental' : ''}`}
      {...eventHandlers}
      onDragStart={(event) => {
        event.preventDefault();
      }}
      style={combinedStyles}
    >
      <img
        alt="Piano key"
        onContextMenu={(event) => {
          event.preventDefault();
        }}
        src={image}
        style={styles.image}
      />
      <span style={styles.label}>{label}</span>
    </div>
  );
};
