/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, Tray, ipcMain, Menu, MenuItem } from 'electron';
import * as path from 'path';
import MenuBuilder from './menu';

let mainWindow: BrowserWindow = null;
let tray: Tray = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  showWindow();
})

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }
  createWindow();
  createTray();
  showWindow();

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

const createTray = () => {
  tray = new Tray(path.join(__dirname, '../static', 'tray.png'));
  tray.on('click', toggleWindowVisible);
  tray.on('double-click', toggleWindowVisible);
};

const toggleWindowVisible = () => {
  if (mainWindow && mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  const { x, y } = getPositionFromActiveDisplay();
  mainWindow.setPosition(x, y, true);
  mainWindow.show();
};

const getPositionFromActiveDisplay = () => {
  const trayBounds = tray.getBounds();
  const windowBounds = mainWindow.getBounds();

  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );
  const y = Math.round(trayBounds.y + trayBounds.height + 3);

  return {
    x,
    y
  };
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 240,
    height: 392,
    frame: false,
    resizable: true,
    transparent: true,
    'node-integration': true
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  // mainWindow.webContents.openDevTools();
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });
};

ipcMain.on('setTitle', (event, title: string) => {
  if (tray) {
    tray.setTitle(title);
  }
});

ipcMain.once('store-ready', event => {
  const run = () => {
    setTimeout(() => {
      run();
      event.sender.send('tick');
    }, 1000);
  };
  run();
});
