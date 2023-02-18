"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addStyleSheetToHead = void 0;

var addStyleSheetToHead = function addStyleSheetToHead(styleSheet) {
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  head.appendChild(style);
  style.type = "text/css";

  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = styleSheet;
  } else {
    style.appendChild(document.createTextNode(styleSheet));
  }

  return style;
};

exports.addStyleSheetToHead = addStyleSheetToHead;
//# sourceMappingURL=helper.js.map
