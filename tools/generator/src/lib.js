var fs = require("fs");

function writeFile(filepath, data) {
  if (!fs.existsSync(filepath)) {
    // create missing directories recursively
    var target = filepath.substr(0, filepath.lastIndexOf("/"));
    fs.mkdirSync(target, { "recursive": true });
  }

  fs.writeFileSync(filepath, data);
}

function readFile(filepath) {
  return fs.readFileSync(filepath).toString();
}

module.exports = {
  writeFile,
  readFile,
};
