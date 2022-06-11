var fs = require("fs");
var path = require("path");
var { JSDOM } = require("jsdom");

var basedir = path.join(__dirname, "../../cards/");

var cardIds = {};
var setIds = {};
var setNames = {
    "core-set": "CORE",
    "denizens-of-shimzar": "DEOS",
    "bloodbound-ancients": "BLAN",
    "unearthed-prophecy": "UNPR",
    "immortal-vanguard": "IMVA",
    "trials-of-mythron": "TROM"
};

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

function generateCardId(setName) {
    var cardId = setName + "-";

    // initialize card id's counter
    if (setIds[setName] === undefined) {
        setIds[setName] = 0;
    }

    // add number
    var cardNumber = ++setIds[setName];

    if (cardNumber < 100) {
        cardId += "0";
    }

    if (cardNumber < 10) {
        cardId += "0"
    }

    return cardId + cardNumber;
}

function getCardId(cardName, setName) {
    if (cardIds[cardName] === undefined) {
        cardIds[cardName] = generateCardId(setName);
    }

    return cardIds[cardName];
}

function applySetType(document) {
    var elements = document.getElementsByClassName("card-rarity");
    var setNameKeys = Object.keys(setNames);

    for (var i = 0; i < elements.length; i++) {
        var parent = elements[i].parentElement.parentElement;
        var name = parent.getElementsByClassName("legend-post-title")[0].innerHTML;

        for (var j = 0; j < setNameKeys.length; j++) {
            var key = setNameKeys[j];

            if (parent.classList.contains(key)) {
                elements[i].innerHTML = getCardId(name, setNames[key]);
                break;
            }
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