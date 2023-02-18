"use strict";

var _fsLibrary = require("./fsLibrary");

_fsLibrary.FsLibrary.prototype.prevnext = function (_ref) {
  var nextTarget = _ref.nextTarget,
      previousTarget = _ref.previousTarget,
      contentId = _ref.contentId,
      loadImages = _ref.loadImages;
  var master_collection = this.getMasterCollection();
  var next = document.querySelector(nextTarget);
  var prev = document.querySelector(previousTarget);
  var baseId = document.querySelector(contentId).textContent;
  var main_content = [].slice.call(master_collection.children);
  var idx = main_content.findIndex(function (elem) {
    return elem.querySelector(contentId).textContent == baseId;
  });
  var nextElem = main_content[idx + 1];
  var prevElem = main_content[idx - 1];

  if (!!nextElem) {
    nextElem.querySelectorAll(loadImages).forEach(function (element) {
      element.style.display = "block";
    });
    next.innerHTML = nextElem.innerHTML;
    nextElem.querySelectorAll(loadImages).forEach(function (element) {
      element.style.display = "";
    });
  } else {
    try {
      next.querySelector(":not(.prev-next-empty-message)").style.display = "none";
      next.querySelector(".prev-next-empty-message").style.display = "block";
    } catch (e) {}
  }

  if (!!prevElem) {
    prevElem.querySelectorAll(loadImages).forEach(function (element) {
      element.style.display = "block";
    });
    prev.innerHTML = prevElem.innerHTML;
    prevElem.querySelectorAll(loadImages).forEach(function (element) {
      element.style.display = "";
    });
  } else {
    try {
      prev.querySelector(":not(.prev-next-empty-message)").style.display = "none";
      prev.querySelector(".prev-next-empty-message").style.display = "block";
    } catch (e) {}
  }
};
//# sourceMappingURL=prevNext.js.map
