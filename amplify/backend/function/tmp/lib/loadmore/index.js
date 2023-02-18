"use strict";

var _fsLibrary = require("../fsLibrary");

require("./util");

var _utility = require("../utility");

_fsLibrary.FsLibrary.prototype.loadmore = function () {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    button: "a.w-pagination-next",
    loadAll: false,
    resetIx: true,
    animation: this.animation,
    infiniteScroll: false,
    infiniteScrollPercentage: 80
  };

  if (!this.indexSet) {
    this.setNextButtonIndex();
  }

  var master_collection = this.getMasterCollection();

  var getCollections = function getCollections() {
    return _this.getMasterCollection();
  };

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
      resetIx = _config$resetIx === void 0 ? false : _config$resetIx,
      _config$loadAll = config.loadAll,
      loadAll = _config$loadAll === void 0 ? false : _config$loadAll,
      _config$infiniteScrol = config.infiniteScroll,
      infiniteScroll = _config$infiniteScrol === void 0 ? false : _config$infiniteScrol,
      _config$infiniteScrol2 = config.infiniteScrollPercentage,
      infiniteScrollPercentage = _config$infiniteScrol2 === void 0 ? 80 : _config$infiniteScrol2;
  var nextButton = this.getLoadmoreHref(button);
  nextButton.setAttribute("data-href", nextButton.href);
  nextButton.removeAttribute("href");
  var busy = false;

  nextButton.onclick = function (evt) {
    initFetch();
  };

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
    console.log("infinite scroll added");
    document.addEventListener("scroll", initScroll);
  }

  document.addEventListener("DOMContentLoaded", function (event) {
    loadAll && initFetch(true);
  });

  var initFetch = function initFetch() {
    var recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (busy) return false;
    var href = nextButton.getAttribute("data-href");
    busy = true;

    if (href) {
      return _this.getNextData(href).then(function (res) {
        //enable button
        _this.appendPaginatedData(res);

        busy = false;

        if (resetIx) {
          _this.reinitializeWebflow();
        }

        if (recursive) {
          initFetch(true);
        }
      });
    }

    var nextcollection = _this.hidden_collections.shift();

    if (nextcollection) {
      _this.appendToCms(nextcollection.firstElementChild.children).then(function (res) {
        if (resetIx) {
          _this.reinitializeWebflow();
        }
      });

      var aHref = nextcollection.querySelector(".w-pagination-next");

      _this.setLoadmoreHref(aHref.href);

      _this.index++;
      busy = false;

      if (recursive) {
        initFetch(true);
      }
    }
  };
};
//# sourceMappingURL=index.js.map
