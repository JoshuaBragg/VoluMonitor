import React from 'react';
import './App.scss';
import MonitorContextWrapper from './context/MonitorContextWrapper';
import AudioAnalyser from './components/AudioAnalyser';

function App(): JSX.Element {
  return (
    <div className="app">
      <MonitorContextWrapper>
        <AudioAnalyser />
      </MonitorContextWrapper>
    </div>
  );
}

export default App;
