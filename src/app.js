'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');

// report crashes to the Electron project
// require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being GC'd
let mainWindow;

function createMainWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: true,
    transparent: true,
    frame: true,
    // 'title-bar-style': 'hidden',
    'always-on-top': false
  });
  // win.maximize();

  win.loadUrl(`file://${__dirname}/renderer/index.html`);
  win.on('closed', onClosed);

  return win;
}

function onClosed() {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMenu() {
  var template = [
    {
      label: require('app').getName(),
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Full screen',
          accelerator: 'Command+F',
          click: function() {
            if (mainWindow.isMaximized()) {
              mainWindow.unmaximize();
              mainWindow.setAlwaysOnTop(false);
            } else {
              mainWindow.maximize();
              mainWindow.setAlwaysOnTop(true);
            }
          }
        },
        {
          label: 'Transparent',
          accelerator: 'Command+T',
          click: function() { mainWindow.webContents.send('transparent'); }
        }
      ]
    }
  ];

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', function () {
  mainWindow = createMainWindow();
  createMenu();
});

// Workaround for heroku to prevent sleeping process.
const http = require('http');
function accessHost() {
  http.get('http://eq-pubsub.herokuapp.com/')
    .on('error', function (e) {
      console.log(e.message);
    });
}

accessHost();
setInterval(accessHost, 1000 * 60 * 10); // 10min
