var fs = require("fs");
var path = require("path");
var { JSDOM } = require("jsdom");

var g_cardIds = {};
var g_setIds = {};
var g_setNames = {
    "core-set": "CORE",
    "denizens-of-shimzar": "DEOS",
    "bloodbound-ancients": "BLAN",
    "unearthed-prophecy": "UNPR",
    "immortal-vanguard": "IMVA",
    "trials-of-mythron": "TROM",
    "gauntlet-specials": "GASP"
};
var g_cardContainerClasses = [
    "card-container",
    "spell",
    "artifact",
    "core-set",
    "denizens-of-shimzar",
    "bloodbound-ancients",
    "unearthed-prophecy",
    "immortal-vanguard",
    "trials-of-mythron",
    "gauntlet-specials",
    "magmar",
    "songhai",
    "lyonar",
    "abyssian",
    "vanar",
    "vetruvian",
    "starhorn-the-seeker",
    "ragnora-the-relentless",
    "reva-eventide",
    "shidai-stormblossom",
    "argeon-highmayne",
    "ziran-sunforge",
    "brome-warcrest",
    "zirix-starstrider",
    "scioness-sajj",
    "ciphyron-ascendant",
    "cassyva-soulreaper",
    "maehv-skinsolder",
    "kara-winterblade",
    "ilena-cryobyte",
    "grandmaster-kraigon",
    "vindicator",
    "earth-sister-taygete",
    "storm-sister-alkyone",
    "hamon-bladeseeker"
];

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
    for (var i = 0; i < g_cardContainerClasses.length; i++) {
        if (g_cardContainerClasses[i].indexOf(name) > -1) {
            return true;
        }
    }

    return false;
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

function removeImageLink(document) {
    var elements = document.getElementsByClassName("card-image");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.tagName !== "IMG") {
            // create new image element
            var imgElement = element.getElementsByTagName("img")[0];
            var newImgElement = document.createElement("img");

            newImgElement.setAttribute("src", imgElement.getAttribute("src"));

            // create new div element
            var newDivElement = document.createElement("div");

            newDivElement.setAttribute("class", "card-image");
            newDivElement.appendChild(newImgElement);
            element.parentNode.replaceChild(newDivElement, element);
        }
    }
}

function removeTitleLink(document) {
    var elements = document.getElementsByClassName("card-title");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element.tagName !== "H2") {
            var newElement = document.createElement("h2");
            var targetElement = element.getElementsByClassName("legend-post-title")[0];

            newElement.setAttribute("class", "card-title");
            newElement.innerHTML = targetElement.textContent;
            element.parentNode.replaceChild(newElement, element);
        }
    }
}

function generateCardId(setName) {
    var cardId = setName + "-";

    // initialize card id's counter
    if (g_setIds[setName] === undefined) {
        g_setIds[setName] = 0;
    }

    // add number
    var cardNumber = ++g_setIds[setName];

    if (cardNumber < 100) {
        cardId += "0";
    }

    if (cardNumber < 10) {
        cardId += "0"
    }

    return cardId + cardNumber;
}

function getCardId(cardName, setName) {
    if (g_cardIds[cardName] === undefined) {
        g_cardIds[cardName] = generateCardId(setName);
    }

    return g_cardIds[cardName];
}

function getCardSet(element) {
    var setNameKeys = Object.keys(g_setNames);

    for (var j = 0; j < setNameKeys.length; j++) {
        var setNameId = setNameKeys[j];

        if (element.classList.contains(setNameId)) {
            return g_setNames[setNameId];
        }
    }

    return undefined;
}

function applySetType(document) {
    var elements = document.getElementsByClassName("card-rarity"); 

    for (var i = 0; i < elements.length; i++) {
        var parent = elements[i].parentElement.parentElement;

        // get card name
        var cardName = parent
            .getElementsByClassName("card-title")[0]
            .innerHTML;

        // get card set
        var cardSet = getCardSet(parent);
        
        // set card id
        elements[i].innerHTML = getCardId(cardName, cardSet);
    }
}

function generatePage(html) {
    var dom = new JSDOM(html);
    var document = dom.window.document;

    stripClasses(document);
    removeImageLink(document);
    removeTitleLink(document);
    applySetType(document);

    // add doctype to prevent quicks mode warning
    return "<!DOCTYPE html>" + document.documentElement.outerHTML;
}

function main() {
    var basedir = path.join(__dirname, "../../cards/");
    var files = getFiles(basedir);

    for (var i = 0; i < files.length; i++) {
        var filename = files[i];

        if (filename == "README.md") {
            continue;
        }

        console.log("Generating page: " + filename);

        var text = readFile(basedir + filename);
        var html = generatePage(text);

        writeFile(basedir + filename, html);
    }
}

main();