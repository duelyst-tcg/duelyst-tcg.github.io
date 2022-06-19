var lib = require("./src/lib");
var gen = require("./src/gen");

function isToken(card) {
  return card.rarity === "token";
}

function isNotToken(card) {
  return card.rarity !== "token";
}

function main() {
  var cards = JSON.parse(lib.readFile("./assets/configs/cards.json"));
  gen.writeHtmlPage(cards, "../../cards/all.html", isNotToken);
  gen.writeHtmlPage(cards, "../../cards/tokens.html", isToken);
}

main();
