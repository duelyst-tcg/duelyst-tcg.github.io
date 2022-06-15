var g_cardSets = [
  "core-set",
  "denizens-of-shimzar",
  "bloodbound-ancients",
  "unearthed-prophecy",
  "immortal-vanguard",
  "trials-of-mythron"
];
var g_cardRarities = [
  "token",
  "basic",
  "common",
  "rare",
  "epic",
  "legendary",
  "mythron"
];
var g_cardTypes = [
  "general",
  "minion",
  "spell",
  "artifact",
  "battle-pet",
  "arcanyst",
  "dervish",
  "golem",
  "mech",
  "structure",
  "vespyr"
];
var g_cardFactions = [
  "lyonar",
  "songhai",
  "vetruvian",
  "abyssian",
  "magmar",
  "vanar",
  "neutral"
];

function strstr(text, a, b) {
   return text.split(a).join(b);
}

function removeGarbage(text) {
  var bold = "**";
  var eol = "\n";

  // convert html to markdown
  text = strstr(text, "<a>", bold);
  text = strstr(text, "</a>", bold);
  text = strstr(text, "<span>", bold);
  text = strstr(text, "</span>", bold);
  text = strstr(text, "</strong>", bold);
  text = strstr(text, "<strong>", bold);
  text = strstr(text, "<br>", eol);
  text = strstr(text, "</div>", eol);
  text = strstr(text, '<div class="card-ability">', "");

  // remove special characters
  text = strstr(text, "’", "'");
  text = strstr(text, "&nbsp;", " ");

  // remove whitespace
  text = text.trim();

  // remove trailing newline
  if (text[text.length - 2] == "\n") {
    text.slice(0, -2)
  }

  return text;
}

function getClass(element, arr) {
  for (var j = 0; j < arr.length; j++) {
    if (element.classList.contains(arr[j])) {
      return arr[j];
    }
  }

  return "";
}

function getName(element) {
  var target = element.getElementsByClassName("card-title")[0];
  return removeGarbage(target.textContent);
}

function getImage(element) {
  var target = element.getElementsByTagName("img")[0];
  var faction = getFaction(element);
  return target.getAttribute("src")
    .replace("https://duelspot.com/assets/uploads/", "./assets/img/")
    .replace(".gif", ".png");
}

function getSet(element) {
  return getClass(element, g_cardSets);
}

function getRarity(element) {
  return getClass(element, g_cardRarities);
}

function getFaction(element) {
  return getClass(element, g_cardFactions);
}

function getType(element) {
  return getClass(element, g_cardTypes);
}

function isToken(element) {
  return element.classList.contains("token");
}

function getMana(element) {
  var target = element
    .getElementsByClassName("card-mana")[0]
    .getElementsByTagName("span")[0];

  return parseInt(target.textContent);
}

function getAttack(element) {
  var target = element.getElementsByClassName("card-attack")[0];
  return parseInt(target.textContent);
}

function getHealth(element) {
  var target = element.getElementsByClassName("card-health")[0];
  return parseInt(target.textContent);
}

function getDescription(element) {
  var target = element.getElementsByClassName("card-description")[0];
  return removeGarbage(target.innerHTML);
}

class Card {
  constructor(element) {
    this.name = getName(element);
    this.image = getImage(element);
    this.set = getSet(element);
    this.rarity = getRarity(element);
    this.faction = getFaction(element);
    this.type = getType(element);
    this.token = isToken(element);
    this.mana = getMana(element);

    var description = getDescription(element);
    if (description !== "") {
      this.description = description;
    }

    if (this.type !== "spell" && this.type !== "artifact") {
      this.attack = getAttack(element);
      this.health = getHealth(element);
    }
  }
}

function getCard(cards, name) {
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].name === name) {
      return cards[i];
    }
  }

  return undefined;
}

function addCard(cards, card) {
  var result = getCard(cards, card.name);

  if (result !== undefined) {
    // card already exists
    return;
  }

  database.push(card);
}

function removeDescriptionClasses(document) {
  var elements = document.getElementsByClassName("card-description");

  for (var i = 0; i < elements.length; i++) {
    var spans = elements[i].getElementsByTagName("span");
    var as = elements[i].getElementsByTagName("a");

    for (var j = 0; j < spans.length; j++) {
      spans[j].removeAttribute("class");
    }

    for (var j = 0; j < as.length; j++) {
      as[j].removeAttribute("class");
      as[j].removeAttribute("href");
    }
  }
}

module.exports = {
  Card,
  getName,
  addCard,
  removeDescriptionClasses
};
