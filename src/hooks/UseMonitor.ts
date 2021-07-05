import { useState } from 'react';
import { HISTORY_LENGTH, MAX_THRESHOLD, MIN_THRESHOLD } from '../util/ProcessAudio';

export interface IMonitorContext {
  threshold: number,
  setThreshold: Function,
  volume: number,
  setVolume: Function,
}

export default (): IMonitorContext => {
  const [threshold, setThreshold] = useState((MIN_THRESHOLD + MAX_THRESHOLD) / 2);
  const [volume, setVolume] = useState(0.05);

  return {
    threshold,
    setThreshold,
    volume,
    setVolume,
  };
};
