"use strict";

var _fsLibrary = require("./fsLibrary");

_fsLibrary.FsLibrary.prototype.slider = function (_ref) {
  var _this = this;

  var sliderComponent = _ref.sliderComponent,
      _ref$itemsPerSlide = _ref.itemsPerSlide,
      itemsPerSlide = _ref$itemsPerSlide === void 0 ? 1 : _ref$itemsPerSlide,
      _ref$resetIx = _ref.resetIx,
      resetIx = _ref$resetIx === void 0 ? true : _ref$resetIx;
  var cms = this.getMasterCollection();
  var testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>*"));
  var slideLen = testimonials.length;
  var slideContainer = document.querySelector(sliderComponent);
  var slideHolder = slideContainer.querySelector(".w-slider-mask");
  var slideNav = slideContainer.querySelector(".w-slider-nav");
  var leftArrow = slideContainer.querySelector(".w-slider-arrow-left");
  var rightArrow = slideContainer.querySelector(".w-slider-arrow-right");
  var Webflow = window.Webflow || [];
  Webflow.push(function () {
    if (window.___toggledInit___) {
      return;
    }

    var templateSlide = slideHolder.children[0].cloneNode(true); // const templateSlideNav = slideNav.children[0];
    // templateSlideNav.classList.remove("w-active");
    // const templateDot = templateSlideNav.outerHTML;

    slideHolder.innerHTML = ""; // slideNav.innerHTML = "";

    var newSlide = templateSlide.cloneNode(true);
    newSlide.innerHTML = "";

    if (slideLen <= 1) {
      slideNav.outerHTML = "";
      leftArrow.outerHTML = "";
      rightArrow.outerHTML = "";
    }

    var done = testimonials.map(function (elem, idx, arr) {
      newSlide.innerHTML += elem.outerHTML;
      var count = idx + 1;

      if ((idx + 1) % itemsPerSlide == 0 || count == slideLen) {
        slideHolder.innerHTML += newSlide.outerHTML; // slideNav.innerHTML += templateDot;

        newSlide.innerHTML = "";
      }

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
