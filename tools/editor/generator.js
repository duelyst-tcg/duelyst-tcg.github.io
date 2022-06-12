var path = require("path");
var lib = require("./lib");

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
    var document = lib.createDocument(html);

    applySetType(document);
    
    return lib.getHtml(document);
}

function main() {
    var basedir = path.join(__dirname, "../../cards/static/");
    var files = lib.getFiles(basedir);

    for (var i = 0; i < files.length; i++) {
        var filename = files[i];
        
        console.log("Generating page: " + filename);

        var text = lib.readFile(basedir + filename);
        var html = generatePage(text);

        lib.writeFile(basedir + filename, html);
    }
}

main();
