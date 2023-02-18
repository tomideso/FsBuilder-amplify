"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _fsLibrary = require("../fsLibrary");

var _utility = require("../utility");

var _animate = _interopRequireDefault(require("../animate"));

var _helper = require("./helper");

_fsLibrary.FsLibrary.prototype.filter = function (_ref) {
  var _this = this;

  var _ref$filterArray = _ref.filterArray,
      filterArray = _ref$filterArray === void 0 ? [] : _ref$filterArray,
      _ref$filterReset = _ref.filterReset,
      filterReset = _ref$filterReset === void 0 ? "" : _ref$filterReset,
      _ref$animation = _ref.animation,
      animation = _ref$animation === void 0 ? this.animation : _ref$animation,
      _ref$activeClass = _ref.activeClass,
      activeClass = _ref$activeClass === void 0 ? "active" : _ref$activeClass;
  var cms_filter = filterArray;
  activeClass = activeClass || "active";
  animation = Object.assign({}, this.animation, animation);
  var filter_type = typeof cms_filter == "string" ? "exclusive" : "multi";

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
  var filterActive = false;
  var filterQueue = [];
  var filter = {}; //to hold categories of filter selectors and their corresponding

  var triggerSelectors = []; //get all collections

  var get_cms_items = function get_cms_items() {
    return [].slice.call(document.querySelectorAll(_this.cms_selector));
  };

  if (Array.isArray(cms_filter)) {
    cms_filter.map(function (val, index) {
      var prevClicked;
      var filterWrapper = val.filterWrapper;
      var selector = "".concat(filterWrapper, " [filter-by]");
      triggerSelectors.push(selector);
      var filter_group = [].slice.call(document.querySelectorAll(selector));
      assignChangeEventToButtons(Object.assign({
        index: index,
        prevClicked: prevClicked,
        filter_group: filter_group
      }, val));
    });
  } else if (typeof cms_filter == "string") {
    var prevClicked;
    var selector = "".concat(cms_filter, " [filter-by]");
    triggerSelectors.push(selector);
    var filter_group = [].slice.call(document.querySelectorAll(selector));
    assignChangeEventToButtons({
      index: 0,
      prevClicked: prevClicked,
      filter_group: filter_group
    });
  } else {
    throw "Incorrect type passed as cms_filter";
  }

  if (filterReset) {
    var resetButton = document.querySelector(filterReset);
    resetButton.addEventListener("click", function () {
      initFilter({
        reset: true
      });
    });
  }

  function assignChangeEventToButtons(_ref2) {
    var index = _ref2.index,
        prevClicked = _ref2.prevClicked,
        filter_group = _ref2.filter_group,
        _ref2$filterType = _ref2.filterType,
        filterType = _ref2$filterType === void 0 ? filter_type : _ref2$filterType,
        _ref2$filterByClass = _ref2.filterByClass,
        filterByClass = _ref2$filterByClass === void 0 ? null : _ref2$filterByClass,
        _ref2$filterRange = _ref2.filterRange,
        filterRange = _ref2$filterRange === void 0 ? false : _ref2$filterRange;
    filter[index] = {
      target: filterByClass,
      query: [],
      filterRange: filterRange
    };
    filter_group.map(function (elem, j) {
      var tag_element = elem && elem.tagName;
      var oldValue = "";

      if (tag_element == "SELECT") {
        elem.addEventListener("change", (0, _utility.debounce)(function (event) {
          var filterText = event.target.selectedOptions[0].value || "";
          var hold = oldValue;
          oldValue = filterText;
          (0, _helper.shouldFilter)(filter, filterText, index) && initFilter({
            filterType: filterType,
            index: index,
            filterText: filterText,
            oldValue: hold,
            wildcard: true
          });
        }, 500));
      } else if (tag_element == "FORM") {
        (0, _helper.preventFormSubmission)(elem);
        var minInput = elem.querySelector('input[name="min"]');
        var maxInput = elem.querySelector('input[name="max"]');
        var hold = oldValue;

        var passValue = function passValue(filterText) {
          oldValue = filterText;
          return initFilter({
            index: index,
            filterType: filterType,
            wildcard: true,
            oldValue: hold,
            filterText: filterText
          });
        };

        addInputListener(minInput, maxInput, passValue);
        addInputListener(maxInput, minInput, passValue);
      } else if (tag_element == "INPUT") {
        //handle checkbox and radio button
        switch (elem.type) {
          case "text":
            (0, _helper.preventParentFormSubmission)(elem);
            elem.addEventListener("input", (0, _utility.debounce)(function (event) {
              var filterText = event.target.value;
              var hold = oldValue;
              oldValue = filterText;
              (0, _helper.shouldFilter)(filter, filterText, index) && initFilter({
                filterType: filterType,
                index: index,
                filterText: filterText,
                oldValue: hold,
                wildcard: true
              });
            }, 500));
            break;

          default:
            elem.addEventListener("change", function (event) {
              var filterText = !event.target.checked ? "" : event.currentTarget.getAttribute("filter-by") || "";
              (0, _helper.shouldFilter)(filter, filterText, index) && initFilter({
                filterType: filterType,
                index: index,
                filterText: filterText
              });
            });
            break;
        }
      } else {
        elem.onclick = function (event) {
          var active = event.currentTarget.className; //only one element should have active class for or

          if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filterType)) {
            if (prevClicked) prevClicked.classList.remove(activeClass);
          }

          prevClicked = event.currentTarget;

          if (active.includes(activeClass)) {
            prevClicked.classList.remove(activeClass);
          } else {
            prevClicked.classList.add(activeClass);
          }

          var filterText = prevClicked.getAttribute("filter-by") || ""; //prevent further filter if filter is empty and reset button is clicked.

          (0, _helper.shouldFilter)(filter, filterText, index) && initFilter({
            filterType: filterType,
            index: index,
            filterText: filterText
          });
        };
      }
    });
  }

  var initFilter = function initFilter(_ref3) {
    var _ref3$filterType = _ref3.filterType,
        filterType = _ref3$filterType === void 0 ? "exclusive" : _ref3$filterType,
        _ref3$index = _ref3.index,
        index = _ref3$index === void 0 ? 0 : _ref3$index,
        _ref3$filterText = _ref3.filterText,
        filterText = _ref3$filterText === void 0 ? "" : _ref3$filterText,
        _ref3$oldValue = _ref3.oldValue,
        oldValue = _ref3$oldValue === void 0 ? "" : _ref3$oldValue,
        _ref3$wildcard = _ref3.wildcard,
        wildcard = _ref3$wildcard === void 0 ? false : _ref3$wildcard,
        _ref3$reset = _ref3.reset,
        reset = _ref3$reset === void 0 ? false : _ref3$reset;
    filterText = (0, _utility.escapeRegExp)(filterText.replace(/\*/gi, ""));
    var prevClicked = filter[index].query.includes(filterText);
    var update = filter[index].query.filter(function (val) {
      return val != filterText;
    });
    var nonWildcard = filter[index].query.filter(function (val) {
      return val != oldValue;
    });

    if (reset) {
      filter = (0, _helper.resetAllFilter)({
        filter: filter,
        activeClass: activeClass,
        triggerSelectors: triggerSelectors
      });
    } //checks if it has previously been clicked
    else if (prevClicked && !wildcard) {
        filter[index].query = update;
      } else {
        filter[index].query = nonWildcard;

        if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filterType)) {
          filter[index].query = [filterText];
        } else {
          //it is definitely "multi"
          filterText && filterText.length && filter[index].query.push(filterText);
        }
      }

    if (animation.enable && animation.queue && filterActive) {
      return filterQueue.push(function () {
        return filterHelper();
      });
    }

    return filterHelper();
  };

  var filterHelper = function filterHelper() {
    filterActive = true; //try to fix queue here

    if (animation.enable) {
      var target = document.querySelector(_this.cms_selector);
      return _animate["default"].methods.animate(function () {
        return findAndMatchFilterText(filter, get_cms_items());
      }, target, animation).then(function () {
        filterActive = false;
        var nextAnimation = filterQueue.shift();

        if (nextAnimation) {
          nextAnimation.call(null);
        }
      });
    }

    findAndMatchFilterText(filter, get_cms_items());
  };
};

