// REACT
import React, { useState, VoidFunctionComponent } from 'react';

// LOCAL FILES
// Components
import { Piano } from 'components/piano/Piano';
// Constants
import { THEME_TO_IMAGE_ARRAY } from '../../constants';
// Context
import { ThemeContext } from 'context';
// Styles
import 'components/app/App.css';

export const App: VoidFunctionComponent = () => {
  // LOCAL STATE
  // TODO: Allow user to select theme
  const [theme, setTheme] = useState('sharky');

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div
        className="app"
        style={{
          backgroundImage: `url(${THEME_TO_IMAGE_ARRAY[theme].background})`,
        }}
      >
        <Piano />
      </div>
    </ThemeContext.Provider>
  );
};
