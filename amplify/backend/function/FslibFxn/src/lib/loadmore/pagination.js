"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPaginationStyle = void 0;

var _helper = require("../utils/helper");

var createPaginationStyle = function createPaginationStyle(_ref) {
  var _ref$bgColorActive = _ref.bgColorActive,
      bgColorActive = _ref$bgColorActive === void 0 ? "#9AB87A" : _ref$bgColorActive,
      _ref$borderColor = _ref.borderColor,
      borderColor = _ref$borderColor === void 0 ? "#3D315B" : _ref$borderColor,
      _ref$bgColor = _ref.bgColor,
      bgColor = _ref$bgColor === void 0 ? "#444B6E" : _ref$bgColor,
      _ref$textColor = _ref.textColor,
      textColor = _ref$textColor === void 0 ? "#fff" : _ref$textColor,
      _ref$textColorActive = _ref.textColorActive,
      textColorActive = _ref$textColorActive === void 0 ? "#000" : _ref$textColorActive;
  (0, _helper.addStyleSheetToHead)("\n\n      .wf-fslib-paginated-hide{\n         display:none;\n      }\n\n      *[wf-fslib-paginated-hide=\"1\"]{\n        display:none;\n      }\n\n      *[wf-fslib-paginated-hide=\"2\"]{\n        display:unset;\n      }\n\n      .fs-pagination{\n        display:inline-block;\n        cursor:pointer;\n      }\n\n\n       .fs-pagination  a:hover {\n            cursor: pointer;\n        }\n\n       .fs-pagination  ul {\n            list-style: none;\n            padding: 0;\n            margin: 0;\n            display: flex;\n        }\n\n       .fs-pagination  ul li {\n            color: #fff;\n            display: flex;\n        }\n\n       .fs-pagination  ul li a {\n            background-color: ".concat(bgColor, ";\n            padding: 4px 8px;\n            border: 1px solid ").concat(borderColor, ";\n            color: ").concat(textColor, ";\n            border-right: 0;\n        }\n\n       .fs-pagination  ul li.fs-pagination-active a {\n             background-color: ").concat(bgColorActive, ";\n             color:").concat(textColorActive, "\n        }\n      .fs-pagination ul li:first-child a {\n            border-radius: 5px 0 0 5px;\n        }\n        \n       .fs-pagination ul li:last-child a {\n            border-radius: 0 5px 5px 0;\n            border-right: 1px solid ").concat(borderColor, ";\n        }"));
};

exports.createPaginationStyle = createPaginationStyle;
//# sourceMappingURL=pagination.js.map
