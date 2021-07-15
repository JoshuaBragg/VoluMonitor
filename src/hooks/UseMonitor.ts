import { useEffect, useRef, useState } from 'react';
import { MAX_THRESHOLD, MIN_THRESHOLD } from '../constants/AudioConstants';
import DataStore from '../util/DataStore';

export const DATA_STORE_CONFIG_NAME = 'config';

export interface IMonitorContext {
  threshold: number,
  setThreshold: Function,
  volume: number,
  setVolume: Function,
  outputDevice: string,
  setOutputDevice: Function,
  inputDevice: string,
  setInputDevice: Function,
}

export default (): IMonitorContext => {
  DataStore.init({
    configName: DATA_STORE_CONFIG_NAME,
    defaults: {
      threshold: (MIN_THRESHOLD + MAX_THRESHOLD) / 2,
      volume: 0.5,
    },
  }).then((store: DataStore) => {
    setThreshold(store.get('threshold') as number);
    setVolume(store.get('volume') as number);
    setOutputDevice(store.get('output-device') as string);
    setInputDevice(store.get('input-device') as string);

    dataStore.current = store;
  });

  const dataStore = useRef<DataStore>();

  const [threshold, setThreshold] = useState(0);
  const [volume, setVolume] = useState(0);

  const [outputDevice, setOutputDevice] = useState('');
  const [inputDevice, setInputDevice] = useState('');

  useEffect(() => {
    dataStore.current?.set('threshold', threshold);
  }, [threshold]);

  useEffect(() => {
    dataStore.current?.set('volume', volume);
  }, [volume]);

  useEffect(() => {
    dataStore.current?.set('output-device', outputDevice);
  }, [outputDevice]);

  useEffect(() => {
    dataStore.current?.set('input-device', inputDevice);
  }, [inputDevice]);

  return {
    threshold,
    setThreshold,
    volume,
    setVolume,
    outputDevice,
    setOutputDevice,
    inputDevice,
    setInputDevice,
  };
};
