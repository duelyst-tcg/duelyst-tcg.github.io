var lib = require("./src/lib");
var gen = require("./src/gen");
var filter = require("./src/filter");

function main() {
  var cards = JSON.parse(lib.readFile("./assets/configs/cards.json"));

  // faction cards
  gen.writeSingles(cards, "../../gen/cards/all.html", [filter.all]);
  gen.writeSingles(cards, "../../gen/cards/tokens.html", [filter.isToken]);
  gen.writeSingles(cards, "../../gen/cards/lyonar.html", [filter.isLyonar, filter.isNotToken]);
  gen.writeSingles(cards, "../../gen/cards/songhai.html", [filter.isSonghai, filter.isNotToken]);
  gen.writeSingles(cards, "../../gen/cards/vetruvian.html", [filter.isVetruvian, filter.isNotToken]);
  gen.writeSingles(cards, "../../gen/cards/abyssian.html", [filter.isAbyssian, filter.isNotToken]);
  gen.writeSingles(cards, "../../gen/cards/magmar.html", [filter.isMagmar, filter.isNotToken]);
  gen.writeSingles(cards, "../../gen/cards/vanar.html", [filter.isVanar, filter.isNotToken]);
  gen.writeSingles(cards, "../../gen/cards/neutral.html", [filter.isNeutral, filter.isNotToken]);
  gen.writeSingles(cards, "../../gen/cards/boss.html", [filter.isBoss, filter.isNotToken]);

  // decks
  var decks = JSON.parse(lib.readFile("./assets/configs/decks.json"));

  for (var i = 0; i < decks.length; i++) {
    var deck = decks[i];
    var filepath = "../../gen/decks/" + deck.author + "_" + deck.name + ".html";

    gen.writeDeck(cards, filepath.toLowerCase(), deck);
  }
}

main();
