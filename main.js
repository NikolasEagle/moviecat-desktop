import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

console.log(path.join(__dirname, "src/render.js"));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,

    height: 600,

    frame: false,

    transparent: true,

    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "src/render.cjs"),
    },
  });

  ipcMain.on("TITLE_BAR_ACTION", (_, args) => {
    handleTitleBarActions(win, args);
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
