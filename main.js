import { app, BrowserWindow, ipcMain } from "electron";

import path from "path";

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

    icon: "src/logo96.png",

    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      preload: path.resolve("src/render.cjs"),
    },
  });

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

  //win.webContents.openDevTools();

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
