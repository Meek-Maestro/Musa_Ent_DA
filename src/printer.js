const electron = require('electron')
// Importing BrowserWindow from Main
const window = electron.BrowserWindow;

// Get List of Printers
let printWindow = window.getFocusedWindow();
let list = await printWindow.webContents.getPrintersAsync();
console.log('list of Printers', list);