import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'crypto';

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

const TEMPLATE_DIR = 'demo';
const targetDir = `demo-${randomUUID()}`;
const cwd = process.cwd();

function init() {
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../',
    TEMPLATE_DIR
  );

  const root = path.join(cwd, targetDir);

  copyDir(templateDir, targetDir);

  const write = (file: string) => {
    const targetPath = path.join(root, file).replace('.template', '');
    copy(path.join(templateDir, file), targetPath);
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files) {
    write(file);
  }

  fs.rmSync(path.join(root, 'package.template.json'));
}

try {
  init();
  console.info('Tinaf starter project successfully 🎉🎉🎉');
  console.info('Run npm install or yarn install to install dependencies');
  console.info('Then run npm run dev or yarn dev to start the dev server');
} catch (err) {
  console.error(err);
}
