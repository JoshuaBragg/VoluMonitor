import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { MonitorContext } from '../context/MonitorContextWrapper';

const ipcRenderer = window.require('electron').ipcRenderer;

// Typescript type MediaDeviceKind
enum AudioDeviceType {
  INPUT = 'audioinput',
  OUTPUT = 'audiooutput',
}

interface SelectOption {
  value: string;
  label: string;
}

function OptionsModal(): JSX.Element {
  const {
    outputDevice,
    setOutputDevice,
    inputDevice,
    setInputDevice,
    audioClipPath,
    setAudioClipPath,
  } = useContext(MonitorContext);

  const [inputDeviceOptions, setInputDeviceOptions] = useState<SelectOption[]>([]);
  const [outputDeviceOptions, setOutputDeviceOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOutputDeviceChange = (selectedDevice: SelectOption) => {
    setOutputDevice(selectedDevice.value);
  };

  const handleInputDeviceChange = (selectedDevice: SelectOption) => {
    setInputDevice(selectedDevice.value);
  };

  const openFileSelectDialog = () => {
    ipcRenderer.invoke('get-file-path')
      .then((paths: string[] | undefined) => {
        if (!paths || !paths.length) {
          return;
        }

        setAudioClipPath(paths[0]);
      });
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const inputDevices: SelectOption[] = [];
      const outputDevices: SelectOption[] = [];

      devices.forEach(device => {
        const deviceOption: SelectOption = {
          value: device.deviceId,
          label: device.label,
        };

        if (device.kind === AudioDeviceType.INPUT) {
          inputDevices.push(deviceOption);
        } else if (device.kind === AudioDeviceType.OUTPUT) {
          outputDevices.push(deviceOption);
        }
      });

      setInputDeviceOptions(inputDevices);
      setOutputDeviceOptions(outputDevices);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="options-modal">
      <h3 className="options-modal__title">Options</h3>
      <div className="options-modal__input-wrapper">
        <label htmlFor="output-device">
          Output Device
        </label>
        <Select
          id="output-device"
          className="options-modal__select"
          classNamePrefix="select"
          isLoading={isLoading}
          value={outputDeviceOptions.find(option => option.value === outputDevice) || { label: 'Default', value: 'default' }}
          options={outputDeviceOptions}
          onChange={handleOutputDeviceChange as any}
        />
      </div>
      <div className="options-modal__input-wrapper">
        <label htmlFor="input-device">
          Input Device
        </label>
        <Select
          id="input-device"
          className="options-modal__select"
          classNamePrefix="select"
          isLoading={isLoading}
          value={inputDeviceOptions.find(option => option.value === inputDevice) || { label: 'Default', value: 'default' }}
          options={inputDeviceOptions}
          onChange={handleInputDeviceChange as any}
        />
      </div>
      <div className="options-modal__spacer"></div>
      <div className="options-modal__input-wrapper">
        <label htmlFor="audio-clip">
          Alarm Sound
        </label>
        <div className="options-modal__file-input-wrapper">
          <div className="options-modal__currently-selected-audio-clip">
            Currently selected: {audioClipPath || 'Default'}
          </div>
          <button
            className="options-modal__file-dialog-button"
            onClick={openFileSelectDialog}
          >
            Choose File
          </button>
          <button
            className="options-modal__file-dialog-button"
            onClick={() => setAudioClipPath('')}
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}

export default OptionsModal;
