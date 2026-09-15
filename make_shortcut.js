import fs from 'fs';
import path from 'path';
import os from 'os';

const homeDir = os.homedir();
const possibleDesktops = [
  path.join(homeDir, 'Desktop'),
  path.join(homeDir, 'OneDrive', 'Desktop'),
  path.join(homeDir, 'Рабочий стол')
];

const targetPath = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\homely';
const content = `[InternetShortcut]\nURL=file:///${targetPath.replace(/\\/g, '/')}\n`;

possibleDesktops.forEach(dt => {
  if (fs.existsSync(dt)) {
    const scPath = path.join(dt, 'Проект_Homely.url');
    fs.writeFileSync(scPath, content, 'utf-8');
    console.log('Создан ярлык в:', scPath);
  }
});
