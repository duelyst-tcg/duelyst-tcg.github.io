var lib = require("./src/lib");
var gen = require("./src/gen");
var filter = require("./src/filter");

function main() {
  var cards = JSON.parse(lib.readFile("./assets/configs/cards.json"));

  // faction cards
  gen.writeSingles(cards, "../../cards/all.html", filter.all);
  gen.writeSingles(cards, "../../cards/tokens.html", filter.isToken);
  gen.writeSingles(cards, "../../cards/lyonar.html", filter.isLyonar);
  gen.writeSingles(cards, "../../cards/songhai.html", filter.isSonghai);
  gen.writeSingles(cards, "../../cards/vetruvian.html", filter.isVetruvian);
  gen.writeSingles(cards, "../../cards/abyssian.html", filter.isAbyssian);
  gen.writeSingles(cards, "../../cards/magmar.html", filter.isMagmar);
  gen.writeSingles(cards, "../../cards/vanar.html", filter.isVanar);
  gen.writeSingles(cards, "../../cards/neutral.html", filter.isNeutral);
  gen.writeSingles(cards, "../../cards/boss.html", filter.isBoss);

  // decks
  var decks = JSON.parse(lib.readFile("./assets/configs/decks.json"));

  for (var i = 0; i < decks.length; i++) {
    var deck = decks[i];
    var filepath = "../../decks/" + deck.author + "_" + deck.name + ".html";

    gen.writeDeck(cards, filepath, deck);
  }
}

main();
