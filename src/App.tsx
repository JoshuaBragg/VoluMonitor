import React from 'react';
import './App.scss';
import MonitorContextWrapper from './context/MonitorContextWrapper';
import AudioAnalyser from './components/AudioAnalyser';
import MonitorAdjustment from './components/MonitorAdjustment';
import AppBar from './components/AppBar';

function App(): JSX.Element {
  return (
    <div className="app">
      <h1 className="app__title">
        VoluMonitor
      </h1>
      <MonitorContextWrapper>
        <AppBar />
        <MonitorAdjustment />
        <AudioAnalyser />
      </MonitorContextWrapper>
    </div>
  );
}

export default App;
