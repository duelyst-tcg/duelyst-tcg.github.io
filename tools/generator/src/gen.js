var lib = require("./lib");

var g_cardIds = {};
var g_setIds = {};
var g_setNames = JSON.parse(lib.readFile("./assets/configs/sets.json"));
var g_specialImages = JSON.parse(lib.readFile("./assets/configs/images.json"));

function isCardNonUnit(card) {
  return card.type === "spell"
    || card.type === "artifact"
    || card.type === "tile";
}

function getSpecialCardClass(card) {
  if (isCardNonUnit(card)) {
    return card.type;
  }

  for (var i = 0; i < g_specialImages.length; i++) {
    var name = g_specialImages[i];

    if (card.name === name) {
      return lib.strstr(name, " ", "-").toLowerCase();
    }
  }

  return "";
}

function getSetName(card) {
  for (var i = 0; i < g_setNames.length; i++) {
    if (card.set === g_setNames[i].id) {
      return g_setNames[i].abbr;
    }
  }
}

function generateCardId(card) {
  var cardId = getSetName(card) + "-";

  // initialize card id's counter
  if (g_setIds[card.set] === undefined) {
    g_setIds[card.set] = 0;
  }

  // add number
  var cardNumber = ++g_setIds[card.set];

  if (cardNumber < 100) {
    cardId += "0";
  }

  if (cardNumber < 10) {
    cardId += "0"
  }

  return cardId + cardNumber;
}

function getCardId(card) {
  if (g_cardIds[card.name] === undefined) {
    g_cardIds[card.name] = generateCardId(card);
  }

  return g_cardIds[card.name];
}

function getCardDescription(card) {
  if (!card.description) {
    return "";
  }

  return lib.mdToHtml(card.description);
}

function getCardHtml(card) {
  var isNonUnit = isCardNonUnit(card);
  var result = (isNonUnit)
    ? lib.readFile("./assets/templates/card-other.html")
    : lib.readFile("./assets/templates/card-unit.html");

  result = result.replace('container', 'container'
    + " " + card.set
    + " " + card.rarity
    + " " + card.faction
    + " " + getSpecialCardClass(card));

  result = result.replace('mana"><span>', 'mana"><span>' + card.mana);
  result = result.replace('rarity">', 'rarity">' + getCardId(card));
  result = result.replace('src="', 'src="' + card.image);
  result = result.replace('name">', 'name">' + card.name);
  result = result.replace('type">', 'type">' + card.type);
  result = result.replace('description">',
    'description">' + getCardDescription(card));

  if (!isNonUnit) {
    result = result.replace('attack">', 'attack">' + card.attack);
    result = result.replace('health">', 'health">' + card.health);
  }

  return result;
}

function writeHtmlPage(cards, filepath, isCondition) {
  var html = lib.readFile("./assets/templates/page.html");
  var items = "";

  for (var i = 0; i < cards.length; i++) {
    if (isCondition(cards[i])) {
      items += getCardHtml(cards[i]);
    }
  }

  html = html.replace("<!-- cards here -->", items);
  html = lib.minifyHtml(html);
  lib.writeFile(filepath, html);
}

module.exports = {
  writeHtmlPage
};
