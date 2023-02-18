"use strict";

var _fsLibrary = require("../fsLibrary");

var _utility = require("../utility");

var _index = require("../../js/util/index");

_fsLibrary.FsLibrary.prototype.getNextData = function (url) {
  // let new_url = url.replace(
  //   "127.0.0.1:5501/webflow/loadmore2.html",
  //   "dropbox-foundation.webflow.io/stories"
  // );
  // const urll = new_url.replace("http", "https");
  // console.log("url", new_url);
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status == 200) {
        // done(xhr.response);
        return resolve(xhr.response);
      }
    };
  }).then(function (res) {
    return res;
  });
};

_fsLibrary.FsLibrary.prototype.appendPaginatedData = function (data) {
  var newDoc = (0, _utility.createDocument)(data, "newDoc" + Date.now());
  var collection = newDoc.querySelectorAll(this.cms_selector)[this.index];
  var nextHref = collection.parentElement.querySelector(".w-pagination-next");
  nextHref ? this.setLoadmoreHref(nextHref.href) : this.setLoadmoreHref("");
  collection && this.appendToCms(collection.children);

  if (!this.hidden_collections.length && !nextHref) {
    this.getLoadmoreHref().outerHTML = "";
    return "done";
  }
};

_fsLibrary.FsLibrary.prototype.appendToCms = function (collection) {
  var _this = this;

  var master_collection = this.getMasterCollection();
  var append = [].slice.call(collection).map(function (element) {
    element.classList.add("fslib-fadeIn");
    (0, _index.once)(element, (0, _utility.whichAnimationEvent)(), function (_ref) {
      var type = _ref.type;
      element.classList.remove("fslib-fadeIn");
    }); // master_collection.appendChild(element);

    master_collection.innerHTML += element.outerHTML;

    if (_this.addClass) {
      _this.addclasses(_this.addClassConfig);
    }

    return Promise.resolve();
  });

  if (this.nestConfig) {
    this.nest(this.nestConfig);
  }

  return Promise.all(append);
};

_fsLibrary.FsLibrary.prototype.setLoadmoreHref = function (url) {
  var master_collection = this.getMasterCollection();
  var hrefButton = master_collection.parentElement.querySelector("a.w-pagination-next");
  hrefButton.setAttribute("data-href", url);
  return hrefButton;
};

_fsLibrary.FsLibrary.prototype.getLoadmoreHref = function (selector) {
  var master_collection = this.getMasterCollection();
  var hrefButton = master_collection.parentElement.querySelector(selector || "a.w-pagination-next");
  return hrefButton;
};

_fsLibrary.FsLibrary.prototype.getHiddenCollections = function () {
  return [].slice.call(document.querySelectorAll(this.cms_selector)).filter(function (e) {
    return !(0, _utility.isVisible)(e);
  });
};

_fsLibrary.FsLibrary.prototype.setHiddenCollections = function () {
  var collection = this.getHiddenCollections();
  this.hidden_collections = collection.map(function (val) {
    return val.parentElement.cloneNode(true);
  }); //   collection.forEach((val) => (val.parentNode.outerHTML = ""));
};
//# sourceMappingURL=util.js.map
