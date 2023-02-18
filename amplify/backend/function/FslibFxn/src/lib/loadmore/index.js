"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findActivePageNumber = exports.shouldBeVisibleOnActivePage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fsLibrary = require("../fsLibrary");

require("./util");

var _utility = require("../utility");

var _pagination = require("./pagination");

require("../paginate");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

_fsLibrary.FsLibrary.prototype.loadmore = function () {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    button: "a.w-pagination-next",
    loadAll: false,
    resetIx: true,
    animation: this.animation,
    infiniteScroll: false,
    infiniteScrollPercentage: 80,
    paginate: {
      enable: false,
      itemsPerPage: 10,
      insertPagination: ""
    }
  };
  var self = this;
  var filterObj = {};
  this.hasLoadmore = true;

  if (!this.indexSet) {
    this.setNextButtonIndex();
  }

  var getCollections = function getCollections() {
    return _this.getMasterCollection();
  };

  this.setHiddenCollections();
  config.animation = Object.assign({}, this.animation, config.animation);

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
      resetIx = _config$resetIx === void 0 ? false : _config$resetIx,
      _config$loadAll = config.loadAll,
      loadAll = _config$loadAll === void 0 ? false : _config$loadAll,
      _config$infiniteScrol = config.infiniteScroll,
      infiniteScroll = _config$infiniteScrol === void 0 ? false : _config$infiniteScrol,
      _config$infiniteScrol2 = config.infiniteScrollPercentage,
      infiniteScrollPercentage = _config$infiniteScrol2 === void 0 ? 80 : _config$infiniteScrol2,
      _config$paginate = config.paginate,
      paginate = _config$paginate === void 0 ? {
    enable: false,
    itemsPerPage: 10,
    insertPagination: "",
    bgColorActive: "#9AB87A",
    borderColor: "#3D315B",
    bgColor: "#444B6E",
    textColor: "#000",
    textColorActive: "#000"
  } : _config$paginate;
  var textColor = paginate.textColor,
      bgColorActive = paginate.bgColorActive,
      borderColor = paginate.borderColor,
      bgColor = paginate.bgColor,
      itemsPerPage = paginate.itemsPerPage,
      textColorActive = paginate.textColorActive;
  var nextButton = this.getLoadmoreHref(button);
  nextButton.setAttribute("data-href", nextButton.href); // nextButton.removeAttribute("href");

  var busy = false;

  nextButton.onclick = function (evt) {
    evt.preventDefault();
    initFetch();
  };

  if (loadAll && paginate.enable) {
    nextButton.style.display = "none";
    this.isPaginated = true;
    this.itemsPerPage = itemsPerPage;
    (0, _pagination.createPaginationStyle)({
      bgColorActive: bgColorActive,
      textColor: textColor,
      borderColor: borderColor,
      bgColor: bgColor,
      textColorActive: textColorActive
    });
  }

  var initScroll = (0, _utility.throttle)(function (evt) {
    var parent = getCollections();
    var children = parent.children;
    var len = children.length;
    var pos = Math.round(infiniteScrollPercentage * len / 100);

    if ((0, _utility.isInViewport)(children[pos]) || !(0, _utility.isOutOfViewport)(parent).bottom) {
      initFetch();
    }
  }, 700);

  if (infiniteScroll) {
    document.addEventListener("scroll", initScroll);
  }

  document.addEventListener("DOMContentLoaded", function (event) {
    var _this2 = this;

    if (loadAll) {
      initFetch(true, function () {
        _this2.loadmoreOn = false;
        filterObj = self.lastFilter ? self.lastFilter() : filterObj;
      });
    }
  });

  var initFetch = function initFetch() {
    var recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var done = arguments.length > 1 ? arguments[1] : undefined;
    if (busy) return false;
    _this.loadmoreOn = true;
    var href = nextButton.getAttribute("data-href");
    busy = true;

    if (href) {
      return _this.getNextData(href).then(function (res) {
        //enable button
        _this.appendPaginatedData(res);

        if (paginate.enable) {
          var _itemsPerPage = paginate.itemsPerPage,
              insertPagination = paginate.insertPagination;
          paginateCollections(_itemsPerPage, insertPagination, self).then(function (res) {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(JSON.stringify(filterObj) != JSON.stringify(self.filterObject))) {
                        _context.next = 9;
                        break;
                      }

                      if (!self.lastFilter) {
                        _context.next = 7;
                        break;
                      }

                      _context.next = 4;
                      return self.lastFilter();

                    case 4:
                      _context.t0 = _context.sent;
                      _context.next = 8;
                      break;

                    case 7:
                      _context.t0 = filterObj;

                    case 8:
                      filterObj = _context.t0;

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
          });
        }

        busy = false;

        if (resetIx) {
          _this.reinitializeWebflow();
        }

        if (recursive) {
          initFetch(true, done);
        }
      });
    }

    var nextcollection = _this.hidden_collections.shift();

    if (nextcollection) {
      _this.appendToCms(nextcollection.firstElementChild.children).then(function (res) {
        if (paginate.enable) {
          var _itemsPerPage2 = paginate.itemsPerPage,
              insertPagination = paginate.insertPagination;
          paginateCollections(_itemsPerPage2, insertPagination, self).then(function (res) {
            if (JSON.stringify(filterObj) != JSON.stringify(self.filterObject)) {
              filterObj = self.lastFilter ? self.lastFilter() : filterObj;
            }
          });
        }

        if (resetIx) {
          _this.reinitializeWebflow();
        }
      });

      var aHref = nextcollection.querySelector(".w-pagination-next");
      aHref && _this.setLoadmoreHref(aHref.href);
      _this.index++;
      busy = false;

      if (!_this.hidden_collections.length && !aHref) {
        _this.getLoadmoreHref().outerHTML = "";
        done(true);
        _this.loadmoreOn = false;
        return;
      }

      if (recursive) {
        initFetch(true, done);
      }
    }

    {
      resetIx && _this.reinitializeWebflow();
      _this.loadmoreOn = false;
      done(true);
    }
  };

  var paginateCollections = function paginateCollections() {
    var itemsPerPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var insertPagination = arguments.length > 1 ? arguments[1] : undefined;
    var self = arguments.length > 2 ? arguments[2] : undefined;
    var parent = getCollections();
    var children = [].slice.call(parent.children);
    var totalItems = children.length;
    var pages = Math.ceil(totalItems / itemsPerPage);
    var wf_fslib_pagination = document.createElement("div");
    wf_fslib_pagination.id = "wf-fslib-pagination";
    wf_fslib_pagination.classList.add("fs-pagination");
    paginateItems({
      children: children,
      itemsPerPage: itemsPerPage,
      active: 1,
      filterOn: self.filterOn
    });
    wf_fslib_pagination.addEventListener("click", function () {
      var parent = getCollections();
      var children = [].slice.call(parent.children);
      var active = findActivePageNumber();
      paginateItems({
        children: children,
        itemsPerPage: itemsPerPage,
        active: active,
        filterOn: self.filterOn
      });
    });
    document.querySelector(insertPagination).appendChild(wf_fslib_pagination);

    _fsLibrary.FsLibrary.paginate(pages, 1);

    return Promise.resolve();
  };
};

