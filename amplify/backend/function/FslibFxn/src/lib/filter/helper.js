"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldFilter = shouldFilter;
exports.shouldBeVisibleOnActivePage = exports.resetAllFilter = exports.preventFormSubmission = exports.preventParentFormSubmission = exports.removeMsg = void 0;

var _utility = require("../utility");

var removeMsg = function removeMsg() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "No match found.";
  var msgElement = document.querySelector(".empty-message");

  if (msgElement) {
    // msg.outerHTML = "";
    msgElement.style.display = "none";
  }

  return msgElement; // const note = document.createElement("div");
  // // note.style.padding = "15px";
  // note.className = "filter-empty-message";
  // note.textContent = "No match found.";
  // return note;
};

exports.removeMsg = removeMsg;

function shouldFilter(filter, filterText, index) {
  var isEmpty = !filterText.trim();
  var tag = filter[index].query;

  if (isEmpty && tag.includes(filterText)) {
    return false;
  }

  if (isEmpty && !tag.length) {
    return false;
  }

  return true;
}

var preventParentFormSubmission = function preventParentFormSubmission(elem) {
  var formElem = (0, _utility.getClosest)(elem, "form");

  if (formElem) {
    preventFormSubmission(formElem);
  }
};

exports.preventParentFormSubmission = preventParentFormSubmission;

var preventFormSubmission = function preventFormSubmission(formElem) {
  formElem.onsubmit = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  };
};

exports.preventFormSubmission = preventFormSubmission;

var resetAllFilter = function resetAllFilter(_ref) {
  var filter = _ref.filter,
      triggerSelectors = _ref.triggerSelectors,
      activeClass = _ref.activeClass;
  triggerSelectors.map(function (selector) {
    Array.from(document.querySelectorAll(selector)).forEach(function (elem, i) {
      elem.classList.remove(activeClass);

      if (elem.tagName == "INPUT") {
        switch (elem.type) {
          case "text":
            elem.value = "";
            break;

          default:
            elem.checked = false;
            break;
        }
      }

      if (elem.tagName == "SELECT") {
        elem.selectedIndex = 0;
      }
    });
  });
  Object["values"](filter).forEach(function (val, idx) {
    filter[idx].query = [];
  });
  return filter;
};

exports.resetAllFilter = resetAllFilter;

var shouldBeVisibleOnActivePage = function shouldBeVisibleOnActivePage(_ref2) {
  var index = _ref2.index,
      active = _ref2.active,
      itemsPerPage = _ref2.itemsPerPage;
  var last = itemsPerPage * parseInt(active);
  var first = last - itemsPerPage;

  if (index >= first && index < last) {
    return true;
  }

  return false;
};

exports.shouldBeVisibleOnActivePage = shouldBeVisibleOnActivePage;
//# sourceMappingURL=helper.js.map
