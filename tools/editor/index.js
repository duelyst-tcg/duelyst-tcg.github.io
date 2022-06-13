var lib = require("./src/lib");
var fixer = require("./src/fixer");
var scrap = require("./src/scrap");
//var gen = require("./src/gen");

function removeUnusedData(document) {
  console.log("- Removing image links...");
  fixer.removeImageLink(document);

  console.log("- Removing title links...");
  fixer.removeTitleLink(document);

  // console.log("- Removing ability classes...");
  //fixer.removeAbilityClasses(document);

  console.log("- Removing description classes...");
  fixer.removeDescriptionClasses(document);
}

function scrapData(document, database) {
  var elements = document.getElementsByClassName("card-container");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var name = scrap.getName(element);

    console.log("- Scraping " + name + "...");

    var card = {
      "name": name,
      "img": scrap.getImg(element),
      "set": scrap.getSet(element),
      "rarity": scrap.getRarity(element),
      "type": scrap.getType(element),
      "token": scrap.isToken(element),
      "mana": scrap.getMana(element),
      "attack": scrap.getAttack(element),
      "health": scrap.getHealth(element),
      "description": scrap.getDescription(element)
    };

    scrap.addCard(card);
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

    var html = lib.readFile(indir + filename);
    var document = lib.createDocument(html);

    removeUnusedData(document);
    scrapData(document, database);

    var outdir = "./assets/output/";
    lib.writeFile(outdir + filename, lib.getHtml(document));
  }

  //lib.writeFile(dbfile, database);
}

main();
