if (window.process) {
  var { ipcRenderer } = window.require("electron");
} else {
  document.getElementById("titlebar").style.display = "none";
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

  const webview = document.querySelector("webview");

  const titlebar = document.querySelector("#titlebar");

  const app = document.querySelector("#app");

  webview.addEventListener("enter-html-full-screen", (event) => {
    titlebar.style.display = "none";
    app.style.padding = "0";
    event.target.style.height = "100vh";
  });

  webview.addEventListener("leave-html-full-screen", (event) => {
    titlebar.style.display = "flex";
    app.style.padding = "0 10px 20px";
    event.target.style.height = "calc(100vh - 70px)";
    ipcRenderer.send("PLAYER_ACTION", "FULLSCREEN");
  });
}
