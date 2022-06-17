var lib = require("./src/lib");
var gen = require("./src/gen");

function generateAllCards(cards) {
  var html = lib.readFile("./assets/templates/page.html");
  var items = "";

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].rarity !== "token") {
      items += gen.getCardHtml(cards[i]);
    }
  }

  lib.writeFile("../../cards/cards-all.html",
    html.replace("<!-- cards here -->", items));
}

function generateTokenCards(cards) {
  var html = lib.readFile("./assets/templates/page.html");
  var items = "";

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].rarity === "token") {
      items += gen.getCardHtml(cards[i]);
    }
  }

  lib.writeFile("../../cards/cards-tokens.html",
    html.replace("<!-- cards here -->", items));
}

function main() {
  var cards = JSON.parse(lib.readFile("../../cards/cards.json"));
  generateAllCards(cards);
  generateTokenCards(cards);
}

main();
