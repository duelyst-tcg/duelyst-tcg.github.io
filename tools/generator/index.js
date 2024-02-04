var lib = require("./src/lib");
var gen = require("./src/gen");
var filter = require("./src/filter");

function main() {
  var cards = JSON.parse(lib.readFile("./assets/configs/cards.json"));

  // faction cards
  gen.writeSingles(cards, "../../gen/cards/all.html", filter.all);
  gen.writeSingles(cards, "../../gen/cards/tokens.html", filter.isToken);
  gen.writeSingles(cards, "../../gen/cards/lyonar.html", filter.isLyonar);
  gen.writeSingles(cards, "../../gen/cards/songhai.html", filter.isSonghai);
  gen.writeSingles(cards, "../../gen/cards/vetruvian.html", filter.isVetruvian);
  gen.writeSingles(cards, "../../gen/cards/abyssian.html", filter.isAbyssian);
  gen.writeSingles(cards, "../../gen/cards/magmar.html", filter.isMagmar);
  gen.writeSingles(cards, "../../gen/cards/vanar.html", filter.isVanar);
  gen.writeSingles(cards, "../../gen/cards/neutral.html", filter.isNeutral);
  gen.writeSingles(cards, "../../gen/cards/boss.html", filter.isBoss);

  // decks
  var decks = JSON.parse(lib.readFile("./assets/configs/decks.json"));

  for (var i = 0; i < decks.length; i++) {
    var deck = decks[i];
    var filepath = "../../gen/decks/" + deck.author + "_" + deck.name + ".html";

    gen.writeDeck(cards, filepath.toLowerCase(), deck);
  }
}

main();
