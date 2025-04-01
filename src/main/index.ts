import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import path, { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import axios from 'axios';
import fs from 'fs';
import escpos from 'escpos';
escpos.USB = require('escpos-usb');
const USB = escpos.USB;

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

function createSplashScreen() {
  const splashPath = is.dev
    ? path.resolve(__dirname, "../../src/main/splash.html") // Development path
    : join(__dirname, "splash.html"); // Production path

  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    show: true,
  });

  splashWindow.loadFile(splashPath);
}

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.once('ready-to-show', () => {
    splashWindow?.close();
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('ping', () => console.log('pong'));

  createSplashScreen();
  setTimeout(createMainWindow, 3000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

ipcMain.handle('print-receipt', async (_, data) => {
  try {
    const device = new USB();
    const printer = new escpos.Printer(device);

    device.open(() => {
      printer
        .font('a')
        .align('ct')
        .style('b')
        .size(1, 1)
        .text('Musa Chukwu')
        .text('Receipt')
        .text('------------------------')
        .align('lt')
        .text(`Item: ${data.item}`)
        .text(`Price: $${data.price}`)
        .text(`Qty: ${data.qty}`)
        .text('------------------------')
        .align('ct')
        .text('Thank you for your purchase!')
        .cut()
        .close();
    });

    return { success: true };
  } catch (error: any) {
    console.error('Print error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('select-backup-directory', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select Backup Directory',
    properties: ['openDirectory'],
  });
  return result.filePaths[0] || null;
});

ipcMain.handle('download-file', async (_, { url, fileName, saveDir }) => {
  try {
    const filePath = path.join(saveDir, fileName);
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve({ success: true, filePath }));
      writer.on('error', (error) => reject({ success: false, error }));
    });
  } catch (error: any) {
    console.error('Download error:', error);
    return { success: false, error: error.message };
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
