// Adapted from https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e
import path from 'path';

const fs = window.require('fs');
const ipcRenderer = window.require('electron').ipcRenderer;

export interface DataStoreOptions {
  configName: string;
  defaults: StoredData;
};

export type JSONType = string | number;

export interface StoredData {
  [key: string]: JSONType;
};

class DataStore {
  path: string = '';
  data: StoredData = {};

  static async init(opts: DataStoreOptions): Promise<DataStore> {
    const self = new DataStore();

    const userDataPath = await ipcRenderer.invoke('get-user-path')
      .then((path: string) => path);

    self.path = path.join(userDataPath, opts.configName + '.json');
    self.data = parseDataFile(self.path, opts.defaults);

    return self;
  }

  get(key: string) {
    if (!this.path) {
      return null;
    }

    return this.data[key];
  }

  set(key: string, value: JSONType) {
    if (!this.path) {
      return;
    }

    this.data[key] = value;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath: string, defaults: StoredData) {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

export default DataStore;