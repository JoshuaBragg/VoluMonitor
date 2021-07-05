import { IMonitorContext } from '../hooks/UseMonitor';
const sinWav = require('../static/audio/sin.wav');

const sineWave = new Audio(sinWav.default);

// https://en.wikipedia.org/wiki/Root_mean_square
const rms = (audioData: Uint8Array): number => {
  return Math.pow(audioData.map(n => n * n).reduce((sum: number, n: number) => sum + n, 0) / audioData.length, 0.5);
};

// // https://en.wikipedia.org/wiki/A-weighting#A
// const r_a = (f: number): number => {
//   const square = f * f;

//   return (148693636 * Math.pow(square, 2)) / (
//     (square + 424.36) *
//     Math.pow(
//       (square + 11599.29) *
//       (square + 544496.41),
//       0.5
//     ) *
//     (square + 148693636)
//   );
// };

// // https://en.wikipedia.org/wiki/A-weighting#A
// const a_weight = (audioData: Uint8Array): Uint8Array => {
//   return audioData.map((n: number) => 20 * Math.log10(r_a(n)) + 2);
// };

const volumeHistory: Array<number> = [];

export const HISTORY_LENGTH = 20;
export const MAX_THRESHOLD = 250;
export const MIN_THRESHOLD = 150;
export const MAX_VOLUME = 1;
export const MIN_VOLUME = 0.01;

for (let i = 0; i < HISTORY_LENGTH; i++) {
  volumeHistory.push(0);
}

sineWave.addEventListener('ended', () => volumeHistory.fill(0));

export default (audioData: Uint8Array, monitorContext: IMonitorContext): void => {
  sineWave.volume = monitorContext.volume;

  const volume = rms(audioData);

  console.log(volume);
  volumeHistory.push(volume);
  volumeHistory.shift();

  if (volumeHistory.reduce((sum, current) => sum + current, 0) > monitorContext.threshold) {
    sineWave.play();
  }
};
