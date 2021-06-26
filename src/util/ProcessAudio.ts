import { IMonitorContext } from '../hooks/UseMonitor';
const sinWav = require('../static/audio/sin.wav');

const sineWave = new Audio(sinWav.default);

export default (audioData: Uint8Array, monitorContext: IMonitorContext): void => {
  sineWave.play();
};
