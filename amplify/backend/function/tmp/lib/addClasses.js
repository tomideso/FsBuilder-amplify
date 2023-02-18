"use strict";

var _fsLibrary = require("./fsLibrary");

_fsLibrary.FsLibrary.prototype.addclasses = function () {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    classArray: [],
    frequency: 2,
    start: 1
  };
  var parent = document.querySelector(this.cms_selector);
  var frequency = config.frequency,
      start = config.start,
      classNames = config.classArray;
  this.addClassConfig = config;
  this.addClass = true;

  if (frequency < 0) {
    throw "unaccepted value passed as frequency";
  } else if (start < 1) {
    throw "unaccepted value passed as start";
  }

  classNames.map(function (_ref) {
    var target = _ref.classTarget,
        alt = _ref.classToAdd;
    var list = parent.querySelectorAll(target);
    var targerIsDirectChild = true;

    if (parent.children[0] != list[0]) {
      targerIsDirectChild = false;
      list = parent.children;
    }

    var addon = alt.replace(/\./g, "");

    for (var j = start - 1; j < list.length; j += frequency) {
      if (targerIsDirectChild) {
        list[j].classList.toggle(addon);
      } else {
        list[j].querySelectorAll(target).forEach(function (elem) {
          elem.classList.toggle(addon);
        });
      }

      if (frequency == 0) {
        break;
      }

      _this.reinitializeWebflow();
    }
  });
};
//# sourceMappingURL=addClasses.js.map
