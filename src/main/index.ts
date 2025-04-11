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
    ? path.resolve(__dirname, "../../src/splash.html") // Development path
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
      const maxLineWidth = 42; // Adjust based on your printer (32, 42, or 48)
      const colWidths = [22, 5, 10]; // Adjust based on width (Item, Qty, Subtotal)

      // Print Header
      printer
        .font('a')
        .align('ct')
        .style('b')
        .size(1, 1)
        .text('Musa Chukwu')
        .text('Receipt')
        .text('-'.repeat(maxLineWidth));

      // Customer and Payment Info
      printer
        .align('lt')
        .size(0.5, 0.5)
        .text(`Customer: ${data.customer || 'Walk-in Customer'}`)
        .text(`Payment Method: ${data.payment_method}`)
        .text(`Note: ${data.note ? data.note : "NIL"}`)
        .text('-'.repeat(maxLineWidth));

      // Print Table Header
      const headers = ['Item', 'Qty', 'Subtotal'];
      printer.text(formatRow(headers, colWidths, true));
      printer.text('-'.repeat(maxLineWidth));

      // Print Products
      data.products.forEach((product: any) => {
        const row = formatRow(
          [product.product_name, product.quantity.toString(), `${product.sub_total}`],
          colWidths
        );
        printer.text(row);
      });

      // Calculate Total
      const total = data.products.reduce((sum: number, product: any) => sum + parseFloat(product.sub_total), 0);
      
      printer
        .text('-'.repeat(maxLineWidth))
        .text(` Total: NGN${total.toFixed(2)}`.padStart(maxLineWidth - 5, ' '))
        .text('-'.repeat(maxLineWidth));

      // Footer
      printer
        .align("ct")
        .style("b")
        .size(0.5, 0.5)
        .text('Thank you for your purchase!')
        .text('')
        .text('')
        .cut()
        .close();
    });

    return { success: true };
  } catch (error: any) {
    console.error('Print error:', error);
    return { success: false, error: error.message };
  }
});

/**
 * Helper function to format table rows dynamically.
 */
function formatRow(columns: string[], colWidths: number[], isHeader = false): string {
  return columns.map((col, i) => col.padEnd(colWidths[i], ' ')).join('');
}



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
