import React, { useContext } from 'react';
import { MonitorContext } from '../context/MonitorContextWrapper';
import { MAX_THRESHOLD, MAX_VOLUME, MIN_THRESHOLD, MIN_VOLUME } from '../util/ProcessAudio';

function MonitorAdjustment(): JSX.Element {
  const {
    threshold,
    setThreshold,
    volume,
    setVolume,
  } = useContext(MonitorContext);

  const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(event.target.value);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.value);
  };

  return (
    <div className="monitor-adjustment">
      <input
        className="monitor-adjustment__threshold"
        type="range"
        max={MAX_THRESHOLD}
        min={MIN_THRESHOLD}
        value={threshold}
        onChange={handleThresholdChange}
        step="1"
      />
      <input
        className="monitor-adjustment__volume"
        type="range"
        max={MAX_VOLUME}
        min={MIN_VOLUME}
        value={volume}
        onChange={handleVolumeChange}
        step="0.01"
      />
    </div>
  );
}

export default MonitorAdjustment;
