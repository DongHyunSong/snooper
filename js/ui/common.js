
function getPreference(name) {
    return localStorage.getItem(name);
  }
  
  function setPreference(name, value) {
    localStorage.setItem(name, value);
  }