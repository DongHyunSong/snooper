const {ipcRenderer} = require('electron');

function getListOfFiles() {
    ipcRenderer.send('command', 'ls -al');
}

function setServerInfo() {
    console.log("setServerInfo()");
    var ssh_host = document.getElementById("ssh_host").value;
    var ssh_user = document.getElementById("ssh_user").value;
    var ssh_pass = document.getElementById("ssh_pass").value;

    let ssh_info = {
        "host": ssh_host,
        "user": ssh_user,
        "pass": ssh_pass
    };
    ipcRenderer.send('set-ssh', JSON.stringify(ssh_info));
}