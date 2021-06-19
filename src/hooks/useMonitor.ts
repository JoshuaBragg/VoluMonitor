import { useState } from 'react';

export interface IMonitorContext {
  threshold: number,
  setThreshold: Function,
  frequency: number,
  setFrequency: Function,
  duration: number,
  setDuration: Function,
  volume: number,
  setVolume: Function,
}

export default (): IMonitorContext => {
  const [threshold, setThreshold] = useState(1500);
  const [frequency, setFrequency] = useState(650);
  const [duration, setDuration] = useState(1);
  const [volume, setVolume] = useState(0.01);

  return {
    threshold,
    setThreshold,
    frequency,
    setFrequency,
    duration,
    setDuration,
    volume,
    setVolume,
  };
};
