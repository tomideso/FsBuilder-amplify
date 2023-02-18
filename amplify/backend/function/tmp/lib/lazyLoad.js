"use strict";

var _fsLibrary = require("./fsLibrary");

var _utility = require("./utility");

_fsLibrary.FsLibrary.prototype.lazyLoad = function (cms_selector, className) {
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
};
//# sourceMappingURL=lazyLoad.js.map
