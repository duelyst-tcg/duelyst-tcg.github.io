var path = require("path");
var lib = require("./lib");

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

function generatePage(html) {
    var document = lib.createDocument(html);

    stripClasses(document);
    removeImageLink(document);
    removeTitleLink(document);

    return lib.getHtml(document);
}

function main() {
    var basedir = path.join(__dirname, "../../cards/static/");
    var files = lib.getFiles(basedir);

    for (var i = 0; i < files.length; i++) {
        var filename = files[i];

        console.log("Fixing page: " + filename);

        var text = lib.readFile(basedir + filename);
        var html = generatePage(text);

        lib.writeFile(basedir + filename, html);
    }
}

main();
