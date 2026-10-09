const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  Menu.setApplicationMenu(null); // Remove default browser-style menu bar

  const isMac = process.platform === "darwin";

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 860,
    minHeight: 580,
    title: "Om",
    backgroundColor: "#000000",
    frame: false,
    ...(isMac ? { titleBarStyle: "hiddenInset" } : {}),
    show: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  // Handle window controls IPC
  ipcMain.on("window-minimize", () => {
    mainWindow?.minimize();
  });

  ipcMain.on("window-maximize", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });

  ipcMain.on("window-close", () => {
    mainWindow?.close();
  });

  ipcMain.handle("window-is-maximized", () => {
    return mainWindow?.isMaximized() ?? false;
  });

  mainWindow.webContents.on("did-fail-load", (_e, errorCode, errorDescription) => {
    console.error("Failed to load window:", errorCode, errorDescription);
  });

  mainWindow.webContents.on("console-message", (_event, level, message, line, sourceId) => {
    console.log(`[Renderer ${level}] ${message} (${sourceId}:${line})`);
  });

  mainWindow.webContents.on("did-finish-load", async () => {
    if (!app.isPackaged) {
      try {
        setTimeout(async () => {
          if (mainWindow) {
            const image = await mainWindow.webContents.capturePage();
            const previewPath = path.join(__dirname, "../preview.png");
            fs.writeFileSync(previewPath, image.toPNG());
          }
        }, 800);
      } catch (_err) {
        // Ignored in dev
      }
    }
  });

  // Load the production build if available, else localhost
  const distPath = path.join(__dirname, "../dist/index.html");
  const fs = require("fs");
  if (fs.existsSync(distPath)) {
    mainWindow.loadFile(distPath);
  } else {
    mainWindow.loadURL("http://localhost:3000");
  }

  mainWindow.focus();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
