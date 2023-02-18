"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInViewport = isInViewport;
exports.registerListener = registerListener;
exports.removeListener = removeListener;
exports.isVisible = isVisible;
exports.findDeepestChildElement = findDeepestChildElement;
exports.createDocument = createDocument;
exports.whichTransitionEvent = whichTransitionEvent;
exports.whichAnimationEvent = whichAnimationEvent;
exports.debounce = debounce;
exports.createElementFromHTML = createElementFromHTML;
exports.getPercentOfView = getPercentOfView;
exports.getClosest = getClosest;
exports.dispatchEvent = exports.initResize = exports.throttle = exports.escapeRegExp = exports.isOutOfViewport = void 0;

function isInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth);
}

var isOutOfViewport = function isOutOfViewport(elem) {
  // Get element's bounding
  var bounding = elem.getBoundingClientRect(); // Check if it's out of the viewport on each side

  var out = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;
  return out;
};

exports.isOutOfViewport = isOutOfViewport;

function registerListener(event, func) {
  if (document.addEventListener) {
    document.addEventListener(event, func, true);
  } else {
    document.attachEvent("on" + event, func);
  }
}

function removeListener(event, func) {
  document.removeEventListener(event, func, true);
}

function isVisible(elem) {
  var _elem$getBoundingClie = elem.getBoundingClientRect(),
      width = _elem$getBoundingClie.width,
      height = _elem$getBoundingClie.height;

  return !(height === width && height === 0);
}

function findDeepestChildElement(elem) {
  return [].slice.call(elem.querySelectorAll("*")).find(function (e) {
    return !e.children.length;
  });
}

function createDocument(html, title) {
  var doc = document.implementation.createHTMLDocument(title);
  doc.documentElement.innerHTML = html;
  return doc;
}

var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

exports.escapeRegExp = escapeRegExp;

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
  var _this = this;

  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = _this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return callback.apply(context, args);
    }, wait);
  };
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim(); // Change this to div.childNodes to support multiple top-level nodes

  return div.firstChild;
}

var throttle = function throttle(func, limit) {
  var lastFunc;
  var lastRan;
  return function () {
    var context = this;
    var args = arguments;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

exports.throttle = throttle;

var initResize = function initResize() {
  if (typeof Event === "function") {
    // modern browsers
    window.dispatchEvent(new Event("resize"));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    var evt = window.document.createEvent("UIEvents");
    evt.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }
};

exports.initResize = initResize;

var dispatchEvent = function dispatchEvent(event) {
  if (typeof Event === "function") {
    // modern browsers
    window.dispatchEvent(new Event(event));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    var evt = window.document.createEvent("UIEvents");
    evt.initUIEvent(event, true, false, window, 0);
    window.dispatchEvent(evt);
  }
};
/**
 * @param {HTMLElement} element
 * @returns {number} percent of element in view
 */


exports.dispatchEvent = dispatchEvent;

function getPercentOfView(element) {
  var viewTop = window.pageYOffset;
  var viewBottom = viewTop + window.innerHeight;
  var rect = element.getBoundingClientRect();
  var elementTop = rect.top + viewTop;
  var elementBottom = elementTop + rect.height;

  if (elementTop >= viewBottom || elementBottom <= viewTop) {
    // heigher or lower than viewport
    return 0;
  } else if (elementTop <= viewTop && elementBottom >= viewBottom) {
    // element is completely in viewport and bigger than viewport
    return 100;
  } else if (elementBottom <= viewBottom) {
    if (elementTop < viewTop) {
      // intersects viewport top
      return Math.round((elementBottom - viewTop) / window.innerHeight * 100);
    } else {
      // completely inside viewport
      return Math.round((elementBottom - elementTop) / window.innerHeight * 100);
    }
  } else {
    // intersects viewport bottom
    //  elementBottom >= viewBottom && elementTop <= viewBottom
    return Math.round((viewBottom - elementTop) / window.innerHeight * 100);
  }
}

function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  } // Get the closest matching element


  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }

  return null;
}

;
//# sourceMappingURL=utility.js.map
