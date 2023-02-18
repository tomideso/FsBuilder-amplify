"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _utility = require("./utility");

var _fsLibrary = require("./fsLibrary");

/**
 * Combine all the collection items into one collection.
 */
_fsLibrary.FsLibrary.prototype.combine = function () {
  var _this = this;

  this.setNextButtonIndex(); //get all collections

  var visible_collection = [].slice.call(document.querySelectorAll(this.cms_selector)).filter(_utility.isVisible);
  var nextButton = null; //copies the cms items into the first collection list

  visible_collection[0].innerHTML = visible_collection.reduce(function (curr, item) {
    //gets all the items
    var aNextButton = item.nextElementSibling;

    if (aNextButton && (0, _utility.isVisible)(aNextButton) && !nextButton) {
      nextButton = aNextButton.outerHTML;
    }

    return [].concat((0, _toConsumableArray2["default"])(curr), [item.innerHTML]);
  }, []).join("");

  if (nextButton) {
    nextButton.outerHTML = nextButton.outerHTML + nextButton;
  } //deletes the rest collection list


  var done = visible_collection.map(function (elem, i) {
    if (i > 0) {
      elem.parentElement.outerHTML = "";
    }

    return Promise.resolve();
  });
  Promise.all(done).then(function (r) {
    if (window.Webflow.require("ix2")) {
      _this.reinitializeWebflow();
    }
  });
};
//# sourceMappingURL=combine.js.map
