import React, { createContext } from 'react';
import useMonitor, { IMonitorContext } from '../hooks/UseMonitor';

interface MonitorContextWrapperProps {
  children: JSX.Element | JSX.Element[],
}

export const MonitorContext = createContext<IMonitorContext>({
  threshold: 0,
  setThreshold: () => { },
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