function paginateItems(_ref) {
  var children = _ref.children,
      itemsPerPage = _ref.itemsPerPage,
      active = _ref.active,
      filterOn = _ref.filterOn;
  var childElems = [].slice.call(children);

  if (filterOn) {
    childElems.filter(function (val) {
      return val.hasAttribute("wf-fslib-paginated-hide");
    }).forEach(function (element, index) {
      shouldBeVisibleOnActivePage({
        index: index,
        element: element,
        active: active,
        itemsPerPage: itemsPerPage,
        filterOn: filterOn
      });
    });
    return;
  }

  childElems.forEach(function (element, index) {
    shouldBeVisibleOnActivePage({
      index: index,
      element: element,
      active: active,
      itemsPerPage: itemsPerPage,
      filterOn: filterOn
    });
  });
}

var shouldBeVisibleOnActivePage = function shouldBeVisibleOnActivePage(_ref2) {
  var index = _ref2.index,
      element = _ref2.element,
      active = _ref2.active,
      itemsPerPage = _ref2.itemsPerPage,
      _ref2$filterOn = _ref2.filterOn,
      filterOn = _ref2$filterOn === void 0 ? false : _ref2$filterOn;
  var last = itemsPerPage * parseInt(active);
  var first = last - itemsPerPage;
  var hasAttr = element.hasAttribute("wf-fslib-paginated-hide");

  if (index >= first && index < last) {
    if (!filterOn) {
      element.style.display = "";
    } else if (hasAttr) {
      element.style.display = "";
      element.setAttribute("wf-fslib-paginated-hide", 2);
    }

    return true;
  }

  if (!filterOn) {
    element.style.display = "none";
  } else if (hasAttr) {
    element.setAttribute("wf-fslib-paginated-hide", 1);
  }

  return false;
};

exports.shouldBeVisibleOnActivePage = shouldBeVisibleOnActivePage;

var findActivePageNumber = function findActivePageNumber() {
  var active = document.querySelector(".fs-pagination ul li.fs-pagination-active a");
  return active ? active.textContent : 1;
};

exports.findActivePageNumber = findActivePageNumber;
//# sourceMappingURL=index.js.map
