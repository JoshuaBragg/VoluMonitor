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
    if (monitoringActive) {
      if (!stream && !analyser) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then((mediaStream: MediaStream) => {
            const audioContext = new AudioContext();

            const audioStream = audioContext.createMediaStreamSource(mediaStream);
            const analyserNode = audioContext.createAnalyser();

            audioStream.connect(analyserNode);

            setAnalyser(analyserNode);
            setStream(mediaStream);
            setSource(audioStream);
          })
          .catch((err) => {
            // TODO: Hot toast
            console.error(err);
          });
      }
    }

    const cleanupMonitor = () => {
      if (stream) {
        stream.getAudioTracks().forEach(track => track.stop());
      }

      cancelAnimationFrame(animFrame.current);
      analyser?.disconnect();
      source?.disconnect();
      setAnalyser(null);
      setStream(null);
      setSource(null);
      setAudioData(new Uint8Array());
    }

    if (!monitoringActive) {
      cleanupMonitor();
    }

    return cleanupMonitor;
  }, [monitoringActive]);

  useEffect(() => {
    if (analyser) {
      animFrame.current = requestAnimationFrame(fetchAudioData);
    }
  }, [analyser]);

  useEffect(() => {
    // TODO: Analyze volume and play noise
    if (audioData[0] > 175) {
      processAudio(audioData, monitorContext);
    }
  }, [audioData]);

  const fetchAudioData = useCallback(() => {
    const updatedData = new Uint8Array(analyser?.frequencyBinCount || 0);

    analyser?.getByteTimeDomainData(updatedData);

    setAudioData(updatedData);

    animFrame.current = requestAnimationFrame(fetchAudioData);
  }, [analyser]);

  return (
    <div>
      <AudioVisualizer audioData={audioData} />
      <button onClick={() => { setMonitoringActive(active => !active) }}>
        {
          monitoringActive ? 'Stop Monitoring' : 'Start Monitoring'
        }
      </button>
    </div>
  );
}

export default AudioAnalyser;
