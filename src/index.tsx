import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { enableES5 } from 'immer';
import { SettingsProvider } from 'src/contexts/SettingsContext';
import App from 'src/App';

enableES5();

ReactDOM.render(
    <SettingsProvider>
      <App />
    </SettingsProvider>,
  document.getElementById('root')
);

