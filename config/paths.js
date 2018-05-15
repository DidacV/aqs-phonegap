const fs = require('fs');
const path = require('path');

const appDir = fs.realpathSync(process.cwd());
const resolveAppDir = relPath => path.resolve(appDir, relPath);

module.exports = {
  publicDir: resolveAppDir('public'),
  appIndexJs: resolveAppDir('src/index.js'),
  appSrc: resolveAppDir('src'),
  appHTML: resolveAppDir('public/index.html'),
  appWWW: resolveAppDir('www'),
};
