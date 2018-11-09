const recursive = require('recursive-readdir');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
recursive(distPath, function(err, files) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  files.forEach(f => {
    const filePath = path.relative(path.join(distPath, '../..'), f);
    console.log("'" + filePath.replace(/\\/g, '/') + "',");
  });
});
