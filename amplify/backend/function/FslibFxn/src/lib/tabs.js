"use strict";

var _fsLibrary = require("./fsLibrary");

_fsLibrary.FsLibrary.prototype.tabs = function (_ref) {
  var _this = this;

  var tabComponent = _ref.tabComponent,
      customTabName = _ref.tabContent,
      tabName = _ref.tabName,
      _ref$resetIx = _ref.resetIx,
      resetIx = _ref$resetIx === void 0 ? true : _ref$resetIx;
  var cms = this.getMasterCollection();
  var testimonials = [].slice.call(cms.querySelectorAll(".w-dyn-item>*"));
  var tabMenu = document.querySelector(tabComponent + " .w-tab-menu");
  var tabContent = document.querySelector(tabComponent + " .w-tab-content");
  var tabPane = tabContent.children[0];
  var tabLink = tabMenu.getElementsByTagName("a")[0];
  var Webflow = window.Webflow || [];
  Webflow.push(function () {
    if (window.___toggledInitTab___) {
      return;
    }

    var prefix = getPrefix(tabLink.href);
    tabLink.classList.remove("w--current");
    tabPane.classList.remove("w--tab-active");
    var tabLinkClassNames = tabLink.className;
    var tabContentClassNames = tabPane.className; // clear tabMenu and tabContent

    tabMenu.innerHTML = "";
    tabContent.innerHTML = "";
    Promise.all(initTabs(prefix, tabLinkClassNames, tabContentClassNames)).then(function (res) {
      window.___toggledInitTab___ = true;
      window.Webflow.ready();
      !!resetIx && _this.reinitializeWebflow();
    });
  });

  var initTabs = function initTabs(prefix, tabLinkClassNames, tabContentClassNames) {
    // appends new contents
    return testimonials.map(function (element, index) {
      var name = (element.querySelector(tabName) || {}).innerHTML || getRandomString();
      var CTabName = element.querySelector(customTabName) ? element.querySelector(customTabName).innerHTML : "";
      var newLink = getTabLink({
        name: name,
        CTabName: CTabName,
        prefix: prefix,
        index: index,
        classes: tabLinkClassNames
      });
      tabMenu.innerHTML += newLink;
      var content = element.outerHTML;
      var newPane = getTabPane({
        name: name,
        prefix: prefix,
        index: index,
        classes: tabContentClassNames,
        content: content
      });
      tabContent.innerHTML += newPane;
      return Promise.resolve();
    });
  };
};

var getTabLink = function getTabLink(_ref2) {
  var name = _ref2.name,
      _ref2$CTabName = _ref2.CTabName,
      CTabName = _ref2$CTabName === void 0 ? "" : _ref2$CTabName,
      prefix = _ref2.prefix,
      index = _ref2.index,
      classes = _ref2.classes;
  var tab = prefix + "-tab-" + index;
  var pane = prefix + "-pane-" + index;
  var isFirst = index == 0;
  var classNames = classes;

  if (isFirst) {
    classNames += " w--current ";
  }

  var tabIndex = isFirst ? "" : "tabindex='-1'";
  return "<a data-w-tab=\"".concat(name, "\" class=\"").concat(classNames, "\" id=\"").concat(tab, "\" href=\"#").concat(pane, "\"\n   role=\"tab\"\n   aria-controls=\"").concat(pane, "\"\n   aria-selected=\"").concat(isFirst, "\" ").concat(tabIndex, ">\n          <div>").concat(CTabName || name, "</div>\n          </a>");
};

var getTabPane = function getTabPane(_ref3) {
  var name = _ref3.name,
      prefix = _ref3.prefix,
      index = _ref3.index,
      content = _ref3.content,
      classes = _ref3.classes;
  var tab = prefix + "-tab-" + index;
  var pane = prefix + "-pane-" + index;
  var isFirst = index == 0;
  var classNames = classes;

  if (isFirst) {
    classNames += " w--tab-active ";
  }

  return "<div data-w-tab=\"".concat(name, "\" class=\"").concat(classNames, "\" id=\"").concat(pane, "\" role=\"tabpanel\" aria-labelledby=\"").concat(tab, "\">\n").concat(content, "\n    </div>");
};

var getPrefix = function getPrefix(val) {
  return val.match(/(w-tabs-[0-9]{1}-data-w)/gi)[0];
};

var getRandomString = function getRandomString() {
  var a = Math.random();
  return String(a).substr(2);
};
//# sourceMappingURL=tabs.js.map
