function getCard(database, name) {
  var cards = database.cards;

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].name === name) {
      return cards[i];
    }
  }

  return undefined;
}

function addCard(database, card) {
  var result = getCard(database, card.name);

  if (result !== undefined) {
    // card already existsunction
    return;
  }

  database.cards.push(card);
}

function getName(element) {
  return "";
}

function getImg(element) {
  return "";
}

function getSet(element) {
  return "";
}

function getRarity(element) {
  return "";
}

function getType(element) {
  return "";
}

function isToken(element) {
  return false;
}

function getMana(element) {
  return 0;
}

function getAttack(element) {
  return 0;
}

function getHealth(element) {
  return 0;
}

function getDescription(element) {
  return "";
}

module.exports = {
  addCard,
  getName,
  getImg,
  getSet,
  getRarity,
  getType,
  isToken,
  getMana,
  getAttack,
  getHealth,
  getDescription
};
