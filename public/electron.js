const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')

const db = require('./db')

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 625,
    minWidth: 1050,
    minHeight: 625,
    maximizable: true,
    show: false,
    backgroundColor: '#1e1e1e',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    autoUpdater.checkForUpdatesAndNotify()
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// comm center

ipcMain.on('action', (e, action) => {
  if (action == 'minimize') {
    mainWindow.minimize()
  } else if (action == 'maximize') {
    mainWindow.maximize()
  } else if (action == 'clearAll') {
    db.remove({}, { multi: true }, err => console.log(err))
  } else {
    mainWindow.close()
  }
})

ipcMain.on('create:item', (e, item) => {
  db.insert(item, (err, item) => {
    err ? console.log(err) : e.reply('create:success', item)
  })
})

ipcMain.on('get:items', e => {
  db.find({}, (err, items) => {
    err ? console.log(err) : e.reply('get:success', items)
  })
})

ipcMain.on('getOne:item', (e, item) => {
  db.find({ name: item }, (err, item) => {
    err ? console.log(err) : e.reply('getOne:itemSuccess', item)
  })
})

ipcMain.on('update:item', (e, item) => {
  db.update(
    { name: item.oldName },
    { $set: { name: item.name, price: item.price, quantity: item.quantity } },
    { multi: true },
    (err, res) => {
      err ? console.log(err) : console.log(res)
    }
  )
})

ipcMain.on('delete:item', (e, name) =>{
  db.remove({ name: name }, {}, function (err, res) {
    err ? console.log(err) : console.log(res)
  });
})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available')
})

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded')
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})