import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faTimes, faCog } from '@fortawesome/free-solid-svg-icons';
import OptionsModal from './OptionsModal';

const ipcRenderer = window.require('electron').ipcRenderer;

function AppBar(): JSX.Element {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <>
      <div className="app-bar">
        <div className="app-bar__left-container">
          <FontAwesomeIcon
            className="app-bar__icon"
            icon={faCog}
            onClick={() => setOptionsModalVisible(visible => !visible)}
          />
        </div>
        <div className="app-bar__right-container">
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
      </div>
      {
        optionsModalVisible &&
        <>
          <div
            className="app-bar__modal-overlay"
            onClick={() => setOptionsModalVisible(visible => !visible)}
          ></div>
          <OptionsModal />
        </>
      }
    </>
  );
}

export default AppBar;
