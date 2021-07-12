import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

const ipcRenderer = window.require('electron').ipcRenderer;

function AppBar(): JSX.Element {
  return (
    <div className="app-bar">
      <FontAwesomeIcon
        className="app-bar__icon"
        icon={faMinus}
        onClick={() => { ipcRenderer.send('window:minimize') }}
      />
      <FontAwesomeIcon
        className="app-bar__icon"
        icon={faTimes}
        onClick={() => { ipcRenderer.send('window:close') }}
      />
    </div>
  );
}

export default AppBar;
