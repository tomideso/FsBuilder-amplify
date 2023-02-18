"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _animate = _interopRequireDefault(require("./animate"));

var _index = require("../js/util/index");

var _utility = require("./utility");

var FsLibrary = /*#__PURE__*/function () {
  function FsLibrary(cms_selector) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      type: 1,
      className: "image"
    };
    (0, _classCallCheck2["default"])(this, FsLibrary);
    this.animation = {
      enable: true,
      duration: 250,
      easing: "ease-in-out",
      effects: "translate(0px,0px)",
      queue: true
    };
    this.index = 0;
    this.animationStyle = "\n        \n\n    @keyframes fade-in {\n        0% {\n            opacity: 0;\n           transform:{{transform}};\n        }\n        100% {\n            transform:translate(0) rotate3d(0) rotate(0) scale(1);\n            opacity: 1;\n        }\n      }\n      \n      .fslib-fadeIn {\n        animation-name: fade-in;\n        animation-duration: {{duration}}s;\n        animation-iteration-count: 1;\n        animation-timing-function: {{easing}};\n        animation-fill-mode: forwards;\n      }\n";
    this.tinyImgBase64 = "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"; //   this.lazyLoadOpt={type:1,...opt};

    opt && this.lazyLoad(cms_selector, opt.className);
    this.cms_selector = cms_selector;
  }

  (0, _createClass2["default"])(FsLibrary, [{
    key: "reinitializeWebflow",
    value: function reinitializeWebflow() {
      window.Webflow.destroy();
      window.Webflow.ready(); // (<any>window).Webflow.require("ix2").init();
    }
  }, {
    key: "lazyLoad",
    value: function lazyLoad(cms_selector, className) {
      var lazy = [];
      (0, _utility.registerListener)("load", setLazy);
      (0, _utility.registerListener)("load", lazyLoad);
      (0, _utility.registerListener)("scroll", lazyLoad);
      (0, _utility.registerListener)("resize", lazyLoad);

      function setLazy() {
        lazy = [].slice.call(document.querySelectorAll("".concat(cms_selector, " .").concat(className)));
      }

      function lazyLoad() {
        for (var i = 0; i < lazy.length; i++) {
          if ((0, _utility.isInViewport)(lazy[i])) {
            // if (lazy[i].getAttribute('data-src')){
            //     lazy[i].src = lazy[i].getAttribute('data-src');
            //     lazy[i].removeAttribute('data-src');
            // }
            if (lazy[i].classList.contains(className)) {
              lazy[i].classList.remove(className);
            }
          }
        }

        cleanLazy();
      }

      function cleanLazy() {
        // lazy = [].filter.call(lazy, function(l){ return l.getAttribute('data-src');});
        lazy = [].filter.call(lazy, function (elem) {
          return elem.classList.contains(className);
        });
      }
    }
  }, {
    key: "makeStyleSheet",
    value: function makeStyleSheet(_ref) {
      var _ref$duration = _ref.duration,
          duration = _ref$duration === void 0 ? 1 : _ref$duration,
          _ref$easing = _ref.easing,
          easing = _ref$easing === void 0 ? "ease-in-out" : _ref$easing,
          _ref$transform = _ref.transform,
          transform = _ref$transform === void 0 ? "translate(0)" : _ref$transform;
      this.animationStyle = this.animationStyle.replace("{{duration}}", "" + duration);
      this.animationStyle = this.animationStyle.replace("{{ease}}", easing);
      this.animationStyle = this.animationStyle.replace("{{transform}}", transform);
      var head = document.head || document.getElementsByTagName("head")[0];
      var lazyLoadCss = "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.css\">";
      head.innerHTML += lazyLoadCss;
      var style = document.createElement("style");
      head.appendChild(style);
      style.type = "text/css";

      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = this.animationStyle;
      } else {
        style.appendChild(document.createTextNode(this.animationStyle));
      }

      return style;
    }
  }, {
    key: "setNextButtonIndex",
    value: function setNextButtonIndex() {
      var cmsList = document.querySelectorAll(this.cms_selector);

      for (var i = 0; i < cmsList.length; i++) {
        var nextSibling = cmsList[i].nextElementSibling;

        if (nextSibling && (0, _utility.isVisible)(nextSibling) && nextSibling.querySelector("w-pagination-next")) {
          this.index = i;
        }
      }

      this.indexSet = true;
    }
    /**
     * Combine all the collection items into one collection.
     */

  }, {
    key: "combine",
    value: function combine() {
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


      visible_collection.forEach(function (elem, i) {
        if (i > 0) {
          elem.parentElement.outerHTML = "";
        }

        _this.reinitializeWebflow();
      });
    }
  }, {
    key: "getMasterCollection",
    value: function getMasterCollection() {
      return document.querySelector(this.cms_selector);
    }
  }, {
    key: "getNextData",
    value: function getNextData(url) {
      return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();

        xhr.onload = function () {
          if (xhr.status == 200) {
            // done(xhr.response);
            return resolve(xhr.response);
          }
        };
      }).then(function (res) {
        return res;
      });
    }
  }, {
    key: "appendPaginatedData",
    value: function appendPaginatedData(data) {
      var newDoc = (0, _utility.createDocument)(data, "newDoc" + Date.now());
      var collection = newDoc.querySelectorAll(this.cms_selector)[this.index];
      var nextHref = collection.parentElement.querySelector(".w-pagination-next");
      nextHref ? this.setLoadmoreHref(nextHref.href) : this.setLoadmoreHref("");
      collection && this.appendToCms(collection.children);

      if (!this.hidden_collections.length && !nextHref) {
        this.getLoadmoreHref().outerHTML = "";
      }
    }
  }, {
    key: "appendToCms",
    value: function appendToCms(collection) {
      var _this2 = this;

      var master_collection = this.getMasterCollection();
      [].slice.call(collection).forEach(function (element) {
        element.classList.add("fslib-fadeIn");
        (0, _index.once)(element, whichAnimationEvent(), function (_ref2) {
          var type = _ref2.type;
          element.classList.remove("fslib-fadeIn");
        });
        master_collection.appendChild(element);

        if (_this2.addClass) {
          _this2.addclasses(_this2.addClassConfig);
        }
      });

      if (this.nestConfig) {
        this.nest(this.nestConfig);
      }
    }
  }, {
    key: "setLoadmoreHref",
    value: function setLoadmoreHref(url) {
      var master_collection = this.getMasterCollection();
      var hrefButton = master_collection.parentElement.querySelector("a.w-pagination-next");
      hrefButton.setAttribute("data-href", url || hrefButton.href);
      return hrefButton;
    }
  }, {
    key: "getLoadmoreHref",
    value: function getLoadmoreHref(selector) {
      var master_collection = this.getMasterCollection();
      var hrefButton = master_collection.parentElement.querySelector(selector || "a.w-pagination-next");
      return hrefButton;
    }
  }, {
    key: "getHiddenCollections",
    value: function getHiddenCollections() {
      return [].slice.call(document.querySelectorAll(this.cms_selector)).filter(function (e) {
        return !(0, _utility.isVisible)(e);
      });
    }
  }, {
    key: "setHiddenCollections",
    value: function setHiddenCollections() {
      var collection = this.getHiddenCollections();
      this.hidden_collections = collection.map(function (val) {
        return val.parentElement.cloneNode(true);
      });
      collection.forEach(function (val) {
        return val.parentNode.outerHTML = "";
      });
    }
  }, {
    key: "loadmore",
    value: function loadmore() {
      var _this3 = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        button: "a.w-pagination-next",
        loadAll: false,
        resetIx: true,
        animation: this.animation
      };

      if (!this.indexSet) {
        this.setNextButtonIndex();
      }

      this.setHiddenCollections();

      if (config.animation) {
        var effects = config.animation.effects.replace("fade", "");
        var _config$animation = config.animation,
            duration = _config$animation.duration,
            easing = _config$animation.easing;
        duration = duration ? duration / 1000 : 1;
        easing = easing || "linear";
        this.makeStyleSheet({
          duration: duration,
          easing: easing,
          transform: effects
        });
      } else {
        this.makeStyleSheet({});
      }

      var button = config.button,
          _config$resetIx = config.resetIx,
          resetIx = _config$resetIx === void 0 ? true : _config$resetIx,
          _config$loadAll = config.loadAll,
          loadAll = _config$loadAll === void 0 ? false : _config$loadAll;
      var nextButton = this.getLoadmoreHref(button);
      nextButton.setAttribute("data-href", nextButton.href);
      nextButton.removeAttribute("href");
      var busy = false;

      nextButton.onclick = function (evt) {
        initFetch();
      };

      document.addEventListener("DOMContentLoaded", function (event) {
        loadAll && initFetch(true);
      });

      var initFetch = function initFetch() {
        var recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (busy) return false;
        var href = nextButton.getAttribute("data-href");
        busy = true;

        if (href) {
          return _this3.getNextData(href).then(function (res) {
            //enable button
            _this3.appendPaginatedData(res);

            busy = false;

            if (resetIx) {
              _this3.reinitializeWebflow();
            }

            if (recursive) {
              initFetch(true);
            }
          });
        }

        var nextcollection = _this3.hidden_collections.shift();

        if (nextcollection) {
          _this3.appendToCms(nextcollection.firstElementChild.children);

          var aHref = nextcollection.querySelector(".w-pagination-next");

          _this3.setLoadmoreHref(aHref.href);

          _this3.index++;
          busy = false;

          if (recursive) {
            initFetch(true);
          }
        }

        if (resetIx) {
          _this3.reinitializeWebflow();
        }
      };
    }
    /**
     *
     * @param container The css selector of the parent container elem of the list you want to add classnames to.
     * @param config  defined as
     *  {
     *     classArray: Array<AltClass>; //list of classnames you want to add
     *     frequency: number; //The frequency or order of addition of class to the list
     *     start: number; //position of list item to start with
     * }
     */

  }, {
    key: "addclasses",
    value: function addclasses() {
      var _this4 = this;

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

      classNames.map(function (_ref3) {
        var target = _ref3.classTarget,
            alt = _ref3.classToAdd;
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

          _this4.reinitializeWebflow();
        }
      });
    }
    /**
     *
     * @param cms_selector
     */

  }, {
    key: "filter",
    value: function filter() {
      var _this5 = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        filterArray: [],
        animation: this.animation,
        activeClass: "active"
      };
      var cms_filter = config.filterArray,
          animation = config.animation,
          activeClass = config.activeClass;
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
      var filter = []; //2D array to hold categories of filter selectors and their corresponding
      //get all collections

      var get_cms_items = function get_cms_items() {
        return [].slice.call(document.querySelectorAll(_this5.cms_selector));
      };

      if (Array.isArray(cms_filter)) {
        cms_filter.map(function (val, index) {
          var prevClicked;
          var filter_option = val.filterType;
          var filter_group = [].slice.call(document.querySelectorAll("".concat(val.filterWrapper, " [filter-by]")));
          assignChangeEventToButtons({
            index: index,
            prevClicked: prevClicked,
            filter_option: filter_option,
            filter_group: filter_group
          });
        });
      } else if (typeof cms_filter == "string") {
        var prevClicked;
        var filter_group = [].slice.call(document.querySelectorAll("".concat(cms_filter, " [filter-by]")));
        assignChangeEventToButtons({
          index: 0,
          prevClicked: prevClicked,
          filter_group: filter_group
        });
      } else {
        throw "Incorrect type passed as cms_filter";
      }

      function conditionalReset(filter_text, index) {
        var isEmpty = !filter_text.trim();
        var tag = Object.values(filter[index]);

        if (isEmpty && tag.includes(filter_text)) {
          return false;
        }

        if (isEmpty && !tag.length) {
          return false;
        }

        return true;
      }

      function assignChangeEventToButtons(_ref4) {
        var index = _ref4.index,
            prevClicked = _ref4.prevClicked,
            _ref4$filter_option = _ref4.filter_option,
            filter_option = _ref4$filter_option === void 0 ? filter_type : _ref4$filter_option,
            filter_group = _ref4.filter_group;
        filter[index] = {}; //initialise default values

        filter_group.map(function (elem, j) {
          var id = "".concat(index).concat(j);
          var tag_element = elem && elem.tagName;

          if (tag_element == "SELECT") {
            elem.addEventListener("change", debounce(function (event) {
              var filter_text = event.target.selectedOptions[0].value || "";
              conditionalReset(filter_text, index) && initFilter({
                filter_option: filter_option,
                id: id,
                index: index,
                filter_text: filter_text,
                wildcard: true
              });
            }, 500));
          } else if (tag_element == "INPUT") {
            //handle checkbox and radio button
            switch (elem.type) {
              case "text":
                elem.addEventListener("input", debounce(function (event) {
                  var filter_text = event.target.value;
                  conditionalReset(filter_text, index) && initFilter({
                    filter_option: filter_option,
                    id: id,
                    index: index,
                    filter_text: filter_text,
                    wildcard: true
                  });
                }, 500));
                break;

              default:
                elem.addEventListener("change", function (event) {
                  var filter_text = !event.target.checked ? "" : event.currentTarget.getAttribute("filter-by") || "";
                  conditionalReset(filter_text, index) && initFilter({
                    filter_option: filter_option,
                    id: id,
                    index: index,
                    filter_text: filter_text
                  });
                });
                break;
            }
          } else {
            elem.onclick = function (event) {
              var active = event.currentTarget.className; //only one element should have active class for or

              if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filter_option)) {
                if (prevClicked) prevClicked.classList.remove(activeClass);
              }

              prevClicked = event.currentTarget;

              if (active.includes(activeClass)) {
                prevClicked.classList.remove(activeClass);
              } else {
                prevClicked.classList.add(activeClass);
              }

              var filter_text = prevClicked.getAttribute("filter-by") || ""; //prevent further filter if filter is empty and reset button is clicked.

              conditionalReset(filter_text, index) && initFilter({
                filter_option: filter_option,
                id: id,
                index: index,
                filter_text: filter_text
              });
            };
          }
        });
      }

      var initFilter = function initFilter(_ref5) {
        var filter_option = _ref5.filter_option,
            id = _ref5.id,
            index = _ref5.index,
            filter_text = _ref5.filter_text,
            _ref5$wildcard = _ref5.wildcard,
            wildcard = _ref5$wildcard === void 0 ? false : _ref5$wildcard;

        if (animation.queue && filterActive) {
          return filterQueue.push(function () {
            return filterHelper({
              filter_option: filter_option,
              id: id,
              index: index,
              filter_text: filter_text,
              wildcard: wildcard
            });
          });
        }

        return filterHelper({
          filter_option: filter_option,
          id: id,
          index: index,
          filter_text: filter_text,
          wildcard: wildcard
        });
      };

      var filterHelper = function filterHelper(_ref6) {
        var filter_option = _ref6.filter_option,
            id = _ref6.id,
            index = _ref6.index,
            filter_text = _ref6.filter_text,
            _ref6$wildcard = _ref6.wildcard,
            wildcard = _ref6$wildcard === void 0 ? false : _ref6$wildcard;
        filterActive = true;
        filter_text = (0, _utility.escapeRegExp)(filter_text.replace(/\*/gi, ""));

        if (/^exclusive$/i.test(filter_type) || /^exclusive$/i.test(filter_option)) {
          //checks if it has previously been clicked
          if (id in filter[index] && !wildcard) {
            delete filter[index][id];
          } else {
            filter[index] = {};
            filter[index][id] = filter_text;
          }
        } else {
          //it is definitely "multi"
          //checks if it has previously been clicked
          if (id in filter[index] && !wildcard) {
            delete filter[index][id];
          } else {
            filter[index][id] = filter_text;
          }
        } //try to fix queue here


        if (animation.enable) {
          var target = document.querySelector(_this5.cms_selector);

          _animate["default"].methods.animate(findAndMatchFilterText, target, animation).then(function () {
            filterActive = false;
            var nextAnimation = filterQueue.shift();

            if (nextAnimation) {
              nextAnimation.call(null);
            }
          });
        } else {
          findAndMatchFilterText();
        }
      };

      var findAndMatchFilterText = function findAndMatchFilterText() {
        // filterActive = true;
        var master_collection = get_cms_items();
        master_collection.map(function (elem, i) {
          var search_result = filter.reduce(function (curr, search) {
            //creating a regex to test against
            var val = "(".concat(Object["values"](search).join("|"), ")");
            var result = [].slice.call(elem.children).map(function (item, j) {
              var re = new RegExp(val, "gi");
              var valid = re.test(item.textContent);
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
            } // return [...curr.filter((a) => result.includes(a))]
            //intersections of the results


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
        });
      };
    }
  }, {
    key: "sort",
    value: function sort(_ref7) {
      var _this6 = this;

      var sortTrigger = _ref7.sortTrigger,
          sortReverse = _ref7.sortReverse,
          activeClass = _ref7.activeClass,
          _ref7$animation = _ref7.animation,
          animation = _ref7$animation === void 0 ? this.animation : _ref7$animation;
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
        return [].slice.call(document.querySelectorAll(_this6.cms_selector));
      };

      var triggerElem = [].slice.call(document.querySelectorAll(sortTrigger));
      triggerElem.map(function (elem) {
        var triggerTag = elem && elem.tagName;

        if (triggerTag == "SELECT") {
          elem.addEventListener("change", debounce(function (event) {
            var sortTarget = event.target.selectedOptions[0].value;
            sortTarget = sortTarget || event.getAttribute("sort-by");
            sortHelper({
              sortTarget: sortTarget,
              sortReverse: sortReverse
            });
          }, 200));
        } else if (triggerTag == "INPUT") {
          //handle checkbox and radio button
          elem.addEventListener("change", debounce(function (event) {
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

      var sortHelper = function sortHelper(_ref8) {
        var sortTarget = _ref8.sortTarget,
            sortReverse = _ref8.sortReverse;

        var initSort = function initSort() {
          return sortMasterCollection({
            sortReverse: sortReverse,
            sortTarget: sortTarget
          });
        };

        if (animation.enable) {
          var target = document.querySelector(_this6.cms_selector);

          _animate["default"].methods.animate(initSort, target, animation);
        } else {
          initSort();
        }
      };

      var sortMasterCollection = function sortMasterCollection(_ref9) {
        var sortTarget = _ref9.sortTarget,
            sortReverse = _ref9.sortReverse;
        var master_collection = get_cms_items();
        master_collection.map(function (elem) {
          return [].slice.call(elem.children).sort(function (a, b) {
            var x = a.querySelector(sortTarget).textContent;
            var y = b.querySelector(sortTarget).textContent;
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
    }
  }, {
    key: "setNestConfig",
    value: function setNestConfig(config) {
      if (!this.nestConfig) {
        this.nestConfig = config;
      }
    }
  }, {
    key: "nest",
    value: function nest(_ref10) {
      var textList = _ref10.textList,
          nestSource = _ref10.nestSource,
          nestTarget = _ref10.nestTarget;
      this.setNestConfig({
        textList: textList,
        nestSource: nestSource,
        nestTarget: nestTarget
      });
      var master_collections = Array.from(document.querySelectorAll(this.cms_selector));
      var sourceLinks = [].slice.call(document.querySelectorAll(nestSource + " a"));
      master_collections.forEach(function (collection, i) {
        var textArray = Array.from(collection.querySelectorAll(textList));
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
    }
  }, {
    key: "tabs",
    value: function tabs(_ref11) {
      var tabComponent = _ref11.tabComponent,
          tabName = _ref11.tabName;
      var cms = this.getMasterCollection();
      var testimonials = cms.querySelectorAll(".w-dyn-item>div");
      var tabMenu = document.querySelector(tabComponent + " .w-tab-menu");
      var tabContent = document.querySelector(tabComponent + " .w-tab-content");
      var tabPane = tabContent.children[0];
      var tabLink = tabMenu.querySelector("a");
      var control = ""; //etAttribute("aria-controls");

      console.log(tabLink, tabLink.href); // const prefix = getPrefix(control);
      //   tabLink.classList.remove('w--current');
      //   tabPane.classList.remove('w--tab-active');
      // const tabLinkClassNames = tabLink.className;
      // const tabContentClassNames = tabPane.className;
      //clear tabMenu and tabContent
      //   tabMenu.innerHTML="";
      //   tabContent.innerHTML="";
      //appends new contents
      //   testimonials.forEach((element,index) => {
      //       const name = element.querySelector(tabName);
      //       const newLink=getTabLink({name,prefix,index,classes:tabLinkClassNames});
      //       tabMenu.innerHTML += newLink;
      //       const content= element.outerHTML;
      //       const newPane=getTabPane({name,prefix,index,classes:tabContentClassNames,content});
      //       tabContent.innerHTML +=newPane;
      //   });
    }
  }]);
  return FsLibrary;
}(); // Function from David Walsh: http://davidwalsh.name/css-animation-callback


function whichTransitionEvent() {
  var t,
      el = document.createElement("fakeelement");
  var transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

function whichAnimationEvent() {
  var t,
      el = document.createElement("fakeelement");
  var animations = {
    animation: "animationend",
    OAnimationn: "oAnimationnEnd",
    MozAnimationn: "animationnend",
    WebkitAnimationn: "webkitAnimationnEnd"
  };

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

function debounce(callback, wait) {
  var _this7 = this;

  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = _this7;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return callback.apply(context, args);
    }, wait);
  };
}

window.FsLibrary = FsLibrary;
//# sourceMappingURL=index_.js.map
