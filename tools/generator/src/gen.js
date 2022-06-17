var lib = require("./lib");

var g_cardIds = {};
var g_setIds = {};
var g_setNames = {
    "core-set": "CORE",
    "denizens-of-shimzar": "DEOS",
    "bloodbound-ancients": "BLAN",
    "unearthed-prophecy": "UNPR",
    "immortal-vanguard": "IMVA",
    "trials-of-mythron": "TROM",
    "gauntlet-specials": "GASP"
};
var g_specialCardImages = [
  "Starhorn the Seeker",
  "Ragnora the Relentless",
  "Reva Eventide",
  "Shidai Stormblossom",
  "Argon Highmayne",
  "Ziran Sunforge",
  "Brome Warcrest",
  "Scioness Sajj",
  "Zirix Starstrider",
  "Ciphyron Ascendant",
  "Cassyva Soulreaper",
  "Maehv Skinsolder",
  "Kara Winterblade",
  "Ilena Cryobyte",
  "Grandmaster Kraigon",
  "vindicator",
  "Earth Sister Taygete",
  "Storm Sister Alkyone",
  "Hamon Bladeseeker"
];

function isCardNonUnit(card) {
  return card.type === "spell"
    || card.type === "artifact"
    || card.type === "tile";
}

function getSpecialCardClass(card) {
  if (isCardNonUnit(card)) {
    return card.type;
  }

  for (var i = 0; i < g_specialCardImages.length; i++) {
    var name = g_specialCardImages[i];

    if (card.name === name) {
      return name.replace(" ", "-").toLowerCase();
    }
  }

  return "";
}

function generateCardId(card) {
  var cardId = g_setNames[card.set] + "-";

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

module.exports = {
  getCardHtml
};
