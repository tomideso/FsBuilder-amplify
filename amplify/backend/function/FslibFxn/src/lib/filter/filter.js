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
      activeClass = _ref$activeClass === void 0 ? "active" : _ref$activeClass,
      _ref$initalFilter = _ref.initalFilter,
      initalFilter = _ref$initalFilter === void 0 ? 1 : _ref$initalFilter;
  var cms_filter = filterArray;
  activeClass = activeClass || "active";
  activeClass = activeClass.replace(".", "");
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
              var filterText = event.currentTarget.getAttribute("filter-by") || "";
              var proceed = (0, _helper.shouldFilter)(filter, filterText, index);
              proceed && initFilter({
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

  var setFilterOn = function setFilterOn() {
    var activeFilters = Object.values(filter).find(function (_ref3) {
      var query = _ref3.query;
      return query.length;
    });

    if (activeFilters) {
      _this.filterOn = true;
    }

    return activeFilters;
  };

  var initFilter = function initFilter(_ref4) {
    var _ref4$filterType = _ref4.filterType,
        filterType = _ref4$filterType === void 0 ? "exclusive" : _ref4$filterType,
        _ref4$index = _ref4.index,
        index = _ref4$index === void 0 ? 0 : _ref4$index,
        _ref4$filterText = _ref4.filterText,
        filterText = _ref4$filterText === void 0 ? "" : _ref4$filterText,
        _ref4$oldValue = _ref4.oldValue,
        oldValue = _ref4$oldValue === void 0 ? "" : _ref4$oldValue,
        _ref4$wildcard = _ref4.wildcard,
        wildcard = _ref4$wildcard === void 0 ? false : _ref4$wildcard,
        _ref4$reset = _ref4.reset,
        reset = _ref4$reset === void 0 ? false : _ref4$reset;
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
      } //set filter on incase element is paginated


    setFilterOn();

    if (_this.hasLoadmore && _this.loadmoreOn) {
      _this.filterObject = filter;
      filterHelper();
      _this.lastFilter = filterHelper;
      return;
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
        return findAndMatchFilterText(filter, get_cms_items(), _this);
      }, target, animation).then(function () {
        filterActive = false;
        var nextAnimation = filterQueue.shift();

        if (nextAnimation) {
          nextAnimation.call(null);
        }
      });
    }

    findAndMatchFilterText(filter, get_cms_items(), _this);
    return filter;
  };
};

var findAndMatchFilterText = function findAndMatchFilterText(filter, master_collection, instance) {
  var disposableNote = (0, _helper.removeMsg)();
  var queries = Object["values"](filter);
  var visible_total = master_collection.reduce(function (total, elem, i) {
    var search_result = queries.reduce(function (curr, _ref5) {
      var query = _ref5.query,
          target = _ref5.target,
          filterRange = _ref5.filterRange;
      //creating a regex to test against
      var val = filterRange ? query : "(".concat(query.join("|"), ")");
      var result = [].slice.call(elem.children).map(function (item, j) {
        item.removeAttribute("wf-fslib-paginated-hide");
        var re = new RegExp(val, "gi"); //checks if target is specified, otherwise use the textcontent from item

        var textContent = (item.querySelector(target) || item).textContent;
        var valid = filterRange ? isInRange(val, textContent) : re.test(textContent);
        var clonedItem = item.cloneNode(true);

        if (valid) {
          clonedItem.style.display = "";
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
    }, []);
    var visibleCount = 0;

    if (search_result.length > 1) {
      var activePageElementIndex = 0;
      [].slice.call(elem.children).map(function (child, k) {
        var display = search_result[k].style.display;
        child.style.display = display;

        if (display != "none") {
          visibleCount++;
          child.setAttribute("wf-fslib-paginated-hide", 2);
          var paged = false; //show only items on current page

          if (instance.isPaginated) {
            paged = (0, _helper.shouldBeVisibleOnActivePage)({
              index: activePageElementIndex,
              active: 1,
              itemsPerPage: instance.itemsPerPage
            });
            activePageElementIndex++;
          }

          if (!paged) {
            child.setAttribute("wf-fslib-paginated-hide", 1);
          }
        }
      });
    }

    return total + visibleCount;
  }, 0);

  if (instance.isPaginated) {
    var pages = Math.ceil(visible_total / instance.itemsPerPage);

    _fsLibrary.FsLibrary.paginate(pages == 1 ? 0 : pages, 1);
  }

  if (!visible_total) {
    // master_collection[0].appendChild(disposableNote);
    var empty = document.querySelector(".empty-message");

    if (empty) {
      empty.style.display = "block";
    }
  }
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
