function all(card) {
  return true;
}

function isNotToken(card) {
  return card.rarity !== "token";
}

function isToken(card) {
  return !isNotToken(card);
}

function isLyonar(card) {
  return card.faction === "lyonar";
}

function isSonghai(card) {
  return card.faction === "songhai";
}

function isVetruvian(card) {
  return card.faction === "vetruvian";
}

function isAbyssian(card) {
  return card.faction === "abyssian";
}

function isMagmar(card) {
  return card.faction === "magmar";
}

function isVanar(card) {
  return card.faction === "vanar";
}

function isNeutral(card) {
  return card.faction === "neutral";
}

function isBoss(card) {
  return card.faction === "boss";
}

module.exports = {
  all,
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
