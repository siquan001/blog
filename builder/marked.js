"use strict";

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e54) { throw _e54; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e55) { didErr = true; err = _e55; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * marked v12.0.2 - a markdown parser
 * Copyright (c) 2011-2024, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).marked = {});
}(void 0, function (e) {
  "use strict";

  function t() {
    return {
      async: !1,
      breaks: !1,
      extensions: null,
      gfm: !0,
      hooks: null,
      pedantic: !1,
      renderer: null,
      silent: !1,
      tokenizer: null,
      walkTokens: null
    };
  }
  function n(t) {
    e.defaults = t;
  }
  e.defaults = {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
  var s = /[&<>"']/,
    r = new RegExp(s.source, "g"),
    i = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    l = new RegExp(i.source, "g"),
    o = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    },
    a = function a(e) {
      return o[e];
    };
  function c(e, t) {
    if (t) {
      if (s.test(e)) return e.replace(r, a);
    } else if (i.test(e)) return e.replace(l, a);
    return e;
  }
  var h = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
  function p(e) {
    return e.replace(h, function (e, t) {
      return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "";
    });
  }
  var u = /(^|[^\[])\^/g;
  function k(e, t) {
    var n = "string" == typeof e ? e : e.source;
    t = t || "";
    var s = {
      replace: function replace(e, t) {
        var r = "string" == typeof t ? t : t.source;
        return r = r.replace(u, "$1"), n = n.replace(e, r), s;
      },
      getRegex: function getRegex() {
        return new RegExp(n, t);
      }
    };
    return s;
  }
  function g(e) {
    try {
      e = encodeURI(e).replace(/%25/g, "%");
    } catch (e) {
      return null;
    }
    return e;
  }
  var f = {
    exec: function exec() {
      return null;
    }
  };
  function d(e, t) {
    var n = e.replace(/\|/g, function (e, t, n) {
      var s = !1,
        r = t;
      for (; --r >= 0 && "\\" === n[r];) s = !s;
      return s ? "|" : " |";
    }).split(/ \|/);
    var s = 0;
    if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), t) if (n.length > t) n.splice(t);else for (; n.length < t;) n.push("");
    for (; s < n.length; s++) n[s] = n[s].trim().replace(/\\\|/g, "|");
    return n;
  }
  function x(e, t, n) {
    var s = e.length;
    if (0 === s) return "";
    var r = 0;
    for (; r < s;) {
      var _i = e.charAt(s - r - 1);
      if (_i !== t || n) {
        if (_i === t || !n) break;
        r++;
      } else r++;
    }
    return e.slice(0, s - r);
  }
  function b(e, t, n, s) {
    var r = t.href,
      i = t.title ? c(t.title) : null,
      l = e[1].replace(/\\([\[\]])/g, "$1");
    if ("!" !== e[0].charAt(0)) {
      s.state.inLink = !0;
      var _e = {
        type: "link",
        raw: n,
        href: r,
        title: i,
        text: l,
        tokens: s.inlineTokens(l)
      };
      return s.state.inLink = !1, _e;
    }
    return {
      type: "image",
      raw: n,
      href: r,
      title: i,
      text: c(l)
    };
  }
  var w = /*#__PURE__*/function () {
    function w(t) {
      _classCallCheck(this, w);
      _defineProperty(this, "options", void 0);
      _defineProperty(this, "rules", void 0);
      _defineProperty(this, "lexer", void 0);
      this.options = t || e.defaults;
    }
    _createClass(w, [{
      key: "space",
      value: function space(e) {
        var t = this.rules.block.newline.exec(e);
        if (t && t[0].length > 0) return {
          type: "space",
          raw: t[0]
        };
      }
    }, {
      key: "code",
      value: function code(e) {
        var t = this.rules.block.code.exec(e);
        if (t) {
          var _e2 = t[0].replace(/^ {1,4}/gm, "");
          return {
            type: "code",
            raw: t[0],
            codeBlockStyle: "indented",
            text: this.options.pedantic ? _e2 : x(_e2, "\n")
          };
        }
      }
    }, {
      key: "fences",
      value: function fences(e) {
        var t = this.rules.block.fences.exec(e);
        if (t) {
          var _e3 = t[0],
            _n = function (e, t) {
              var n = e.match(/^(\s+)(?:```)/);
              if (null === n) return t;
              var s = n[1];
              return t.split("\n").map(function (e) {
                var t = e.match(/^\s+/);
                if (null === t) return e;
                var _t = _slicedToArray(t, 1),
                  n = _t[0];
                return n.length >= s.length ? e.slice(s.length) : e;
              }).join("\n");
            }(_e3, t[3] || "");
          return {
            type: "code",
            raw: _e3,
            lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
            text: _n
          };
        }
      }
    }, {
      key: "heading",
      value: function heading(e) {
        var t = this.rules.block.heading.exec(e);
        if (t) {
          var _e4 = t[2].trim();
          if (/#$/.test(_e4)) {
            var _t2 = x(_e4, "#");
            this.options.pedantic ? _e4 = _t2.trim() : _t2 && !/ $/.test(_t2) || (_e4 = _t2.trim());
          }
          return {
            type: "heading",
            raw: t[0],
            depth: t[1].length,
            text: _e4,
            tokens: this.lexer.inline(_e4)
          };
        }
      }
    }, {
      key: "hr",
      value: function hr(e) {
        var t = this.rules.block.hr.exec(e);
        if (t) return {
          type: "hr",
          raw: t[0]
        };
      }
    }, {
      key: "blockquote",
      value: function blockquote(e) {
        var t = this.rules.block.blockquote.exec(e);
        if (t) {
          var _e5 = t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1");
          _e5 = x(_e5.replace(/^ *>[ \t]?/gm, ""), "\n");
          var _n2 = this.lexer.state.top;
          this.lexer.state.top = !0;
          var _s2 = this.lexer.blockTokens(_e5);
          return this.lexer.state.top = _n2, {
            type: "blockquote",
            raw: t[0],
            tokens: _s2,
            text: _e5
          };
        }
      }
    }, {
      key: "list",
      value: function list(e) {
        var t = this.rules.block.list.exec(e);
        if (t) {
          var _n3 = t[1].trim();
          var _s3 = _n3.length > 1,
            _r2 = {
              type: "list",
              raw: "",
              ordered: _s3,
              start: _s3 ? +_n3.slice(0, -1) : "",
              loose: !1,
              items: []
            };
          _n3 = _s3 ? "\\d{1,9}\\".concat(_n3.slice(-1)) : "\\".concat(_n3), this.options.pedantic && (_n3 = _s3 ? _n3 : "[*+-]");
          var _i2 = new RegExp("^( {0,3}".concat(_n3, ")((?:[\t ][^\\n]*)?(?:\\n|$))"));
          var _l = "",
            _o = "",
            _a = !1;
          for (; e;) {
            var _n4 = !1;
            if (!(t = _i2.exec(e))) break;
            if (this.rules.block.hr.test(e)) break;
            _l = t[0], e = e.substring(_l.length);
            var _s4 = t[2].split("\n", 1)[0].replace(/^\t+/, function (e) {
                return " ".repeat(3 * e.length);
              }),
              _c = e.split("\n", 1)[0],
              _h = 0;
            this.options.pedantic ? (_h = 2, _o = _s4.trimStart()) : (_h = t[2].search(/[^ ]/), _h = _h > 4 ? 1 : _h, _o = _s4.slice(_h), _h += t[1].length);
            var _p = !1;
            if (!_s4 && /^ *$/.test(_c) && (_l += _c + "\n", e = e.substring(_c.length + 1), _n4 = !0), !_n4) {
              var _t3 = new RegExp("^ {0,".concat(Math.min(3, _h - 1), "}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))")),
                _n5 = new RegExp("^ {0,".concat(Math.min(3, _h - 1), "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)")),
                _r3 = new RegExp("^ {0,".concat(Math.min(3, _h - 1), "}(?:```|~~~)")),
                _i3 = new RegExp("^ {0,".concat(Math.min(3, _h - 1), "}#"));
              for (; e;) {
                var _a2 = e.split("\n", 1)[0];
                if (_c = _a2, this.options.pedantic && (_c = _c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), _r3.test(_c)) break;
                if (_i3.test(_c)) break;
                if (_t3.test(_c)) break;
                if (_n5.test(e)) break;
                if (_c.search(/[^ ]/) >= _h || !_c.trim()) _o += "\n" + _c.slice(_h);else {
                  if (_p) break;
                  if (_s4.search(/[^ ]/) >= 4) break;
                  if (_r3.test(_s4)) break;
                  if (_i3.test(_s4)) break;
                  if (_n5.test(_s4)) break;
                  _o += "\n" + _c;
                }
                _p || _c.trim() || (_p = !0), _l += _a2 + "\n", e = e.substring(_a2.length + 1), _s4 = _c.slice(_h);
              }
            }
            _r2.loose || (_a ? _r2.loose = !0 : /\n *\n *$/.test(_l) && (_a = !0));
            var _u = void 0,
              _k = null;
            this.options.gfm && (_k = /^\[[ xX]\] /.exec(_o), _k && (_u = "[ ] " !== _k[0], _o = _o.replace(/^\[[ xX]\] +/, ""))), _r2.items.push({
              type: "list_item",
              raw: _l,
              task: !!_k,
              checked: _u,
              loose: !1,
              text: _o,
              tokens: []
            }), _r2.raw += _l;
          }
          _r2.items[_r2.items.length - 1].raw = _l.trimEnd(), _r2.items[_r2.items.length - 1].text = _o.trimEnd(), _r2.raw = _r2.raw.trimEnd();
          for (var _e6 = 0; _e6 < _r2.items.length; _e6++) if (this.lexer.state.top = !1, _r2.items[_e6].tokens = this.lexer.blockTokens(_r2.items[_e6].text, []), !_r2.loose) {
            var _t4 = _r2.items[_e6].tokens.filter(function (e) {
                return "space" === e.type;
              }),
              _n6 = _t4.length > 0 && _t4.some(function (e) {
                return /\n.*\n/.test(e.raw);
              });
            _r2.loose = _n6;
          }
          if (_r2.loose) for (var _e7 = 0; _e7 < _r2.items.length; _e7++) _r2.items[_e7].loose = !0;
          return _r2;
        }
      }
    }, {
      key: "html",
      value: function html(e) {
        var t = this.rules.block.html.exec(e);
        if (t) {
          return {
            type: "html",
            block: !0,
            raw: t[0],
            pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
            text: t[0]
          };
        }
      }
    }, {
      key: "def",
      value: function def(e) {
        var t = this.rules.block.def.exec(e);
        if (t) {
          var _e8 = t[1].toLowerCase().replace(/\s+/g, " "),
            _n7 = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
            _s5 = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
          return {
            type: "def",
            tag: _e8,
            raw: t[0],
            href: _n7,
            title: _s5
          };
        }
      }
    }, {
      key: "table",
      value: function table(e) {
        var _this = this;
        var t = this.rules.block.table.exec(e);
        if (!t) return;
        if (!/[:|]/.test(t[2])) return;
        var n = d(t[1]),
          s = t[2].replace(/^\||\| *$/g, "").split("|"),
          r = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [],
          i = {
            type: "table",
            raw: t[0],
            header: [],
            align: [],
            rows: []
          };
        if (n.length === s.length) {
          var _iterator = _createForOfIteratorHelper(s),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _e9 = _step.value;
              /^ *-+: *$/.test(_e9) ? i.align.push("right") : /^ *:-+: *$/.test(_e9) ? i.align.push("center") : /^ *:-+ *$/.test(_e9) ? i.align.push("left") : i.align.push(null);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var _iterator2 = _createForOfIteratorHelper(n),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _e10 = _step2.value;
              i.header.push({
                text: _e10,
                tokens: this.lexer.inline(_e10)
              });
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var _iterator3 = _createForOfIteratorHelper(r),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _e11 = _step3.value;
              i.rows.push(d(_e11, i.header.length).map(function (e) {
                return {
                  text: e,
                  tokens: _this.lexer.inline(e)
                };
              }));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          return i;
        }
      }
    }, {
      key: "lheading",
      value: function lheading(e) {
        var t = this.rules.block.lheading.exec(e);
        if (t) return {
          type: "heading",
          raw: t[0],
          depth: "=" === t[2].charAt(0) ? 1 : 2,
          text: t[1],
          tokens: this.lexer.inline(t[1])
        };
      }
    }, {
      key: "paragraph",
      value: function paragraph(e) {
        var t = this.rules.block.paragraph.exec(e);
        if (t) {
          var _e12 = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
          return {
            type: "paragraph",
            raw: t[0],
            text: _e12,
            tokens: this.lexer.inline(_e12)
          };
        }
      }
    }, {
      key: "text",
      value: function text(e) {
        var t = this.rules.block.text.exec(e);
        if (t) return {
          type: "text",
          raw: t[0],
          text: t[0],
          tokens: this.lexer.inline(t[0])
        };
      }
    }, {
      key: "escape",
      value: function escape(e) {
        var t = this.rules.inline.escape.exec(e);
        if (t) return {
          type: "escape",
          raw: t[0],
          text: c(t[1])
        };
      }
    }, {
      key: "tag",
      value: function tag(e) {
        var t = this.rules.inline.tag.exec(e);
        if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
          type: "html",
          raw: t[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: !1,
          text: t[0]
        };
      }
    }, {
      key: "link",
      value: function link(e) {
        var t = this.rules.inline.link.exec(e);
        if (t) {
          var _e13 = t[2].trim();
          if (!this.options.pedantic && /^</.test(_e13)) {
            if (!/>$/.test(_e13)) return;
            var _t5 = x(_e13.slice(0, -1), "\\");
            if ((_e13.length - _t5.length) % 2 == 0) return;
          } else {
            var _e14 = function (e, t) {
              if (-1 === e.indexOf(t[1])) return -1;
              var n = 0;
              for (var _s6 = 0; _s6 < e.length; _s6++) if ("\\" === e[_s6]) _s6++;else if (e[_s6] === t[0]) n++;else if (e[_s6] === t[1] && (n--, n < 0)) return _s6;
              return -1;
            }(t[2], "()");
            if (_e14 > -1) {
              var _n8 = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + _e14;
              t[2] = t[2].substring(0, _e14), t[0] = t[0].substring(0, _n8).trim(), t[3] = "";
            }
          }
          var _n9 = t[2],
            _s7 = "";
          if (this.options.pedantic) {
            var _e15 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(_n9);
            _e15 && (_n9 = _e15[1], _s7 = _e15[3]);
          } else _s7 = t[3] ? t[3].slice(1, -1) : "";
          return _n9 = _n9.trim(), /^</.test(_n9) && (_n9 = this.options.pedantic && !/>$/.test(_e13) ? _n9.slice(1) : _n9.slice(1, -1)), b(t, {
            href: _n9 ? _n9.replace(this.rules.inline.anyPunctuation, "$1") : _n9,
            title: _s7 ? _s7.replace(this.rules.inline.anyPunctuation, "$1") : _s7
          }, t[0], this.lexer);
        }
      }
    }, {
      key: "reflink",
      value: function reflink(e, t) {
        var n;
        if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
          var _e16 = t[(n[2] || n[1]).replace(/\s+/g, " ").toLowerCase()];
          if (!_e16) {
            var _e17 = n[0].charAt(0);
            return {
              type: "text",
              raw: _e17,
              text: _e17
            };
          }
          return b(n, _e16, n[0], this.lexer);
        }
      }
    }, {
      key: "emStrong",
      value: function emStrong(e, t) {
        var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var s = this.rules.inline.emStrongLDelim.exec(e);
        if (!s) return;
        if (s[3] && n.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/)) return;
        if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
          var _n10 = _toConsumableArray(s[0]).length - 1;
          var _r4,
            _i4,
            _l2 = _n10,
            _o2 = 0;
          var _a3 = "*" === s[0][0] ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
          for (_a3.lastIndex = 0, t = t.slice(-1 * e.length + _n10); null != (s = _a3.exec(t));) {
            if (_r4 = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !_r4) continue;
            if (_i4 = _toConsumableArray(_r4).length, s[3] || s[4]) {
              _l2 += _i4;
              continue;
            }
            if ((s[5] || s[6]) && _n10 % 3 && !((_n10 + _i4) % 3)) {
              _o2 += _i4;
              continue;
            }
            if (_l2 -= _i4, _l2 > 0) continue;
            _i4 = Math.min(_i4, _i4 + _l2 + _o2);
            var _t6 = _toConsumableArray(s[0])[0].length,
              _a4 = e.slice(0, _n10 + s.index + _t6 + _i4);
            if (Math.min(_n10, _i4) % 2) {
              var _e18 = _a4.slice(1, -1);
              return {
                type: "em",
                raw: _a4,
                text: _e18,
                tokens: this.lexer.inlineTokens(_e18)
              };
            }
            var _c2 = _a4.slice(2, -2);
            return {
              type: "strong",
              raw: _a4,
              text: _c2,
              tokens: this.lexer.inlineTokens(_c2)
            };
          }
        }
      }
    }, {
      key: "codespan",
      value: function codespan(e) {
        var t = this.rules.inline.code.exec(e);
        if (t) {
          var _e19 = t[2].replace(/\n/g, " ");
          var _n11 = /[^ ]/.test(_e19),
            _s8 = /^ /.test(_e19) && / $/.test(_e19);
          return _n11 && _s8 && (_e19 = _e19.substring(1, _e19.length - 1)), _e19 = c(_e19, !0), {
            type: "codespan",
            raw: t[0],
            text: _e19
          };
        }
      }
    }, {
      key: "br",
      value: function br(e) {
        var t = this.rules.inline.br.exec(e);
        if (t) return {
          type: "br",
          raw: t[0]
        };
      }
    }, {
      key: "del",
      value: function del(e) {
        var t = this.rules.inline.del.exec(e);
        if (t) return {
          type: "del",
          raw: t[0],
          text: t[2],
          tokens: this.lexer.inlineTokens(t[2])
        };
      }
    }, {
      key: "autolink",
      value: function autolink(e) {
        var t = this.rules.inline.autolink.exec(e);
        if (t) {
          var _e20, _n12;
          return "@" === t[2] ? (_e20 = c(t[1]), _n12 = "mailto:" + _e20) : (_e20 = c(t[1]), _n12 = _e20), {
            type: "link",
            raw: t[0],
            text: _e20,
            href: _n12,
            tokens: [{
              type: "text",
              raw: _e20,
              text: _e20
            }]
          };
        }
      }
    }, {
      key: "url",
      value: function url(e) {
        var t;
        if (t = this.rules.inline.url.exec(e)) {
          var _e21, _n13;
          if ("@" === t[2]) _e21 = c(t[0]), _n13 = "mailto:" + _e21;else {
            var _s9;
            do {
              var _this$rules$inline$_b, _this$rules$inline$_b2;
              _s9 = t[0], t[0] = (_this$rules$inline$_b = (_this$rules$inline$_b2 = this.rules.inline._backpedal.exec(t[0])) === null || _this$rules$inline$_b2 === void 0 ? void 0 : _this$rules$inline$_b2[0]) !== null && _this$rules$inline$_b !== void 0 ? _this$rules$inline$_b : "";
            } while (_s9 !== t[0]);
            _e21 = c(t[0]), _n13 = "www." === t[1] ? "http://" + t[0] : t[0];
          }
          return {
            type: "link",
            raw: t[0],
            text: _e21,
            href: _n13,
            tokens: [{
              type: "text",
              raw: _e21,
              text: _e21
            }]
          };
        }
      }
    }, {
      key: "inlineText",
      value: function inlineText(e) {
        var t = this.rules.inline.text.exec(e);
        if (t) {
          var _e22;
          return _e22 = this.lexer.state.inRawBlock ? t[0] : c(t[0]), {
            type: "text",
            raw: t[0],
            text: _e22
          };
        }
      }
    }]);
    return w;
  }();
  var m = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    y = /(?:[*+-]|\d{1,9}[.)])/,
    $ = k(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, y).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(),
    z = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    T = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
    R = k(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", T).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),
    _ = k(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, y).getRegex(),
    A = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    S = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
    I = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", S).replace("tag", A).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
    E = k(z).replace("hr", m).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", A).getRegex(),
    q = {
      blockquote: k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", E).getRegex(),
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      def: R,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      hr: m,
      html: I,
      lheading: $,
      list: _,
      newline: /^(?: *(?:\n|$))+/,
      paragraph: E,
      table: f,
      text: /^[^\n]+/
    },
    Z = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", m).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", A).getRegex(),
    L = _objectSpread(_objectSpread({}, q), {}, {
      table: Z,
      paragraph: k(z).replace("hr", m).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Z).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", A).getRegex()
    }),
    P = _objectSpread(_objectSpread({}, q), {}, {
      html: k("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", S).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: f,
      lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      paragraph: k(z).replace("hr", m).replace("heading", " *#{1,6} *[^\n]").replace("lheading", $).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
    }),
    Q = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    v = /^( {2,}|\\)\n(?!\s*$)/,
    B = "\\p{P}\\p{S}",
    C = k(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, B).getRegex(),
    M = k(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, B).getRegex(),
    O = k("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, B).getRegex(),
    D = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, B).getRegex(),
    j = k(/\\([punct])/, "gu").replace(/punct/g, B).getRegex(),
    H = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),
    U = k(S).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
    X = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", U).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),
    F = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    N = k(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", F).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),
    G = k(/^!?\[(label)\]\[(ref)\]/).replace("label", F).replace("ref", T).getRegex(),
    J = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", T).getRegex(),
    K = {
      _backpedal: f,
      anyPunctuation: j,
      autolink: H,
      blockSkip: /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
      br: v,
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      del: f,
      emStrongLDelim: M,
      emStrongRDelimAst: O,
      emStrongRDelimUnd: D,
      escape: Q,
      link: N,
      nolink: J,
      punctuation: C,
      reflink: G,
      reflinkSearch: k("reflink|nolink(?!\\()", "g").replace("reflink", G).replace("nolink", J).getRegex(),
      tag: X,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
      url: f
    },
    V = _objectSpread(_objectSpread({}, K), {}, {
      link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", F).getRegex(),
      reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", F).getRegex()
    }),
    W = _objectSpread(_objectSpread({}, K), {}, {
      escape: k(Q).replace("])", "~|])").getRegex(),
      url: k(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
      _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    }),
    Y = _objectSpread(_objectSpread({}, W), {}, {
      br: k(v).replace("{2,}", "*").getRegex(),
      text: k(W.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    }),
    ee = {
      normal: q,
      gfm: L,
      pedantic: P
    },
    te = {
      normal: K,
      gfm: W,
      breaks: Y,
      pedantic: V
    };
  var ne = /*#__PURE__*/function () {
    function ne(t) {
      _classCallCheck(this, ne);
      _defineProperty(this, "tokens", void 0);
      _defineProperty(this, "options", void 0);
      _defineProperty(this, "state", void 0);
      _defineProperty(this, "tokenizer", void 0);
      _defineProperty(this, "inlineQueue", void 0);
      this.tokens = [], this.tokens.links = Object.create(null), this.options = t || e.defaults, this.options.tokenizer = this.options.tokenizer || new w(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
        inLink: !1,
        inRawBlock: !1,
        top: !0
      };
      var n = {
        block: ee.normal,
        inline: te.normal
      };
      this.options.pedantic ? (n.block = ee.pedantic, n.inline = te.pedantic) : this.options.gfm && (n.block = ee.gfm, this.options.breaks ? n.inline = te.breaks : n.inline = te.gfm), this.tokenizer.rules = n;
    }
    _createClass(ne, [{
      key: "lex",
      value: function lex(e) {
        e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens);
        for (var _e23 = 0; _e23 < this.inlineQueue.length; _e23++) {
          var _t7 = this.inlineQueue[_e23];
          this.inlineTokens(_t7.src, _t7.tokens);
        }
        return this.inlineQueue = [], this.tokens;
      }
    }, {
      key: "blockTokens",
      value: function blockTokens(e) {
        var _this2 = this;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var n, s, r, i;
        for (e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, function (e, t, n) {
          return t + "    ".repeat(n.length);
        }); e;) if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(function (s) {
          return !!(n = s.call({
            lexer: _this2
          }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0);
        }))) if (n = this.tokenizer.space(e)) e = e.substring(n.raw.length), 1 === n.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(n);else if (n = this.tokenizer.code(e)) e = e.substring(n.raw.length), s = t[t.length - 1], !s || "paragraph" !== s.type && "text" !== s.type ? t.push(n) : (s.raw += "\n" + n.raw, s.text += "\n" + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = s.text);else if (n = this.tokenizer.fences(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.heading(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.hr(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.blockquote(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.list(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.html(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.def(e)) e = e.substring(n.raw.length), s = t[t.length - 1], !s || "paragraph" !== s.type && "text" !== s.type ? this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
          href: n.href,
          title: n.title
        }) : (s.raw += "\n" + n.raw, s.text += "\n" + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = s.text);else if (n = this.tokenizer.table(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.lheading(e)) e = e.substring(n.raw.length), t.push(n);else {
          if (r = e, this.options.extensions && this.options.extensions.startBlock) {
            var _t8 = 1 / 0;
            var _n14 = e.slice(1);
            var _s10 = void 0;
            this.options.extensions.startBlock.forEach(function (e) {
              _s10 = e.call({
                lexer: _this2
              }, _n14), "number" == typeof _s10 && _s10 >= 0 && (_t8 = Math.min(_t8, _s10));
            }), _t8 < 1 / 0 && _t8 >= 0 && (r = e.substring(0, _t8 + 1));
          }
          if (this.state.top && (n = this.tokenizer.paragraph(r))) s = t[t.length - 1], i && "paragraph" === s.type ? (s.raw += "\n" + n.raw, s.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n), i = r.length !== e.length, e = e.substring(n.raw.length);else if (n = this.tokenizer.text(e)) e = e.substring(n.raw.length), s = t[t.length - 1], s && "text" === s.type ? (s.raw += "\n" + n.raw, s.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n);else if (e) {
            var _t9 = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(_t9);
              break;
            }
            throw new Error(_t9);
          }
        }
        return this.state.top = !0, t;
      }
    }, {
      key: "inline",
      value: function inline(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return this.inlineQueue.push({
          src: e,
          tokens: t
        }), t;
      }
    }, {
      key: "inlineTokens",
      value: function inlineTokens(e) {
        var _this3 = this;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var n,
          s,
          r,
          i,
          l,
          o,
          a = e;
        if (this.tokens.links) {
          var _e24 = Object.keys(this.tokens.links);
          if (_e24.length > 0) for (; null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(a));) _e24.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (a = a.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
        }
        for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(a));) a = a.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (; null != (i = this.tokenizer.rules.inline.anyPunctuation.exec(a));) a = a.slice(0, i.index) + "++" + a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        for (; e;) if (l || (o = ""), l = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(function (s) {
          return !!(n = s.call({
            lexer: _this3
          }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0);
        }))) if (n = this.tokenizer.escape(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.tag(e)) e = e.substring(n.raw.length), s = t[t.length - 1], s && "text" === n.type && "text" === s.type ? (s.raw += n.raw, s.text += n.text) : t.push(n);else if (n = this.tokenizer.link(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(n.raw.length), s = t[t.length - 1], s && "text" === n.type && "text" === s.type ? (s.raw += n.raw, s.text += n.text) : t.push(n);else if (n = this.tokenizer.emStrong(e, a, o)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.codespan(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.br(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.del(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.autolink(e)) e = e.substring(n.raw.length), t.push(n);else if (this.state.inLink || !(n = this.tokenizer.url(e))) {
          if (r = e, this.options.extensions && this.options.extensions.startInline) {
            var _t10 = 1 / 0;
            var _n15 = e.slice(1);
            var _s11 = void 0;
            this.options.extensions.startInline.forEach(function (e) {
              _s11 = e.call({
                lexer: _this3
              }, _n15), "number" == typeof _s11 && _s11 >= 0 && (_t10 = Math.min(_t10, _s11));
            }), _t10 < 1 / 0 && _t10 >= 0 && (r = e.substring(0, _t10 + 1));
          }
          if (n = this.tokenizer.inlineText(r)) e = e.substring(n.raw.length), "_" !== n.raw.slice(-1) && (o = n.raw.slice(-1)), l = !0, s = t[t.length - 1], s && "text" === s.type ? (s.raw += n.raw, s.text += n.text) : t.push(n);else if (e) {
            var _t11 = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(_t11);
              break;
            }
            throw new Error(_t11);
          }
        } else e = e.substring(n.raw.length), t.push(n);
        return t;
      }
    }], [{
      key: "rules",
      get: function get() {
        return {
          block: ee,
          inline: te
        };
      }
    }, {
      key: "lex",
      value: function lex(e, t) {
        return new ne(t).lex(e);
      }
    }, {
      key: "lexInline",
      value: function lexInline(e, t) {
        return new ne(t).inlineTokens(e);
      }
    }]);
    return ne;
  }();
  var se = /*#__PURE__*/function () {
    function se(t) {
      _classCallCheck(this, se);
      _defineProperty(this, "options", void 0);
      this.options = t || e.defaults;
    }
    _createClass(se, [{
      key: "code",
      value: function code(e, t, n) {
        var _match;
        var s = (_match = (t || "").match(/^\S*/)) === null || _match === void 0 ? void 0 : _match[0];
        return e = e.replace(/\n$/, "") + "\n", s ? '<pre><code class="language-' + c(s) + '">' + (n ? e : c(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : c(e, !0)) + "</code></pre>\n";
      }
    }, {
      key: "blockquote",
      value: function blockquote(e) {
        return "<blockquote>\n".concat(e, "</blockquote>\n");
      }
    }, {
      key: "html",
      value: function html(e, t) {
        return e;
      }
    }, {
      key: "heading",
      value: function heading(e, t, n) {
        return "<h".concat(t, ">").concat(e, "</h").concat(t, ">\n");
      }
    }, {
      key: "hr",
      value: function hr() {
        return "<hr>\n";
      }
    }, {
      key: "list",
      value: function list(e, t, n) {
        var s = t ? "ol" : "ul";
        return "<" + s + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + s + ">\n";
      }
    }, {
      key: "listitem",
      value: function listitem(e, t, n) {
        return "<li>".concat(e, "</li>\n");
      }
    }, {
      key: "checkbox",
      value: function checkbox(e) {
        return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
      }
    }, {
      key: "paragraph",
      value: function paragraph(e) {
        return "<p>".concat(e, "</p>\n");
      }
    }, {
      key: "table",
      value: function table(e, t) {
        return t && (t = "<tbody>".concat(t, "</tbody>")), "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n";
      }
    }, {
      key: "tablerow",
      value: function tablerow(e) {
        return "<tr>\n".concat(e, "</tr>\n");
      }
    }, {
      key: "tablecell",
      value: function tablecell(e, t) {
        var n = t.header ? "th" : "td";
        return (t.align ? "<".concat(n, " align=\"").concat(t.align, "\">") : "<".concat(n, ">")) + e + "</".concat(n, ">\n");
      }
    }, {
      key: "strong",
      value: function strong(e) {
        return "<strong>".concat(e, "</strong>");
      }
    }, {
      key: "em",
      value: function em(e) {
        return "<em>".concat(e, "</em>");
      }
    }, {
      key: "codespan",
      value: function codespan(e) {
        return "<code>".concat(e, "</code>");
      }
    }, {
      key: "br",
      value: function br() {
        return "<br>";
      }
    }, {
      key: "del",
      value: function del(e) {
        return "<del>".concat(e, "</del>");
      }
    }, {
      key: "link",
      value: function link(e, t, n) {
        var s = g(e);
        if (null === s) return n;
        var r = '<a href="' + (e = s) + '"';
        return t && (r += ' title="' + t + '"'), r += ">" + n + "</a>", r;
      }
    }, {
      key: "image",
      value: function image(e, t, n) {
        var s = g(e);
        if (null === s) return n;
        var r = "<img src=\"".concat(e = s, "\" alt=\"").concat(n, "\"");
        return t && (r += " title=\"".concat(t, "\"")), r += ">", r;
      }
    }, {
      key: "text",
      value: function text(e) {
        return e;
      }
    }]);
    return se;
  }();
  var re = /*#__PURE__*/function () {
    function re() {
      _classCallCheck(this, re);
    }
    _createClass(re, [{
      key: "strong",
      value: function strong(e) {
        return e;
      }
    }, {
      key: "em",
      value: function em(e) {
        return e;
      }
    }, {
      key: "codespan",
      value: function codespan(e) {
        return e;
      }
    }, {
      key: "del",
      value: function del(e) {
        return e;
      }
    }, {
      key: "html",
      value: function html(e) {
        return e;
      }
    }, {
      key: "text",
      value: function text(e) {
        return e;
      }
    }, {
      key: "link",
      value: function link(e, t, n) {
        return "" + n;
      }
    }, {
      key: "image",
      value: function image(e, t, n) {
        return "" + n;
      }
    }, {
      key: "br",
      value: function br() {
        return "";
      }
    }]);
    return re;
  }();
  var ie = /*#__PURE__*/function () {
    function ie(t) {
      _classCallCheck(this, ie);
      _defineProperty(this, "options", void 0);
      _defineProperty(this, "renderer", void 0);
      _defineProperty(this, "textRenderer", void 0);
      this.options = t || e.defaults, this.options.renderer = this.options.renderer || new se(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new re();
    }
    _createClass(ie, [{
      key: "parse",
      value: function parse(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        var n = "";
        for (var _s12 = 0; _s12 < e.length; _s12++) {
          var _r5 = e[_s12];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[_r5.type]) {
            var _e25 = _r5,
              _t12 = this.options.extensions.renderers[_e25.type].call({
                parser: this
              }, _e25);
            if (!1 !== _t12 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(_e25.type)) {
              n += _t12 || "";
              continue;
            }
          }
          switch (_r5.type) {
            case "space":
              continue;
            case "hr":
              n += this.renderer.hr();
              continue;
            case "heading":
              {
                var _e26 = _r5;
                n += this.renderer.heading(this.parseInline(_e26.tokens), _e26.depth, p(this.parseInline(_e26.tokens, this.textRenderer)));
                continue;
              }
            case "code":
              {
                var _e27 = _r5;
                n += this.renderer.code(_e27.text, _e27.lang, !!_e27.escaped);
                continue;
              }
            case "table":
              {
                var _e28 = _r5;
                var _t13 = "",
                  _s13 = "";
                for (var _t14 = 0; _t14 < _e28.header.length; _t14++) _s13 += this.renderer.tablecell(this.parseInline(_e28.header[_t14].tokens), {
                  header: !0,
                  align: _e28.align[_t14]
                });
                _t13 += this.renderer.tablerow(_s13);
                var _i5 = "";
                for (var _t15 = 0; _t15 < _e28.rows.length; _t15++) {
                  var _n16 = _e28.rows[_t15];
                  _s13 = "";
                  for (var _t16 = 0; _t16 < _n16.length; _t16++) _s13 += this.renderer.tablecell(this.parseInline(_n16[_t16].tokens), {
                    header: !1,
                    align: _e28.align[_t16]
                  });
                  _i5 += this.renderer.tablerow(_s13);
                }
                n += this.renderer.table(_t13, _i5);
                continue;
              }
            case "blockquote":
              {
                var _e29 = _r5,
                  _t17 = this.parse(_e29.tokens);
                n += this.renderer.blockquote(_t17);
                continue;
              }
            case "list":
              {
                var _e30 = _r5,
                  _t18 = _e30.ordered,
                  _s14 = _e30.start,
                  _i6 = _e30.loose;
                var _l3 = "";
                for (var _t19 = 0; _t19 < _e30.items.length; _t19++) {
                  var _n17 = _e30.items[_t19],
                    _s15 = _n17.checked,
                    _r6 = _n17.task;
                  var _o3 = "";
                  if (_n17.task) {
                    var _e31 = this.renderer.checkbox(!!_s15);
                    _i6 ? _n17.tokens.length > 0 && "paragraph" === _n17.tokens[0].type ? (_n17.tokens[0].text = _e31 + " " + _n17.tokens[0].text, _n17.tokens[0].tokens && _n17.tokens[0].tokens.length > 0 && "text" === _n17.tokens[0].tokens[0].type && (_n17.tokens[0].tokens[0].text = _e31 + " " + _n17.tokens[0].tokens[0].text)) : _n17.tokens.unshift({
                      type: "text",
                      text: _e31 + " "
                    }) : _o3 += _e31 + " ";
                  }
                  _o3 += this.parse(_n17.tokens, _i6), _l3 += this.renderer.listitem(_o3, _r6, !!_s15);
                }
                n += this.renderer.list(_l3, _t18, _s14);
                continue;
              }
            case "html":
              {
                var _e32 = _r5;
                n += this.renderer.html(_e32.text, _e32.block);
                continue;
              }
            case "paragraph":
              {
                var _e33 = _r5;
                n += this.renderer.paragraph(this.parseInline(_e33.tokens));
                continue;
              }
            case "text":
              {
                var _i7 = _r5,
                  _l4 = _i7.tokens ? this.parseInline(_i7.tokens) : _i7.text;
                for (; _s12 + 1 < e.length && "text" === e[_s12 + 1].type;) _i7 = e[++_s12], _l4 += "\n" + (_i7.tokens ? this.parseInline(_i7.tokens) : _i7.text);
                n += t ? this.renderer.paragraph(_l4) : _l4;
                continue;
              }
            default:
              {
                var _e34 = 'Token with "' + _r5.type + '" type was not found.';
                if (this.options.silent) return console.error(_e34), "";
                throw new Error(_e34);
              }
          }
        }
        return n;
      }
    }, {
      key: "parseInline",
      value: function parseInline(e, t) {
        t = t || this.renderer;
        var n = "";
        for (var _s16 = 0; _s16 < e.length; _s16++) {
          var _r7 = e[_s16];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[_r7.type]) {
            var _e35 = this.options.extensions.renderers[_r7.type].call({
              parser: this
            }, _r7);
            if (!1 !== _e35 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(_r7.type)) {
              n += _e35 || "";
              continue;
            }
          }
          switch (_r7.type) {
            case "escape":
              {
                var _e36 = _r7;
                n += t.text(_e36.text);
                break;
              }
            case "html":
              {
                var _e37 = _r7;
                n += t.html(_e37.text);
                break;
              }
            case "link":
              {
                var _e38 = _r7;
                n += t.link(_e38.href, _e38.title, this.parseInline(_e38.tokens, t));
                break;
              }
            case "image":
              {
                var _e39 = _r7;
                n += t.image(_e39.href, _e39.title, _e39.text);
                break;
              }
            case "strong":
              {
                var _e40 = _r7;
                n += t.strong(this.parseInline(_e40.tokens, t));
                break;
              }
            case "em":
              {
                var _e41 = _r7;
                n += t.em(this.parseInline(_e41.tokens, t));
                break;
              }
            case "codespan":
              {
                var _e42 = _r7;
                n += t.codespan(_e42.text);
                break;
              }
            case "br":
              n += t.br();
              break;
            case "del":
              {
                var _e43 = _r7;
                n += t.del(this.parseInline(_e43.tokens, t));
                break;
              }
            case "text":
              {
                var _e44 = _r7;
                n += t.text(_e44.text);
                break;
              }
            default:
              {
                var _e45 = 'Token with "' + _r7.type + '" type was not found.';
                if (this.options.silent) return console.error(_e45), "";
                throw new Error(_e45);
              }
          }
        }
        return n;
      }
    }], [{
      key: "parse",
      value: function parse(e, t) {
        return new ie(t).parse(e);
      }
    }, {
      key: "parseInline",
      value: function parseInline(e, t) {
        return new ie(t).parseInline(e);
      }
    }]);
    return ie;
  }();
  var le = /*#__PURE__*/function () {
    function le(t) {
      _classCallCheck(this, le);
      _defineProperty(this, "options", void 0);
      this.options = t || e.defaults;
    }
    _createClass(le, [{
      key: "preprocess",
      value: function preprocess(e) {
        return e;
      }
    }, {
      key: "postprocess",
      value: function postprocess(e) {
        return e;
      }
    }, {
      key: "processAllTokens",
      value: function processAllTokens(e) {
        return e;
      }
    }]);
    return le;
  }();
  _defineProperty(le, "passThroughHooks", new Set(["preprocess", "postprocess", "processAllTokens"]));
  var _e46 = /*#__PURE__*/new WeakSet();
  var _t20 = /*#__PURE__*/new WeakSet();
  var oe = /*#__PURE__*/function () {
    function oe() {
      _classCallCheck(this, oe);
      _classPrivateMethodInitSpec(this, _t20);
      _classPrivateMethodInitSpec(this, _e46);
      _defineProperty(this, "defaults", {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
      });
      _defineProperty(this, "options", this.setOptions);
      _defineProperty(this, "parse", _classPrivateMethodGet(this, _e46, _e47).call(this, ne.lex, ie.parse));
      _defineProperty(this, "parseInline", _classPrivateMethodGet(this, _e46, _e47).call(this, ne.lexInline, ie.parseInline));
      _defineProperty(this, "Parser", ie);
      _defineProperty(this, "Renderer", se);
      _defineProperty(this, "TextRenderer", re);
      _defineProperty(this, "Lexer", ne);
      _defineProperty(this, "Tokenizer", w);
      _defineProperty(this, "Hooks", le);
      this.use.apply(this, arguments);
    }
    _createClass(oe, [{
      key: "walkTokens",
      value: function walkTokens(e, t) {
        var _this4 = this;
        var n = [];
        var _iterator4 = _createForOfIteratorHelper(e),
          _step4;
        try {
          var _loop = function _loop() {
            var s = _step4.value;
            switch (n = n.concat(t.call(_this4, s)), s.type) {
              case "table":
                {
                  var _e49 = s;
                  var _iterator5 = _createForOfIteratorHelper(_e49.header),
                    _step5;
                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                      var _s17 = _step5.value;
                      n = n.concat(_this4.walkTokens(_s17.tokens, t));
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }
                  var _iterator6 = _createForOfIteratorHelper(_e49.rows),
                    _step6;
                  try {
                    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                      var _s18 = _step6.value;
                      var _iterator7 = _createForOfIteratorHelper(_s18),
                        _step7;
                      try {
                        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                          var _e50 = _step7.value;
                          n = n.concat(_this4.walkTokens(_e50.tokens, t));
                        }
                      } catch (err) {
                        _iterator7.e(err);
                      } finally {
                        _iterator7.f();
                      }
                    }
                  } catch (err) {
                    _iterator6.e(err);
                  } finally {
                    _iterator6.f();
                  }
                  break;
                }
              case "list":
                {
                  var _e51 = s;
                  n = n.concat(_this4.walkTokens(_e51.items, t));
                  break;
                }
              default:
                {
                  var _this4$defaults$exten, _this4$defaults$exten2;
                  var _e52 = s;
                  (_this4$defaults$exten = _this4.defaults.extensions) !== null && _this4$defaults$exten !== void 0 && (_this4$defaults$exten2 = _this4$defaults$exten.childTokens) !== null && _this4$defaults$exten2 !== void 0 && _this4$defaults$exten2[_e52.type] ? _this4.defaults.extensions.childTokens[_e52.type].forEach(function (s) {
                    var r = _e52[s].flat(1 / 0);
                    n = n.concat(_this4.walkTokens(r, t));
                  }) : _e52.tokens && (n = n.concat(_this4.walkTokens(_e52.tokens, t)));
                }
            }
          };
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        return n;
      }
    }, {
      key: "use",
      value: function use() {
        var _this5 = this;
        var t = this.defaults.extensions || {
          renderers: {},
          childTokens: {}
        };
        for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
          e[_key] = arguments[_key];
        }
        return e.forEach(function (e) {
          var n = _objectSpread({}, e);
          if (n.async = _this5.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach(function (e) {
            if (!e.name) throw new Error("extension name required");
            if ("renderer" in e) {
              var _n18 = t.renderers[e.name];
              t.renderers[e.name] = _n18 ? function () {
                for (var _len2 = arguments.length, t = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  t[_key2] = arguments[_key2];
                }
                var s = e.renderer.apply(this, t);
                return !1 === s && (s = _n18.apply(this, t)), s;
              } : e.renderer;
            }
            if ("tokenizer" in e) {
              if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error("extension level must be 'block' or 'inline'");
              var _n19 = t[e.level];
              _n19 ? _n19.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && ("block" === e.level ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : "inline" === e.level && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
            }
            "childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
          }), n.extensions = t), e.renderer) {
            var _t22 = _this5.defaults.renderer || new se(_this5.defaults);
            var _loop2 = function _loop2() {
              if (!(_n20 in _t22)) throw new Error("renderer '".concat(_n20, "' does not exist"));
              if ("options" === _n20) return "continue";
              var s = _n20,
                r = e.renderer[s],
                i = _t22[s];
              _t22[s] = function () {
                for (var _len3 = arguments.length, e = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  e[_key3] = arguments[_key3];
                }
                var n = r.apply(_t22, e);
                return !1 === n && (n = i.apply(_t22, e)), n || "";
              };
            };
            for (var _n20 in e.renderer) {
              var _ret = _loop2();
              if (_ret === "continue") continue;
            }
            n.renderer = _t22;
          }
          if (e.tokenizer) {
            var _t23 = _this5.defaults.tokenizer || new w(_this5.defaults);
            var _loop3 = function _loop3() {
              if (!(_n21 in _t23)) throw new Error("tokenizer '".concat(_n21, "' does not exist"));
              if (["options", "rules", "lexer"].includes(_n21)) return "continue";
              var s = _n21,
                r = e.tokenizer[s],
                i = _t23[s];
              _t23[s] = function () {
                for (var _len4 = arguments.length, e = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                  e[_key4] = arguments[_key4];
                }
                var n = r.apply(_t23, e);
                return !1 === n && (n = i.apply(_t23, e)), n;
              };
            };
            for (var _n21 in e.tokenizer) {
              var _ret2 = _loop3();
              if (_ret2 === "continue") continue;
            }
            n.tokenizer = _t23;
          }
          if (e.hooks) {
            var _t24 = _this5.defaults.hooks || new le();
            var _loop4 = function _loop4() {
              if (!(_n22 in _t24)) throw new Error("hook '".concat(_n22, "' does not exist"));
              if ("options" === _n22) return "continue";
              var s = _n22,
                r = e.hooks[s],
                i = _t24[s];
              le.passThroughHooks.has(_n22) ? _t24[s] = function (e) {
                if (_this5.defaults.async) return Promise.resolve(r.call(_t24, e)).then(function (e) {
                  return i.call(_t24, e);
                });
                var n = r.call(_t24, e);
                return i.call(_t24, n);
              } : _t24[s] = function () {
                for (var _len5 = arguments.length, e = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                  e[_key5] = arguments[_key5];
                }
                var n = r.apply(_t24, e);
                return !1 === n && (n = i.apply(_t24, e)), n;
              };
            };
            for (var _n22 in e.hooks) {
              var _ret3 = _loop4();
              if (_ret3 === "continue") continue;
            }
            n.hooks = _t24;
          }
          if (e.walkTokens) {
            var _t25 = _this5.defaults.walkTokens,
              _s19 = e.walkTokens;
            n.walkTokens = function (e) {
              var n = [];
              return n.push(_s19.call(this, e)), _t25 && (n = n.concat(_t25.call(this, e))), n;
            };
          }
          _this5.defaults = _objectSpread(_objectSpread({}, _this5.defaults), n);
        }), this;
      }
    }, {
      key: "setOptions",
      value: function setOptions(e) {
        return this.defaults = _objectSpread(_objectSpread({}, this.defaults), e), this;
      }
    }, {
      key: "lexer",
      value: function lexer(e, t) {
        return ne.lex(e, t !== null && t !== void 0 ? t : this.defaults);
      }
    }, {
      key: "parser",
      value: function parser(e, t) {
        return ie.parse(e, t !== null && t !== void 0 ? t : this.defaults);
      }
    }]);
    return oe;
  }();
  function _e47(e, t) {
    var _this6 = this;
    return function (n, s) {
      var r = _objectSpread({}, s),
        i = _objectSpread(_objectSpread({}, _this6.defaults), r);
      !0 === _this6.defaults.async && !1 === r.async && (i.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), i.async = !0);
      var l = _classPrivateMethodGet(_this6, _t20, _t21).call(_this6, !!i.silent, !!i.async);
      if (null == n) return l(new Error("marked(): input parameter is undefined or null"));
      if ("string" != typeof n) return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      if (i.hooks && (i.hooks.options = i), i.async) return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then(function (t) {
        return e(t, i);
      }).then(function (e) {
        return i.hooks ? i.hooks.processAllTokens(e) : e;
      }).then(function (e) {
        return i.walkTokens ? Promise.all(_this6.walkTokens(e, i.walkTokens)).then(function () {
          return e;
        }) : e;
      }).then(function (e) {
        return t(e, i);
      }).then(function (e) {
        return i.hooks ? i.hooks.postprocess(e) : e;
      })["catch"](l);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        var _s20 = e(n, i);
        i.hooks && (_s20 = i.hooks.processAllTokens(_s20)), i.walkTokens && _this6.walkTokens(_s20, i.walkTokens);
        var _r8 = t(_s20, i);
        return i.hooks && (_r8 = i.hooks.postprocess(_r8)), _r8;
      } catch (e) {
        return l(e);
      }
    };
  }
  function _t21(e, t) {
    return function (n) {
      if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
        var _e53 = "<p>An error occurred:</p><pre>" + c(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(_e53) : _e53;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
  var ae = new oe();
  function ce(e, t) {
    return ae.parse(e, t);
  }
  ce.options = ce.setOptions = function (e) {
    return ae.setOptions(e), ce.defaults = ae.defaults, n(ce.defaults), ce;
  }, ce.getDefaults = t, ce.defaults = e.defaults, ce.use = function () {
    return ae.use.apply(ae, arguments), ce.defaults = ae.defaults, n(ce.defaults), ce;
  }, ce.walkTokens = function (e, t) {
    return ae.walkTokens(e, t);
  }, ce.parseInline = ae.parseInline, ce.Parser = ie, ce.parser = ie.parse, ce.Renderer = se, ce.TextRenderer = re, ce.Lexer = ne, ce.lexer = ne.lex, ce.Tokenizer = w, ce.Hooks = le, ce.parse = ce;
  var he = ce.options,
    pe = ce.setOptions,
    ue = ce.use,
    ke = ce.walkTokens,
    ge = ce.parseInline,
    fe = ce,
    de = ie.parse,
    xe = ne.lex;
  e.Hooks = le, e.Lexer = ne, e.Marked = oe, e.Parser = ie, e.Renderer = se, e.TextRenderer = re, e.Tokenizer = w, e.getDefaults = t, e.lexer = xe, e.marked = ce, e.options = he, e.parse = fe, e.parseInline = ge, e.parser = de, e.setOptions = pe, e.use = ue, e.walkTokens = ke;
});