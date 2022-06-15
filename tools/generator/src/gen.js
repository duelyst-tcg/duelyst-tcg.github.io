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
  "Ragnora the Relentless":,
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
  "Grandmaster Kraigon":,
  "vindicator",
  "Earth Sister Taygete",
  "Storm Sister Alkyone",
  "Hamon Bladeseeker"
];

function getSpecialCardClass(card) {
  for (var i = 0; i < g_specialCardImages.length; i++) {
    var name = g_specialCardImages[i];

    if (card.name === name) {
      return name.replace(" ", "-").toLowerCase();
    }
  }

  return undefined;
}

function generateCardId(card) {
    var cardId = card.set + "-";

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
