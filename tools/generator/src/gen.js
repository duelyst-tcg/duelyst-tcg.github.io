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

function generateCardId(setName) {
    var cardId = setName + "-";

    // initialize card id's counter
    if (g_setIds[setName] === undefined) {
        g_setIds[setName] = 0;
    }

    // add number
    var cardNumber = ++g_setIds[setName];

    if (cardNumber < 100) {
        cardId += "0";
    }

    if (cardNumber < 10) {
        cardId += "0"
    }

    return cardId + cardNumber;
}

function getCardId(cardName, setName) {
    if (g_cardIds[cardName] === undefined) {
        g_cardIds[cardName] = generateCardId(setName);
    }

    return g_cardIds[cardName];
}

function getCardSet(element) {
    var setNameKeys = Object.keys(g_setNames);

    for (var j = 0; j < setNameKeys.length; j++) {
        var setNameId = setNameKeys[j];

        if (element.classList.contains(setNameId)) {
            return g_setNames[setNameId];
        }
    }

    return undefined;
}

function applySetType(document) {
    var elements = document.getElementsByClassName("card-rarity");

    for (var i = 0; i < elements.length; i++) {
        var parent = elements[i].parentElement.parentElement;

        // get card name
        var cardName = parent
            .getElementsByClassName("card-title")[0]
            .innerHTML;

        // get card set
        var cardSet = getCardSet(parent);

        // set card id
        elements[i].innerHTML = getCardId(cardName, cardSet);
    }
}
