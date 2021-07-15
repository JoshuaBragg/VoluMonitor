// Adapted from https://github.com/philnash/react-web-audio/blob/master/src/AudioVisualiser.js
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  audioData: Uint8Array,
};

function AudioVisualizer({ audioData }: AudioVisualizerProps): JSX.Element {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const height = canvas.current.height;
    const width = canvas.current.width;
    const context = canvas.current.getContext('2d');

    if (!context) {
      return;
    }

    let x = 0;

    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = '#d2daf0';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);

    audioData.forEach(data => {
      const y = (data / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    });

    context.lineTo(x, height / 2);
    context.stroke();
  }, [audioData]);

  return (
    <canvas
      className="audio-visualizer"
      width="550"
      height="150"
      ref={canvas}
    />
  );
}

export default AudioVisualizer;
