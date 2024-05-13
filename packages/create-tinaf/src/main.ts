import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';

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
const cwd = process.cwd();

function init(targetDir: string = 'tinaf-start-app') {
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
  (async () => {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Give a name to the project:',
    });

    const { projectName } = response;

    init(projectName);

    console.info('Tinaf starter project successfully 🎉🎉🎉\b\n');
    console.info('To get started, follow these 3 steps\b\n');
    console.info('1. Open the directory: cd ', projectName);
    console.info('2. Install dependencies: npm install or yarn install');
    console.info('3. Start the dev server: npm run dev or yarn dev');
  })();
} catch (err) {
  console.error(err);
}
