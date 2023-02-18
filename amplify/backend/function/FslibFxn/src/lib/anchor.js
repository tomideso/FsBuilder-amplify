"use strict";

var _fsLibrary = require("./fsLibrary");

var _utility = require("./utility");

_fsLibrary.FsLibrary.prototype.anchor = function (_ref) {
  var anchorButton = _ref.anchorButton,
      buttonsTarget = _ref.buttonsTarget,
      activeClass = _ref.activeClass,
      anchorId = _ref.anchorId;
  var cms = this.getMasterCollection();
  var active = String(activeClass).replace(".", "");
  var targetHolder = document.querySelector(buttonsTarget);
  targetHolder.innerHTML = "";
  var testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item"));
  var Webflow = window.Webflow || []; // Webflow.push(function () {

  var done = testimonials.map(function (elem, idx, arr) {
    var anchor_link = elem.querySelector(anchorId).textContent.trim();
    anchor_link = anchor_link.replace(/\s+/gi, "-");
    var sidebar_link = elem.querySelector(anchorButton);
    elem.id = anchor_link;
    sidebar_link.href = "#" + anchor_link;
    var sidelink = (0, _utility.createElementFromHTML)(sidebar_link.outerHTML);
    targetHolder.appendChild(sidelink);

    if (idx == 0) {
      sidelink.classList.add(active);
    }

    return Promise.resolve(elem);
  });
  Promise.all(done).then(function (elems) {
    (0, _utility.registerListener)("scroll", (0, _utility.throttle)(onScroll, 100));
  }); // });

  var onScroll = function onScroll() {
    Array.from(document.querySelectorAll(buttonsTarget + ">a")).forEach(function (elem, i) {
      if (elem.classList.contains("w--current")) {
        elem.classList.add(active);
        return;
      }

      elem.classList.remove(active);
    });
  };
};
//# sourceMappingURL=anchor.js.map
