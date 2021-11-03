// REACT
import React, { CSSProperties, FC } from 'react';

// LOCAL FILES
// Styles
import 'components/key/Key.css';

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
}) => (
  <div
    className={`key${isAccidental ? ' accidental' : ''}`}
    {...eventHandlers}
    style={style}
  >
    <img alt="Piano key" src={image} />
    <span className="label">{label}</span>
  </div>
);
