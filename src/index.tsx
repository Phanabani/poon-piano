// REACT
import React from 'react';
import ReactDOM from 'react-dom';

// LOCAL FILES
// Components
import { App } from 'components/app/App';
// Styles
import 'index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
