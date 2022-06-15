var lib = require("./src/lib");
var fixer = require("./src/fixer");
var scrap = require("./src/scrap");
//var gen = require("./src/gen");

function removeUnusedData(document) {
  console.log("- Removing description classes...");
  fixer.removeDescriptionClasses(document);
}

function scrapData(document, database) {
  var elements = document.getElementsByClassName("card-container");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var name = scrap.getName(element);

    console.log("- Scraping " + name + "...");

    var card = new scrap.Card(element);
    scrap.addCard(database, card);
  }
}

function main() {
  var dbfile = "../../cards/db.json";
  var indir = "./assets/input/";
  var database = JSON.parse(lib.readFile(dbfile));
  var files = lib.getFiles(indir);

  for (var i = 0; i < files.length; i++) {
    var filename = files[i];

    console.log("Scrap data from: " + filename);

    var text = lib.readFile(indir + filename);
    var html = lib.minifyHtml(text);
    var document = lib.createDocument(html);

    removeUnusedData(document);
    scrapData(document, database);
  }

  lib.writeFile("./proto.db", JSON.stringify(database));
}

main();
