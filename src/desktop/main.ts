require('dotenv').config()
import {app, BrowserWindow, Menu} from 'electron'
import path from 'path';
import url from 'url';

import { installExtensions } from './installExtensions';


const args = process.argv.slice(1);
let dev = args.some(arg => arg === '--dev');
const isProduction = process.env.NODE_ENV === 'production';

var DESKTOP_ICON_URL = 'static/resources/icon.ico';
const DEV_URL = 'http://localhost:55555';
const PROD_URL = url.format(path.join(app.getAppPath(), 'dist/client/index.html'));
const WINDOW_URL = isProduction ? PROD_URL : DEV_URL

let mainWindow

let createMainWindow = () => {
  installExtensions()

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      backgroundThrottling: false,
      textAreasAreResizable: false,
      //nodeIntegrationInWorker: true,
      //experimentalCanvasFeatures: true
      //experimentalFeatures: true
      }
  })
  
  mainWindow.loadURL(PROD_URL)
  //console.log('window url:', WINDOW_URL)

  // mainWindow.loadURL(url.format({
  //   pathname: path.join(app.getAppPath(), 'dist/client/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))


// this adds 'inspect element' on right click in the browser
  mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click() { mainWindow.webContents.inspectElement(props.x, props.y)}
        }
      ]).popup(mainWindow);
    })

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  return mainWindow as BrowserWindow
}

app.on('ready', async () => {
  await createMainWindow(),
  mainWindow.webContents.openDevTools()
});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow()
  }
})

