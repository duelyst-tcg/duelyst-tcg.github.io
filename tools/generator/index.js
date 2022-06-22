var lib = require("./src/lib");
var gen = require("./src/gen");
var filter = require("./src/filter");

function main() {
  var cards = JSON.parse(lib.readFile("./assets/configs/cards.json"));

  gen.writeHtmlPage(cards, "../../cards/all.html", filter.isNotToken);
  gen.writeHtmlPage(cards, "../../cards/tokens.html", filter.isToken);
  gen.writeHtmlPage(cards, "../../cards/lyonar.html", filter.isLyonar);
  gen.writeHtmlPage(cards, "../../cards/songhai.html", filter.isSonghai);
  gen.writeHtmlPage(cards, "../../cards/vetruvian.html", filter.isVetruvian);
  gen.writeHtmlPage(cards, "../../cards/vetruvian.html", filter.isAbyssian);
  gen.writeHtmlPage(cards, "../../cards/magmar.html", filter.isMagmar);
  gen.writeHtmlPage(cards, "../../cards/vanar.html", filter.isVanar);
  gen.writeHtmlPage(cards, "../../cards/neutral.html", filter.isNeutral);
  gen.writeHtmlPage(cards, "../../cards/boss.html", filter.isBoss);
}

main();
