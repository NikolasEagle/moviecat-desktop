const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");

function handleTitleBarActions(winObj, args) {
  if (args === "MAXIMIZE_WINDOW") {
    if (winObj.isMaximized()) {
      winObj.unmaximize();
    } else {
      winObj.maximize();
    }
  } else if (args === "MINIMIZE_WINDOW") {
    winObj.minimize();
  } else if (args === "CLOSE_APP") {
    winObj.destroy();
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 800,

    minHeight: 600,

    width: 800,

    height: 600,

    frame: false,

    backgroundColor: "#222",

    icon: "src/icon.png",

    webPreferences: {
      sandbox: false,
      webviewTag: true,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "src/render.js"),
    },
  });

  //win.webContents.openDevTools();

  ipcMain.on("TITLE_BAR_ACTION", (_, args) => {
    handleTitleBarActions(win, args);
  });

  ipcMain.on("RELOAD", () => {
    win.reload();
  });

  ipcMain.on("FULLSCREEN_OFF", () => {
    win.setFullScreen(true);
    win.setFullScreen(false);
  });

  win.on("unmaximize", () => {
    win.webContents.send("unmaximized");
  });

  win.on("maximize", () => {
    win.webContents.send("maximized");
  });

  win.webContents.on("did-stop-loading", () => {
    if (win.isMaximized()) {
      win.webContents.send("maximized");
    } else {
      win.webContents.send("unmaximized");
    }
  });

  win.loadFile("src/index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
