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
  removeDescriptionClasses
};
