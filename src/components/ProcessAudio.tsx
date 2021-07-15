import React, { useContext, useEffect, useState } from 'react';
import { MonitorContext } from '../context/MonitorContextWrapper';

const sinWav = require('../static/audio/sin.wav');
const sineWave = new Audio(sinWav.default);

// https://en.wikipedia.org/wiki/Root_mean_square
const rms = (audioData: Uint8Array): number => {
  return Math.pow(audioData.map(n => n * n).reduce((sum: number, n: number) => sum + n, 0) / audioData.length, 0.5);
};

interface ProcessAudioProps {
  audioData: Uint8Array,
};

function ProcessAudio({ audioData }: ProcessAudioProps): JSX.Element {
  const {
    volume,
    threshold,
  } = useContext(MonitorContext);

  const [audioElement, setAudioElement] = useState(sineWave);

  const [volumeHistory, setVolumeHistory] = useState(() => {
    const initHistory: Array<number> = [];

    // Length of 20 is used for the history array, arbitrary but reasonable value
    for (let i = 0; i < 20; i++) {
      initHistory.push(0);
    }

    return initHistory;
  });

  useEffect(() => {
    audioElement.addEventListener('ended', () => setVolumeHistory(history => history.fill(0)));
  }, [audioElement]);

  useEffect(() => {
    audioElement.volume = volume;
  }, [volume]);

  useEffect(() => {
    const recentVolume = rms(audioData);

    setVolumeHistory(history => {
      history.push(recentVolume);
      history.shift();

      return [...history];
    });
  }, [audioData]);

  useEffect(() => {
    if (volumeHistory.reduce((sum, current) => sum + current, 0) > threshold) {
      sineWave.play().catch(console.error);
    }
  }, [volumeHistory]);

  return (<></>);
}

export default ProcessAudio;
