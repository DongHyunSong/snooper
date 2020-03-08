const {app, BrowserWindow} = require('electron');
const path = require('path');
const exec = require('ssh-exec');
const {ipcMain} = require('electron');

var ssh_info;

function sshCommand(cmd) {
  console.log(ssh_info);
  console.log(cmd);
  let stream = process.stdin.pipe(
    // you have to add remove server info
    exec(cmd,  {
      host: ssh_info.host,
      user: ssh_info.user,
      password: ssh_info.pass
    })
  );
  let buffers = [];
  stream.on('data', (buffer) => {
    console.log('============================' + buffer);
    buffers.push(buffer);
  });
  stream.on('end', () => {});
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#303030',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools();

  //sshCommand('tcpdump port 80 -X');
  //sshCommand('ls -al');
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow()
})

ipcMain.on('set-ssh', (event, data) => {
  console.log(data);
  ssh_info = JSON.parse(data);
});

ipcMain.on('command', (event, command) => {
  console.log(command);
  sshCommand(command);
});