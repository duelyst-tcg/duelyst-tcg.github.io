function removeImageLink(document) {
    var elements = document.getElementsByClassName("card-image");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        // create new image element
        var imgElement = element.getElementsByTagName("img")[0];
        var newImgElement = document.createElement("img");

        newImgElement.setAttribute("src", imgElement.getAttribute("src"));

        // create new div element
        var newDivElement = document.createElement("div");

        newDivElement.setAttribute("class", "card-image");
        newDivElement.appendChild(newImgElement);
        element.parentNode.replaceChild(newDivElement, element);
    }
}

function removeTitleLink(document) {
    var elements = document.getElementsByClassName("card-title");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var newElement = document.createElement("h2");
        var ctxElement = element.getElementsByClassName("legend-post-title")[0];

        newElement.setAttribute("class", "card-title");
        newElement.innerHTML = ctxElement.textContent;
        element.parentNode.replaceChild(newElement, element);
    }
}

function removeAbilityClasses(document) {
  var elements = document.getElementsByClassName("card-ability");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var newElement = document.createElement("span");
    var ctxElement = element.getElementsByTagName("span")[0];

    newElement.textContent = ctxElement.textContent;
    element.parentNode.replaceChild(newElement, element);
  }
}

function removeDescriptionClasses(document) {
  var elements = document.getElementsByClassName("card-description");

  for (var i = 0; i < elements.length; i++) {
    var spans = elements[i].getElementsByTagName("span");

    for (var item of spans) {
      item.removeAttribute("class");
    }
  }
}

module.exports = {
  removeImageLink,
  removeTitleLink,
  removeAbilityClasses,
  removeDescriptionClasses
};
