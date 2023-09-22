/**
 * This file will transform all relative imports to absolute imports
 * inside the src/ directory.
 * (assumes TS config compilerOptions.paths = { "~/*": ["./src/*"] })
 */

import fs from 'node:fs/promises';

const FILE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

const directories = ['src'];

while (directories.length) {
  const currentDirectory = directories.pop()!;

  const directoryFileNames = await fs.readdir(currentDirectory);

  for (const fileName of directoryFileNames) {
    const filePath = `${currentDirectory}/${fileName}`;

    // Append directory to list of directories to search
    if ((await fs.stat(filePath)).isDirectory()) {
      directories.push(filePath);
      continue;
    }

    // Ignore files which do not use imports
    if (!FILE_EXTENSIONS.some((ext) => fileName.endsWith(ext))) {
      continue;
    }

    // Calculate file depth for relative imports
    const fileDepth = filePath.split('/').length - 2;
    const relativeSrcPath = fileDepth === 0 ? './' : '../'.repeat(fileDepth);

    // Rewrite file with relative imports
    const file = Bun.file(filePath);
    const fileText = await file.text();
    const fileTextNew = fileText.replace(
      /(import.*')(~\/)/g,
      `$1${relativeSrcPath}`
    );
    await Bun.write(filePath, fileTextNew);
  }
}

console.log('Done!');
