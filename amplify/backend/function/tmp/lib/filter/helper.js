"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldFilter = shouldFilter;
exports.resetAllFilter = exports.preventFormSubmission = exports.preventParentFormSubmission = exports.removeMsg = void 0;

var _utility = require("../utility");

var removeMsg = function removeMsg() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "No match found.";
  var msg = document.querySelector(".fslib-no-match");

  if (msg) {
    msg.outerHTML = "";
  }

  var note = document.createElement("div");
  note.style.padding = "15px";
  note.className = "fslib-no-match";
  note.textContent = "No match found.";
  return note;
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
    });
  });
  Object["values"](filter).forEach(function (val, idx) {
    filter[idx].query = [];
  });
  return filter;
};

exports.resetAllFilter = resetAllFilter;
//# sourceMappingURL=helper.js.map
