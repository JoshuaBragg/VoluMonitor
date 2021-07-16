import React, { useContext, useEffect, useState } from 'react';
import { MonitorContext } from '../context/MonitorContextWrapper';
import { convertAudioFileToDataUrl, rms } from '../util/AudioHelpers';

const sinWav = require('../static/audio/sin.wav');
const sineWave = new Audio(sinWav.default);

declare global {
  interface HTMLAudioElement { setSinkId: Function }
}

interface ProcessAudioProps {
  audioData: Uint8Array,
};

function ProcessAudio({ audioData }: ProcessAudioProps): JSX.Element {
  const {
    volume,
    threshold,
    outputDevice,
    audioClipPath,
  } = useContext(MonitorContext);

  const [audioElement, setAudioElement] = useState(sineWave);

  const [volumeHistory, setVolumeHistory] = useState(() => {
    const initHistory: Array<number> = [];

    // Length of 20 is used for the history array, arbitrary but reasonable length
    for (let i = 0; i < 20; i++) {
      initHistory.push(0);
    }

    return initHistory;
  });

  useEffect(() => {
    audioElement.addEventListener('ended', () => setVolumeHistory(history => history.fill(0)));
    audioElement.volume = volume;
    audioElement.setSinkId(outputDevice);
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
      audioElement.play().catch(console.error);
    }
  }, [volumeHistory]);

  useEffect(() => {
    audioElement.setSinkId(outputDevice);
  }, [outputDevice]);

  useEffect(() => {
    if (!audioClipPath) {
      setAudioElement(sineWave);
      return;
    }

    setAudioElement(new Audio(convertAudioFileToDataUrl(audioClipPath)));
  }, [audioClipPath]);

  return (<></>);
}

export default ProcessAudio;
