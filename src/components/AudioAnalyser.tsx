import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MonitorContext } from '../context/MonitorContextWrapper';
import processAudio from '../util/ProcessAudio';
import AudioVisualizer from './AudioVisualizer';

function AudioAnalyser(): JSX.Element {
  const [monitoringActive, setMonitoringActive] = useState(false);

  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);

  const [audioData, setAudioData] = useState(new Uint8Array());

  const animFrame = useRef(-1);

  const monitorContext = useContext(MonitorContext);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(setStream);

    navigator.mediaDevices.enumerateDevices().then(console.log)

    return () => {
      if (stream) {
        stream.getAudioTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const audioContext = new AudioContext();

    const audioStream = audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();

    audioStream.connect(analyserNode);

    setAnalyser(analyserNode);
    setStream(stream);
    setSource(audioStream);

    return () => {
      analyser?.disconnect();
      source?.disconnect();
    };
  }, [stream]);

  useEffect(() => {
    if (monitoringActive) {
      animFrame.current = requestAnimationFrame(fetchAudioData);
    } else {
      cancelAnimationFrame(animFrame.current);
    }

    return () => {
      cancelAnimationFrame(animFrame.current);
    };
  }, [monitoringActive]);

  useEffect(() => {
    processAudio(audioData, monitorContext);
  }, [audioData]);

  const fetchAudioData = useCallback(() => {
    const updatedData = new Uint8Array(analyser?.frequencyBinCount || 0);

    analyser?.getByteTimeDomainData(updatedData);

    setAudioData(updatedData);

    animFrame.current = requestAnimationFrame(fetchAudioData);
  }, [analyser]);

  return (
    <div className="audio-analyser">
      <AudioVisualizer audioData={audioData} />
      <button className="audio-analyser__button" onClick={() => { setMonitoringActive(active => !active) }}>
        {
          monitoringActive ? 'Stop Monitoring' : 'Start Monitoring'
        }
      </button>
    </div>
  );
}

export default AudioAnalyser;
