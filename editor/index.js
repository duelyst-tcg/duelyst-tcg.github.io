var fs = require("fs");
var path = require("path");
var { JSDOM } = require("jsdom");

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

function isCorrectClass(name)
{
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

function stripClasses(document)
{
    var elements = document.getElementsByClassName("card-container");

    for (var i = 0; i < elements.length; i++) {
        var classes = elements[i].className.split(' ');
    
        for (var item of classes)
        {
            if (!isCorrectClass(item) && item !== "")
            {
                elements[i].classList.remove(item);
            }
        }
    }
}

function generatePage(filename) {
    var html = readFile("../cards/" + filename);
    var dom  = new JSDOM(html);
    var document = dom.window.document;

    stripClasses(document);

    // add doctype to prevent quicks mode warning
    return "<!DOCTYPE html>" + document.documentElement.outerHTML;
}

function main() {
    var filepath = "../cards";
    var files = getFiles(filepath);

    for (var i = 0; i < files.length; i++) {
        if (files[i] == "README.md")
        {
            continue;
        }

        var filename = files[i];
        console.log("Generating page: " + filename);
        var html = generatePage(filename);
        writeFile("../cards/" + filename, html);
    }
}

main();