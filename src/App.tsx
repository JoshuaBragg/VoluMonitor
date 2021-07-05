import React from 'react';
import './App.scss';
import MonitorContextWrapper from './context/MonitorContextWrapper';
import AudioAnalyser from './components/AudioAnalyser';
import MonitorAdjustment from './components/MonitorAdjustment';

function App(): JSX.Element {
  return (
    <div className="app">
      <MonitorContextWrapper>
        <MonitorAdjustment />
        <AudioAnalyser />
      </MonitorContextWrapper>
    </div>
  );
}

export default App;
