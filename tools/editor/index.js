var fs = require("fs");
var path = require("path");
var { JSDOM } = require("jsdom");

var basedir = path.join(__dirname, "../../cards/");

async function writeFile(filepath, data) {
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

function isCorrectClass(name) {
    return name == "card-container"
        || name == "core-set"
        || name == "spell"
        || name == "artifact"
        || name == "denizens-of-shimzar"
        || name == "bloodbound-ancients"
        || name == "unearthed-prophecy"
        || name == "immortal-vanguard"
        || name == "trials-of-mythron"
        || name == "magmar"
        || name == "songhai"
        || name == "lyonar"
        || name == "abyssian"
        || name == "vanar"
        || name == "vetruvian"
        || name == "starhorn-the-seeker"
        || name == "ragnora-the-relentless"
        || name == "reva-eventide"
        || name == "shidai-stormblossom"
        || name == "argeon-highmayne"
        || name == "ziran-sunforge"
        || name == "brome-warcrest"
        || name == "zirix-starstrider"
        || name == "scioness-sajj"
        || name == "ciphyron-ascendant"
        || name == "cassyva-soulreaper"
        || name == "maehv-skinsolder"
        || name == "kara-winterblade"
        || name == "ilena-cryobyte"
        || name == "grandmaster-kraigon"
        || name == "vindicator"
        || name == "earth-sister-taygete"
        || name == "storm-sister-alkyone"
        || name == "hamon-bladeseeker";
}

function stripClasses(document) {
    var elements = document.getElementsByClassName("card-container");

    for (var i = 0; i < elements.length; i++) {
        var classes = elements[i].className.split(' ');

        for (var item of classes) {
            if (!isCorrectClass(item) && item !== "") {
                elements[i].classList.remove(item);
            }
        }
    }
}

function applySetType(document) {
    var elements = document.getElementsByClassName("card-rarity");

    for (var i = 0; i < elements.length; i++) {
        var parentElement = elements[i].parentElement.parentElement;

        if (parentElement.classList.contains("core-set")) {
            elements[i].innerHTML = "CORE";
        }

        if (parentElement.classList.contains("denizens-of-shimzar")) {
            elements[i].innerHTML = "DEOS";
        }

        if (parentElement.classList.contains("bloodbound-ancients")) {
            elements[i].innerHTML = "BLAN";
        }

        if (parentElement.classList.contains("unearthed-prophecy")) {
            elements[i].innerHTML = "UNPR";
        }

        if (parentElement.classList.contains("immortal-vanguard")) {
            elements[i].innerHTML = "IMVA";
        }

        if (parentElement.classList.contains("trials-of-mythron")) {
            elements[i].innerHTML = "TROM";
        }
    }
}

function generatePage(html) {
    var dom = new JSDOM(html);
    var document = dom.window.document;

    stripClasses(document);
    applySetType(document);

    // add doctype to prevent quicks mode warning
    return "<!DOCTYPE html>" + document.documentElement.outerHTML;
}

function main() {
    var files = getFiles(basedir);

    for (var i = 0; i < files.length; i++) {
        if (files[i] == "README.md") {
            continue;
        }

        var filename = files[i];
        console.log("Generating page: " + filename);
        var text = readFile(basedir + filename);
        var html = generatePage(text);
        writeFile(basedir + filename, html);
    }
}

main();