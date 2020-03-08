const {ipcRenderer} = require('electron');

function set_ssh() {
    console.log("set_ssh()");
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

function ls_al() {
    ipcRenderer.send('command', 'ls -al');
}