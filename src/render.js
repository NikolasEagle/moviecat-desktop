if (window.process) {
  var { ipcRenderer } = window.require("electron");

  ipcRenderer.on("unmaximized", () => {
    document.querySelector("#restore").style.display = "none";
    document.querySelector("#max").style.display = "flex";
  });

  ipcRenderer.on("maximized", () => {
    document.querySelector("#restore").style.display = "flex";
    document.querySelector("#max").style.display = "none";
  });
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

  document.querySelector("#restore").addEventListener("click", () => {
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
    event.target.scroll(0, event.target.scrollHeight);
  });

  webview.addEventListener("leave-html-full-screen", (event) => {
    titlebar.style.display = "flex";
    app.style.padding = "0 10px 20px";
    event.target.style.height = "calc(100vh - 70px)";
    ipcRenderer.send("FULLSCREEN_OFF");
    event.target.scroll(0, event.target.scrollHeight);
  });

  const reload = document.querySelector("#reload");

  reload.addEventListener("click", () => {
    ipcRenderer.send("RELOAD");
  });
}
