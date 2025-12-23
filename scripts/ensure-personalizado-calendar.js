const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyFile(sourcePath, targetPath) {
  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const source = path.join(projectRoot, 'src', 'assets', 'Personalizado', 'calendar.js');
  const target = path.join(projectRoot, 'node_modules', 'Personalizado', 'calendar.js');

  if (!fs.existsSync(source)) {
    console.log('[Personalizado] Source calendar.js not found:', source);
    return;
  }

  copyFile(source, target);
  console.log('[Personalizado] Restored:', target);
}

main();
