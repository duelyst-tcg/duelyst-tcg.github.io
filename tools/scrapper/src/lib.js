var fs = require("fs");
var path = require("path");
var linkedom = require("linkedom");
var htmlMinifier = require("html-minifier");

var g_domParser = new linkedom.DOMParser();
var g_htmlMinifyOptions = {
  "collapseInlineTagWhitespace": true,
  "collapseWhitespace": true,
  "conservativeCollapse": true,
  "includeAutoGeneratedTags": false,
  "minifyCSS": true,
  "removeComments": true
};

function strstr(text, a, b) {
   return text.split(a).join(b);
}

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

function getFiles(filepath) {
  var files = fs.readdirSync(filepath);
  var i = files.length;

  while (i--) {
    var item = path.join(filepath, files[i]);

    if (!fs.statSync(item).isFile()) {
      files.splice(i, 1);
    }
  }

  return files;
}

function createDocument(html) {
  return g_domParser.parseFromString(html);
}

function getHtml(document) {
  // add doctype to prevent quicks mode warning
  return "<!DOCTYPE html>" + document.documentElement.outerHTML;
}

function minifyHtml(html) {
  return htmlMinifier.minify(html, g_htmlMinifyOptions);
}

function prettifyJson(json) {
  // add eol as stringify remove it
  return JSON.stringify(json, undefined, 2) + "\n";
}

module.exports = {
  strstr,
  writeFile,
  readFile,
  getFiles,
  createDocument,
  getHtml,
  minifyHtml,
  prettifyJson
};
