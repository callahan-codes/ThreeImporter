// src/threeimporter/post-build-move.js
const fs = require('fs');
const path = require('path');

// build folder (project root/build)
const buildDir = path.resolve(__dirname, '../../build');

// Target folder inside build (build/threeimporter)
const targetDir = path.join(buildDir, 'threeimporter');

// List of RTL CSS files to move
const filesToMove = ['index-rtl.css', 'style-index-rtl.css'];

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

filesToMove.forEach((fileName) => {
  const source = path.join(buildDir, fileName);
  const destination = path.join(targetDir, fileName);

  if (fs.existsSync(source)) {
    try {
      fs.renameSync(source, destination);
      console.log(`Moved ${fileName} to threeimporter/`);
    } catch (error) {
      console.error(`Failed to move ${fileName}:`, error);
    }
  } else {
    console.warn(`File not found: ${fileName}, skipping.`);
  }
});
