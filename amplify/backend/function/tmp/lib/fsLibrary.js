"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FsLibrary = FsLibrary;

var _blurImg = require("./blurImg");

var _utility = require("./utility");

var _index = require("../js/util/index");

function FsLibrary(cms_selector) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    type: 1,
    className: "image"
  };
  // opt && this.lazyLoad(cms_selector, opt.className);
  this.cms_selector = cms_selector;
  this.indexSet;
  this.cms_selector;
  this.animation = {
    enable: true,
    duration: 250,
    easing: "ease-in-out",
    effects: "translate(0px,0px)",
    queue: true
  };
  this.addClass;
  this.nestConfig;
  this.index = 0;
  this.hidden_collections;
  this.addClassConfig;
  this.animationStyle = "\n        \n          @keyframes fade-in {\n              0% {\n                  opacity: 0;\n                 transform:{{transform}};\n              }\n              100% {\n                  transform:translate(0) rotate3d(0) rotate(0) scale(1);\n                  opacity: 1;\n              }\n            }\n            \n            .fslib-fadeIn {\n              animation-name: fade-in;\n              animation-duration: {{duration}}s;\n              animation-iteration-count: 1;\n              animation-timing-function: {{easing}};\n              animation-fill-mode: forwards;\n            }\n        ";
  this.tinyImgBase64 = _blurImg.blurImg;
}

FsLibrary.prototype.setNextButtonIndex = function () {
  var cmsList = document.querySelectorAll(this.cms_selector);

  for (var i = 0; i < cmsList.length; i++) {
    var nextSibling = cmsList[i].nextElementSibling;

    if (nextSibling && (0, _utility.isVisible)(nextSibling) && nextSibling.querySelector("w-pagination-next")) {
      this.index = i;
    }
  }

  this.indexSet = true;
};

FsLibrary.prototype.getMasterCollection = function () {
  return document.querySelector(this.cms_selector);
};

FsLibrary.prototype.reinitializeWebflow = function () {
  window.Webflow.destroy();
  window.Webflow.ready();

  window.Webflow.require("ix2").init();

  (0, _index.trigger)(document, "readystatechange");
  window.Webflow.redraw.up();
};

FsLibrary.prototype.makeStyleSheet = function (_ref) {
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
};

window.FsLibrary = FsLibrary;
//# sourceMappingURL=fsLibrary.js.map
