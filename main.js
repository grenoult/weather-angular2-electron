const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const fs = require('fs');
const {ipcMain} = require('electron');
const dataFilePath = path.join(app.getPath('userData'), 'userData.json');
let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.setMenu(null);

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('save-user-settings', (event, arg) => {
    fs.writeFile(dataFilePath, JSON.stringify(arg), 'utf8', function(err) {
        if (err) {
            event.sender.send('save-user-settings-reply', false);
        } else {
            event.sender.send('save-user-settings-reply', true);
        }
    });
});

ipcMain.on('load-user-settings', (event, arg) => {
    fs.readFile(dataFilePath, 'utf8', function(err, data) {
        if (err) {
            event.sender.send('load-user-settings-reply', false);
        } else {
            event.sender.send('load-user-settings-reply', data);
        }
    });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
