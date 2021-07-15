import React, { useContext } from 'react';
import { MonitorContext } from '../context/MonitorContextWrapper';
import { MAX_THRESHOLD, MAX_VOLUME, MIN_THRESHOLD, MIN_VOLUME } from '../constants/AudioConstants';

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
      <div className="monitor-adjustment__control-container">
        <label htmlFor="threshold">
          Threshold: {threshold - MIN_THRESHOLD}
        </label>
        <input
          id="threshold"
          className="monitor-adjustment__threshold"
          type="range"
          max={MAX_THRESHOLD}
          min={MIN_THRESHOLD}
          value={threshold}
          onChange={handleThresholdChange}
          step="1"
        />
      </div>
      <div className="monitor-adjustment__control-container">
        <label htmlFor="volume">
          Volume: {Math.round(volume * 100)}%
        </label>
        <input
          id="volume"
          className="monitor-adjustment__volume"
          type="range"
          max={MAX_VOLUME}
          min={MIN_VOLUME}
          value={volume}
          onChange={handleVolumeChange}
          step="0.01"
        />
      </div>
    </div>
  );
}

export default MonitorAdjustment;
