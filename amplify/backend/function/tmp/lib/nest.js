"use strict";

var _fsLibrary = require("./fsLibrary");

_fsLibrary.FsLibrary.prototype.nest = function (_ref) {
  var textList = _ref.textList,
      nestSource = _ref.nestSource,
      nestTarget = _ref.nestTarget;
  this.setNestConfig({
    textList: textList,
    nestSource: nestSource,
    nestTarget: nestTarget
  });
  var master_collections = Array.from(document.querySelectorAll(this.cms_selector));
  var sourceLinks = [].slice.call(document.querySelectorAll(nestSource + " a"));
  master_collections.forEach(function (collection, i) {
    var textArray = collection.querySelectorAll(textList);
    var target = collection.querySelectorAll(nestTarget);
    textArray.forEach(function (textElem, j) {
      if (textElem && target[j]) {
        var tags = textElem.textContent;
        tags = tags.replace(/\s*,\s*/gi, "|");
        var tagsArry = tags.split("|");
        tags = "^(" + tags + ")$";
        target[j].innerHTML = sourceLinks.filter(function (link) {
          var regex = new RegExp(tags, "gi");
          var test = regex.test(link.textContent.trim());
          return test;
        }).sort(function (a, b) {
          return tagsArry.indexOf(a.textContent.trim()) - tagsArry.indexOf(b.textContent.trim());
        }).map(function (elem) {
          return elem.outerHTML;
        }).join("");
      }
    });
  });
};

_fsLibrary.FsLibrary.prototype.setNestConfig = function (config) {
  if (!this.nestConfig) {
    this.nestConfig = config;
  }
};
//# sourceMappingURL=nest.js.map