var findAndMatchFilterText = function findAndMatchFilterText(filter, master_collection) {
  var disposableNote = (0, _helper.removeMsg)();
  var queries = Object["values"](filter);
  master_collection.map(function (elem, i) {
    var search_result = queries.reduce(function (curr, _ref4) {
      var query = _ref4.query,
          target = _ref4.target,
          filterRange = _ref4.filterRange;
      //creating a regex to test against
      var val = filterRange ? query : "(".concat(query.join("|"), ")");
      var result = [].slice.call(elem.children).map(function (item, j) {
        var re = new RegExp(val, "gi"); //checks if target is specified, otherwise use the textcontent from item

        var textContent = (item.querySelector(target) || item).textContent;
        var valid = filterRange ? isInRange(val, textContent) : re.test(textContent);
        var clonedItem = item.cloneNode(true);

        if (valid) {
          clonedItem.style.display = "block";
        } else {
          clonedItem.style.display = "none";
        } // return clonedItem.outerHTML;


        return clonedItem;
      });

      if (curr.length < 1) {
        return result;
      } //intersections of the results


      return (0, _toConsumableArray2["default"])(curr.map(function (a, index) {
        if (a.style.display !== result[index].style.display) {
          a.style.display = "none";
        }

        return a;
      }));
    }, []); //.join("").trim()

    if (search_result.length > 1) {
      [].slice.call(master_collection[i].children).map(function (child, k) {
        child.style.display = search_result[k].style.display;
      });
    }

    var _master_collection$i$ = master_collection[i].getBoundingClientRect(),
        height = _master_collection$i$.height; //empty search match


    if (height < 1) {
      master_collection[i].appendChild(disposableNote);
    }
  });
};

var isInRange = function isInRange(searchRanges, targetText) {
  var ans = searchRanges.filter(function (range) {
    var boundaries = range.split("-").map(parseFloat);
    var num = targetText.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") || 0;
    num = parseFloat(num);
    return (num - boundaries[0]) * (num - boundaries[1]) <= 0;
  });
  return searchRanges.length ? ans.length : true;
};

var addInputListener = function addInputListener(elem, otherElem, fxn) {
  elem.addEventListener("input", (0, _utility.debounce)(function (event) {
    event.target.value = event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    var name = event.target.name;
    var val = event.target.value;
    var otherValue = otherElem.value || 0;
    var filter_text = name == "min" ? "".concat(val, "-").concat(otherValue) : "".concat(otherValue, "-").concat(val);
    fxn(filter_text);
  }, 500));
};
//# sourceMappingURL=filter.js.map
