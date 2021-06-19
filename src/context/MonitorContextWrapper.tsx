import React, { createContext } from 'react';
import useMonitor, { IMonitorContext } from '../hooks/useMonitor';

interface MonitorContextWrapperProps {
  children: JSX.Element | JSX.Element[],
}

export const MonitorContext = createContext<IMonitorContext>({
  threshold: 0,
  setThreshold: () => { },
  frequency: 0,
  setFrequency: () => { },
  duration: 0,
  setDuration: () => { },
  volume: 0,
  setVolume: () => { },
});

function MonitorContextWrapper({ children }: MonitorContextWrapperProps): JSX.Element {
  return (
    <MonitorContext.Provider value={useMonitor()}>
      {children}
    </MonitorContext.Provider>
  );
}

export default MonitorContextWrapper;
