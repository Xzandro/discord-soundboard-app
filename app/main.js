const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const storage = require('electron-json-storage');
const windowStateKeeper = require('electron-window-state');
const _ = require('lodash');

const path = require('path');
const url = require('url');

global.appVersion = app.getVersion();

let defaultConfig = {
  Config: {
    App: { clientID: '', token: '' },
  }
};
let defaultConfigDetails = {
  ConfigDetails: {
    App: { clientID: { label: 'Discord Client ID', type: 'input' }, token: { label: 'Soundboard Token', type: 'input' } }
  }
};

function createWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });

  global.win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    acceptFirstMouse: true,
    autoHideMenuBar: true
  });

  global.mainWindowId = win.id;

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindowState.manage(win);

  win.webContents.on('new-window', (e, link) => {
    e.preventDefault();
    shell.openExternal(link);
  });
}

app.on('ready', () => {
  createWindow();

  if (process.platform === 'darwin') {
    // Create our menu entries so that we can use MAC shortcuts like copy & paste
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
          ]
        }
      ])
    );
  }

  storage.getAll((error, data) => {
    if (error) throw error;

    global.config = _.merge(defaultConfig, data);
    global.config.ConfigDetails = defaultConfigDetails.ConfigDetails;
  });
});

ipcMain.on('updateConfig', () => {
  storage.set('Config', config.Config, error => {
    if (error) throw error;
  });
});

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
