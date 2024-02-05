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
  var cardClass = getSpecialCardClass(card);
  var result = (isNonUnit)
    ? lib.readFile("./assets/templates/card-other.html")
    : lib.readFile("./assets/templates/card-unit.html");

  result = result.replace('container', 'container'
    + " " + card.set
    + " " + card.rarity
    + " " + card.faction
    + " " + cardClass);

  var mana = card.type === "general"
    ? "G"
    : card.mana;

  var type = card.rarity === "token"
    ? "token / " + card.type
    : card.type;

  result = result.replace('mana"><span>', 'mana"><span>' + mana);
  result = result.replace('rarity">', 'rarity">' + getCardId(card));
  result = result.replace('class="card-back" src="">', 'class="card-back" src="../../assets/img/bg/' + card.faction + '.png">');
  result = result.replace('class="card-front" src="">', 'class="card-front" src="' + card.image.replace("./", "../../") + '">');
  result = result.replace('name">', 'name">' + card.name);
  result = result.replace('type">', 'type">' + type);
  result = result.replace('description">',
    'description">' + getCardDescription(card));

  if (!isNonUnit) {
    result = result.replace('attack">', 'attack">' + card.attack);
    result = result.replace('health">', 'health">' + card.health);
  }

  return result;
}

function writeSingles(cards, filepath, filters) {
  var items = [];

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var isMatch = true;

    for (var j = 0; j < filters.length; j++) {
      if (!filters[j](card)) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      items.push(card);
    }
  }

  writeHtmlPage(items, filepath);
}

function writeDeck(cards, filepath, deck) {
  var items = [];
  var deckCardNames = Object.keys(deck.cards);
  
  // find general
  for (var j = 0; j < cards.length; j++) {
    var card = cards[j];

    if (card.name === deck.general) {
      items.push(card);
    }
  }

  // find matching card (in order of decklist)
  for (var i = 0; i < deckCardNames.length; i++) {
    var name = deckCardNames[i];

    for (var j = 0; j < cards.length; j++) {
      var card = cards[j];

      if (card.name !== name) {
        continue;
      }

      // add cards
      var count = deck.cards[name];

      for (var k = 0; k < count; k++) {
        items.push(card);
      }
    }
  }

  writeHtmlPage(items, filepath);
}

function writeHtmlPage(cards, filepath) {
  var html = lib.readFile("./assets/templates/card-page.html");
  var items = "";

  for (var i = 0; i < cards.length; i++) {
    items += getCardHtml(cards[i]);
  }

  html = html.replace("<!-- cards here -->", items);
  html = lib.minifyHtml(html);
  lib.writeFile(filepath, html);
}

module.exports = {
  writeSingles,
  writeDeck
};
