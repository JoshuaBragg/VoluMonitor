import React, { useEffect, useState } from 'react';
import './App.scss';

function App(): JSX.Element {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [freqData, setFreqData] = useState<Uint8Array>(new Uint8Array());

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((mediaStream: MediaStream) => {
        const audioContext = new AudioContext();

        const audioStream = audioContext.createMediaStreamSource(mediaStream);
        const analyser = audioContext.createAnalyser();

        audioStream.connect(analyser);

        setAnalyser(analyser);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  useEffect(() => {
    if (analyser) {
      setInterval(() => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteTimeDomainData(dataArray);

        setFreqData(dataArray);
      }, 5);
    }
  }, [analyser]);

  const getFreqVisualization = (dataArray: Uint8Array): JSX.Element[] => {
    const out: JSX.Element[] = [];

    dataArray.forEach((data, i) => out.push(<div key={i} style={{ height: 2 * (data - 127) }}></div>));

    return out;
  }

  return (
    <div className="app">
      {
        getFreqVisualization(freqData)
      }
    </div>
  );
}

export default App;
