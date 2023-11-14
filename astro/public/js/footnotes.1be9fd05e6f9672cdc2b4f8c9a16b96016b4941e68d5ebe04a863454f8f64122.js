(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/littlefoot/dist/littlefoot.js
  var require_littlefoot = __commonJS({
    "node_modules/littlefoot/dist/littlefoot.js"(exports, module) {
      !function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).littlefoot = {});
      }(exports, function(e) {
        "use strict";
        var t = function() {
          return t = Object.assign || function(e2) {
            for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++)
              for (var i2 in t2 = arguments[n2])
                Object.prototype.hasOwnProperty.call(t2, i2) && (e2[i2] = t2[i2]);
            return e2;
          }, t.apply(this, arguments);
        };
        "function" == typeof SuppressedError && SuppressedError;
        var n = {};
        Object.defineProperty(n, "__esModule", { value: true });
        var r = n.getStyle = void 0;
        r = n.getStyle = function(e2, t2) {
          var n2, r2 = ((null === (n2 = e2.ownerDocument) || void 0 === n2 ? void 0 : n2.defaultView) || window).getComputedStyle(e2);
          return r2.getPropertyValue(t2) || r2[t2];
        };
        var i = {};
        Object.defineProperty(i, "__esModule", { value: true });
        var o = i.pixels = void 0, a = n, u = 96, c = 25.4;
        function l(e2) {
          return e2 ? (0, a.getStyle)(e2, "fontSize") || l(e2.parentElement) : (0, a.getStyle)(window.document.documentElement, "fontSize");
        }
        function s(e2, t2) {
          e2.classList.add(t2);
        }
        function f(e2, t2) {
          e2.classList.remove(t2);
        }
        function d(e2) {
          var t2;
          null === (t2 = e2.parentNode) || void 0 === t2 || t2.removeChild(e2);
        }
        o = i.pixels = function e2(t2, n2) {
          var r2, i2, o2 = null !== (i2 = null === (r2 = null == n2 ? void 0 : n2.ownerDocument) || void 0 === r2 ? void 0 : r2.defaultView) && void 0 !== i2 ? i2 : window, a2 = o2.document.documentElement || o2.document.body, s2 = function(e3) {
            var t3, n3 = e3 || "0", r3 = parseFloat(n3), i3 = n3.match(/[\d-.]+(\w+)$/);
            return [r3, (null !== (t3 = null == i3 ? void 0 : i3[1]) && void 0 !== t3 ? t3 : "").toLowerCase()];
          }(t2), f2 = s2[0];
          switch (s2[1]) {
            case "rem":
              return f2 * e2(l(window.document.documentElement));
            case "em":
              return f2 * e2(l(n2), null == n2 ? void 0 : n2.parentElement);
            case "in":
              return f2 * u;
            case "q":
              return f2 * u / c / 4;
            case "mm":
              return f2 * u / c;
            case "cm":
              return f2 * u * 10 / c;
            case "pt":
              return f2 * u / 72;
            case "pc":
              return f2 * u / 6;
            case "vh":
              return (f2 * o2.innerHeight || a2.clientWidth) / 100;
            case "vw":
              return (f2 * o2.innerWidth || a2.clientHeight) / 100;
            case "vmin":
              return f2 * Math.min(o2.innerWidth || a2.clientWidth, o2.innerHeight || a2.clientHeight) / 100;
            case "vmax":
              return f2 * Math.max(o2.innerWidth || a2.clientWidth, o2.innerHeight || a2.clientHeight) / 100;
            default:
              return f2;
          }
        };
        var v = "littlefoot__tooltip", m = "is-";
        function p(e2) {
          var t2 = e2.offsetHeight, n2 = e2.getBoundingClientRect().top + t2 / 2;
          return { above: n2, below: window.innerHeight - n2 };
        }
        function h(e2) {
          var t2 = parseFloat(r(e2, "marginLeft")), n2 = e2.offsetWidth - t2;
          return (e2.getBoundingClientRect().left + n2 / 2) / window.innerWidth;
        }
        function g(e2, t2) {
          var n2 = 2 * parseInt(r(e2, "marginTop"), 10) + e2.offsetHeight;
          return t2.below < n2 && t2.below < t2.above ? "above" : "below";
        }
        var y = "is-active", b = "is-changing", w = "is-scrollable", E = function(e2) {
          return !!e2.parentElement;
        };
        function H(e2) {
          var t2 = e2.id, n2 = e2.button, i2 = e2.content, a2 = e2.host, u2 = e2.popover, c2 = e2.wrapper, l2 = false, H2 = 0, x2 = "above";
          return { id: t2, activate: function(e3) {
            var t3;
            n2.setAttribute("aria-expanded", "true"), s(n2, b), s(n2, y), n2.insertAdjacentElement("afterend", u2), u2.style.maxWidth = document.body.clientWidth + "px", t3 = i2, H2 = Math.round(o(r(t3, "maxHeight"), t3)), null == e3 || e3(u2, n2);
          }, dismiss: function(e3) {
            n2.setAttribute("aria-expanded", "false"), s(n2, b), f(n2, y), f(u2, y), null == e3 || e3(u2, n2);
          }, isActive: function() {
            return n2.classList.contains(y);
          }, isReady: function() {
            return !n2.classList.contains(b);
          }, isHovered: function() {
            return l2;
          }, ready: function() {
            s(u2, y), f(n2, b);
          }, remove: function() {
            d(u2), f(n2, b);
          }, reposition: function() {
            E(u2) && (i2.style.maxHeight = function(e3, t3, n3) {
              var i3 = p(t3), o2 = g(e3, i3), a3 = parseInt(r(e3, "marginTop"), 10);
              return Math.min(n3, i3[o2] - a3 - 15);
            }(u2, n2, H2) + "px", x2 = function(e3, t3, n3) {
              var r2 = g(e3, p(t3));
              if (n3 !== r2) {
                f(e3, m + n3), s(e3, m + r2);
                var i3 = 100 * h(t3) + "%", o2 = "above" === r2 ? "100%" : "0";
                e3.style.transformOrigin = i3 + " " + o2;
              }
              return r2;
            }(u2, n2, x2), u2.offsetHeight < i2.scrollHeight ? (s(u2, w), i2.setAttribute("tabindex", "0")) : (f(u2, w), i2.removeAttribute("tabindex")));
          }, resize: function() {
            E(u2) && (u2.style.left = function(e3, t3) {
              var n3 = e3.offsetWidth;
              return -h(t3) * n3 + parseInt(r(t3, "marginLeft"), 10) + t3.offsetWidth / 2;
            }(i2, n2) + "px", c2.style.maxWidth = i2.offsetWidth + "px", function(e3, t3) {
              var n3 = e3.querySelector("." + v);
              n3 && (n3.style.left = 100 * h(t3) + "%");
            }(u2, n2));
          }, startHovering: function() {
            l2 = true;
          }, stopHovering: function() {
            l2 = false;
          }, destroy: function() {
            return d(a2);
          } };
        }
        var x = {};
        Object.defineProperty(x, "__esModule", { value: true });
        var S = x.throttle = void 0;
        S = x.throttle = function(e2, t2) {
          void 0 === t2 && (t2 = 0);
          var n2, r2 = 0;
          return Object.assign(function() {
            for (var i2 = [], o2 = 0; o2 < arguments.length; o2++)
              i2[o2] = arguments[o2];
            var a2 = Math.max(0, r2 + t2 - Date.now());
            a2 ? (clearTimeout(n2), n2 = setTimeout(function() {
              r2 = Date.now(), e2.apply(void 0, i2);
            }, a2)) : (r2 = Date.now(), e2.apply(void 0, i2));
          }, { cancel: function() {
            r2 = 0, clearTimeout(n2);
          } });
        };
        var A = 16, T = "is-fully-scrolled", D = function(e2) {
          return function(t2) {
            var n2 = t2.currentTarget, r2 = -t2.deltaY;
            r2 > 0 && f(e2, T), n2 && r2 <= 0 && r2 < n2.clientHeight + n2.scrollTop - n2.scrollHeight && s(e2, T);
          };
        };
        var _ = "littlefoot__content", M = "littlefoot__wrapper", W = "littlefoot--print", L = "littlefoot", C = function(e2) {
          return s(e2, W);
        };
        function O(e2, t2) {
          return Array.from(e2.querySelectorAll(t2));
        }
        function P(e2, t2) {
          return e2.querySelector("." + t2) || e2.firstElementChild || e2;
        }
        function j(e2) {
          var t2 = document.createElement("div");
          return t2.innerHTML = e2, t2.firstElementChild;
        }
        function I(e2) {
          return void 0 !== e2;
        }
        function R(e2) {
          var t2 = e2.parentElement, n2 = function(e3, t3) {
            return Array.from(e3.children).filter(function(e4) {
              return 8 !== e4.nodeType && e4.matches(t3);
            });
          }(t2, ":not(." + W + ")"), r2 = n2.filter(function(e3) {
            return "HR" === e3.tagName;
          });
          n2.length === r2.length && (r2.concat(t2).forEach(C), R(t2));
        }
        function z(e2) {
          var t2 = e2.parentElement;
          d(e2), t2.innerHTML.replace("[]", "").replace("&nbsp;", " ").trim() || z(t2);
        }
        function k(e2, t2) {
          var n2 = j(e2.body.outerHTML);
          O(n2, '[href$="#' + e2.referenceId + '"]').forEach(z);
          var r2 = n2.innerHTML.trim();
          return { original: e2, data: { id: String(t2 + 1), number: t2 + 1, reference: "lf-" + e2.referenceId, content: r2.startsWith("<") ? r2 : "<p>" + r2 + "</p>" } };
        }
        var q = function(e2) {
          var n2 = 0, r2 = null;
          return function(i2) {
            var o2 = i2.original, a2 = i2.data, u2 = o2.reference.closest(e2);
            return n2 = r2 === u2 ? n2 + 1 : 1, r2 = u2, { original: o2, data: t(t({}, a2), { number: n2 }) };
          };
        };
        function F(e2) {
          var t2 = /<%=?\s*(\w+?)\s*%>/g;
          return function(n2) {
            return e2.replace(t2, function(e3, t3) {
              var r2;
              return String(null !== (r2 = n2[t3]) && void 0 !== r2 ? r2 : "");
            });
          };
        }
        function B(e2, t2) {
          var n2 = F(e2), r2 = F(t2);
          return function(e3) {
            var t3 = e3.original, i2 = e3.data, o2 = i2.id, a2 = j('<span class="'.concat(L, '">').concat(n2(i2), "</span>")), u2 = a2.firstElementChild;
            u2.setAttribute("aria-expanded", "false"), u2.dataset.footnoteButton = "", u2.dataset.footnoteId = o2;
            var c2 = j(r2(i2));
            c2.dataset.footnotePopover = "", c2.dataset.footnoteId = o2;
            var l2 = P(c2, M), s2 = P(c2, _);
            return function(e4, t4) {
              e4.addEventListener("wheel", S(D(t4), A));
            }(s2, c2), { original: t3, data: i2, id: o2, button: u2, host: a2, popover: c2, content: s2, wrapper: l2 };
          };
        }
        function V(e2) {
          var t2 = e2.allowDuplicates, n2 = e2.anchorParentSelector, r2 = e2.anchorPattern, i2 = e2.buttonTemplate, o2 = e2.contentTemplate, a2 = e2.footnoteSelector, u2 = e2.numberResetSelector, c2 = e2.scope, l2 = function(e3, t3, n3) {
            return O(e3, n3 + ' a[href*="#"]').filter(function(e4) {
              return (e4.href + e4.rel).match(t3);
            });
          }(document, r2, c2).map(function(e3, t3, n3, r3) {
            var i3 = [];
            return function(o3) {
              var a3 = o3.href.split("#")[1], u3 = O(e3, "#" + window.CSS.escape(a3)).find(function(e4) {
                return t3 || !i3.includes(e4);
              }), c3 = null == u3 ? void 0 : u3.closest(r3);
              if (c3) {
                i3.push(c3);
                var l3 = o3.closest(n3) || o3;
                return { reference: l3, referenceId: l3.id || o3.id, body: c3 };
              }
            };
          }(document, t2, n2, a2)).filter(I).map(k).map(u2 ? q(u2) : function(e3) {
            return e3;
          }).map(B(i2, o2)).map(function(e3) {
            return C(e3.original.reference), C(e3.original.body), R(e3.original.body), e3.original.reference.insertAdjacentElement("beforebegin", e3.host), e3;
          }).map(H);
          return { footnotes: l2, unmount: function() {
            l2.forEach(function(e3) {
              return e3.destroy();
            }), O(document, "." + W).forEach(function(e3) {
              return f(e3, W);
            });
          } };
        }
        var N = { activateDelay: 100, activateOnHover: false, allowDuplicates: true, allowMultiple: false, anchorParentSelector: "sup", anchorPattern: /(fn|footnote|note)[:\-_\d]/gi, dismissDelay: 100, dismissOnUnhover: false, footnoteSelector: "li", hoverDelay: 250, numberResetSelector: "", scope: "", contentTemplate: '<aside class="littlefoot__popover" id="fncontent:<% id %>"><div class="'.concat(M, '"><div class="').concat(_, '"><% content %></div></div><div class="').concat(v, '"></div></aside>'), buttonTemplate: '<button class="littlefoot__button" id="<% reference %>" title="See Footnote <% number %>"><svg role="img" aria-labelledby="title-<% reference %>" viewbox="0 0 31 6" preserveAspectRatio="xMidYMid"><title id="title-<% reference %>">Footnote <% number %></title><circle r="3" cx="3" cy="3" fill="white"></circle><circle r="3" cx="15" cy="3" fill="white"></circle><circle r="3" cx="27" cy="3" fill="white"></circle></svg></button>' };
        var U = 16, Y = "[data-footnote-id]", $ = function(e2, t2) {
          return e2.target.closest(t2);
        }, G = function(e2) {
          return null == e2 ? void 0 : e2.dataset.footnoteId;
        }, J = function(e2, t2) {
          return function(n2) {
            var r2 = $(n2, "[data-footnote-button]"), i2 = G(r2);
            i2 ? e2(i2) : $(n2, "[data-footnote-popover]") || t2();
          };
        }, K = function(e2) {
          return function(t2) {
            t2.preventDefault();
            var n2 = $(t2, Y), r2 = G(n2);
            r2 && e2(r2);
          };
        }, Q = function(e2) {
          return function(t2) {
            27 !== t2.keyCode && "Escape" !== t2.key && "Esc" !== t2.key || e2();
          };
        }, X = document.addEventListener, Z = window.addEventListener, ee = function(e2, t2, n2, r2) {
          X(e2, function(e3) {
            var r3 = e3.target;
            (null == r3 ? void 0 : r3.closest(t2)) && n2.call(r3, e3);
          }, r2);
        };
        function te(e2) {
          void 0 === e2 && (e2 = {});
          var n2 = t(t({}, N), e2), r2 = function(e3, t2) {
            var n3 = e3.footnotes, r3 = e3.unmount, i3 = function(e4) {
              return function(n4) {
                n4.isReady() && (n4.dismiss(t2.dismissCallback), setTimeout(n4.remove, e4));
              };
            }, o2 = function(e4) {
              return function(r4) {
                t2.allowMultiple || n3.filter(function(e5) {
                  return e5.id !== r4.id;
                }).forEach(i3(t2.dismissDelay)), r4.isReady() && (r4.activate(t2.activateCallback), r4.reposition(), r4.resize(), setTimeout(r4.ready, e4));
              };
            }, a2 = function(e4) {
              return function(t3) {
                var r4 = n3.find(function(e5) {
                  return e5.id === t3;
                });
                r4 && e4(r4);
              };
            };
            return { activate: function(e4, t3) {
              return a2(o2(t3))(e4);
            }, dismiss: function(e4, t3) {
              return a2(i3(t3))(e4);
            }, dismissAll: function() {
              return n3.forEach(i3(t2.dismissDelay));
            }, repositionAll: function() {
              return n3.forEach(function(e4) {
                return e4.reposition();
              });
            }, resizeAll: function() {
              return n3.forEach(function(e4) {
                return e4.resize();
              });
            }, toggle: a2(function(e4) {
              return e4.isActive() ? i3(t2.dismissDelay)(e4) : o2(t2.activateDelay)(e4);
            }), hover: a2(function(e4) {
              e4.startHovering(), t2.activateOnHover && !e4.isActive() && o2(t2.hoverDelay)(e4);
            }), unhover: a2(function(e4) {
              e4.stopHovering(), t2.dismissOnUnhover && setTimeout(function() {
                return n3.filter(function(e5) {
                  return !e5.isHovered();
                }).forEach(i3(t2.dismissDelay));
              }, t2.hoverDelay);
            }), unmount: r3 };
          }(V(n2), n2), i2 = function(e3) {
            var t2 = new AbortController(), n3 = t2.signal, r3 = J(e3.toggle, e3.dismissAll), i3 = Q(e3.dismissAll), o2 = S(e3.repositionAll, U), a2 = S(e3.resizeAll, U), u2 = K(e3.hover), c2 = K(e3.unhover);
            return X("touchend", r3, { signal: n3 }), X("click", r3, { signal: n3 }), X("keyup", i3, { signal: n3 }), X("gestureend", o2, { signal: n3 }), Z("scroll", o2, { signal: n3 }), Z("resize", a2, { signal: n3 }), ee("mouseover", Y, u2, { signal: n3 }), ee("mouseout", Y, c2, { signal: n3 }), function() {
              t2.abort();
            };
          }(r2);
          return { activate: function(e3, t2) {
            void 0 === t2 && (t2 = n2.activateDelay), r2.activate(e3, t2);
          }, dismiss: function(e3, t2) {
            void 0 === t2 && (t2 = n2.dismissDelay), void 0 === e3 ? r2.dismissAll() : r2.dismiss(e3, t2);
          }, unmount: function() {
            i2(), r2.unmount();
          }, getSetting: function(e3) {
            return n2[e3];
          }, updateSetting: function(e3, t2) {
            n2[e3] = t2;
          } };
        }
        e.default = te, e.littlefoot = te, Object.defineProperty(e, "__esModule", { value: true });
      });
    }
  });

  // <stdin>
  var { littlefoot } = require_littlefoot();
  littlefoot();
})();
