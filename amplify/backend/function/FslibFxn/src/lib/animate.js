"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = reset;
exports.getPositionWithMargin = getPositionWithMargin;
exports["default"] = void 0;

var _index = require("../js/util/index");

var targetClass = "uk-animation-target";
var _default = {
  // props: {
  //     animation: Number
  // },
  // data: {
  //     animation: 400
  // },
  // computed: {
  //     target() {
  //         return this.$el;
  //     }
  // },
  methods: {
    animate: function animate(action, target, animation) {
      var duration = animation.duration,
          easing = animation.easing,
          effects = animation.effects;
      var effect = String(effects).replace(/^fade /gi, "");
      addStyle();
      var children = (0, _index.toNodes)(target.children);
      var propsFrom = children.map(function (el) {
        return getProps(el, true);
      });
      var childrenMargin = children.map(function (el) {
        return (0, _index.css)(el, "margin");
      });
      var oldHeight = (0, _index.height)(target);
      var oldScrollY = window.pageYOffset;
      action();

      _index.Transition.cancel(target);

      children.forEach(_index.Transition.cancel);
      reset(target); // this.$update(target);

      _index.fastdom.flush();

      var newHeight = (0, _index.height)(target);
      children = children.concat((0, _index.toNodes)(target.children).filter(function (el) {
        return !(0, _index.includes)(children, el);
      }));
      var propsTo = children.map(function (el, i) {
        return el.parentNode && i in propsFrom ? propsFrom[i] ? (0, _index.isVisible)(el) ? getPositionWithMargin(el) : {
          opacity: 0
        } : {
          opacity: (0, _index.isVisible)(el) ? 1 : 0
        } : false;
      });
      propsFrom = propsTo.map(function (props, i) {
        var from = children[i].parentNode === target ? propsFrom[i] || getProps(children[i]) : false;

        if (from) {
          if (!props) {
            delete from.opacity;
          } else if (!("opacity" in props)) {
            var opacity = from.opacity;

            if (opacity % 1) {
              props.opacity = 1;
            } else {
              delete from.opacity;
            }
          }
        }

        return from;
      });
      (0, _index.addClass)(target, targetClass);
      children.forEach(function (el, i) {
        if (propsFrom[i]) {
          (0, _index.css)(el, propsFrom[i]);
        }
      });
      (0, _index.css)(target, "height", oldHeight);
      children.map(function (el, i) {
        return el.style["margin"] = childrenMargin[i];
      });
      (0, _index.scrollTop)(window, oldScrollY);
      return _index.Promise.all(children.map(function (el, i) {
        if (propsFrom[i] && propsTo[i]) {
          if (propsTo[i].opacity == 0) {
            propsTo[i].transform = effect;
          } else {
            propsTo[i].transform = "";
          }

          if (propsFrom[i].opacity == 0) {
            el.style.transform = effect;
          }

          return _index.Transition.start(el, propsTo[i], duration, easing);
        }

        return _index.Promise.resolve();
      }).concat(_index.Transition.start(target, {
        height: newHeight
      }, duration, easing))).then(function () {
        children.forEach(function (el, i) {
          (0, _index.css)(el, {
            display: propsTo[i].opacity === 0 ? "none" : "",
            zIndex: ""
          });
        });
        reset(target); // this.$update(target);

        _index.fastdom.flush(); // needed for IE11ssa

      }, _index.noop);
    }
  }
};
exports["default"] = _default;

function getProps(el, opacity) {
  var zIndex = (0, _index.css)(el, "zIndex");
  return (0, _index.isVisible)(el) ? (0, _index.assign)({
    display: "",
    opacity: opacity ? (0, _index.css)(el, "opacity") : "0",
    pointerEvents: "none",
    position: "absolute",
    zIndex: zIndex === "auto" ? (0, _index.index)(el) : zIndex
  }, getPositionWithMargin(el)) : false;
}

function reset(el) {
  (0, _index.css)(el.children, {
    height: "",
    left: "",
    opacity: "",
    pointerEvents: "",
    transform: "",
    position: "",
    top: "",
    width: "",
    margin: ""
  });
  (0, _index.removeClass)(el, targetClass);
  (0, _index.css)(el, "height", "");
}

function getPositionWithMargin(el) {
  var _el$getBoundingClient = el.getBoundingClientRect(),
      height = _el$getBoundingClient.height,
      width = _el$getBoundingClient.width;

  var _position = (0, _index.position)(el),
      top = _position.top,
      left = _position.left;

  top += (0, _index.toFloat)((0, _index.css)(el, "marginTop"));
  return {
    top: top,
    left: left,
    height: height,
    width: width
  };
}

var style;

function addStyle() {
  if (style) {
    return;
  }

  style = (0, _index.append)(document.head, "<style>").sheet;
  style.insertRule(".".concat(targetClass, " > * {\n            margin-top: 0 !important;\n            /*transform: none !important;*/\n        }"), 0);
}

function fGetCSSProperty(s, e) {
  try {
    return s.currentStyle ? s.currentStyle[e] : window.getComputedStyle(s)[e];
  } catch (x) {
    return null;
  }
}

function fGetOffSetParent(s) {
  var a = s.offsetParent || document.body;

  while (a && a.tagName && a != document.body && fGetCSSProperty(a, "position") == "static") {
    a = a.offsetParent;
  }

  return a;
}

function GetPosition(s) {
  var b = fGetOffSetParent(s);
  return {
    Left: b.offsetLeft + s.offsetLeft,
    Top: b.offsetTop + s.offsetTop
  };
}
//# sourceMappingURL=animate.js.map
