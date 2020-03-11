const { ipcRenderer } = require('electron');

var default_expires = new Date();
default_expires.setFullYear(default_expires.getFullYear() + 1);

function getPreference(name) {
  return localStorage.getItem(name);
}

function setPreference(name, value) {
  localStorage.setItem(name, value);
}

function getListOfFiles() {
  ipcRenderer.send('command', 'ls -al');
}

function sendServerInfo(ssh_host, ssh_user, ssh_pass) {
  let ssh_info = {
    "host": ssh_host,
    "user": ssh_user,
    "pass": ssh_pass
  };
  ipcRenderer.send('set-ssh', JSON.stringify(ssh_info));
}

function setServerInfo() {
  console.log("setServerInfo()");
  var ssh_host = document.getElementById("ssh_host").value;
  var ssh_user = document.getElementById("ssh_user").value;
  var ssh_pass = document.getElementById("ssh_pass").value;

  setPreference("ssh_host", ssh_host);
  setPreference("ssh_user", ssh_user);
  setPreference("ssh_pass", ssh_pass);

  sendServerInfo(ssh_host, ssh_user, ssh_pass);
}
function loadServerInfo() {
  console.log("loadServerInfo()");
  var ssh_host = document.getElementById("ssh_host");
  var ssh_user = document.getElementById("ssh_user");
  var ssh_pass = document.getElementById("ssh_pass");

  ssh_host.value = getPreference("ssh_host");
  ssh_user.value = getPreference("ssh_user");
  ssh_pass.value = getPreference("ssh_pass");
}

window.onload = function () {
  loadServerInfo();
}
