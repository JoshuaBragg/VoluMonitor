const fs = window.require('fs');

// https://en.wikipedia.org/wiki/Root_mean_square
export const rms = (audioData: Uint8Array): number => {
  return Math.pow(audioData.map(n => n * n).reduce((sum: number, n: number) => sum + n, 0) / audioData.length, 0.5);
};

export const convertAudioFileToDataUrl = (filePath: string): string => {
  const fileData = fs.readFileSync(filePath, { encoding: 'base64' });

  const mimeType = filePath.endsWith('.mp3') ? 'audio/mp3' :
    filePath.endsWith('.wav') ? 'audio/wav' : 'audio/ogg';

  return `data:${mimeType};base64,${fileData}`
};
