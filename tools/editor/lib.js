var fs = require("fs");
var path = require("path");
var { JSDOM } = require("jsdom");

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
    var dom = new JSDOM(html);
    return dom.window.document;
}

function getHtml(document) {
    // add doctype to prevent quicks mode warning
    return "<!DOCTYPE html>" + document.documentElement.outerHTML;
}

module.exports = {
    writeFile,
    readFile,
    getFiles,
    createDocument,
    getHtml
};
