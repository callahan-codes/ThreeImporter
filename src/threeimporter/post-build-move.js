/**
 * 
 *  Script below written by Bryce Callahan
 *  Last Updated: 7/21/2025
 * 
 *  The following code moves stylesheets to the 
 *  /build/threeimporter folder.
 * 
*/

const fs = require('fs');
const path = require('path');

// target folder and files to move
const buildDir = path.resolve(__dirname, '../../build');
const targetDir = path.join(buildDir, 'threeimporter');
const filesToMove = ['index-rtl.css', 'style-index-rtl.css'];

// ensure dir exist
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
