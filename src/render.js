if (window.process) {
  var { ipcRenderer } = window.require("electron");
} else {
  document.querySelector("#titlebar").style.display = "none";
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    handleWindowControls();
  }
};

function handleWindowControls() {
  document.querySelector("#min").addEventListener("click", () => {
    ipcRenderer.send("TITLE_BAR_ACTION", "MINIMIZE_WINDOW");
  });

  document.querySelector("#max").addEventListener("click", () => {
    ipcRenderer.send("TITLE_BAR_ACTION", "MAXIMIZE_WINDOW");
  });

  document.querySelector("#close").addEventListener("click", () => {
    ipcRenderer.send("TITLE_BAR_ACTION", "CLOSE_APP");
  });
}
