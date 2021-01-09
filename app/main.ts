import { app, BrowserWindow } from 'electron';
import { hello } from '~/lib';
import pkg from '../package.json';

const { devServerPort } = pkg;
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // win.loadFile('./dist/lib/index.html');
  win.loadURL(`http://localhost:${devServerPort}`);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
