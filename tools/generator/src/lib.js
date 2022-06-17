var fs = require("fs");
var MarkdownIt = require("markdown-it");

var g_md = new MarkdownIt();

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

function mdToHtml(markdown) {
  return g_md.render(markdown);
}

module.exports = {
  writeFile,
  readFile,
  mdToHtml
};
