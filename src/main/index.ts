import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// const {PosPrinter} = require("electron-pos-printer");
const axios = require("axios")
const fs = require("fs")


const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const USB = escpos.USB;




function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

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
ipcMain.handle("select-backup-directory", async () => {
  const result = await dialog.showOpenDialog({
    title: "Select Backup Directory",
    properties: ["openDirectory"] // Allow only directory selection
  })

  return result.filePaths[0] || null // Return selected directory or null
})

ipcMain.handle("download-file", async (_, { url, fileName, saveDir }) => {
  try {
    const filePath = path.join(saveDir, fileName);

    // Stream the file from the URL
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve({ success: true, filePath }));
      writer.on("error", (error) => reject({ success: false, error }));
    });
  } catch (error: any) {
    console.error("Download error:", error);
    return { success: false, error: error.message };
  }
});

// ipcMain.handle("select-file", async () => {
//   const result = await dialog.showOpenDialog({
//     properties: ["openFile"],
//   });

//   return result.filePaths[0] || null;
// });

// ipcMain.handle("upload-file", async (event, { filePath }) => {
//   const { access_token } = authManager.profile
//   if (!filePath) {
//     return { success: false, error: "No file selected." };
//   }

//   try {
//     const fileData = fs.readFileSync(filePath);
//     const formData = new FormData();
//     formData.append("file", fileData, path.basename(filePath));

//     const response = await api.post("api/v1/backup/", formData, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//         "Content-Type": "multipart/form-data"
//       },
//     });

//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error("Upload error:", error);
//     return { success: false, error: error };
//   }
// });

// ipcMain.handle('print-receipt', async (_, data) => {
//   try {
//     const receiptData = [
//       {
//         type: 'text',
//         value: 'BIGMERCHANT STORE',
//         style: {fontSize: "18px", textAlign: 'center' },
//       },
//       { type: 'text', value: `Item: ${data.item}`, style: {fontSize: "18px", textAlign: 'center' }, },
//       { type: 'text', value: `Price: $${data.price}`, style: {fontSize: "18px", textAlign: 'center' }, },
//       { type: 'text', value: `Qty: ${data.qty}`, style: {fontSize: "18px", textAlign: 'center' }, },
//       { type: 'text', value: 'Thank you for your purchase!', style: {fontSize: "18px", textAlign: 'center' }, },
//     ];

//     await PosPrinter.print(receiptData, { printerName: 'POS-80C', preview: false });
//     return { success: true };
//   } catch (error:any) {
//     console.error('Print error:', error);
//     return { success: false, error: error.message };
//   }
// });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



