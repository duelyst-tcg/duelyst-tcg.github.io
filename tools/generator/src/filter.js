function isNotToken(card) {
  return card.rarity !== "token";
}

function isToken(card) {
  return card.rarity !== isNotToken(card);
}

function isLyonar(card) {
  return isNotToken(card) && card.faction === "lyonar";
}

function isSonghai(card) {
  return isNotToken(card) && card.faction === "songhai";
}

function isVetruvian(card) {
  return isNotToken(card) && card.faction === "vetruvian";
}

function isAbyssian(card) {
  return isNotToken(card) && card.faction === "abyssian";
}

function isMagmar(card) {
  return isNotToken(card) && card.faction === "magmar";
}

function isVanar(card) {
  return isNotToken(card) && card.faction === "vanar";
}

function isNeutral(card) {
  return isNotToken(card) && card.faction === "neutral";
}

function isBoss(card) {
  return isNotToken(card) && card.faction === "boss";
}

module.exports = {
  isNotToken,
  isToken,
  isLyonar,
  isSonghai,
  isVetruvian,
  isAbyssian,
  isMagmar,
  isVanar,
  isNeutral,
  isBoss
};
