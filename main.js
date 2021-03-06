const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

const dynamoConfig = JSON.parse(fs.readFileSync('credentials.json').toString())

const credentials = {accessKeyId, secretAccessKey, region} = dynamoConfig

const DynamoDB = require('aws-dynamodb')(credentials)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const insert = args => {
  DynamoDB
    .table(dynamoConfig.table)
    .insert({
      tagname: args.tagname || 'general',
      content: args.content,
      timestamp: new Date().getTime(),
      title: args.title
    }, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        read()
      }
    })
}

const read = args => {
  DynamoDB
    .table(dynamoConfig.table)
    .scan(function(err, data) {
      if (err) {
        console.log(err)
      } else {
        win.webContents.send('update-app', data)
      }
    })
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL('http://localhost:8080')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  // DynamoDB.client.listTables(function(err, data) {
  //   console.log(data.TableNames)
  // })

  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('insert', (event, args) => insert(args))
ipcMain.on('read', (event, args) => read(args))
