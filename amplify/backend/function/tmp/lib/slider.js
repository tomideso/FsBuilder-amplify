"use strict";

var _fsLibrary = require("./fsLibrary");

_fsLibrary.FsLibrary.prototype.slider = function (_ref) {
  var _this = this;

  var sliderComponent = _ref.sliderComponent,
      _ref$resetIx = _ref.resetIx,
      resetIx = _ref$resetIx === void 0 ? true : _ref$resetIx;
  var cms = this.getMasterCollection();
  var testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>*"));
  var slideContainer = document.querySelector(sliderComponent);
  var slideHolder = slideContainer.querySelector(".w-slider-mask");
  var slideNav = slideContainer.querySelector(".w-slider-nav");
  var Webflow = window.Webflow || [];
  Webflow.push(function () {
    if (window.___toggledInit___) {
      return;
    }

    var templateSlide = slideHolder.children[0].cloneNode(true);
    var templateSlideNav = slideNav.children[0];
    templateSlideNav.classList.remove('w-active');
    var templateDot = templateSlideNav.outerHTML;
    slideHolder.innerHTML = "";
    slideNav.innerHTML = "";
    var done = testimonials.map(function (elem, idx, arr) {
      var newSlide = templateSlide.cloneNode(true);
      newSlide.innerHTML = elem.outerHTML;
      slideHolder.innerHTML += newSlide.outerHTML;
      slideNav.innerHTML += templateDot;
      return Promise.resolve(true);
    });
    Promise.all(done).then(function (r) {
      slideContainer.outerHTML += "";
      window.___toggledInit___ = true;
      window.Webflow.ready();
      !!resetIx && _this.reinitializeWebflow();
    });
  });
};
//# sourceMappingURL=slider.js.map
