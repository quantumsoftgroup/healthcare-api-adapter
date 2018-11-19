const fs = require('fs-extra');
const path = require('path');

// clean files
const distPath = path.join(__dirname, '../dist');
const files = fs
  .readdirSync(distPath)
  .filter(fn => /.*(\d+\.js)|(\.map)|(gcp\.js)|(\.html)/.test(fn));
if (files.length) console.log('Removing: ' + files.join(', '));
files.forEach(fn => fs.unlinkSync(path.join(distPath, fn)));
