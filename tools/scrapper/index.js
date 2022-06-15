var lib = require("./src/lib");
var fixer = require("./src/fixer");
var scrap = require("./src/scrap");

function scrapCards(document) {
  var elements = document.getElementsByClassName("card-container");
  var dbfile = "../../cards/cards.json";
  var cards = JSON.parse(lib.readFile(dbfile));

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var name = scrap.getName(element);

    console.log("- Scraping " + name + "...");
    scrap.addCard(cards, new scrap.Card(element));
  }

  lib.writeFile(dbfile, lib.prettifyJson(cards));
}

function scrapFile(filename, basedir) {
  console.log("Scrap data from: " + filename);

  // create DOM
  var text = lib.readFile(basedir + filename);
  var html = lib.minifyHtml(text);
  var document = lib.createDocument(html);

  // remove redundant classes from card descriptions
  console.log("- Removing description classes...");
  fixer.removeDescriptionClasses(document);

  // get the card info
  scrapCards(document);
}

function main() {
  var indir = "./assets/input/";
  var files = lib.getFiles(indir);

  for (var i = 0; i < files.length; i++) {
    scrapFile(files[i], indir);
  }
}

main();
