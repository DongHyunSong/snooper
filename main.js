const {app, BrowserWindow} = require('electron')
const path = require('path')
const exec = require('ssh-exec')

function sshCommand(cmd) {
  let stream = process.stdin.pipe(
    // you have to add remove server info
    exec(cmd, {
      host: 'localhost',
      user: 'songdh',
      password: '0912'
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
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  //sshCommand('tcpdump port 80 -X');
  sshCommand('ls -al');
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow()
})

