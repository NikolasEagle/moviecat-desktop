import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,

    height: 600,

    frame: false,

    transparent: true,

    webPreferences: {
      webviewTag: true,
    },
  });

  win.loadFile("src/index.html");
};

app.whenReady().then(() => {
  createWindow();
});
