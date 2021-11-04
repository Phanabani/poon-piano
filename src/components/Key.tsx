// REACT
import React, { CSSProperties, FC } from 'react';

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
  },
  image: {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  },
};

export interface KeyProps {
  label: string;
  isAccidental: boolean;
  eventHandlers: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onTouchStart: () => void;
    onMouseOut: () => void;
    onTouchEnd: () => void;
  };
  image: string;
  style: CSSProperties;
}

export const Key: FC<KeyProps> = ({
  label,
  isAccidental,
  eventHandlers,
  image,
  style,
}) => {
  // DERIVED VARIABLES
  let combinedStyles: CSSProperties = {
    ...styles.key,
    ...style,
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
      <img alt="Piano key" src={image} style={styles.image} />
      <span style={styles.label}>{label}</span>
    </div>
  );
};
