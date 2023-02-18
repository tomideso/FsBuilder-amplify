"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fsLibrary = require("./fsLibrary");

var _animate = _interopRequireDefault(require("./animate"));

var _utility = require("./utility");

_fsLibrary.FsLibrary.prototype.sort = function (_ref) {
  var _this = this;

  var sortTrigger = _ref.sortTrigger,
      sortReverse = _ref.sortReverse,
      activeClass = _ref.activeClass,
      animation = _ref.animation;
  animation = Object.assign({}, this.animation, animation);

  if (animation) {
    animation.enable = !/^false$/.test(String(animation.enable));
    var effects = animation.effects.replace("fade", "");
    animation.effects = effects;

    if (animation.effects.indexOf("translate") < 0) {
      animation.effects += " translate(0px,0px)  ";
    }

    this.animation = animation;
  }

  animation = this.animation;

  var get_cms_items = function get_cms_items() {
    return [].slice.call(document.querySelectorAll(_this.cms_selector));
  };

  var triggerElem = [].slice.call(document.querySelectorAll(sortTrigger));
  triggerElem.map(function (elem) {
    var triggerTag = elem && elem.tagName;

    if (triggerTag == "SELECT") {
      elem.addEventListener("change", (0, _utility.debounce)(function (event) {
        var sortTarget = event.target.selectedOptions[0].value;
        sortTarget = sortTarget || event.getAttribute("sort-by");
        sortHelper({
          sortTarget: sortTarget,
          sortReverse: sortReverse
        });
      }, 200));
    } else if (triggerTag == "INPUT") {
      //handle checkbox and radio button
      elem.addEventListener("change", (0, _utility.debounce)(function (event) {
        var sortTarget = event.target.getAttribute("sort-by") || "";
        var active = String(activeClass).replace(".", "");
        removeActiveClassFromTriggers(sortTarget, active);
        event.target.classList.toggle(active);
        sortHelper({
          sortTarget: sortTarget,
          sortReverse: sortReverse
        });
      }, 200));
    } else {
      elem.addEventListener("click", function (event) {
        var target = event.currentTarget;
        var sortTarget = target.getAttribute("sort-by") || "";
        var active = String(activeClass).replace(".", "");
        var previouslyClicked = target.classList.contains(active);
        removeActiveClassFromTriggers(target, active);
        elem.classList.toggle(active);
        var isReversed = previouslyClicked ? !sortReverse : sortReverse;
        sortHelper({
          sortTarget: sortTarget,
          sortReverse: isReversed
        });
      });
    }
  });

  var removeActiveClassFromTriggers = function removeActiveClassFromTriggers(target, activeClass) {
    triggerElem.forEach(function (elem) {
      if (elem.outerHTML != target.outerHTML) {
        elem.classList.remove(activeClass);
      }
    });
  };

  var collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base"
  });

  var sortHelper = function sortHelper(_ref2) {
    var sortTarget = _ref2.sortTarget,
        sortReverse = _ref2.sortReverse;

    var initSort = function initSort() {
      return sortMasterCollection({
        sortReverse: sortReverse,
        sortTarget: sortTarget
      });
    };

    if (animation.enable) {
      var target = document.querySelector(_this.cms_selector);

      _animate["default"].methods.animate(initSort, target, animation);
    } else {
      initSort();
    }
  };

  var sortMasterCollection = function sortMasterCollection(_ref3) {
    var sortTarget = _ref3.sortTarget,
        sortReverse = _ref3.sortReverse;
    var master_collection = get_cms_items();
    master_collection.map(function (elem) {
      return [].slice.call(elem.children).sort(function (a, b) {
        var x = a.querySelector(sortTarget).textContent;
        var y = b.querySelector(sortTarget).textContent;
        var num1 = parseFloat(x);
        var num2 = parseFloat(y);

        if (!isNaN(num1 + num2)) {
          return num2 - num1;
        }

        return collator.compare(x, y);
      }).map(function (sortedElem) {
        if (sortReverse) {
          elem.insertBefore(sortedElem, elem.firstChild);
          return;
        }

        elem.appendChild(sortedElem);
      });
    });
  };
};
//# sourceMappingURL=sort.js.map
