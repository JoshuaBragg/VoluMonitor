import { useEffect, useRef, useState } from 'react';
import { MAX_THRESHOLD, MIN_THRESHOLD } from '../util/ProcessAudio';
import DataStore from '../util/DataStore';

export const DATA_STORE_CONFIG_NAME = 'config';

export interface IMonitorContext {
  threshold: number,
  setThreshold: Function,
  volume: number,
  setVolume: Function,
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
    dataStore.current = store;
  });

  const dataStore = useRef<DataStore>();
  const [threshold, setThreshold] = useState(0);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    dataStore.current?.set('threshold', threshold);
  }, [threshold]);

  useEffect(() => {
    dataStore.current?.set('volume', volume);
  }, [volume]);

  return {
    threshold,
    setThreshold,
    volume,
    setVolume,
  };
};
