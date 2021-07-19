const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Requires code signing
// require('update-electron-app')({
//   repo: 'JoshuaBragg/VoluMonitor',
// });

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'static/images/VoluMonitorLogo256.png'),
  });

  mainWindow.removeMenu();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  setupIPC(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
if (process.platform === "linux") {
  app.commandLine.appendSwitch('use-gl', 'desktop');
  // app.disableHardwareAcceleration();
  app.on('ready', () => setTimeout(createWindow, 750));
} else {
  app.on('ready', createWindow);
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const setupIPC = (window) => {
  ipcMain.on('window:minimize', () => {
    window.minimize();
  });

  ipcMain.on('window:close', () => {
    window.close();
  });

  ipcMain.handle('get-user-path', () => app.getPath('userData'));

  ipcMain.handle('get-file-path', () => {
    return dialog.showOpenDialogSync(window, {
      title: 'Select Audio File',
      filters: [{
        name: 'Audio Files',
        extensions: [
          'mp3',
          'wav',
          'ogg',
        ],
      }],
      properties: [
        'openFile',
      ],
    });
  });
};
