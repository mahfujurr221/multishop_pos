if (function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y = [].slice,
            Z = {}.hasOwnProperty,
            $ = function(a, b) {
                function c() {
                    this.constructor = a
                }
                for (var d in b) Z.call(b, d) && (a[d] = b[d]);
                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
            },
            _ = [].indexOf || function(a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (b in this && this[b] === a) return b;
                return -1
            };
        for (u = {
                hidePage: !1,
                catchupTime: 100,
                initialRate: .03,
                minTime: 250,
                ghostTime: 100,
                maxProgressPerFrame: 20,
                easeFactor: 1.25,
                startOnPageLoad: !0,
                restartOnPushState: !0,
                restartOnRequestAfter: 500,
                target: "body",
                elements: {
                    checkInterval: 100,
                    selectors: ["body"]
                },
                eventLag: {
                    minSamples: 10,
                    sampleCount: 3,
                    lagThreshold: 3
                },
                ajax: {
                    trackMethods: ["GET"],
                    trackWebSockets: !0,
                    ignoreURLs: []
                }
            }, C = function() {
                var a;
                return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date
            }, F = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == F && (F = function(a) {
                return setTimeout(a, 50)
            }, t = function(a) {
                return clearTimeout(a)
            }), H = function(a) {
                var b, c;
                return b = C(), (c = function() {
                    var d;
                    return d = C() - b, d >= 33 ? (b = C(), a(d, function() {
                        return F(c)
                    })) : setTimeout(c, 33 - d)
                })()
            }, G = function() {
                var a, b, c;
                return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? Y.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
            }, v = function() {
                var a, b, c, d, e, f, g;
                for (b = arguments[0], d = 2 <= arguments.length ? Y.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++)
                    if (c = d[f])
                        for (a in c) Z.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? v(b[a], e) : b[a] = e);
                return b
            }, q = function(a) {
                var b, c, d, e, f;
                for (c = b = 0, e = 0, f = a.length; f > e; e++) d = a[e], c += Math.abs(d), b++;
                return c / b
            }, x = function(a, b) {
                var c, d, e;
                if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
                    if (c = e.getAttribute("data-pace-" + a), !b) return c;
                    try {
                        return JSON.parse(c)
                    } catch (a) {
                        return d = a, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
                    }
                }
            }, g = function() {
                function a() {}
                return a.prototype.on = function(a, b, c, d) {
                    var e;
                    return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({
                        handler: b,
                        ctx: c,
                        once: d
                    })
                }, a.prototype.once = function(a, b, c) {
                    return this.on(a, b, c, !0)
                }, a.prototype.off = function(a, b) {
                    var c, d, e;
                    if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
                        if (null == b) return delete this.bindings[a];
                        for (c = 0, e = []; c < this.bindings[a].length;) this.bindings[a][c].handler === b ? e.push(this.bindings[a].splice(c, 1)) : e.push(c++);
                        return e
                    }
                }, a.prototype.trigger = function() {
                    var a, b, c, d, e, f, g, h, i;
                    if (c = arguments[0], a = 2 <= arguments.length ? Y.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
                        for (e = 0, i = []; e < this.bindings[c].length;) h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), f ? i.push(this.bindings[c].splice(e, 1)) : i.push(e++);
                        return i
                    }
                }, a
            }(), j = window.Pace || {}, window.Pace = j, v(j, g.prototype), D = j.options = v({}, u, window.paceOptions, x()), V = ["ajax", "document", "eventLag", "elements"], R = 0, T = V.length; T > R; R++) L = V[R], D[L] === !0 && (D[L] = u[L]);
        i = function(a) {
            function b() {
                return W = b.__super__.constructor.apply(this, arguments)
            }
            return $(b, a), b
        }(Error), b = function() {
            function a() {
                this.progress = 0
            }
            return a.prototype.getElement = function() {
                var a;
                if (null == this.el) {
                    if (!(a = document.querySelector(D.target))) throw new i;
                    this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
                }
                return this.el
            }, a.prototype.finish = function() {
                var a;
                return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
            }, a.prototype.update = function(a) {
                return this.progress = a, this.render()
            }, a.prototype.destroy = function() {
                try {
                    this.getElement().parentNode.removeChild(this.getElement())
                } catch (a) {
                    i = a
                }
                return this.el = void 0
            }, a.prototype.render = function() {
                var a, b;
                return null != document.querySelector(D.target) && (a = this.getElement(), a.children[0].style.width = this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), this.progress >= 100 ? b = "99" : (b = this.progress < 10 ? "0" : "", b += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
            }, a.prototype.done = function() {
                return this.progress >= 100
            }, a
        }(), h = function() {
            function a() {
                this.bindings = {}
            }
            return a.prototype.trigger = function(a, b) {
                var c, d, e, f, g;
                if (null != this.bindings[a]) {
                    for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(c.call(this, b));
                    return g
                }
            }, a.prototype.on = function(a, b) {
                var c;
                return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
            }, a
        }(), Q = window.XMLHttpRequest, P = window.XDomainRequest, O = window.WebSocket, w = function(a, b) {
            var c, d, e;
            e = [];
            for (c in b.prototype) try {
                d = b.prototype[c], null == a[c] && "function" != typeof d ? e.push(a[c] = d) : e.push(void 0)
            } catch (a) {
                a
            }
            return e
        }, A = [], j.ignore = function() {
            var a, b, c;
            return b = arguments[0], a = 2 <= arguments.length ? Y.call(arguments, 1) : [], A.unshift("ignore"), c = b.apply(null, a), A.shift(), c
        }, j.track = function() {
            var a, b, c;
            return b = arguments[0], a = 2 <= arguments.length ? Y.call(arguments, 1) : [], A.unshift("track"), c = b.apply(null, a), A.shift(), c
        }, K = function(a) {
            var b;
            if (null == a && (a = "GET"), "track" === A[0]) return "force";
            if (!A.length && D.ajax) {
                if ("socket" === a && D.ajax.trackWebSockets) return !0;
                if (b = a.toUpperCase(), _.call(D.ajax.trackMethods, b) >= 0) return !0
            }
            return !1
        }, k = function(a) {
            function b() {
                var a, c = this;
                b.__super__.constructor.apply(this, arguments), a = function(a) {
                    var b;
                    return b = a.open, a.open = function(d, e, f) {
                        return K(d) && c.trigger("request", {
                            type: d,
                            url: e,
                            request: a
                        }), b.call(a, d, e, f)
                    }
                }, window.XMLHttpRequest = function(b) {
                    var c;
                    return c = new Q(b), a(c), c
                };
                try {
                    w(window.XMLHttpRequest, Q)
                } catch (a) {}
                if (null != P) {
                    window.XDomainRequest = function() {
                        var b;
                        return b = new P, a(b), b
                    };
                    try {
                        w(window.XDomainRequest, P)
                    } catch (a) {}
                }
                if (null != O && D.ajax.trackWebSockets) {
                    window.WebSocket = function(a, b) {
                        var d;
                        return d = null != b ? new O(a, b) : new O(a), K("socket") && c.trigger("request", {
                            type: "socket",
                            url: a,
                            protocols: b,
                            request: d
                        }), d
                    };
                    try {
                        w(window.WebSocket, O)
                    } catch (a) {}
                }
            }
            return $(b, a), b
        }(h), S = null, y = function() {
            return null == S && (S = new k), S
        }, J = function(a) {
            var b, c, d, e;
            for (e = D.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++)
                if ("string" == typeof(b = e[c])) {
                    if (-1 !== a.indexOf(b)) return !0
                } else if (b.test(a)) return !0;
            return !1
        }, y().on("request", function(b) {
            var c, d, e, f, g;
            return f = b.type, e = b.request, g = b.url, J(g) ? void 0 : j.running || D.restartOnRequestAfter === !1 && "force" !== K(f) ? void 0 : (d = arguments, c = D.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function() {
                var b, c, g, h, i;
                if ("socket" === f ? e.readyState < 2 : 0 < (g = e.readyState) && 4 > g) {
                    for (j.restart(), h = j.sources, i = [], b = 0, c = h.length; c > b; b++) {
                        if ((L = h[b]) instanceof a) {
                            L.watch.apply(L, d);
                            break
                        }
                        i.push(void 0)
                    }
                    return i
                }
            }, c))
        }), a = function() {
            function a() {
                var a = this;
                this.elements = [], y().on("request", function() {
                    return a.watch.apply(a, arguments)
                })
            }
            return a.prototype.watch = function(a) {
                var b, c, d, e;
                return d = a.type, b = a.request, e = a.url, J(e) ? void 0 : (c = "socket" === d ? new n(b) : new o(b), this.elements.push(c))
            }, a
        }(), o = function() {
            function a(a) {
                var b, c, d, e, f, g = this;
                if (this.progress = 0, null != window.ProgressEvent)
                    for (null, a.addEventListener("progress", function(a) {
                            return a.lengthComputable ? g.progress = 100 * a.loaded / a.total : g.progress = g.progress + (100 - g.progress) / 2
                        }, !1), f = ["load", "abort", "timeout", "error"], c = 0, d = f.length; d > c; c++) b = f[c], a.addEventListener(b, function() {
                        return g.progress = 100
                    }, !1);
                else e = a.onreadystatechange, a.onreadystatechange = function() {
                    var b;
                    return 0 === (b = a.readyState) || 4 === b ? g.progress = 100 : 3 === a.readyState && (g.progress = 50), "function" == typeof e ? e.apply(null, arguments) : void 0
                }
            }
            return a
        }(), n = function() {
            function a(a) {
                var b, c, d, e, f = this;
                for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) b = e[c], a.addEventListener(b, function() {
                    return f.progress = 100
                }, !1)
            }
            return a
        }(), d = function() {
            function a(a) {
                var b, c, d, f;
                for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) b = f[c], this.elements.push(new e(b))
            }
            return a
        }(), e = function() {
            function a(a) {
                this.selector = a, this.progress = 0, this.check()
            }
            return a.prototype.check = function() {
                var a = this;
                return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                    return a.check()
                }, D.elements.checkInterval)
            }, a.prototype.done = function() {
                return this.progress = 100
            }, a
        }(), c = function() {
            function a() {
                var a, b, c = this;
                this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function() {
                    return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0
                }
            }
            return a.prototype.states = {
                loading: 0,
                interactive: 50,
                complete: 100
            }, a
        }(), f = function() {
            function a() {
                var a, b, c, d, e, f = this;
                this.progress = 0, a = 0, e = [], d = 0, c = C(), b = setInterval(function() {
                    var g;
                    return g = C() - c - 50, c = C(), e.push(g), e.length > D.eventLag.sampleCount && e.shift(), a = q(e), ++d >= D.eventLag.minSamples && a < D.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 3 / (a + 3) * 100
                }, 50)
            }
            return a
        }(), m = function() {
            function a(a) {
                this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = D.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = G(this.source, "progress"))
            }
            return a.prototype.tick = function(a, b) {
                var c;
                return null == b && (b = G(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / D.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, D.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + D.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
            }, a
        }(), M = null, I = null, r = null, N = null, p = null, s = null, j.running = !1, z = function() {
            return D.restartOnPushState ? j.restart() : void 0
        }, null != window.history.pushState && (U = window.history.pushState, window.history.pushState = function() {
            return z(), U.apply(window.history, arguments)
        }), null != window.history.replaceState && (X = window.history.replaceState, window.history.replaceState = function() {
            return z(), X.apply(window.history, arguments)
        }), l = {
            ajax: a,
            elements: d,
            document: c,
            eventLag: f
        }, (B = function() {
            var a, c, d, e, f, g, h, i;
            for (j.sources = M = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) a = g[c], D[a] !== !1 && M.push(new l[a](D[a]));
            for (i = null != (h = D.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) L = i[d], M.push(new L(D));
            return j.bar = r = new b, I = [], N = new m
        })(), j.stop = function() {
            return j.trigger("stop"), j.running = !1, r.destroy(), s = !0, null != p && ("function" == typeof t && t(p), p = null), B()
        }, j.restart = function() {
            return j.trigger("restart"), j.stop(), j.start()
        }, j.go = function() {
            var a;
            return j.running = !0, r.render(), a = C(), s = !1, p = H(function(b, c) {
                var d, e, f, g, h, i, k, l, n, o, p, q, t, u, v;
                for (100 - r.progress, e = o = 0, f = !0, i = p = 0, t = M.length; t > p; i = ++p)
                    for (L = M[i], n = null != I[i] ? I[i] : I[i] = [], h = null != (v = L.elements) ? v : [L], k = q = 0, u = h.length; u > q; k = ++q) g = h[k], l = null != n[k] ? n[k] : n[k] = new m(g), f &= l.done, l.done || (e++, o += l.tick(b));
                return d = o / e, r.update(N.tick(b, d)), r.done() || f || s ? (r.update(100), j.trigger("done"), setTimeout(function() {
                    return r.finish(), j.running = !1, j.trigger("hide")
                }, Math.max(D.ghostTime, Math.max(D.minTime - (C() - a), 0)))) : c()
            })
        }, E = null, j.start = function(a) {
            v(D, a), D.hidePage ? (E || (E = document.createElement("style"), document.head.appendChild(E)), E.innerHTML = "body > *:not(.pace), body:before, body:after { -webkit-transition: opacity .4s ease-in-out; -moz-transition: opacity .4s ease-in-out; -o-transition: opacity .4s ease-in-out; -ms-transition: opacity .4s ease-in-out; transition: opacity .4s ease-in-out } body:not(.pace-done) > *:not(.pace), body:not(.pace-done):before, body:not(.pace-done):after { opacity: 0 !important }") : null != E && (E.innerHTML = ""), j.running = !0;
            try {
                r.render()
            } catch (a) {
                i = a
            }
            return document.querySelector(".pace") ? (j.trigger("start"), j.go()) : setTimeout(j.start, 50)
        }, "function" == typeof define && define.amd ? define(function() {
            return j
        }) : "object" == typeof exports ? module.exports = j : D.startOnPageLoad && j.start()
    }.call(this), function(a, b) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
            if (!a.document) throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function(a, b) {
        "use strict";

        function c(a, b) {
            b = b || ca;
            var c = b.createElement("script");
            c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
        }

        function d(a) {
            var b = !!a && "length" in a && a.length,
                c = pa.type(a);
            return "function" !== c && !pa.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
        }

        function e(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }

        function f(a, b, c) {
            return pa.isFunction(b) ? pa.grep(a, function(a, d) {
                return !!b.call(a, d, a) !== c
            }) : b.nodeType ? pa.grep(a, function(a) {
                return a === b !== c
            }) : "string" != typeof b ? pa.grep(a, function(a) {
                return ha.call(b, a) > -1 !== c
            }) : wa.test(b) ? pa.filter(b, a, c) : (b = pa.filter(b, a), pa.grep(a, function(a) {
                return ha.call(b, a) > -1 !== c && 1 === a.nodeType
            }))
        }

        function g(a, b) {
            for (;
                (a = a[b]) && 1 !== a.nodeType;);
            return a
        }

        function h(a) {
            var b = {};
            return pa.each(a.match(Ba) || [], function(a, c) {
                b[c] = !0
            }), b
        }

        function i(a) {
            return a
        }

        function j(a) {
            throw a
        }

        function k(a, b, c, d) {
            var e;
            try {
                a && pa.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && pa.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d))
            } catch (a) {
                c.apply(void 0, [a])
            }
        }

        function l() {
            ca.removeEventListener("DOMContentLoaded", l), a.removeEventListener("load", l), pa.ready()
        }

        function m() {
            this.expando = pa.expando + m.uid++
        }

        function n(a) {
            return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Ia.test(a) ? JSON.parse(a) : a)
        }

        function o(a, b, c) {
            var d;
            if (void 0 === c && 1 === a.nodeType)
                if (d = "data-" + b.replace(Ja, "-$&").toLowerCase(), "string" == typeof(c = a.getAttribute(d))) {
                    try {
                        c = n(c)
                    } catch (a) {}
                    Ha.set(a, b, c)
                } else c = void 0;
            return c
        }

        function p(a, b, c, d) {
            var e, f = 1,
                g = 20,
                h = d ? function() {
                    return d.cur()
                } : function() {
                    return pa.css(a, b, "")
                },
                i = h(),
                j = c && c[3] || (pa.cssNumber[b] ? "" : "px"),
                k = (pa.cssNumber[b] || "px" !== j && +i) && La.exec(pa.css(a, b));
            if (k && k[3] !== j) {
                j = j || k[3], c = c || [], k = +i || 1;
                do {
                    f = f || ".5", k /= f, pa.style(a, b, k + j)
                } while (f !== (f = h() / i) && 1 !== f && --g)
            }
            return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
        }

        function q(a) {
            var b, c = a.ownerDocument,
                d = a.nodeName,
                e = Pa[d];
            return e ? e : (b = c.body.appendChild(c.createElement(d)), e = pa.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), Pa[d] = e, e)
        }

        function r(a, b) {
            for (var c, d, e = [], f = 0, g = a.length; f < g; f++) d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = Ga.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && Na(d) && (e[f] = q(d))) : "none" !== c && (e[f] = "none", Ga.set(d, "display", c)));
            for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
            return a
        }

        function s(a, b) {
            var c;
            return c = void 0 !== a.getElementsByTagName ? a.getElementsByTagName(b || "*") : void 0 !== a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && e(a, b) ? pa.merge([a], c) : c
        }

        function t(a, b) {
            for (var c = 0, d = a.length; c < d; c++) Ga.set(a[c], "globalEval", !b || Ga.get(b[c], "globalEval"))
        }

        function u(a, b, c, d, e) {
            for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++)
                if ((f = a[n]) || 0 === f)
                    if ("object" === pa.type(f)) pa.merge(m, f.nodeType ? [f] : f);
                    else if (Ua.test(f)) {
                for (g = g || l.appendChild(b.createElement("div")), h = (Ra.exec(f) || ["", ""])[1].toLowerCase(), i = Ta[h] || Ta._default, g.innerHTML = i[1] + pa.htmlPrefilter(f) + i[2], k = i[0]; k--;) g = g.lastChild;
                pa.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
            } else m.push(b.createTextNode(f));
            for (l.textContent = "", n = 0; f = m[n++];)
                if (d && pa.inArray(f, d) > -1) e && e.push(f);
                else if (j = pa.contains(f.ownerDocument, f), g = s(l.appendChild(f), "script"), j && t(g), c)
                for (k = 0; f = g[k++];) Sa.test(f.type || "") && c.push(f);
            return l
        }

        function v() {
            return !0
        }

        function w() {
            return !1
        }

        function x() {
            try {
                return ca.activeElement
            } catch (a) {}
        }

        function y(a, b, c, d, e, f) {
            var g, h;
            if ("object" == typeof b) {
                "string" != typeof c && (d = d || c, c = void 0);
                for (h in b) y(a, h, c, d, b[h], f);
                return a
            }
            if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = w;
            else if (!e) return a;
            return 1 === f && (g = e, e = function(a) {
                return pa().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = pa.guid++)), a.each(function() {
                pa.event.add(this, b, e, d, c)
            })
        }

        function z(a, b) {
            return e(a, "table") && e(11 !== b.nodeType ? b : b.firstChild, "tr") ? pa(">tbody", a)[0] || a : a
        }

        function A(a) {
            return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
        }

        function B(a) {
            var b = _a.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function C(a, b) {
            var c, d, e, f, g, h, i, j;
            if (1 === b.nodeType) {
                if (Ga.hasData(a) && (f = Ga.access(a), g = Ga.set(b, f), j = f.events)) {
                    delete g.handle, g.events = {};
                    for (e in j)
                        for (c = 0, d = j[e].length; c < d; c++) pa.event.add(b, e, j[e][c])
                }
                Ha.hasData(a) && (h = Ha.access(a), i = pa.extend({}, h), Ha.set(b, i))
            }
        }

        function D(a, b) {
            var c = b.nodeName.toLowerCase();
            "input" === c && Qa.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
        }

        function E(a, b, d, e) {
            b = fa.apply([], b);
            var f, g, h, i, j, k, l = 0,
                m = a.length,
                n = m - 1,
                o = b[0],
                p = pa.isFunction(o);
            if (p || m > 1 && "string" == typeof o && !na.checkClone && $a.test(o)) return a.each(function(c) {
                var f = a.eq(c);
                p && (b[0] = o.call(this, c, f.html())), E(f, b, d, e)
            });
            if (m && (f = u(b, a[0].ownerDocument, !1, a, e), g = f.firstChild, 1 === f.childNodes.length && (f = g), g || e)) {
                for (h = pa.map(s(f, "script"), A), i = h.length; l < m; l++) j = f, l !== n && (j = pa.clone(j, !0, !0), i && pa.merge(h, s(j, "script"))), d.call(a[l], j, l);
                if (i)
                    for (k = h[h.length - 1].ownerDocument, pa.map(h, B), l = 0; l < i; l++) j = h[l], Sa.test(j.type || "") && !Ga.access(j, "globalEval") && pa.contains(k, j) && (j.src ? pa._evalUrl && pa._evalUrl(j.src) : c(j.textContent.replace(ab, ""), k))
            }
            return a
        }

        function F(a, b, c) {
            for (var d, e = b ? pa.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || pa.cleanData(s(d)), d.parentNode && (c && pa.contains(d.ownerDocument, d) && t(s(d, "script")), d.parentNode.removeChild(d));
            return a
        }

        function G(a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || db(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || pa.contains(a.ownerDocument, a) || (g = pa.style(a, b)), !na.pixelMarginRight() && cb.test(g) && bb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
        }

        function H(a, b) {
            return {
                get: function() {
                    return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }

        function I(a) {
            if (a in jb) return a;
            for (var b = a[0].toUpperCase() + a.slice(1), c = ib.length; c--;)
                if ((a = ib[c] + b) in jb) return a
        }

        function J(a) {
            var b = pa.cssProps[a];
            return b || (b = pa.cssProps[a] = I(a) || a), b
        }

        function K(a, b, c) {
            var d = La.exec(b);
            return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
        }

        function L(a, b, c, d, e) {
            var f, g = 0;
            for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) "margin" === c && (g += pa.css(a, c + Ma[f], !0, e)), d ? ("content" === c && (g -= pa.css(a, "padding" + Ma[f], !0, e)), "margin" !== c && (g -= pa.css(a, "border" + Ma[f] + "Width", !0, e))) : (g += pa.css(a, "padding" + Ma[f], !0, e), "padding" !== c && (g += pa.css(a, "border" + Ma[f] + "Width", !0, e)));
            return g
        }

        function M(a, b, c) {
            var d, e = db(a),
                f = G(a, b, e),
                g = "border-box" === pa.css(a, "boxSizing", !1, e);
            return cb.test(f) ? f : (d = g && (na.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), (f = parseFloat(f) || 0) + L(a, b, c || (g ? "border" : "content"), d, e) + "px")
        }

        function N(a, b, c, d, e) {
            return new N.prototype.init(a, b, c, d, e)
        }

        function O() {
            lb && (ca.hidden === !1 && a.requestAnimationFrame ? a.requestAnimationFrame(O) : a.setTimeout(O, pa.fx.interval), pa.fx.tick())
        }

        function P() {
            return a.setTimeout(function() {
                kb = void 0
            }), kb = pa.now()
        }

        function Q(a, b) {
            var c, d = 0,
                e = {
                    height: a
                };
            for (b = b ? 1 : 0; d < 4; d += 2 - b) c = Ma[d], e["margin" + c] = e["padding" + c] = a;
            return b && (e.opacity = e.width = a), e
        }

        function R(a, b, c) {
            for (var d, e = (U.tweeners[b] || []).concat(U.tweeners["*"]), f = 0, g = e.length; f < g; f++)
                if (d = e[f].call(c, b, a)) return d
        }

        function S(a, b, c) {
            var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b,
                m = this,
                n = {},
                o = a.style,
                p = a.nodeType && Na(a),
                q = Ga.get(a, "fxshow");
            c.queue || (g = pa._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function() {
                g.unqueued || h()
            }), g.unqueued++, m.always(function() {
                m.always(function() {
                    g.unqueued--, pa.queue(a, "fx").length || g.empty.fire()
                })
            }));
            for (d in b)
                if (e = b[d], mb.test(e)) {
                    if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                        if ("show" !== e || !q || void 0 === q[d]) continue;
                        p = !0
                    }
                    n[d] = q && q[d] || pa.style(a, d)
                }
            if ((i = !pa.isEmptyObject(b)) || !pa.isEmptyObject(n)) {
                l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = Ga.get(a, "display")), k = pa.css(a, "display"), "none" === k && (j ? k = j : (r([a], !0), j = a.style.display || j, k = pa.css(a, "display"), r([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === pa.css(a, "float") && (i || (m.done(function() {
                    o.display = j
                }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function() {
                    o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
                })), i = !1;
                for (d in n) i || (q ? "hidden" in q && (p = q.hidden) : q = Ga.access(a, "fxshow", {
                    display: j
                }), f && (q.hidden = !p), p && r([a], !0), m.done(function() {
                    p || r([a]), Ga.remove(a, "fxshow");
                    for (d in n) pa.style(a, d, n[d])
                })), i = R(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0))
            }
        }

        function T(a, b) {
            var c, d, e, f, g;
            for (c in a)
                if (d = pa.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), (g = pa.cssHooks[d]) && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f) c in a || (a[c] = f[c], b[c] = e)
                } else b[d] = e
        }

        function U(a, b, c) {
            var d, e, f = 0,
                g = U.prefilters.length,
                h = pa.Deferred().always(function() {
                    delete i.elem
                }),
                i = function() {
                    if (e) return !1;
                    for (var b = kb || P(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1)
                },
                j = h.promise({
                    elem: a,
                    props: pa.extend({}, b),
                    opts: pa.extend(!0, {
                        specialEasing: {},
                        easing: pa.easing._default
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: kb || P(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c) {
                        var d = pa.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d), d
                    },
                    stop: function(b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        for (e = !0; c < d; c++) j.tweens[c].run(1);
                        return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            for (T(k, j.opts.specialEasing); f < g; f++)
                if (d = U.prefilters[f].call(j, a, k, j.opts)) return pa.isFunction(d.stop) && (pa._queueHooks(j.elem, j.opts.queue).stop = pa.proxy(d.stop, d)), d;
            return pa.map(k, R, j), pa.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), pa.fx.timer(pa.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j
        }

        function V(a) {
            return (a.match(Ba) || []).join(" ")
        }

        function W(a) {
            return a.getAttribute && a.getAttribute("class") || ""
        }

        function X(a, b, c, d) {
            var e;
            if (Array.isArray(b)) pa.each(b, function(b, e) {
                c || wb.test(a) ? d(a, e) : X(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
            });
            else if (c || "object" !== pa.type(b)) d(a, b);
            else
                for (e in b) X(a + "[" + e + "]", b[e], c, d)
        }

        function Y(a) {
            return function(b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0,
                    f = b.toLowerCase().match(Ba) || [];
                if (pa.isFunction(c))
                    for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function Z(a, b, c, d) {
            function e(h) {
                var i;
                return f[h] = !0, pa.each(a[h] || [], function(a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                }), i
            }
            var f = {},
                g = a === Db;
            return e(b.dataTypes[0]) || !f["*"] && e("*")
        }

        function $(a, b) {
            var c, d, e = pa.ajaxSettings.flatOptions || {};
            for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
            return d && pa.extend(!0, a, d), a
        }

        function _(a, b, c) {
            for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
            if (d)
                for (e in h)
                    if (h[e] && h[e].test(d)) {
                        i.unshift(e);
                        break
                    }
            if (i[0] in c) f = i[0];
            else {
                for (e in c) {
                    if (!i[0] || a.converters[e + " " + i[0]]) {
                        f = e;
                        break
                    }
                    g || (g = e)
                }
                f = f || g
            }
            if (f) return f !== i[0] && i.unshift(f), c[f]
        }

        function aa(a, b, c, d) {
            var e, f, g, h, i, j = {},
                k = a.dataTypes.slice();
            if (k[1])
                for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f;)
                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                    if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) {
                if (!(g = j[i + " " + f] || j["* " + f]))
                    for (e in j)
                        if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                            break
                        }
                if (g !== !0)
                    if (g && a.throws) b = g(b);
                    else try {
                        b = g(b)
                    } catch (a) {
                        return {
                            state: "parsererror",
                            error: g ? a : "No conversion from " + i + " to " + f
                        }
                    }
            }
            return {
                state: "success",
                data: b
            }
        }
        var ba = [],
            ca = a.document,
            da = Object.getPrototypeOf,
            ea = ba.slice,
            fa = ba.concat,
            ga = ba.push,
            ha = ba.indexOf,
            ia = {},
            ja = ia.toString,
            ka = ia.hasOwnProperty,
            la = ka.toString,
            ma = la.call(Object),
            na = {},
            oa = "3.2.1",
            pa = function(a, b) {
                return new pa.fn.init(a, b)
            },
            qa = function(a, b) {
                return b.toUpperCase()
            };
        pa.fn = pa.prototype = {
            jquery: oa,
            constructor: pa,
            length: 0,
            toArray: function() {
                return ea.call(this)
            },
            get: function(a) {
                return null == a ? ea.call(this) : a < 0 ? this[a + this.length] : this[a]
            },
            pushStack: function(a) {
                var b = pa.merge(this.constructor(), a);
                return b.prevObject = this, b
            },
            each: function(a) {
                return pa.each(this, a)
            },
            map: function(a) {
                return this.pushStack(pa.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            slice: function() {
                return this.pushStack(ea.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(a) {
                var b = this.length,
                    c = +a + (a < 0 ? b : 0);
                return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ga,
            sort: ba.sort,
            splice: ba.splice
        }, pa.extend = pa.fn.extend = function() {
            var a, b, c, d, e, f, g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || pa.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)
                if (null != (a = arguments[h]))
                    for (b in a) c = g[b], d = a[b], g !== d && (j && d && (pa.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && pa.isPlainObject(c) ? c : {}, g[b] = pa.extend(j, f, d)) : void 0 !== d && (g[b] = d));
            return g
        }, pa.extend({
            expando: "jQuery" + (oa + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(a) {
                throw new Error(a)
            },
            noop: function() {},
            isFunction: function(a) {
                return "function" === pa.type(a)
            },
            isWindow: function(a) {
                return null != a && a === a.window
            },
            isNumeric: function(a) {
                var b = pa.type(a);
                return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
            },
            isPlainObject: function(a) {
                var b, c;
                return !(!a || "[object Object]" !== ja.call(a) || (b = da(a)) && ("function" != typeof(c = ka.call(b, "constructor") && b.constructor) || la.call(c) !== ma))
            },
            isEmptyObject: function(a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            type: function(a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ia[ja.call(a)] || "object" : typeof a
            },
            globalEval: function(a) {
                c(a)
            },
            camelCase: function(a) {
                return a.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, qa)
            },
            each: function(a, b) {
                var c, e = 0;
                if (d(a))
                    for (c = a.length; e < c && b.call(a[e], e, a[e]) !== !1; e++);
                else
                    for (e in a)
                        if (b.call(a[e], e, a[e]) === !1) break; return a
            },
            trim: function(a) {
                return null == a ? "" : (a + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            },
            makeArray: function(a, b) {
                var c = b || [];
                return null != a && (d(Object(a)) ? pa.merge(c, "string" == typeof a ? [a] : a) : ga.call(c, a)), c
            },
            inArray: function(a, b, c) {
                return null == b ? -1 : ha.call(b, a, c)
            },
            merge: function(a, b) {
                for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
                return a.length = e, a
            },
            grep: function(a, b, c) {
                for (var d = [], e = 0, f = a.length, g = !c; e < f; e++) !b(a[e], e) !== g && d.push(a[e]);
                return d
            },
            map: function(a, b, c) {
                var e, f, g = 0,
                    h = [];
                if (d(a))
                    for (e = a.length; g < e; g++) null != (f = b(a[g], g, c)) && h.push(f);
                else
                    for (g in a) null != (f = b(a[g], g, c)) && h.push(f);
                return fa.apply([], h)
            },
            guid: 1,
            proxy: function(a, b) {
                var c, d, e;
                if ("string" == typeof b && (c = a[b], b = a, a = c), pa.isFunction(a)) return d = ea.call(arguments, 2), e = function() {
                    return a.apply(b || this, d.concat(ea.call(arguments)))
                }, e.guid = a.guid = a.guid || pa.guid++, e
            },
            now: Date.now,
            support: na
        }), "function" == typeof Symbol && (pa.fn[Symbol.iterator] = ba[Symbol.iterator]), pa.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
            ia["[object " + b + "]"] = b.toLowerCase()
        });
        var ra = function(a) {
            function b(a, b, c, d) {
                var e, f, g, h, i, k, m, n = b && b.ownerDocument,
                    o = b ? b.nodeType : 9;
                if (c = c || [], "string" != typeof a || !a || 1 !== o && 9 !== o && 11 !== o) return c;
                if (!d && ((b ? b.ownerDocument || b : N) !== F && E(b), b = b || F, H)) {
                    if (11 !== o && (i = pa.exec(a)))
                        if (e = i[1]) {
                            if (9 === o) {
                                if (!(g = b.getElementById(e))) return c;
                                if (g.id === e) return c.push(g), c
                            } else if (n && (g = n.getElementById(e)) && L(b, g) && g.id === e) return c.push(g), c
                        } else {
                            if (i[2]) return Y.apply(c, b.getElementsByTagName(a)), c;
                            if ((e = i[3]) && u.getElementsByClassName && b.getElementsByClassName) return Y.apply(c, b.getElementsByClassName(e)), c
                        }
                    if (u.qsa && !S[a + " "] && (!I || !I.test(a))) {
                        if (1 !== o) n = b, m = a;
                        else if ("object" !== b.nodeName.toLowerCase()) {
                            for ((h = b.getAttribute("id")) ? h = h.replace(ta, ua) : b.setAttribute("id", h = M), k = y(a), f = k.length; f--;) k[f] = "#" + h + " " + l(k[f]);
                            m = k.join(","), n = qa.test(a) && j(b.parentNode) || b
                        }
                        if (m) try {
                            return Y.apply(c, n.querySelectorAll(m)), c
                        } catch (a) {} finally {
                            h === M && b.removeAttribute("id")
                        }
                    }
                }
                return A(a.replace(fa, "$1"), b, c, d)
            }

            function c() {
                function a(c, d) {
                    return b.push(c + " ") > v.cacheLength && delete a[b.shift()], a[c + " "] = d
                }
                var b = [];
                return a
            }

            function d(a) {
                return a[M] = !0, a
            }

            function e(a) {
                var b = F.createElement("fieldset");
                try {
                    return !!a(b)
                } catch (a) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function f(a, b) {
                for (var c = a.split("|"), d = c.length; d--;) v.attrHandle[c[d]] = b
            }

            function g(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                if (d) return d;
                if (c)
                    for (; c = c.nextSibling;)
                        if (c === b) return -1;
                return a ? 1 : -1
            }

            function h(a) {
                return function(b) {
                    return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && wa(b) === a : b.disabled === a : "label" in b && b.disabled === a
                }
            }

            function i(a) {
                return d(function(b) {
                    return b = +b, d(function(c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function j(a) {
                return a && void 0 !== a.getElementsByTagName && a
            }

            function k() {}

            function l(a) {
                for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
                return d
            }

            function m(a, b, c) {
                var d = b.dir,
                    e = b.next,
                    f = e || d,
                    g = c && "parentNode" === f,
                    h = P++;
                return b.first ? function(b, c, e) {
                    for (; b = b[d];)
                        if (1 === b.nodeType || g) return a(b, c, e);
                    return !1
                } : function(b, c, i) {
                    var j, k, l, m = [O, h];
                    if (i) {
                        for (; b = b[d];)
                            if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                    } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || g)
                                if (l = b[M] || (b[M] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;
                                else {
                                    if ((j = k[f]) && j[0] === O && j[1] === h) return m[2] = j[2];
                                    if (k[f] = m, m[2] = a(b, c, i)) return !0
                                } return !1
                }
            }

            function n(a) {
                return a.length > 1 ? function(b, c, d) {
                    for (var e = a.length; e--;)
                        if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function o(a, c, d) {
                for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
                return d
            }

            function p(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                return g
            }

            function q(a, b, c, e, f, g) {
                return e && !e[M] && (e = q(e)), f && !f[M] && (f = q(f, g)), d(function(d, g, h, i) {
                    var j, k, l, m = [],
                        n = [],
                        q = g.length,
                        r = d || o(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || !d && b ? r : p(r, m, a, h, i),
                        t = c ? f || (d ? a : q || e) ? [] : g : s;
                    if (c && c(s, t, h, i), e)
                        for (j = p(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                f(null, t = [], j, i)
                            }
                            for (k = t.length; k--;)(l = t[k]) && (j = f ? $(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                        }
                    } else t = p(t === g ? t.splice(q, t.length) : t), f ? f(null, g, t, i) : Y.apply(g, t)
                })
            }

            function r(a) {
                for (var b, c, d, e = a.length, f = v.relative[a[0].type], g = f || v.relative[" "], h = f ? 1 : 0, i = m(function(a) {
                        return a === b
                    }, g, !0), j = m(function(a) {
                        return $(b, a) > -1
                    }, g, !0), k = [function(a, c, d) {
                        var e = !f && (d || c !== B) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                        return b = null, e
                    }]; h < e; h++)
                    if (c = v.relative[a[h].type]) k = [m(n(k), c)];
                    else {
                        if (c = v.filter[a[h].type].apply(null, a[h].matches), c[M]) {
                            for (d = ++h; d < e && !v.relative[a[d].type]; d++);
                            return q(h > 1 && n(k), h > 1 && l(a.slice(0, h - 1).concat({
                                value: " " === a[h - 2].type ? "*" : ""
                            })).replace(fa, "$1"), c, h < d && r(a.slice(h, d)), d < e && r(a = a.slice(d)), d < e && l(a))
                        }
                        k.push(c)
                    }
                return n(k)
            }

            function s(a, c) {
                var e = c.length > 0,
                    f = a.length > 0,
                    g = function(d, g, h, i, j) {
                        var k, l, m, n = 0,
                            o = "0",
                            q = d && [],
                            r = [],
                            s = B,
                            t = d || f && v.find.TAG("*", j),
                            u = O += null == s ? 1 : Math.random() || .1,
                            w = t.length;
                        for (j && (B = g === F || g || j); o !== w && null != (k = t[o]); o++) {
                            if (f && k) {
                                for (l = 0, g || k.ownerDocument === F || (E(k), h = !H); m = a[l++];)
                                    if (m(k, g || F, h)) {
                                        i.push(k);
                                        break
                                    }
                                j && (O = u)
                            }
                            e && ((k = !m && k) && n--, d && q.push(k))
                        }
                        if (n += o, e && o !== n) {
                            for (l = 0; m = c[l++];) m(q, r, g, h);
                            if (d) {
                                if (n > 0)
                                    for (; o--;) q[o] || r[o] || (r[o] = W.call(i));
                                r = p(r)
                            }
                            Y.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                        }
                        return j && (O = u, B = s), q
                    };
                return e ? d(g) : g
            }
            var t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M = "sizzle" + 1 * new Date,
                N = a.document,
                O = 0,
                P = 0,
                Q = c(),
                R = c(),
                S = c(),
                T = function(a, b) {
                    return a === b && (D = !0), 0
                },
                U = {}.hasOwnProperty,
                V = [],
                W = V.pop,
                X = V.push,
                Y = V.push,
                Z = V.slice,
                $ = function(a, b) {
                    for (var c = 0, d = a.length; c < d; c++)
                        if (a[c] === b) return c;
                    return -1
                },
                _ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                aa = "[\\x20\\t\\r\\n\\f]",
                ba = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                ca = "\\[" + aa + "*(" + ba + ")(?:" + aa + "*([*^$|!~]?=)" + aa + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ba + "))|)" + aa + "*\\]",
                da = ":(" + ba + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ca + ")*)|.*)\\)|)",
                ea = new RegExp(aa + "+", "g"),
                fa = new RegExp("^" + aa + "+|((?:^|[^\\\\])(?:\\\\.)*)" + aa + "+$", "g"),
                ga = new RegExp("^" + aa + "*," + aa + "*"),
                ha = new RegExp("^" + aa + "*([>+~]|" + aa + ")" + aa + "*"),
                ia = new RegExp("=" + aa + "*([^\\]'\"]*?)" + aa + "*\\]", "g"),
                ja = new RegExp(da),
                ka = new RegExp("^" + ba + "$"),
                la = {
                    ID: new RegExp("^#(" + ba + ")"),
                    CLASS: new RegExp("^\\.(" + ba + ")"),
                    TAG: new RegExp("^(" + ba + "|[*])"),
                    ATTR: new RegExp("^" + ca),
                    PSEUDO: new RegExp("^" + da),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + aa + "*(even|odd|(([+-]|)(\\d*)n|)" + aa + "*(?:([+-]|)" + aa + "*(\\d+)|))" + aa + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + _ + ")$", "i"),
                    needsContext: new RegExp("^" + aa + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + aa + "*((?:-\\d)?\\d*)" + aa + "*\\)|)(?=[^-]|$)", "i")
                },
                ma = /^(?:input|select|textarea|button)$/i,
                na = /^h\d$/i,
                oa = /^[^{]+\{\s*\[native \w/,
                pa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                qa = /[+~]/,
                ra = new RegExp("\\\\([\\da-f]{1,6}" + aa + "?|(" + aa + ")|.)", "ig"),
                sa = function(a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                },
                ta = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                ua = function(a, b) {
                    return b ? "\0" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
                },
                va = function() {
                    E()
                },
                wa = m(function(a) {
                    return a.disabled === !0 && ("form" in a || "label" in a)
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                Y.apply(V = Z.call(N.childNodes), N.childNodes), V[N.childNodes.length].nodeType
            } catch (a) {
                Y = {
                    apply: V.length ? function(a, b) {
                        X.apply(a, Z.call(b))
                    } : function(a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
                }
            }
            u = b.support = {}, x = b.isXML = function(a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return !!b && "HTML" !== b.nodeName
            }, E = b.setDocument = function(a) {
                var b, c, d = a ? a.ownerDocument || a : N;
                return d !== F && 9 === d.nodeType && d.documentElement ? (F = d, G = F.documentElement, H = !x(F), N !== F && (c = F.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", va, !1) : c.attachEvent && c.attachEvent("onunload", va)), u.attributes = e(function(a) {
                    return a.className = "i", !a.getAttribute("className")
                }), u.getElementsByTagName = e(function(a) {
                    return a.appendChild(F.createComment("")), !a.getElementsByTagName("*").length
                }), u.getElementsByClassName = oa.test(F.getElementsByClassName), u.getById = e(function(a) {
                    return G.appendChild(a).id = M, !F.getElementsByName || !F.getElementsByName(M).length
                }), u.getById ? (v.filter.ID = function(a) {
                    var b = a.replace(ra, sa);
                    return function(a) {
                        return a.getAttribute("id") === b
                    }
                }, v.find.ID = function(a, b) {
                    if (void 0 !== b.getElementById && H) {
                        var c = b.getElementById(a);
                        return c ? [c] : []
                    }
                }) : (v.filter.ID = function(a) {
                    var b = a.replace(ra, sa);
                    return function(a) {
                        var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }, v.find.ID = function(a, b) {
                    if (void 0 !== b.getElementById && H) {
                        var c, d, e, f = b.getElementById(a);
                        if (f) {
                            if ((c = f.getAttributeNode("id")) && c.value === a) return [f];
                            for (e = b.getElementsByName(a), d = 0; f = e[d++];)
                                if ((c = f.getAttributeNode("id")) && c.value === a) return [f]
                        }
                        return []
                    }
                }), v.find.TAG = u.getElementsByTagName ? function(a, b) {
                    return void 0 !== b.getElementsByTagName ? b.getElementsByTagName(a) : u.qsa ? b.querySelectorAll(a) : void 0
                } : function(a, b) {
                    var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, v.find.CLASS = u.getElementsByClassName && function(a, b) {
                    if (void 0 !== b.getElementsByClassName && H) return b.getElementsByClassName(a)
                }, J = [], I = [], (u.qsa = oa.test(F.querySelectorAll)) && (e(function(a) {
                    G.appendChild(a).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + aa + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || I.push("\\[" + aa + "*(?:value|" + _ + ")"), a.querySelectorAll("[id~=" + M + "-]").length || I.push("~="), a.querySelectorAll(":checked").length || I.push(":checked"), a.querySelectorAll("a#" + M + "+*").length || I.push(".#.+[+~]")
                }), e(function(a) {
                    a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var b = F.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && I.push("name" + aa + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && I.push(":enabled", ":disabled"), G.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && I.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), I.push(",.*:")
                })), (u.matchesSelector = oa.test(K = G.matches || G.webkitMatchesSelector || G.mozMatchesSelector || G.oMatchesSelector || G.msMatchesSelector)) && e(function(a) {
                    u.disconnectedMatch = K.call(a, "*"), K.call(a, "[s!='']:x"), J.push("!=", da)
                }), I = I.length && new RegExp(I.join("|")), J = J.length && new RegExp(J.join("|")), b = oa.test(G.compareDocumentPosition), L = b || oa.test(G.contains) ? function(a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function(a, b) {
                    if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0;
                    return !1
                }, T = b ? function(a, b) {
                    if (a === b) return D = !0, 0;
                    var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !u.sortDetached && b.compareDocumentPosition(a) === c ? a === F || a.ownerDocument === N && L(N, a) ? -1 : b === F || b.ownerDocument === N && L(N, b) ? 1 : C ? $(C, a) - $(C, b) : 0 : 4 & c ? -1 : 1)
                } : function(a, b) {
                    if (a === b) return D = !0, 0;
                    var c, d = 0,
                        e = a.parentNode,
                        f = b.parentNode,
                        h = [a],
                        i = [b];
                    if (!e || !f) return a === F ? -1 : b === F ? 1 : e ? -1 : f ? 1 : C ? $(C, a) - $(C, b) : 0;
                    if (e === f) return g(a, b);
                    for (c = a; c = c.parentNode;) h.unshift(c);
                    for (c = b; c = c.parentNode;) i.unshift(c);
                    for (; h[d] === i[d];) d++;
                    return d ? g(h[d], i[d]) : h[d] === N ? -1 : i[d] === N ? 1 : 0
                }, F) : F
            }, b.matches = function(a, c) {
                return b(a, null, null, c)
            }, b.matchesSelector = function(a, c) {
                if ((a.ownerDocument || a) !== F && E(a), c = c.replace(ia, "='$1']"), u.matchesSelector && H && !S[c + " "] && (!J || !J.test(c)) && (!I || !I.test(c))) try {
                    var d = K.call(a, c);
                    if (d || u.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (a) {}
                return b(c, F, null, [a]).length > 0
            }, b.contains = function(a, b) {
                return (a.ownerDocument || a) !== F && E(a), L(a, b)
            }, b.attr = function(a, b) {
                (a.ownerDocument || a) !== F && E(a);
                var c = v.attrHandle[b.toLowerCase()],
                    d = c && U.call(v.attrHandle, b.toLowerCase()) ? c(a, b, !H) : void 0;
                return void 0 !== d ? d : u.attributes || !H ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }, b.escape = function(a) {
                return (a + "").replace(ta, ua)
            }, b.error = function(a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, b.uniqueSort = function(a) {
                var b, c = [],
                    d = 0,
                    e = 0;
                if (D = !u.detectDuplicates, C = !u.sortStable && a.slice(0), a.sort(T), D) {
                    for (; b = a[e++];) b === a[e] && (d = c.push(e));
                    for (; d--;) a.splice(c[d], 1)
                }
                return C = null, a
            }, w = b.getText = function(a) {
                var b, c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += w(a)
                    } else if (3 === e || 4 === e) return a.nodeValue
                } else
                    for (; b = a[d++];) c += w(b);
                return c
            }, v = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: la,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(a) {
                        return a[1] = a[1].replace(ra, sa), a[3] = (a[3] || a[4] || a[5] || "").replace(ra, sa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    },
                    CHILD: function(a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                    },
                    PSEUDO: function(a) {
                        var b, c = !a[6] && a[2];
                        return la.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ja.test(c) && (b = y(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(a) {
                        var b = a.replace(ra, sa).toLowerCase();
                        return "*" === a ? function() {
                            return !0
                        } : function(a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    },
                    CLASS: function(a) {
                        var b = Q[a + " "];
                        return b || (b = new RegExp("(^|" + aa + ")" + a + "(" + aa + "|$)")) && Q(a, function(a) {
                            return b.test("string" == typeof a.className && a.className || void 0 !== a.getAttribute && a.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(a, c, d) {
                        return function(e) {
                            var f = b.attr(e, a);
                            return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ea, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                        }
                    },
                    CHILD: function(a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e ? function(a) {
                            return !!a.parentNode
                        } : function(b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h,
                                t = !1;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (m = b; m = m[p];)
                                            if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (m = q, l = m[M] || (m[M] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === O && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();)
                                        if (1 === m.nodeType && ++t && m === b) {
                                            k[a] = [O, n, t];
                                            break
                                        }
                                } else if (s && (m = b, l = m[M] || (m[M] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === O && j[1], t = n), t === !1)
                                    for (;
                                        (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[M] || (m[M] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [O, t]), m !== b)););
                                return (t -= e) === d || t % d == 0 && t / d >= 0
                            }
                        }
                    },
                    PSEUDO: function(a, c) {
                        var e, f = v.pseudos[a] || v.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[M] ? f(c) : f.length > 1 ? (e = [a, a, "", c], v.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                            for (var d, e = f(a, c), g = e.length; g--;) d = $(a, e[g]), a[d] = !(b[d] = e[g])
                        }) : function(a) {
                            return f(a, 0, e)
                        }) : f
                    }
                },
                pseudos: {
                    not: d(function(a) {
                        var b = [],
                            c = [],
                            e = z(a.replace(fa, "$1"));
                        return e[M] ? d(function(a, b, c, d) {
                            for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function(a, d, f) {
                            return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                        }
                    }),
                    has: d(function(a) {
                        return function(c) {
                            return b(a, c).length > 0
                        }
                    }),
                    contains: d(function(a) {
                        return a = a.replace(ra, sa),
                            function(b) {
                                return (b.textContent || b.innerText || w(b)).indexOf(a) > -1
                            }
                    }),
                    lang: d(function(a) {
                        return ka.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ra, sa).toLowerCase(),
                            function(b) {
                                var c;
                                do {
                                    if (c = H ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-")
                                } while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1
                            }
                    }),
                    target: function(b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    },
                    root: function(a) {
                        return a === G
                    },
                    focus: function(a) {
                        return a === F.activeElement && (!F.hasFocus || F.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    },
                    enabled: h(!1),
                    disabled: h(!0),
                    checked: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    },
                    selected: function(a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    empty: function(a) {
                        for (a = a.firstChild; a; a = a.nextSibling)
                            if (a.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(a) {
                        return !v.pseudos.empty(a)
                    },
                    header: function(a) {
                        return na.test(a.nodeName)
                    },
                    input: function(a) {
                        return ma.test(a.nodeName)
                    },
                    button: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    },
                    text: function(a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    },
                    first: i(function() {
                        return [0]
                    }),
                    last: i(function(a, b) {
                        return [b - 1]
                    }),
                    eq: i(function(a, b, c) {
                        return [c < 0 ? c + b : c]
                    }),
                    even: i(function(a, b) {
                        for (var c = 0; c < b; c += 2) a.push(c);
                        return a
                    }),
                    odd: i(function(a, b) {
                        for (var c = 1; c < b; c += 2) a.push(c);
                        return a
                    }),
                    lt: i(function(a, b, c) {
                        for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }),
                    gt: i(function(a, b, c) {
                        for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                        return a
                    })
                }
            }, v.pseudos.nth = v.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) v.pseudos[t] = function(a) {
                return function(b) {
                    return "input" === b.nodeName.toLowerCase() && b.type === a
                }
            }(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) v.pseudos[t] = function(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }(t);
            return k.prototype = v.filters = v.pseudos, v.setFilters = new k, y = b.tokenize = function(a, c) {
                var d, e, f, g, h, i, j, k = R[a + " "];
                if (k) return c ? 0 : k.slice(0);
                for (h = a, i = [], j = v.preFilter; h;) {
                    d && !(e = ga.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ha.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(fa, " ")
                    }), h = h.slice(d.length));
                    for (g in v.filter) !(e = la[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                        value: d,
                        type: g,
                        matches: e
                    }), h = h.slice(d.length));
                    if (!d) break
                }
                return c ? h.length : h ? b.error(a) : R(a, i).slice(0)
            }, z = b.compile = function(a, b) {
                var c, d = [],
                    e = [],
                    f = S[a + " "];
                if (!f) {
                    for (b || (b = y(a)), c = b.length; c--;) f = r(b[c]), f[M] ? d.push(f) : e.push(f);
                    f = S(a, s(e, d)), f.selector = a
                }
                return f
            }, A = b.select = function(a, b, c, d) {
                var e, f, g, h, i, k = "function" == typeof a && a,
                    m = !d && y(a = k.selector || a);
                if (c = c || [], 1 === m.length) {
                    if (f = m[0] = m[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType && H && v.relative[f[1].type]) {
                        if (!(b = (v.find.ID(g.matches[0].replace(ra, sa), b) || [])[0])) return c;
                        k && (b = b.parentNode), a = a.slice(f.shift().value.length)
                    }
                    for (e = la.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !v.relative[h = g.type]);)
                        if ((i = v.find[h]) && (d = i(g.matches[0].replace(ra, sa), qa.test(f[0].type) && j(b.parentNode) || b))) {
                            if (f.splice(e, 1), !(a = d.length && l(f))) return Y.apply(c, d), c;
                            break
                        }
                }
                return (k || z(a, m))(d, b, !H, c, !b || qa.test(a) && j(b.parentNode) || b), c
            }, u.sortStable = M.split("").sort(T).join("") === M, u.detectDuplicates = !!D, E(), u.sortDetached = e(function(a) {
                return 1 & a.compareDocumentPosition(F.createElement("fieldset"))
            }), e(function(a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || f("type|href|height|width", function(a, b, c) {
                if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), u.attributes && e(function(a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || f("value", function(a, b, c) {
                if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
            }), e(function(a) {
                return null == a.getAttribute("disabled")
            }) || f(_, function(a, b, c) {
                var d;
                if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), b
        }(a);
        pa.find = ra, pa.expr = ra.selectors, pa.expr[":"] = pa.expr.pseudos, pa.uniqueSort = pa.unique = ra.uniqueSort, pa.text = ra.getText, pa.isXMLDoc = ra.isXML, pa.contains = ra.contains, pa.escapeSelector = ra.escape;
        var sa = function(a, b, c) {
                for (var d = [], e = void 0 !== c;
                    (a = a[b]) && 9 !== a.nodeType;)
                    if (1 === a.nodeType) {
                        if (e && pa(a).is(c)) break;
                        d.push(a)
                    }
                return d
            },
            ta = function(a, b) {
                for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                return c
            },
            ua = pa.expr.match.needsContext,
            va = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            wa = /^.[^:#\[\.,]*$/;
        pa.filter = function(a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? pa.find.matchesSelector(d, a) ? [d] : [] : pa.find.matches(a, pa.grep(b, function(a) {
                return 1 === a.nodeType
            }))
        }, pa.fn.extend({
            find: function(a) {
                var b, c, d = this.length,
                    e = this;
                if ("string" != typeof a) return this.pushStack(pa(a).filter(function() {
                    for (b = 0; b < d; b++)
                        if (pa.contains(e[b], this)) return !0
                }));
                for (c = this.pushStack([]), b = 0; b < d; b++) pa.find(a, e[b], c);
                return d > 1 ? pa.uniqueSort(c) : c
            },
            filter: function(a) {
                return this.pushStack(f(this, a || [], !1))
            },
            not: function(a) {
                return this.pushStack(f(this, a || [], !0))
            },
            is: function(a) {
                return !!f(this, "string" == typeof a && ua.test(a) ? pa(a) : a || [], !1).length
            }
        });
        var xa, ya = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (pa.fn.init = function(a, b, c) {
            var d, e;
            if (!a) return this;
            if (c = c || xa, "string" == typeof a) {
                if (!(d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ya.exec(a)) || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (d[1]) {
                    if (b = b instanceof pa ? b[0] : b, pa.merge(this, pa.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : ca, !0)), va.test(d[1]) && pa.isPlainObject(b))
                        for (d in b) pa.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                    return this
                }
                return e = ca.getElementById(d[2]), e && (this[0] = e, this.length = 1), this
            }
            return a.nodeType ? (this[0] = a, this.length = 1, this) : pa.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(pa) : pa.makeArray(a, this)
        }).prototype = pa.fn, xa = pa(ca);
        var za = /^(?:parents|prev(?:Until|All))/,
            Aa = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        pa.fn.extend({
            has: function(a) {
                var b = pa(a, this),
                    c = b.length;
                return this.filter(function() {
                    for (var a = 0; a < c; a++)
                        if (pa.contains(this, b[a])) return !0
                })
            },
            closest: function(a, b) {
                var c, d = 0,
                    e = this.length,
                    f = [],
                    g = "string" != typeof a && pa(a);
                if (!ua.test(a))
                    for (; d < e; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && pa.find.matchesSelector(c, a))) {
                                f.push(c);
                                break
                            }
                return this.pushStack(f.length > 1 ? pa.uniqueSort(f) : f)
            },
            index: function(a) {
                return a ? "string" == typeof a ? ha.call(pa(a), this[0]) : ha.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(a, b) {
                return this.pushStack(pa.uniqueSort(pa.merge(this.get(), pa(a, b))))
            },
            addBack: function(a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        }), pa.each({
            parent: function(a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            },
            parents: function(a) {
                return sa(a, "parentNode")
            },
            parentsUntil: function(a, b, c) {
                return sa(a, "parentNode", c)
            },
            next: function(a) {
                return g(a, "nextSibling")
            },
            prev: function(a) {
                return g(a, "previousSibling")
            },
            nextAll: function(a) {
                return sa(a, "nextSibling")
            },
            prevAll: function(a) {
                return sa(a, "previousSibling")
            },
            nextUntil: function(a, b, c) {
                return sa(a, "nextSibling", c)
            },
            prevUntil: function(a, b, c) {
                return sa(a, "previousSibling", c)
            },
            siblings: function(a) {
                return ta((a.parentNode || {}).firstChild, a)
            },
            children: function(a) {
                return ta(a.firstChild)
            },
            contents: function(a) {
                return e(a, "iframe") ? a.contentDocument : (e(a, "template") && (a = a.content || a), pa.merge([], a.childNodes))
            }
        }, function(a, b) {
            pa.fn[a] = function(c, d) {
                var e = pa.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = pa.filter(d, e)), this.length > 1 && (Aa[a] || pa.uniqueSort(e), za.test(a) && e.reverse()), this.pushStack(e)
            }
        });
        var Ba = /[^\x20\t\r\n\f]+/g;
        pa.Callbacks = function(a) {
            a = "string" == typeof a ? h(a) : pa.extend({}, a);
            var b, c, d, e, f = [],
                g = [],
                i = -1,
                j = function() {
                    for (e = e || a.once, d = b = !0; g.length; i = -1)
                        for (c = g.shift(); ++i < f.length;) f[i].apply(c[0], c[1]) === !1 && a.stopOnFalse && (i = f.length, c = !1);
                    a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
                },
                k = {
                    add: function() {
                        return f && (c && !b && (i = f.length - 1, g.push(c)), function b(c) {
                            pa.each(c, function(c, d) {
                                pa.isFunction(d) ? a.unique && k.has(d) || f.push(d) : d && d.length && "string" !== pa.type(d) && b(d)
                            })
                        }(arguments), c && !b && j()), this
                    },
                    remove: function() {
                        return pa.each(arguments, function(a, b) {
                            for (var c;
                                (c = pa.inArray(b, f, c)) > -1;) f.splice(c, 1), c <= i && i--
                        }), this
                    },
                    has: function(a) {
                        return a ? pa.inArray(a, f) > -1 : f.length > 0
                    },
                    empty: function() {
                        return f && (f = []), this
                    },
                    disable: function() {
                        return e = g = [], f = c = "", this
                    },
                    disabled: function() {
                        return !f
                    },
                    lock: function() {
                        return e = g = [], c || b || (f = c = ""), this
                    },
                    locked: function() {
                        return !!e
                    },
                    fireWith: function(a, c) {
                        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || j()), this
                    },
                    fire: function() {
                        return k.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!d
                    }
                };
            return k
        }, pa.extend({
            Deferred: function(b) {
                var c = [
                        ["notify", "progress", pa.Callbacks("memory"), pa.Callbacks("memory"), 2],
                        ["resolve", "done", pa.Callbacks("once memory"), pa.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", pa.Callbacks("once memory"), pa.Callbacks("once memory"), 1, "rejected"]
                    ],
                    d = "pending",
                    e = {
                        state: function() {
                            return d
                        },
                        always: function() {
                            return f.done(arguments).fail(arguments), this
                        },
                        catch: function(a) {
                            return e.then(null, a)
                        },
                        pipe: function() {
                            var a = arguments;
                            return pa.Deferred(function(b) {
                                pa.each(c, function(c, d) {
                                    var e = pa.isFunction(a[d[4]]) && a[d[4]];
                                    f[d[1]](function() {
                                        var a = e && e.apply(this, arguments);
                                        a && pa.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        then: function(b, d, e) {
                            function f(b, c, d, e) {
                                return function() {
                                    var h = this,
                                        k = arguments,
                                        l = function() {
                                            var a, l;
                                            if (!(b < g)) {
                                                if ((a = d.apply(h, k)) === c.promise()) throw new TypeError("Thenable self-resolution");
                                                l = a && ("object" == typeof a || "function" == typeof a) && a.then, pa.isFunction(l) ? e ? l.call(a, f(g, c, i, e), f(g, c, j, e)) : (g++, l.call(a, f(g, c, i, e), f(g, c, j, e), f(g, c, i, c.notifyWith))) : (d !== i && (h = void 0, k = [a]), (e || c.resolveWith)(h, k))
                                            }
                                        },
                                        m = e ? l : function() {
                                            try {
                                                l()
                                            } catch (a) {
                                                pa.Deferred.exceptionHook && pa.Deferred.exceptionHook(a, m.stackTrace), b + 1 >= g && (d !== j && (h = void 0, k = [a]), c.rejectWith(h, k))
                                            }
                                        };
                                    b ? m() : (pa.Deferred.getStackHook && (m.stackTrace = pa.Deferred.getStackHook()), a.setTimeout(m))
                                }
                            }
                            var g = 0;
                            return pa.Deferred(function(a) {
                                c[0][3].add(f(0, a, pa.isFunction(e) ? e : i, a.notifyWith)), c[1][3].add(f(0, a, pa.isFunction(b) ? b : i)), c[2][3].add(f(0, a, pa.isFunction(d) ? d : j))
                            }).promise()
                        },
                        promise: function(a) {
                            return null != a ? pa.extend(a, e) : e
                        }
                    },
                    f = {};
                return pa.each(c, function(a, b) {
                    var g = b[2],
                        h = b[5];
                    e[b[1]] = g.add, h && g.add(function() {
                        d = h
                    }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function() {
                        return f[b[0] + "With"](this === f ? void 0 : this, arguments), this
                    }, f[b[0] + "With"] = g.fireWith
                }), e.promise(f), b && b.call(f, f), f
            },
            when: function(a) {
                var b = arguments.length,
                    c = b,
                    d = Array(c),
                    e = ea.call(arguments),
                    f = pa.Deferred(),
                    g = function(a) {
                        return function(c) {
                            d[a] = this, e[a] = arguments.length > 1 ? ea.call(arguments) : c, --b || f.resolveWith(d, e)
                        }
                    };
                if (b <= 1 && (k(a, f.done(g(c)).resolve, f.reject, !b), "pending" === f.state() || pa.isFunction(e[c] && e[c].then))) return f.then();
                for (; c--;) k(e[c], g(c), f.reject);
                return f.promise()
            }
        });
        var Ca = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        pa.Deferred.exceptionHook = function(b, c) {
            a.console && a.console.warn && b && Ca.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c)
        }, pa.readyException = function(b) {
            a.setTimeout(function() {
                throw b
            })
        };
        var Da = pa.Deferred();
        pa.fn.ready = function(a) {
            return Da.then(a).catch(function(a) {
                pa.readyException(a)
            }), this
        }, pa.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(a) {
                (a === !0 ? --pa.readyWait : pa.isReady) || (pa.isReady = !0, a !== !0 && --pa.readyWait > 0 || Da.resolveWith(ca, [pa]))
            }
        }), pa.ready.then = Da.then, "complete" === ca.readyState || "loading" !== ca.readyState && !ca.documentElement.doScroll ? a.setTimeout(pa.ready) : (ca.addEventListener("DOMContentLoaded", l), a.addEventListener("load", l));
        var Ea = function(a, b, c, d, e, f, g) {
                var h = 0,
                    i = a.length,
                    j = null == c;
                if ("object" === pa.type(c)) {
                    e = !0;
                    for (h in c) Ea(a, b, h, c[h], !0, f, g)
                } else if (void 0 !== d && (e = !0, pa.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                        return j.call(pa(a), c)
                    })), b))
                    for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            },
            Fa = function(a) {
                return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
            };
        m.uid = 1, m.prototype = {
            cache: function(a) {
                var b = a[this.expando];
                return b || (b = {}, Fa(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                    value: b,
                    configurable: !0
                }))), b
            },
            set: function(a, b, c) {
                var d, e = this.cache(a);
                if ("string" == typeof b) e[pa.camelCase(b)] = c;
                else
                    for (d in b) e[pa.camelCase(d)] = b[d];
                return e
            },
            get: function(a, b) {
                return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][pa.camelCase(b)]
            },
            access: function(a, b, c) {
                return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b)
            },
            remove: function(a, b) {
                var c, d = a[this.expando];
                if (void 0 !== d) {
                    if (void 0 !== b) {
                        Array.isArray(b) ? b = b.map(pa.camelCase) : (b = pa.camelCase(b), b = b in d ? [b] : b.match(Ba) || []), c = b.length;
                        for (; c--;) delete d[b[c]]
                    }(void 0 === b || pa.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
                }
            },
            hasData: function(a) {
                var b = a[this.expando];
                return void 0 !== b && !pa.isEmptyObject(b)
            }
        };
        var Ga = new m,
            Ha = new m,
            Ia = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Ja = /[A-Z]/g;
        pa.extend({
            hasData: function(a) {
                return Ha.hasData(a) || Ga.hasData(a)
            },
            data: function(a, b, c) {
                return Ha.access(a, b, c)
            },
            removeData: function(a, b) {
                Ha.remove(a, b)
            },
            _data: function(a, b, c) {
                return Ga.access(a, b, c)
            },
            _removeData: function(a, b) {
                Ga.remove(a, b)
            }
        }), pa.fn.extend({
            data: function(a, b) {
                var c, d, e, f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = Ha.get(f), 1 === f.nodeType && !Ga.get(f, "hasDataAttrs"))) {
                        for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = pa.camelCase(d.slice(5)), o(f, d, e[d])));
                        Ga.set(f, "hasDataAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function() {
                    Ha.set(this, a)
                }) : Ea(this, function(b) {
                    var c;
                    if (f && void 0 === b) {
                        if (void 0 !== (c = Ha.get(f, a))) return c;
                        if (void 0 !== (c = o(f, a))) return c
                    } else this.each(function() {
                        Ha.set(this, a, b)
                    })
                }, null, b, arguments.length > 1, null, !0)
            },
            removeData: function(a) {
                return this.each(function() {
                    Ha.remove(this, a)
                })
            }
        }), pa.extend({
            queue: function(a, b, c) {
                var d;
                if (a) return b = (b || "fx") + "queue", d = Ga.get(a, b), c && (!d || Array.isArray(c) ? d = Ga.access(a, b, pa.makeArray(c)) : d.push(c)), d || []
            },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = pa.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = pa._queueHooks(a, b),
                    g = function() {
                        pa.dequeue(a, b)
                    };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function(a, b) {
                var c = b + "queueHooks";
                return Ga.get(a, c) || Ga.access(a, c, {
                    empty: pa.Callbacks("once memory").add(function() {
                        Ga.remove(a, [b + "queue", c])
                    })
                })
            }
        }), pa.fn.extend({
            queue: function(a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? pa.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                    var c = pa.queue(this, a, b);
                    pa._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && pa.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    pa.dequeue(this, a)
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a, b) {
                var c, d = 1,
                    e = pa.Deferred(),
                    f = this,
                    g = this.length,
                    h = function() {
                        --d || e.resolveWith(f, [f])
                    };
                for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;)(c = Ga.get(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var Ka = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            La = new RegExp("^(?:([+-])=|)(" + Ka + ")([a-z%]*)$", "i"),
            Ma = ["Top", "Right", "Bottom", "Left"],
            Na = function(a, b) {
                return a = b || a, "none" === a.style.display || "" === a.style.display && pa.contains(a.ownerDocument, a) && "none" === pa.css(a, "display")
            },
            Oa = function(a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            },
            Pa = {};
        pa.fn.extend({
            show: function() {
                return r(this, !0)
            },
            hide: function() {
                return r(this)
            },
            toggle: function(a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                    Na(this) ? pa(this).show() : pa(this).hide()
                })
            }
        });
        var Qa = /^(?:checkbox|radio)$/i,
            Ra = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Sa = /^$|\/(?:java|ecma)script/i,
            Ta = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Ta.optgroup = Ta.option, Ta.tbody = Ta.tfoot = Ta.colgroup = Ta.caption = Ta.thead, Ta.th = Ta.td;
        var Ua = /<|&#?\w+;/;
        ! function() {
            var a = ca.createDocumentFragment(),
                b = a.appendChild(ca.createElement("div")),
                c = ca.createElement("input");
            c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), na.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", na.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
        }();
        var Va = ca.documentElement,
            Wa = /^key/,
            Xa = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Ya = /^([^.]*)(?:\.(.+)|)/;
        pa.event = {
            global: {},
            add: function(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = Ga.get(a);
                if (q)
                    for (c.handler && (f = c, c = f.handler, e = f.selector), e && pa.find.matchesSelector(Va, e), c.guid || (c.guid = pa.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                            return void 0 !== pa && pa.event.triggered !== b.type ? pa.event.dispatch.apply(a, arguments) : void 0
                        }), b = (b || "").match(Ba) || [""], j = b.length; j--;) h = Ya.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = pa.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = pa.event.special[n] || {}, k = pa.extend({
                        type: n,
                        origType: p,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && pa.expr.match.needsContext.test(e),
                        namespace: o.join(".")
                    }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), pa.event.global[n] = !0)
            },
            remove: function(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = Ga.hasData(a) && Ga.get(a);
                if (q && (i = q.events)) {
                    for (b = (b || "").match(Ba) || [""], j = b.length; j--;)
                        if (h = Ya.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                            for (l = pa.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                            g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || pa.removeEvent(a, n, q.handle), delete i[n])
                        } else
                            for (n in i) pa.event.remove(a, n + b[j], c, d, !0);
                    pa.isEmptyObject(i) && Ga.remove(a, "handle events")
                }
            },
            dispatch: function(a) {
                var b, c, d, e, f, g, h = pa.event.fix(a),
                    i = new Array(arguments.length),
                    j = (Ga.get(this, "events") || {})[h.type] || [],
                    k = pa.event.special[h.type] || {};
                for (i[0] = h, b = 1; b < arguments.length; b++) i[b] = arguments[b];
                if (h.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, h) !== !1) {
                    for (g = pa.event.handlers.call(this, h, j), b = 0;
                        (e = g[b++]) && !h.isPropagationStopped();)
                        for (h.currentTarget = e.elem, c = 0;
                            (f = e.handlers[c++]) && !h.isImmediatePropagationStopped();) h.rnamespace && !h.rnamespace.test(f.namespace) || (h.handleObj = f, h.data = f.data, void 0 !== (d = ((pa.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, i)) && (h.result = d) === !1 && (h.preventDefault(), h.stopPropagation()));
                    return k.postDispatch && k.postDispatch.call(this, h), h.result
                }
            },
            handlers: function(a, b) {
                var c, d, e, f, g, h = [],
                    i = b.delegateCount,
                    j = a.target;
                if (i && j.nodeType && !("click" === a.type && a.button >= 1))
                    for (; j !== this; j = j.parentNode || this)
                        if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) {
                            for (f = [], g = {}, c = 0; c < i; c++) d = b[c], e = d.selector + " ",
                                void 0 === g[e] && (g[e] = d.needsContext ? pa(e, this).index(j) > -1 : pa.find(e, this, null, [j]).length), g[e] && f.push(d);
                            f.length && h.push({
                                elem: j,
                                handlers: f
                            })
                        }
                return j = this, i < b.length && h.push({
                    elem: j,
                    handlers: b.slice(i)
                }), h
            },
            addProp: function(a, b) {
                Object.defineProperty(pa.Event.prototype, a, {
                    enumerable: !0,
                    configurable: !0,
                    get: pa.isFunction(b) ? function() {
                        if (this.originalEvent) return b(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[a]
                    },
                    set: function(b) {
                        Object.defineProperty(this, a, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: b
                        })
                    }
                })
            },
            fix: function(a) {
                return a[pa.expando] ? a : new pa.Event(a)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== x() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === x() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && e(this, "input")) return this.click(), !1
                    },
                    _default: function(a) {
                        return e(a.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(a) {
                        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                    }
                }
            }
        }, pa.removeEvent = function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c)
        }, pa.Event = function(a, b) {
            return this instanceof pa.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? v : w, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && pa.extend(this, b), this.timeStamp = a && a.timeStamp || pa.now(), void(this[pa.expando] = !0)) : new pa.Event(a, b)
        }, pa.Event.prototype = {
            constructor: pa.Event,
            isDefaultPrevented: w,
            isPropagationStopped: w,
            isImmediatePropagationStopped: w,
            isSimulated: !1,
            preventDefault: function() {
                var a = this.originalEvent;
                this.isDefaultPrevented = v, a && !this.isSimulated && a.preventDefault()
            },
            stopPropagation: function() {
                var a = this.originalEvent;
                this.isPropagationStopped = v, a && !this.isSimulated && a.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var a = this.originalEvent;
                this.isImmediatePropagationStopped = v, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
            }
        }, pa.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(a) {
                var b = a.button;
                return null == a.which && Wa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && Xa.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which
            }
        }, pa.event.addProp), pa.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(a, b) {
            pa.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function(a) {
                    var c, d = this,
                        e = a.relatedTarget,
                        f = a.handleObj;
                    return e && (e === d || pa.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                }
            }
        }), pa.fn.extend({
            on: function(a, b, c, d) {
                return y(this, a, b, c, d)
            },
            one: function(a, b, c, d) {
                return y(this, a, b, c, d, 1)
            },
            off: function(a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return d = a.handleObj, pa(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this
                }
                return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = w), this.each(function() {
                    pa.event.remove(this, a, c, b)
                })
            }
        });
        var Za = /<script|<style|<link/i,
            $a = /checked\s*(?:[^=]|=\s*.checked.)/i,
            _a = /^true\/(.*)/,
            ab = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        pa.extend({
            htmlPrefilter: function(a) {
                return a.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, "<$1></$2>")
            },
            clone: function(a, b, c) {
                var d, e, f, g, h = a.cloneNode(!0),
                    i = pa.contains(a.ownerDocument, a);
                if (!(na.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || pa.isXMLDoc(a)))
                    for (g = s(h), f = s(a), d = 0, e = f.length; d < e; d++) D(f[d], g[d]);
                if (b)
                    if (c)
                        for (f = f || s(a), g = g || s(h), d = 0, e = f.length; d < e; d++) C(f[d], g[d]);
                    else C(a, h);
                return g = s(h, "script"), g.length > 0 && t(g, !i && s(a, "script")), h
            },
            cleanData: function(a) {
                for (var b, c, d, e = pa.event.special, f = 0; void 0 !== (c = a[f]); f++)
                    if (Fa(c)) {
                        if (b = c[Ga.expando]) {
                            if (b.events)
                                for (d in b.events) e[d] ? pa.event.remove(c, d) : pa.removeEvent(c, d, b.handle);
                            c[Ga.expando] = void 0
                        }
                        c[Ha.expando] && (c[Ha.expando] = void 0)
                    }
            }
        }), pa.fn.extend({
            detach: function(a) {
                return F(this, a, !0)
            },
            remove: function(a) {
                return F(this, a)
            },
            text: function(a) {
                return Ea(this, function(a) {
                    return void 0 === a ? pa.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                    })
                }, null, a, arguments.length)
            },
            append: function() {
                return E(this, arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        z(this, a).appendChild(a)
                    }
                })
            },
            prepend: function() {
                return E(this, arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = z(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            },
            before: function() {
                return E(this, arguments, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            },
            after: function() {
                return E(this, arguments, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            },
            empty: function() {
                for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (pa.cleanData(s(a, !1)), a.textContent = "");
                return this
            },
            clone: function(a, b) {
                return a = null != a && a, b = null == b ? a : b, this.map(function() {
                    return pa.clone(this, a, b)
                })
            },
            html: function(a) {
                return Ea(this, function(a) {
                    var b = this[0] || {},
                        c = 0,
                        d = this.length;
                    if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                    if ("string" == typeof a && !Za.test(a) && !Ta[(Ra.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = pa.htmlPrefilter(a);
                        try {
                            for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (pa.cleanData(s(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (a) {}
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            },
            replaceWith: function() {
                var a = [];
                return E(this, arguments, function(b) {
                    var c = this.parentNode;
                    pa.inArray(this, a) < 0 && (pa.cleanData(s(this)), c && c.replaceChild(b, this))
                }, a)
            }
        }), pa.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) {
            pa.fn[a] = function(a) {
                for (var c, d = [], e = pa(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), pa(e[g])[b](c), ga.apply(d, c.get());
                return this.pushStack(d)
            }
        });
        var bb = /^margin/,
            cb = new RegExp("^(" + Ka + ")(?!px)[a-z%]+$", "i"),
            db = function(b) {
                var c = b.ownerDocument.defaultView;
                return c && c.opener || (c = a), c.getComputedStyle(b)
            };
        ! function() {
            function b() {
                if (h) {
                    h.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Va.appendChild(g);
                    var b = a.getComputedStyle(h);
                    c = "1%" !== b.top, f = "2px" === b.marginLeft, d = "4px" === b.width, h.style.marginRight = "50%", e = "4px" === b.marginRight, Va.removeChild(g), h = null
                }
            }
            var c, d, e, f, g = ca.createElement("div"),
                h = ca.createElement("div");
            h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", na.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h), pa.extend(na, {
                pixelPosition: function() {
                    return b(), c
                },
                boxSizingReliable: function() {
                    return b(), d
                },
                pixelMarginRight: function() {
                    return b(), e
                },
                reliableMarginLeft: function() {
                    return b(), f
                }
            }))
        }();
        var eb = /^(none|table(?!-c[ea]).+)/,
            fb = /^--/,
            gb = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            hb = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            ib = ["Webkit", "Moz", "ms"],
            jb = ca.createElement("div").style;
        pa.extend({
            cssHooks: {
                opacity: {
                    get: function(a, b) {
                        if (b) {
                            var c = G(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = pa.camelCase(b),
                        i = fb.test(b),
                        j = a.style;
                    return i || (b = J(h)), g = pa.cssHooks[b] || pa.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : (f = typeof c, "string" === f && (e = La.exec(c)) && e[1] && (c = p(a, b, e), f = "number"), void(null != c && c === c && ("number" === f && (c += e && e[3] || (pa.cssNumber[h] ? "" : "px")), na.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c))))
                }
            },
            css: function(a, b, c, d) {
                var e, f, g, h = pa.camelCase(b);
                return fb.test(b) || (b = J(h)), g = pa.cssHooks[b] || pa.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = G(a, b, d)), "normal" === e && b in hb && (e = hb[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
            }
        }), pa.each(["height", "width"], function(a, b) {
            pa.cssHooks[b] = {
                get: function(a, c, d) {
                    if (c) return !eb.test(pa.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? M(a, b, d) : Oa(a, gb, function() {
                        return M(a, b, d)
                    })
                },
                set: function(a, c, d) {
                    var e, f = d && db(a),
                        g = d && L(a, b, d, "border-box" === pa.css(a, "boxSizing", !1, f), f);
                    return g && (e = La.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = pa.css(a, b)), K(a, c, g)
                }
            }
        }), pa.cssHooks.marginLeft = H(na.reliableMarginLeft, function(a, b) {
            if (b) return (parseFloat(G(a, "marginLeft")) || a.getBoundingClientRect().left - Oa(a, {
                marginLeft: 0
            }, function() {
                return a.getBoundingClientRect().left
            })) + "px"
        }), pa.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(a, b) {
            pa.cssHooks[a + b] = {
                expand: function(c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + Ma[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, bb.test(a) || (pa.cssHooks[a + b].set = K)
        }), pa.fn.extend({
            css: function(a, b) {
                return Ea(this, function(a, b, c) {
                    var d, e, f = {},
                        g = 0;
                    if (Array.isArray(b)) {
                        for (d = db(a), e = b.length; g < e; g++) f[b[g]] = pa.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? pa.style(a, b, c) : pa.css(a, b)
                }, a, b, arguments.length > 1)
            }
        }), pa.Tween = N, N.prototype = {
            constructor: N,
            init: function(a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || pa.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (pa.cssNumber[c] ? "" : "px")
            },
            cur: function() {
                var a = N.propHooks[this.prop];
                return a && a.get ? a.get(this) : N.propHooks._default.get(this)
            },
            run: function(a) {
                var b, c = N.propHooks[this.prop];
                return this.options.duration ? this.pos = b = pa.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : N.propHooks._default.set(this), this
            }
        }, N.prototype.init.prototype = N.prototype, N.propHooks = {
            _default: {
                get: function(a) {
                    var b;
                    return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = pa.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
                },
                set: function(a) {
                    pa.fx.step[a.prop] ? pa.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[pa.cssProps[a.prop]] && !pa.cssHooks[a.prop] ? a.elem[a.prop] = a.now : pa.style(a.elem, a.prop, a.now + a.unit)
                }
            }
        }, N.propHooks.scrollTop = N.propHooks.scrollLeft = {
            set: function(a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, pa.easing = {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            },
            _default: "swing"
        }, pa.fx = N.prototype.init, pa.fx.step = {};
        var kb, lb, mb = /^(?:toggle|show|hide)$/,
            nb = /queueHooks$/;
        pa.Animation = pa.extend(U, {
                tweeners: {
                    "*": [function(a, b) {
                        var c = this.createTween(a, b);
                        return p(c.elem, a, La.exec(b), c), c
                    }]
                },
                tweener: function(a, b) {
                    pa.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(Ba);
                    for (var c, d = 0, e = a.length; d < e; d++) c = a[d], U.tweeners[c] = U.tweeners[c] || [], U.tweeners[c].unshift(b)
                },
                prefilters: [S],
                prefilter: function(a, b) {
                    b ? U.prefilters.unshift(a) : U.prefilters.push(a)
                }
            }), pa.speed = function(a, b, c) {
                var d = a && "object" == typeof a ? pa.extend({}, a) : {
                    complete: c || !c && b || pa.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !pa.isFunction(b) && b
                };
                return pa.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in pa.fx.speeds ? d.duration = pa.fx.speeds[d.duration] : d.duration = pa.fx.speeds._default), null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                    pa.isFunction(d.old) && d.old.call(this), d.queue && pa.dequeue(this, d.queue)
                }, d
            }, pa.fn.extend({
                fadeTo: function(a, b, c, d) {
                    return this.filter(Na).css("opacity", 0).show().end().animate({
                        opacity: b
                    }, a, c, d)
                },
                animate: function(a, b, c, d) {
                    var e = pa.isEmptyObject(a),
                        f = pa.speed(b, c, d),
                        g = function() {
                            var b = U(this, pa.extend({}, a), f);
                            (e || Ga.get(this, "finish")) && b.stop(!0)
                        };
                    return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function(a, b, c) {
                    var d = function(a) {
                        var b = a.stop;
                        delete a.stop, b(c)
                    };
                    return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = pa.timers,
                            g = Ga.get(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g) g[e] && g[e].stop && nb.test(e) && d(g[e]);
                        for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                        !b && c || pa.dequeue(this, a)
                    })
                },
                finish: function(a) {
                    return a !== !1 && (a = a || "fx"), this.each(function() {
                        var b, c = Ga.get(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = pa.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, pa.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish
                    })
                }
            }), pa.each(["toggle", "show", "hide"], function(a, b) {
                var c = pa.fn[b];
                pa.fn[b] = function(a, d, e) {
                    return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Q(b, !0), a, d, e)
                }
            }), pa.each({
                slideDown: Q("show"),
                slideUp: Q("hide"),
                slideToggle: Q("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(a, b) {
                pa.fn[a] = function(a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }), pa.timers = [], pa.fx.tick = function() {
                var a, b = 0,
                    c = pa.timers;
                for (kb = pa.now(); b < c.length; b++)(a = c[b])() || c[b] !== a || c.splice(b--, 1);
                c.length || pa.fx.stop(), kb = void 0
            }, pa.fx.timer = function(a) {
                pa.timers.push(a), pa.fx.start()
            }, pa.fx.interval = 13, pa.fx.start = function() {
                lb || (lb = !0, O())
            }, pa.fx.stop = function() {
                lb = null
            }, pa.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, pa.fn.delay = function(b, c) {
                return b = pa.fx ? pa.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, d) {
                    var e = a.setTimeout(c, b);
                    d.stop = function() {
                        a.clearTimeout(e)
                    }
                })
            },
            function() {
                var a = ca.createElement("input"),
                    b = ca.createElement("select"),
                    c = b.appendChild(ca.createElement("option"));
                a.type = "checkbox", na.checkOn = "" !== a.value, na.optSelected = c.selected, a = ca.createElement("input"), a.value = "t", a.type = "radio", na.radioValue = "t" === a.value
            }();
        var ob, pb = pa.expr.attrHandle;
        pa.fn.extend({
            attr: function(a, b) {
                return Ea(this, pa.attr, a, b, arguments.length > 1)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    pa.removeAttr(this, a)
                })
            }
        }), pa.extend({
            attr: function(a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return void 0 === a.getAttribute ? pa.prop(a, b, c) : (1 === f && pa.isXMLDoc(a) || (e = pa.attrHooks[b.toLowerCase()] || (pa.expr.match.bool.test(b) ? ob : void 0)), void 0 !== c ? null === c ? void pa.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = pa.find.attr(a, b), null == d ? void 0 : d))
            },
            attrHooks: {
                type: {
                    set: function(a, b) {
                        if (!na.radioValue && "radio" === b && e(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            },
            removeAttr: function(a, b) {
                var c, d = 0,
                    e = b && b.match(Ba);
                if (e && 1 === a.nodeType)
                    for (; c = e[d++];) a.removeAttribute(c)
            }
        }), ob = {
            set: function(a, b, c) {
                return b === !1 ? pa.removeAttr(a, c) : a.setAttribute(c, c), c
            }
        }, pa.each(pa.expr.match.bool.source.match(/\w+/g), function(a, b) {
            var c = pb[b] || pa.find.attr;
            pb[b] = function(a, b, d) {
                var e, f, g = b.toLowerCase();
                return d || (f = pb[g], pb[g] = e, e = null != c(a, b, d) ? g : null, pb[g] = f), e
            }
        });
        var qb = /^(?:input|select|textarea|button)$/i,
            rb = /^(?:a|area)$/i;
        pa.fn.extend({
            prop: function(a, b) {
                return Ea(this, pa.prop, a, b, arguments.length > 1)
            },
            removeProp: function(a) {
                return this.each(function() {
                    delete this[pa.propFix[a] || a]
                })
            }
        }), pa.extend({
            prop: function(a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return 1 === f && pa.isXMLDoc(a) || (b = pa.propFix[b] || b, e = pa.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
            },
            propHooks: {
                tabIndex: {
                    get: function(a) {
                        var b = pa.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : qb.test(a.nodeName) || rb.test(a.nodeName) && a.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), na.optSelected || (pa.propHooks.selected = {
            get: function(a) {
                var b = a.parentNode;
                return b && b.parentNode && b.parentNode.selectedIndex, null
            },
            set: function(a) {
                var b = a.parentNode;
                b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
            }
        }), pa.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            pa.propFix[this.toLowerCase()] = this
        }), pa.fn.extend({
            addClass: function(a) {
                var b, c, d, e, f, g, h, i = 0;
                if (pa.isFunction(a)) return this.each(function(b) {
                    pa(this).addClass(a.call(this, b, W(this)))
                });
                if ("string" == typeof a && a)
                    for (b = a.match(Ba) || []; c = this[i++];)
                        if (e = W(c), d = 1 === c.nodeType && " " + V(e) + " ") {
                            for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                            h = V(d), e !== h && c.setAttribute("class", h)
                        }
                return this
            },
            removeClass: function(a) {
                var b, c, d, e, f, g, h, i = 0;
                if (pa.isFunction(a)) return this.each(function(b) {
                    pa(this).removeClass(a.call(this, b, W(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof a && a)
                    for (b = a.match(Ba) || []; c = this[i++];)
                        if (e = W(c), d = 1 === c.nodeType && " " + V(e) + " ") {
                            for (g = 0; f = b[g++];)
                                for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
                            h = V(d), e !== h && c.setAttribute("class", h)
                        }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : pa.isFunction(a) ? this.each(function(c) {
                    pa(this).toggleClass(a.call(this, c, W(this), b), b)
                }) : this.each(function() {
                    var b, d, e, f;
                    if ("string" === c)
                        for (d = 0, e = pa(this), f = a.match(Ba) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    else void 0 !== a && "boolean" !== c || (b = W(this), b && Ga.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : Ga.get(this, "__className__") || ""))
                })
            },
            hasClass: function(a) {
                var b, c, d = 0;
                for (b = " " + a + " "; c = this[d++];)
                    if (1 === c.nodeType && (" " + V(W(c)) + " ").indexOf(b) > -1) return !0;
                return !1
            }
        });
        pa.fn.extend({
            val: function(a) {
                var b, c, d, e = this[0];
                return arguments.length ? (d = pa.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, pa(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = pa.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), (b = pa.valHooks[this.type] || pa.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                })) : e ? (b = pa.valHooks[e.type] || pa.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(/\r/g, "") : null == c ? "" : c)) : void 0
            }
        }), pa.extend({
            valHooks: {
                option: {
                    get: function(a) {
                        var b = pa.find.attr(a, "value");
                        return null != b ? b : V(pa.text(a))
                    }
                },
                select: {
                    get: function(a) {
                        var b, c, d, f = a.options,
                            g = a.selectedIndex,
                            h = "select-one" === a.type,
                            i = h ? null : [],
                            j = h ? g + 1 : f.length;
                        for (d = g < 0 ? j : h ? g : 0; d < j; d++)
                            if (c = f[d], (c.selected || d === g) && !c.disabled && (!c.parentNode.disabled || !e(c.parentNode, "optgroup"))) {
                                if (b = pa(c).val(), h) return b;
                                i.push(b)
                            }
                        return i
                    },
                    set: function(a, b) {
                        for (var c, d, e = a.options, f = pa.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = pa.inArray(pa.valHooks.option.get(d), f) > -1) && (c = !0);
                        return c || (a.selectedIndex = -1), f
                    }
                }
            }
        }), pa.each(["radio", "checkbox"], function() {
            pa.valHooks[this] = {
                set: function(a, b) {
                    if (Array.isArray(b)) return a.checked = pa.inArray(pa(a).val(), b) > -1
                }
            }, na.checkOn || (pa.valHooks[this].get = function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
        var sb = /^(?:focusinfocus|focusoutblur)$/;
        pa.extend(pa.event, {
            trigger: function(b, c, d, e) {
                var f, g, h, i, j, k, l, m = [d || ca],
                    n = ka.call(b, "type") ? b.type : b,
                    o = ka.call(b, "namespace") ? b.namespace.split(".") : [];
                if (g = h = d = d || ca, 3 !== d.nodeType && 8 !== d.nodeType && !sb.test(n + pa.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[pa.expando] ? b : new pa.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : pa.makeArray(c, [b]), l = pa.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                    if (!e && !l.noBubble && !pa.isWindow(d)) {
                        for (i = l.delegateType || n, sb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                        h === (d.ownerDocument || ca) && m.push(h.defaultView || h.parentWindow || a)
                    }
                    for (f = 0;
                        (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (Ga.get(g, "events") || {})[b.type] && Ga.get(g, "handle"), k && k.apply(g, c), (k = j && g[j]) && k.apply && Fa(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                    return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !Fa(d) || j && pa.isFunction(d[n]) && !pa.isWindow(d) && (h = d[j], h && (d[j] = null), pa.event.triggered = n, d[n](), pa.event.triggered = void 0, h && (d[j] = h)), b.result
                }
            },
            simulate: function(a, b, c) {
                var d = pa.extend(new pa.Event, c, {
                    type: a,
                    isSimulated: !0
                });
                pa.event.trigger(d, null, b)
            }
        }), pa.fn.extend({
            trigger: function(a, b) {
                return this.each(function() {
                    pa.event.trigger(a, b, this)
                })
            },
            triggerHandler: function(a, b) {
                var c = this[0];
                if (c) return pa.event.trigger(a, b, c, !0)
            }
        }), pa.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(a, b) {
            pa.fn[b] = function(a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), pa.fn.extend({
            hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        }), na.focusin = "onfocusin" in a, na.focusin || pa.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            var c = function(a) {
                pa.event.simulate(b, a.target, pa.event.fix(a))
            };
            pa.event.special[b] = {
                setup: function() {
                    var d = this.ownerDocument || this,
                        e = Ga.access(d, b);
                    e || d.addEventListener(a, c, !0), Ga.access(d, b, (e || 0) + 1)
                },
                teardown: function() {
                    var d = this.ownerDocument || this,
                        e = Ga.access(d, b) - 1;
                    e ? Ga.access(d, b, e) : (d.removeEventListener(a, c, !0), Ga.remove(d, b))
                }
            }
        });
        var tb = a.location,
            ub = pa.now(),
            vb = /\?/;
        pa.parseXML = function(b) {
            var c;
            if (!b || "string" != typeof b) return null;
            try {
                c = (new a.DOMParser).parseFromString(b, "text/xml")
            } catch (a) {
                c = void 0
            }
            return c && !c.getElementsByTagName("parsererror").length || pa.error("Invalid XML: " + b), c
        };
        var wb = /\[\]$/,
            xb = /^(?:submit|button|image|reset|file)$/i,
            yb = /^(?:input|select|textarea|keygen)/i;
        pa.param = function(a, b) {
            var c, d = [],
                e = function(a, b) {
                    var c = pa.isFunction(b) ? b() : b;
                    d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
                };
            if (Array.isArray(a) || a.jquery && !pa.isPlainObject(a)) pa.each(a, function() {
                e(this.name, this.value)
            });
            else
                for (c in a) X(c, a[c], b, e);
            return d.join("&")
        }, pa.fn.extend({
            serialize: function() {
                return pa.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var a = pa.prop(this, "elements");
                    return a ? pa.makeArray(a) : this
                }).filter(function() {
                    var a = this.type;
                    return this.name && !pa(this).is(":disabled") && yb.test(this.nodeName) && !xb.test(a) && (this.checked || !Qa.test(a))
                }).map(function(a, b) {
                    var c = pa(this).val();
                    return null == c ? null : Array.isArray(c) ? pa.map(c, function(a) {
                        return {
                            name: b.name,
                            value: a.replace(/\r?\n/g, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(/\r?\n/g, "\r\n")
                    }
                }).get()
            }
        });
        var zb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Ab = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Bb = /^(?:GET|HEAD)$/,
            Cb = {},
            Db = {},
            Eb = "*/".concat("*"),
            Fb = ca.createElement("a");
        Fb.href = tb.href, pa.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: tb.href,
                type: "GET",
                isLocal: Ab.test(tb.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Eb,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": pa.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(a, b) {
                return b ? $($(a, pa.ajaxSettings), b) : $(pa.ajaxSettings, a)
            },
            ajaxPrefilter: Y(Cb),
            ajaxTransport: Y(Db),
            ajax: function(b, c) {
                function d(b, c, d, h) {
                    var j, m, n, u, v, w = c;
                    k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (u = _(o, x, d)), u = aa(o, u, x, j), j ? (o.ifModified && (v = x.getResponseHeader("Last-Modified"), v && (pa.lastModified[f] = v), (v = x.getResponseHeader("etag")) && (pa.etag[f] = v)), 204 === b || "HEAD" === o.type ? w = "nocontent" : 304 === b ? w = "notmodified" : (w = u.state, m = u.data, n = u.error, j = !n)) : (n = w, !b && w || (w = "error", b < 0 && (b = 0))), x.status = b, x.statusText = (c || w) + "", j ? r.resolveWith(p, [m, w, x]) : r.rejectWith(p, [x, w, n]), x.statusCode(t), t = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [x, o, j ? m : n]), s.fireWith(p, [x, w]), l && (q.trigger("ajaxComplete", [x, o]), --pa.active || pa.event.trigger("ajaxStop")))
                }
                "object" == typeof b && (c = b, b = void 0), c = c || {};
                var e, f, g, h, i, j, k, l, m, n, o = pa.ajaxSetup({}, c),
                    p = o.context || o,
                    q = o.context && (p.nodeType || p.jquery) ? pa(p) : pa.event,
                    r = pa.Deferred(),
                    s = pa.Callbacks("once memory"),
                    t = o.statusCode || {},
                    u = {},
                    v = {},
                    w = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(a) {
                            var b;
                            if (k) {
                                if (!h)
                                    for (h = {}; b = zb.exec(g);) h[b[1].toLowerCase()] = b[2];
                                b = h[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        },
                        getAllResponseHeaders: function() {
                            return k ? g : null
                        },
                        setRequestHeader: function(a, b) {
                            return null == k && (a = v[a.toLowerCase()] = v[a.toLowerCase()] || a, u[a] = b), this
                        },
                        overrideMimeType: function(a) {
                            return null == k && (o.mimeType = a), this
                        },
                        statusCode: function(a) {
                            var b;
                            if (a)
                                if (k) x.always(a[x.status]);
                                else
                                    for (b in a) t[b] = [t[b], a[b]];
                            return this
                        },
                        abort: function(a) {
                            var b = a || w;
                            return e && e.abort(b), d(0, b), this
                        }
                    };
                if (r.promise(x), o.url = ((b || o.url || tb.href) + "").replace(/^\/\//, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(Ba) || [""], null == o.crossDomain) {
                    j = ca.createElement("a");
                    try {
                        j.href = o.url, j.href = j.href, o.crossDomain = Fb.protocol + "//" + Fb.host != j.protocol + "//" + j.host
                    } catch (a) {
                        o.crossDomain = !0
                    }
                }
                if (o.data && o.processData && "string" != typeof o.data && (o.data = pa.param(o.data, o.traditional)), Z(Cb, o, c, x), k) return x;
                l = pa.event && o.global, l && 0 == pa.active++ && pa.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Bb.test(o.type), f = o.url.replace(/#.*$/, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(/%20/g, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(/([?&])_=[^&]*/, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (pa.lastModified[f] && x.setRequestHeader("If-Modified-Since", pa.lastModified[f]), pa.etag[f] && x.setRequestHeader("If-None-Match", pa.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", o.contentType), x.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Eb + "; q=0.01" : "") : o.accepts["*"]);
                for (m in o.headers) x.setRequestHeader(m, o.headers[m]);
                if (o.beforeSend && (o.beforeSend.call(p, x, o) === !1 || k)) return x.abort();
                if (w = "abort", s.add(o.complete), x.done(o.success), x.fail(o.error), e = Z(Db, o, c, x)) {
                    if (x.readyState = 1, l && q.trigger("ajaxSend", [x, o]), k) return x;
                    o.async && o.timeout > 0 && (i = a.setTimeout(function() {
                        x.abort("timeout")
                    }, o.timeout));
                    try {
                        k = !1, e.send(u, d)
                    } catch (a) {
                        if (k) throw a;
                        d(-1, a)
                    }
                } else d(-1, "No Transport");
                return x
            },
            getJSON: function(a, b, c) {
                return pa.get(a, b, c, "json")
            },
            getScript: function(a, b) {
                return pa.get(a, void 0, b, "script")
            }
        }), pa.each(["get", "post"], function(a, b) {
            pa[b] = function(a, c, d, e) {
                return pa.isFunction(c) && (e = e || d, d = c, c = void 0), pa.ajax(pa.extend({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                }, pa.isPlainObject(a) && a))
            }
        }), pa._evalUrl = function(a) {
            return pa.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }, pa.fn.extend({
            wrapAll: function(a) {
                var b;
                return this[0] && (pa.isFunction(a) && (a = a.call(this[0])), b = pa(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                    return a
                }).append(this)), this
            },
            wrapInner: function(a) {
                return pa.isFunction(a) ? this.each(function(b) {
                    pa(this).wrapInner(a.call(this, b))
                }) : this.each(function() {
                    var b = pa(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) {
                var b = pa.isFunction(a);
                return this.each(function(c) {
                    pa(this).wrapAll(b ? a.call(this, c) : a)
                })
            },
            unwrap: function(a) {
                return this.parent(a).not("body").each(function() {
                    pa(this).replaceWith(this.childNodes)
                }), this
            }
        }), pa.expr.pseudos.hidden = function(a) {
            return !pa.expr.pseudos.visible(a)
        }, pa.expr.pseudos.visible = function(a) {
            return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
        }, pa.ajaxSettings.xhr = function() {
            try {
                return new a.XMLHttpRequest
            } catch (a) {}
        };
        var Gb = {
                0: 200,
                1223: 204
            },
            Hb = pa.ajaxSettings.xhr();
        na.cors = !!Hb && "withCredentials" in Hb, na.ajax = Hb = !!Hb, pa.ajaxTransport(function(b) {
            var c, d;
            if (na.cors || Hb && !b.crossDomain) return {
                send: function(e, f) {
                    var g, h = b.xhr();
                    if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
                        for (g in b.xhrFields) h[g] = b.xhrFields[g];
                    b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    for (g in e) h.setRequestHeader(g, e[g]);
                    c = function(a) {
                        return function() {
                            c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Gb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
                                binary: h.response
                            } : {
                                text: h.responseText
                            }, h.getAllResponseHeaders()))
                        }
                    }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() {
                        4 === h.readyState && a.setTimeout(function() {
                            c && d()
                        })
                    }, c = c("abort");
                    try {
                        h.send(b.hasContent && b.data || null)
                    } catch (a) {
                        if (c) throw a
                    }
                },
                abort: function() {
                    c && c()
                }
            }
        }), pa.ajaxPrefilter(function(a) {
            a.crossDomain && (a.contents.script = !1)
        }), pa.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(a) {
                    return pa.globalEval(a), a
                }
            }
        }), pa.ajaxPrefilter("script", function(a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
        }), pa.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var b, c;
                return {
                    send: function(d, e) {
                        b = pa("<script>").prop({
                            charset: a.scriptCharset,
                            src: a.url
                        }).on("load error", c = function(a) {
                            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                        }), ca.head.appendChild(b[0])
                    },
                    abort: function() {
                        c && c()
                    }
                }
            }
        });
        var Ib = [],
            Jb = /(=)\?(?=&|$)|\?\?/;
        pa.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var a = Ib.pop() || pa.expando + "_" + ub++;
                return this[a] = !0, a
            }
        }), pa.ajaxPrefilter("json jsonp", function(b, c, d) {
            var e, f, g, h = b.jsonp !== !1 && (Jb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Jb.test(b.data) && "data");
            if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = pa.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Jb, "$1" + e) : b.jsonp !== !1 && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
                return g || pa.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
                g = arguments
            }, d.always(function() {
                void 0 === f ? pa(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Ib.push(e)), g && pa.isFunction(f) && f(g[0]), g = f = void 0
            }), "script"
        }), na.createHTMLDocument = function() {
            var a = ca.implementation.createHTMLDocument("").body;
            return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length
        }(), pa.parseHTML = function(a, b, c) {
            if ("string" != typeof a) return [];
            "boolean" == typeof b && (c = b, b = !1);
            var d, e, f;
            return b || (na.createHTMLDocument ? (b = ca.implementation.createHTMLDocument(""), d = b.createElement("base"), d.href = ca.location.href, b.head.appendChild(d)) : b = ca), e = va.exec(a), f = !c && [], e ? [b.createElement(e[1])] : (e = u([a], b, f),
                f && f.length && pa(f).remove(), pa.merge([], e.childNodes))
        }, pa.fn.load = function(a, b, c) {
            var d, e, f, g = this,
                h = a.indexOf(" ");
            return h > -1 && (d = V(a.slice(h)), a = a.slice(0, h)), pa.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && pa.ajax({
                url: a,
                type: e || "GET",
                dataType: "html",
                data: b
            }).done(function(a) {
                f = arguments, g.html(d ? pa("<div>").append(pa.parseHTML(a)).find(d) : a)
            }).always(c && function(a, b) {
                g.each(function() {
                    c.apply(this, f || [a.responseText, b, a])
                })
            }), this
        }, pa.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
            pa.fn[b] = function(a) {
                return this.on(b, a)
            }
        }), pa.expr.pseudos.animated = function(a) {
            return pa.grep(pa.timers, function(b) {
                return a === b.elem
            }).length
        }, pa.offset = {
            setOffset: function(a, b, c) {
                var d, e, f, g, h, i, j, k = pa.css(a, "position"),
                    l = pa(a),
                    m = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = pa.css(a, "top"), i = pa.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), pa.isFunction(b) && (b = b.call(a, c, pa.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
            }
        }, pa.fn.extend({
            offset: function(a) {
                if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                    pa.offset.setOffset(this, a, b)
                });
                var b, c, d, e, f = this[0];
                return f ? f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, {
                    top: d.top + e.pageYOffset - c.clientTop,
                    left: d.left + e.pageXOffset - c.clientLeft
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var a, b, c = this[0],
                        d = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === pa.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), e(a[0], "html") || (d = a.offset()), d = {
                        top: d.top + pa.css(a[0], "borderTopWidth", !0),
                        left: d.left + pa.css(a[0], "borderLeftWidth", !0)
                    }), {
                        top: b.top - d.top - pa.css(c, "marginTop", !0),
                        left: b.left - d.left - pa.css(c, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var a = this.offsetParent; a && "static" === pa.css(a, "position");) a = a.offsetParent;
                    return a || Va
                })
            }
        }), pa.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(a, b) {
            var c = "pageYOffset" === b;
            pa.fn[a] = function(d) {
                return Ea(this, function(a, d, e) {
                    var f;
                    return pa.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
                }, a, d, arguments.length)
            }
        }), pa.each(["top", "left"], function(a, b) {
            pa.cssHooks[b] = H(na.pixelPosition, function(a, c) {
                if (c) return c = G(a, b), cb.test(c) ? pa(a).position()[b] + "px" : c
            })
        }), pa.each({
            Height: "height",
            Width: "width"
        }, function(a, b) {
            pa.each({
                padding: "inner" + a,
                content: b,
                "": "outer" + a
            }, function(c, d) {
                pa.fn[d] = function(e, f) {
                    var g = arguments.length && (c || "boolean" != typeof e),
                        h = c || (e === !0 || f === !0 ? "margin" : "border");
                    return Ea(this, function(b, c, e) {
                        var f;
                        return pa.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? pa.css(b, c, h) : pa.style(b, c, e, h)
                    }, b, g ? e : void 0, g)
                }
            })
        }), pa.fn.extend({
            bind: function(a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function(a, b) {
                return this.off(a, null, b)
            },
            delegate: function(a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function(a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        }), pa.holdReady = function(a) {
            a ? pa.readyWait++ : pa.ready(!0)
        }, pa.isArray = Array.isArray, pa.parseJSON = JSON.parse, pa.nodeName = e, "function" == typeof define && define.amd && define("jquery", [], function() {
            return pa
        });
        var Kb = a.jQuery,
            Lb = a.$;
        return pa.noConflict = function(b) {
            return a.$ === pa && (a.$ = Lb), b && a.jQuery === pa && (a.jQuery = Kb), pa
        }, b || (a.jQuery = a.$ = pa), pa
    }), function(a, b) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.Popper = b()
    }(this, function() {
        "use strict";

        function a(a) {
            return a && "[object Function]" === {}.toString.call(a)
        }

        function b(a, b) {
            if (1 !== a.nodeType) return [];
            var c = window.getComputedStyle(a, null);
            return b ? c[b] : c
        }

        function c(a) {
            return "HTML" === a.nodeName ? a : a.parentNode || a.host
        }

        function d(a) {
            if (!a || -1 !== ["HTML", "BODY", "#document"].indexOf(a.nodeName)) return window.document.body;
            var e = b(a),
                f = e.overflow,
                g = e.overflowX,
                h = e.overflowY;
            return /(auto|scroll)/.test(f + h + g) ? a : d(c(a))
        }

        function e(a) {
            var c = a && a.offsetParent,
                d = c && c.nodeName;
            return d && "BODY" !== d && "HTML" !== d ? -1 !== ["TD", "TABLE"].indexOf(c.nodeName) && "static" === b(c, "position") ? e(c) : c : window.document.documentElement
        }

        function f(a) {
            var b = a.nodeName;
            return "BODY" !== b && ("HTML" === b || e(a.firstElementChild) === a)
        }

        function g(a) {
            return null === a.parentNode ? a : g(a.parentNode)
        }

        function h(a, b) {
            if (!(a && a.nodeType && b && b.nodeType)) return window.document.documentElement;
            var c = a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
                d = c ? a : b,
                i = c ? b : a,
                j = document.createRange();
            j.setStart(d, 0), j.setEnd(i, 0);
            var k = j.commonAncestorContainer;
            if (a !== k && b !== k || d.contains(i)) return f(k) ? k : e(k);
            var l = g(a);
            return l.host ? h(l.host, b) : h(a, g(b).host)
        }

        function i(a) {
            var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
                c = "top" === b ? "scrollTop" : "scrollLeft",
                d = a.nodeName;
            if ("BODY" === d || "HTML" === d) {
                var e = window.document.documentElement;
                return (window.document.scrollingElement || e)[c]
            }
            return a[c]
        }

        function j(a, b) {
            var c = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                d = i(b, "top"),
                e = i(b, "left"),
                f = c ? -1 : 1;
            return a.top += d * f, a.bottom += d * f, a.left += e * f, a.right += e * f, a
        }

        function k(a, b) {
            var c = "x" === b ? "Left" : "Top",
                d = "Left" == c ? "Right" : "Bottom";
            return +a["border" + c + "Width"].split("px")[0] + +a["border" + d + "Width"].split("px")[0]
        }

        function l(a, b, c, d) {
            return W(b["offset" + a], b["scroll" + a], c["client" + a], c["offset" + a], c["scroll" + a], da() ? c["offset" + a] + d["margin" + ("Height" === a ? "Top" : "Left")] + d["margin" + ("Height" === a ? "Bottom" : "Right")] : 0)
        }

        function m() {
            var a = window.document.body,
                b = window.document.documentElement,
                c = da() && window.getComputedStyle(b);
            return {
                height: l("Height", a, b, c),
                width: l("Width", a, b, c)
            }
        }

        function n(a) {
            return ha({}, a, {
                right: a.left + a.width,
                bottom: a.top + a.height
            })
        }

        function o(a) {
            var c = {};
            if (da()) try {
                c = a.getBoundingClientRect();
                var d = i(a, "top"),
                    e = i(a, "left");
                c.top += d, c.left += e, c.bottom += d, c.right += e
            } catch (a) {} else c = a.getBoundingClientRect();
            var f = {
                    left: c.left,
                    top: c.top,
                    width: c.right - c.left,
                    height: c.bottom - c.top
                },
                g = "HTML" === a.nodeName ? m() : {},
                h = g.width || a.clientWidth || f.right - f.left,
                j = g.height || a.clientHeight || f.bottom - f.top,
                l = a.offsetWidth - h,
                o = a.offsetHeight - j;
            if (l || o) {
                var p = b(a);
                l -= k(p, "x"), o -= k(p, "y"), f.width -= l, f.height -= o
            }
            return n(f)
        }

        function p(a, c) {
            var e = da(),
                f = "HTML" === c.nodeName,
                g = o(a),
                h = o(c),
                i = d(a),
                k = b(c),
                l = +k.borderTopWidth.split("px")[0],
                m = +k.borderLeftWidth.split("px")[0],
                p = n({
                    top: g.top - h.top - l,
                    left: g.left - h.left - m,
                    width: g.width,
                    height: g.height
                });
            if (p.marginTop = 0, p.marginLeft = 0, !e && f) {
                var q = +k.marginTop.split("px")[0],
                    r = +k.marginLeft.split("px")[0];
                p.top -= l - q, p.bottom -= l - q, p.left -= m - r, p.right -= m - r, p.marginTop = q, p.marginLeft = r
            }
            return (e ? c.contains(i) : c === i && "BODY" !== i.nodeName) && (p = j(p, c)), p
        }

        function q(a) {
            var b = window.document.documentElement,
                c = p(a, b),
                d = W(b.clientWidth, window.innerWidth || 0),
                e = W(b.clientHeight, window.innerHeight || 0),
                f = i(b),
                g = i(b, "left");
            return n({
                top: f - c.top + c.marginTop,
                left: g - c.left + c.marginLeft,
                width: d,
                height: e
            })
        }

        function r(a) {
            var d = a.nodeName;
            return "BODY" !== d && "HTML" !== d && ("fixed" === b(a, "position") || r(c(a)))
        }

        function s(a, b, e, f) {
            var g = {
                    top: 0,
                    left: 0
                },
                i = h(a, b);
            if ("viewport" === f) g = q(i);
            else {
                var j;
                "scrollParent" === f ? (j = d(c(a)), "BODY" === j.nodeName && (j = window.document.documentElement)) : j = "window" === f ? window.document.documentElement : f;
                var k = p(j, i);
                if ("HTML" !== j.nodeName || r(i)) g = k;
                else {
                    var l = m(),
                        n = l.height,
                        o = l.width;
                    g.top += k.top - k.marginTop, g.bottom = n + k.top, g.left += k.left - k.marginLeft, g.right = o + k.left
                }
            }
            return g.left += e, g.top += e, g.right -= e, g.bottom -= e, g
        }

        function t(a) {
            return a.width * a.height
        }

        function u(a, b, c, d, e) {
            var f = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
            if (-1 === a.indexOf("auto")) return a;
            var g = s(c, d, f, e),
                h = {
                    top: {
                        width: g.width,
                        height: b.top - g.top
                    },
                    right: {
                        width: g.right - b.right,
                        height: g.height
                    },
                    bottom: {
                        width: g.width,
                        height: g.bottom - b.bottom
                    },
                    left: {
                        width: b.left - g.left,
                        height: g.height
                    }
                },
                i = Object.keys(h).map(function(a) {
                    return ha({
                        key: a
                    }, h[a], {
                        area: t(h[a])
                    })
                }).sort(function(a, b) {
                    return b.area - a.area
                }),
                j = i.filter(function(a) {
                    var b = a.width,
                        d = a.height;
                    return b >= c.clientWidth && d >= c.clientHeight
                }),
                k = 0 < j.length ? j[0].key : i[0].key,
                l = a.split("-")[1];
            return k + (l ? "-" + l : "")
        }

        function v(a, b, c) {
            return p(c, h(b, c))
        }

        function w(a) {
            var b = window.getComputedStyle(a),
                c = parseFloat(b.marginTop) + parseFloat(b.marginBottom),
                d = parseFloat(b.marginLeft) + parseFloat(b.marginRight);
            return {
                width: a.offsetWidth + d,
                height: a.offsetHeight + c
            }
        }

        function x(a) {
            var b = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return a.replace(/left|right|bottom|top/g, function(a) {
                return b[a]
            })
        }

        function y(a, b, c) {
            c = c.split("-")[0];
            var d = w(a),
                e = {
                    width: d.width,
                    height: d.height
                },
                f = -1 !== ["right", "left"].indexOf(c),
                g = f ? "top" : "left",
                h = f ? "left" : "top",
                i = f ? "height" : "width",
                j = f ? "width" : "height";
            return e[g] = b[g] + b[i] / 2 - d[i] / 2, e[h] = c === h ? b[h] - d[j] : b[x(h)], e
        }

        function z(a, b) {
            return Array.prototype.find ? a.find(b) : a.filter(b)[0]
        }

        function A(a, b, c) {
            if (Array.prototype.findIndex) return a.findIndex(function(a) {
                return a[b] === c
            });
            var d = z(a, function(a) {
                return a[b] === c
            });
            return a.indexOf(d)
        }

        function B(b, c, d) {
            return (void 0 === d ? b : b.slice(0, A(b, "name", d))).forEach(function(b) {
                b.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var d = b.function || b.fn;
                b.enabled && a(d) && (c.offsets.popper = n(c.offsets.popper), c.offsets.reference = n(c.offsets.reference), c = d(c, b))
            }), c
        }

        function C() {
            if (!this.state.isDestroyed) {
                var a = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                a.offsets.reference = v(this.state, this.popper, this.reference), a.placement = u(this.options.placement, a.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), a.originalPlacement = a.placement, a.offsets.popper = y(this.popper, a.offsets.reference, a.placement), a.offsets.popper.position = "absolute", a = B(this.modifiers, a), this.state.isCreated ? this.options.onUpdate(a) : (this.state.isCreated = !0, this.options.onCreate(a))
            }
        }

        function D(a, b) {
            return a.some(function(a) {
                var c = a.name;
                return a.enabled && c === b
            })
        }

        function E(a) {
            for (var b = [!1, "ms", "Webkit", "Moz", "O"], c = a.charAt(0).toUpperCase() + a.slice(1), d = 0; d < b.length - 1; d++) {
                var e = b[d],
                    f = e ? "" + e + c : a;
                if (void 0 !== window.document.body.style[f]) return f
            }
            return null
        }

        function F() {
            return this.state.isDestroyed = !0, D(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[E("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
        }

        function G(a, b, c, e) {
            var f = "BODY" === a.nodeName,
                g = f ? window : a;
            g.addEventListener(b, c, {
                passive: !0
            }), f || G(d(g.parentNode), b, c, e), e.push(g)
        }

        function H(a, b, c, e) {
            c.updateBound = e, window.addEventListener("resize", c.updateBound, {
                passive: !0
            });
            var f = d(a);
            return G(f, "scroll", c.updateBound, c.scrollParents), c.scrollElement = f, c.eventsEnabled = !0, c
        }

        function I() {
            this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate))
        }

        function J(a, b) {
            return window.removeEventListener("resize", b.updateBound), b.scrollParents.forEach(function(a) {
                a.removeEventListener("scroll", b.updateBound)
            }), b.updateBound = null, b.scrollParents = [], b.scrollElement = null, b.eventsEnabled = !1, b
        }

        function K() {
            this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = J(this.reference, this.state))
        }

        function L(a) {
            return "" !== a && !isNaN(parseFloat(a)) && isFinite(a)
        }

        function M(a, b) {
            Object.keys(b).forEach(function(c) {
                var d = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(c) && L(b[c]) && (d = "px"), a.style[c] = b[c] + d
            })
        }

        function N(a, b) {
            Object.keys(b).forEach(function(c) {
                !1 === b[c] ? a.removeAttribute(c) : a.setAttribute(c, b[c])
            })
        }

        function O(a, b, c) {
            var d = z(a, function(a) {
                    return a.name === b
                }),
                e = !!d && a.some(function(a) {
                    return a.name === c && a.enabled && a.order < d.order
                });
            if (!e) {
                var f = "`" + b + "`";
                console.warn("`" + c + "` modifier is required by " + f + " modifier in order to work, be sure to include it before " + f + "!")
            }
            return e
        }

        function P(a) {
            return "end" === a ? "start" : "start" === a ? "end" : a
        }

        function Q(a) {
            var b = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                c = ja.indexOf(a),
                d = ja.slice(c + 1).concat(ja.slice(0, c));
            return b ? d.reverse() : d
        }

        function R(a, b, c, d) {
            var e = a.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                f = +e[1],
                g = e[2];
            if (!f) return a;
            if (0 === g.indexOf("%")) {
                var h;
                switch (g) {
                    case "%p":
                        h = c;
                        break;
                    case "%":
                    case "%r":
                    default:
                        h = d
                }
                return n(h)[b] / 100 * f
            }
            if ("vh" === g || "vw" === g) {
                return ("vh" === g ? W(document.documentElement.clientHeight, window.innerHeight || 0) : W(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * f
            }
            return f
        }

        function S(a, b, c, d) {
            var e = [0, 0],
                f = -1 !== ["right", "left"].indexOf(d),
                g = a.split(/(\+|\-)/).map(function(a) {
                    return a.trim()
                }),
                h = g.indexOf(z(g, function(a) {
                    return -1 !== a.search(/,|\s/)
                }));
            g[h] && -1 === g[h].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var i = /\s*,\s*|\s+/,
                j = -1 === h ? [g] : [g.slice(0, h).concat([g[h].split(i)[0]]), [g[h].split(i)[1]].concat(g.slice(h + 1))];
            return j = j.map(function(a, d) {
                var e = (1 === d ? !f : f) ? "height" : "width",
                    g = !1;
                return a.reduce(function(a, b) {
                    return "" === a[a.length - 1] && -1 !== ["+", "-"].indexOf(b) ? (a[a.length - 1] = b, g = !0, a) : g ? (a[a.length - 1] += b, g = !1, a) : a.concat(b)
                }, []).map(function(a) {
                    return R(a, e, b, c)
                })
            }), j.forEach(function(a, b) {
                a.forEach(function(c, d) {
                    L(c) && (e[b] += c * ("-" === a[d - 1] ? -1 : 1))
                })
            }), e
        }

        function T(a, b) {
            var c, d = b.offset,
                e = a.placement,
                f = a.offsets,
                g = f.popper,
                h = f.reference,
                i = e.split("-")[0];
            return c = L(+d) ? [+d, 0] : S(d, g, h, i), "left" === i ? (g.top += c[0], g.left -= c[1]) : "right" === i ? (g.top += c[0], g.left += c[1]) : "top" === i ? (g.left += c[0], g.top -= c[1]) : "bottom" === i && (g.left += c[0], g.top += c[1]), a.popper = g, a
        }
        for (var U = Math.min, V = Math.floor, W = Math.max, X = ["native code", "[object MutationObserverConstructor]"], Y = "undefined" != typeof window, Z = ["Edge", "Trident", "Firefox"], $ = 0, _ = 0; _ < Z.length; _ += 1)
            if (Y && 0 <= navigator.userAgent.indexOf(Z[_])) {
                $ = 1;
                break
            }
        var aa, ba = Y && function(a) {
                return X.some(function(b) {
                    return -1 < (a || "").toString().indexOf(b)
                })
            }(window.MutationObserver),
            ca = ba ? function(a) {
                var b = !1,
                    c = 0,
                    d = document.createElement("span");
                return new MutationObserver(function() {
                        a(), b = !1
                    }).observe(d, {
                        attributes: !0
                    }),
                    function() {
                        b || (b = !0, d.setAttribute("x-index", c), ++c)
                    }
            } : function(a) {
                var b = !1;
                return function() {
                    b || (b = !0, setTimeout(function() {
                        b = !1, a()
                    }, $))
                }
            },
            da = function() {
                return void 0 == aa && (aa = -1 !== navigator.appVersion.indexOf("MSIE 10")), aa
            },
            ea = function(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            },
            fa = function() {
                function a(a, b) {
                    for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c)
                }
                return function(b, c, d) {
                    return c && a(b.prototype, c), d && a(b, d), b
                }
            }(),
            ga = function(a, b, c) {
                return b in a ? Object.defineProperty(a, b, {
                    value: c,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : a[b] = c, a
            },
            ha = Object.assign || function(a) {
                for (var b, c = 1; c < arguments.length; c++)
                    for (var d in b = arguments[c]) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
                return a
            },
            ia = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            ja = ia.slice(3),
            ka = {
                FLIP: "flip",
                CLOCKWISE: "clockwise",
                COUNTERCLOCKWISE: "counterclockwise"
            },
            la = function() {
                function b(c, d) {
                    var e = this,
                        f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    ea(this, b), this.scheduleUpdate = function() {
                        return requestAnimationFrame(e.update)
                    }, this.update = ca(this.update.bind(this)), this.options = ha({}, b.Defaults, f), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = c.jquery ? c[0] : c, this.popper = d.jquery ? d[0] : d, this.options.modifiers = {}, Object.keys(ha({}, b.Defaults.modifiers, f.modifiers)).forEach(function(a) {
                        e.options.modifiers[a] = ha({}, b.Defaults.modifiers[a] || {}, f.modifiers ? f.modifiers[a] : {})
                    }), this.modifiers = Object.keys(this.options.modifiers).map(function(a) {
                        return ha({
                            name: a
                        }, e.options.modifiers[a])
                    }).sort(function(a, b) {
                        return a.order - b.order
                    }), this.modifiers.forEach(function(b) {
                        b.enabled && a(b.onLoad) && b.onLoad(e.reference, e.popper, e.options, b, e.state)
                    }), this.update();
                    var g = this.options.eventsEnabled;
                    g && this.enableEventListeners(), this.state.eventsEnabled = g
                }
                return fa(b, [{
                    key: "update",
                    value: function() {
                        return C.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        return F.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function() {
                        return I.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function() {
                        return K.call(this)
                    }
                }]), b
            }();
        return la.Utils = ("undefined" == typeof window ? global : window).PopperUtils, la.placements = ia, la.Defaults = {
            placement: "bottom",
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function(a) {
                        var b = a.placement,
                            c = b.split("-")[0],
                            d = b.split("-")[1];
                        if (d) {
                            var e = a.offsets,
                                f = e.reference,
                                g = e.popper,
                                h = -1 !== ["bottom", "top"].indexOf(c),
                                i = h ? "left" : "top",
                                j = h ? "width" : "height",
                                k = {
                                    start: ga({}, i, f[i]),
                                    end: ga({}, i, f[i] + f[j] - g[j])
                                };
                            a.offsets.popper = ha({}, g, k[d])
                        }
                        return a
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: T,
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function(a, b) {
                        var c = b.boundariesElement || e(a.instance.popper);
                        a.instance.reference === c && (c = e(c));
                        var d = s(a.instance.popper, a.instance.reference, b.padding, c);
                        b.boundaries = d;
                        var f = b.priority,
                            g = a.offsets.popper,
                            h = {
                                primary: function(a) {
                                    var c = g[a];
                                    return g[a] < d[a] && !b.escapeWithReference && (c = W(g[a], d[a])), ga({}, a, c)
                                },
                                secondary: function(a) {
                                    var c = "right" === a ? "left" : "top",
                                        e = g[c];
                                    return g[a] > d[a] && !b.escapeWithReference && (e = U(g[c], d[a] - ("right" === a ? g.width : g.height))), ga({}, c, e)
                                }
                            };
                        return f.forEach(function(a) {
                            var b = -1 === ["left", "top"].indexOf(a) ? "secondary" : "primary";
                            g = ha({}, g, h[b](a))
                        }), a.offsets.popper = g, a
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function(a) {
                        var b = a.offsets,
                            c = b.popper,
                            d = b.reference,
                            e = a.placement.split("-")[0],
                            f = V,
                            g = -1 !== ["top", "bottom"].indexOf(e),
                            h = g ? "right" : "bottom",
                            i = g ? "left" : "top",
                            j = g ? "width" : "height";
                        return c[h] < f(d[i]) && (a.offsets.popper[i] = f(d[i]) - c[j]), c[i] > f(d[h]) && (a.offsets.popper[i] = f(d[h])), a
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function(a, c) {
                        if (!O(a.instance.modifiers, "arrow", "keepTogether")) return a;
                        var d = c.element;
                        if ("string" == typeof d) {
                            if (!(d = a.instance.popper.querySelector(d))) return a
                        } else if (!a.instance.popper.contains(d)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), a;
                        var e = a.placement.split("-")[0],
                            f = a.offsets,
                            g = f.popper,
                            h = f.reference,
                            i = -1 !== ["left", "right"].indexOf(e),
                            j = i ? "height" : "width",
                            k = i ? "Top" : "Left",
                            l = k.toLowerCase(),
                            m = i ? "left" : "top",
                            o = i ? "bottom" : "right",
                            p = w(d)[j];
                        h[o] - p < g[l] && (a.offsets.popper[l] -= g[l] - (h[o] - p)), h[l] + p > g[o] && (a.offsets.popper[l] += h[l] + p - g[o]);
                        var q = h[l] + h[j] / 2 - p / 2,
                            r = b(a.instance.popper, "margin" + k).replace("px", ""),
                            s = q - n(a.offsets.popper)[l] - r;
                        return s = W(U(g[j] - p, s), 0), a.arrowElement = d, a.offsets.arrow = {}, a.offsets.arrow[l] = Math.round(s), a.offsets.arrow[m] = "", a
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function(a, b) {
                        if (D(a.instance.modifiers, "inner")) return a;
                        if (a.flipped && a.placement === a.originalPlacement) return a;
                        var c = s(a.instance.popper, a.instance.reference, b.padding, b.boundariesElement),
                            d = a.placement.split("-")[0],
                            e = x(d),
                            f = a.placement.split("-")[1] || "",
                            g = [];
                        switch (b.behavior) {
                            case ka.FLIP:
                                g = [d, e];
                                break;
                            case ka.CLOCKWISE:
                                g = Q(d);
                                break;
                            case ka.COUNTERCLOCKWISE:
                                g = Q(d, !0);
                                break;
                            default:
                                g = b.behavior
                        }
                        return g.forEach(function(h, i) {
                            if (d !== h || g.length === i + 1) return a;
                            d = a.placement.split("-")[0], e = x(d);
                            var j = a.offsets.popper,
                                k = a.offsets.reference,
                                l = V,
                                m = "left" === d && l(j.right) > l(k.left) || "right" === d && l(j.left) < l(k.right) || "top" === d && l(j.bottom) > l(k.top) || "bottom" === d && l(j.top) < l(k.bottom),
                                n = l(j.left) < l(c.left),
                                o = l(j.right) > l(c.right),
                                p = l(j.top) < l(c.top),
                                q = l(j.bottom) > l(c.bottom),
                                r = "left" === d && n || "right" === d && o || "top" === d && p || "bottom" === d && q,
                                s = -1 !== ["top", "bottom"].indexOf(d),
                                t = !!b.flipVariations && (s && "start" === f && n || s && "end" === f && o || !s && "start" === f && p || !s && "end" === f && q);
                            (m || r || t) && (a.flipped = !0, (m || r) && (d = g[i + 1]), t && (f = P(f)), a.placement = d + (f ? "-" + f : ""), a.offsets.popper = ha({}, a.offsets.popper, y(a.instance.popper, a.offsets.reference, a.placement)), a = B(a.instance.modifiers, a, "flip"))
                        }), a
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport"
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function(a) {
                        var b = a.placement,
                            c = b.split("-")[0],
                            d = a.offsets,
                            e = d.popper,
                            f = d.reference,
                            g = -1 !== ["left", "right"].indexOf(c),
                            h = -1 === ["top", "left"].indexOf(c);
                        return e[g ? "left" : "top"] = f[c] - (h ? e[g ? "width" : "height"] : 0), a.placement = x(b), a.offsets.popper = n(e), a
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function(a) {
                        if (!O(a.instance.modifiers, "hide", "preventOverflow")) return a;
                        var b = a.offsets.reference,
                            c = z(a.instance.modifiers, function(a) {
                                return "preventOverflow" === a.name
                            }).boundaries;
                        if (b.bottom < c.top || b.left > c.right || b.top > c.bottom || b.right < c.left) {
                            if (!0 === a.hide) return a;
                            a.hide = !0, a.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === a.hide) return a;
                            a.hide = !1, a.attributes["x-out-of-boundaries"] = !1
                        }
                        return a
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function(a, b) {
                        var c = b.x,
                            d = b.y,
                            f = a.offsets.popper,
                            g = z(a.instance.modifiers, function(a) {
                                return "applyStyle" === a.name
                            }).gpuAcceleration;
                        void 0 !== g && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var h, i, j = void 0 === g ? b.gpuAcceleration : g,
                            k = e(a.instance.popper),
                            l = o(k),
                            m = {
                                position: f.position
                            },
                            n = {
                                left: V(f.left),
                                top: V(f.top),
                                bottom: V(f.bottom),
                                right: V(f.right)
                            },
                            p = "bottom" === c ? "top" : "bottom",
                            q = "right" === d ? "left" : "right",
                            r = E("transform");
                        if (i = "bottom" == p ? -l.height + n.bottom : n.top, h = "right" == q ? -l.width + n.right : n.left, j && r) m[r] = "translate3d(" + h + "px, " + i + "px, 0)", m[p] = 0, m[q] = 0, m.willChange = "transform";
                        else {
                            var s = "bottom" == p ? -1 : 1,
                                t = "right" == q ? -1 : 1;
                            m[p] = i * s, m[q] = h * t, m.willChange = p + ", " + q
                        }
                        var u = {
                            "x-placement": a.placement
                        };
                        return a.attributes = ha({}, u, a.attributes), a.styles = ha({}, m, a.styles), a.arrowStyles = ha({}, a.offsets.arrow, a.arrowStyles), a
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function(a) {
                        return M(a.instance.popper, a.styles), N(a.instance.popper, a.attributes), a.arrowElement && Object.keys(a.arrowStyles).length && M(a.arrowElement, a.arrowStyles), a
                    },
                    onLoad: function(a, b, c, d, e) {
                        var f = v(e, b, a),
                            g = u(c.placement, f, b, a, c.modifiers.flip.boundariesElement, c.modifiers.flip.padding);
                        return b.setAttribute("x-placement", g), M(b, {
                            position: "absolute"
                        }), c
                    },
                    gpuAcceleration: void 0
                }
            }
        }, la
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
! function(a) {
    var b = jQuery.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(),
function() {
    function a(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" != typeof b && "function" != typeof b ? a : b
    }

    function b(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
        a.prototype = Object.create(b && b.prototype, {
            constructor: {
                value: a,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
    }

    function c(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }
    var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
            return typeof a
        } : function(a) {
            return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        },
        e = function() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                }
            }
            return function(b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b
            }
        }(),
        f = function(a) {
            function b(a) {
                return {}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }

            function c(a) {
                return (a[0] || a).nodeType
            }

            function d(b) {
                var c = this,
                    d = !1;
                return a(this).one(g.TRANSITION_END, function() {
                    d = !0
                }), setTimeout(function() {
                    d || g.triggerTransitionEnd(c)
                }, b), this
            }
            var e = !1,
                f = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                },
                g = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(a) {
                        do {
                            a += ~~(1e6 * Math.random())
                        } while (document.getElementById(a));
                        return a
                    },
                    getSelectorFromElement: function(b) {
                        var c = b.getAttribute("data-target");
                        c && "#" !== c || (c = b.getAttribute("href") || "");
                        try {
                            return a(c).length > 0 ? c : null
                        } catch (a) {
                            return null
                        }
                    },
                    reflow: function(a) {
                        return a.offsetHeight
                    },
                    triggerTransitionEnd: function(b) {
                        a(b).trigger(e.end)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(e)
                    },
                    typeCheckConfig: function(a, d, e) {
                        for (var f in e)
                            if (e.hasOwnProperty(f)) {
                                var g = e[f],
                                    h = d[f],
                                    i = h && c(h) ? "element" : b(h);
                                if (!new RegExp(g).test(i)) throw new Error(a.toUpperCase() + ': Option "' + f + '" provided type "' + i + '" but expected type "' + g + '".')
                            }
                    }
                };
            return e = function() {
                if (window.QUnit) return !1;
                var a = document.createElement("bootstrap");
                for (var b in f)
                    if (void 0 !== a.style[b]) return {
                        end: f[b]
                    };
                return !1
            }(), a.fn.emulateTransitionEnd = d, g.supportsTransitionEnd() && (a.event.special[g.TRANSITION_END] = function() {
                return {
                    bindType: e.end,
                    delegateType: e.end,
                    handle: function(b) {
                        if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
                    }
                }
            }()), g
        }(jQuery),
        g = (function(a) {
            var b = "alert",
                d = a.fn[b],
                g = {
                    DISMISS: '[data-dismiss="alert"]'
                },
                h = {
                    CLOSE: "close.bs.alert",
                    CLOSED: "closed.bs.alert",
                    CLICK_DATA_API: "click.bs.alert.data-api"
                },
                i = {
                    ALERT: "alert",
                    FADE: "fade",
                    SHOW: "show"
                },
                j = function() {
                    function b(a) {
                        c(this, b), this._element = a
                    }
                    return b.prototype.close = function(a) {
                        a = a || this._element;
                        var b = this._getRootElement(a);
                        this._triggerCloseEvent(b).isDefaultPrevented() || this._removeElement(b)
                    }, b.prototype.dispose = function() {
                        a.removeData(this._element, "bs.alert"), this._element = null
                    }, b.prototype._getRootElement = function(b) {
                        var c = f.getSelectorFromElement(b),
                            d = !1;
                        return c && (d = a(c)[0]), d || (d = a(b).closest("." + i.ALERT)[0]), d
                    }, b.prototype._triggerCloseEvent = function(b) {
                        var c = a.Event(h.CLOSE);
                        return a(b).trigger(c), c
                    }, b.prototype._removeElement = function(b) {
                        var c = this;
                        a(b).removeClass(i.SHOW), f.supportsTransitionEnd() && a(b).hasClass(i.FADE) ? a(b).one(f.TRANSITION_END, function(a) {
                            return c._destroyElement(b, a)
                        }).emulateTransitionEnd(150) : this._destroyElement(b)
                    }, b.prototype._destroyElement = function(b) {
                        a(b).detach().trigger(h.CLOSED).remove()
                    }, b._jQueryInterface = function(c) {
                        return this.each(function() {
                            var d = a(this),
                                e = d.data("bs.alert");
                            e || (e = new b(this), d.data("bs.alert", e)), "close" === c && e[c](this)
                        })
                    }, b._handleDismiss = function(a) {
                        return function(b) {
                            b && b.preventDefault(), a.close(this)
                        }
                    }, e(b, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }]), b
                }();
            a(document).on(h.CLICK_DATA_API, g.DISMISS, j._handleDismiss(new j)), a.fn[b] = j._jQueryInterface, a.fn[b].Constructor = j, a.fn[b].noConflict = function() {
                return a.fn[b] = d, j._jQueryInterface
            }
        }(jQuery), function(a) {
            var b = "button",
                d = a.fn[b],
                f = {
                    ACTIVE: "active",
                    BUTTON: "btn",
                    FOCUS: "focus"
                },
                g = {
                    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
                    DATA_TOGGLE: '[data-toggle="buttons"]',
                    INPUT: "input",
                    ACTIVE: ".active",
                    BUTTON: ".btn"
                },
                h = {
                    CLICK_DATA_API: "click.bs.button.data-api",
                    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
                },
                i = function() {
                    function b(a) {
                        c(this, b), this._element = a
                    }
                    return b.prototype.toggle = function() {
                        var b = !0,
                            c = !0,
                            d = a(this._element).closest(g.DATA_TOGGLE)[0];
                        if (d) {
                            var e = a(this._element).find(g.INPUT)[0];
                            if (e) {
                                if ("radio" === e.type)
                                    if (e.checked && a(this._element).hasClass(f.ACTIVE)) b = !1;
                                    else {
                                        var h = a(d).find(g.ACTIVE)[0];
                                        h && a(h).removeClass(f.ACTIVE)
                                    }
                                if (b) {
                                    if (e.hasAttribute("disabled") || d.hasAttribute("disabled") || e.classList.contains("disabled") || d.classList.contains("disabled")) return;
                                    e.checked = !a(this._element).hasClass(f.ACTIVE), a(e).trigger("change")
                                }
                                e.focus(), c = !1
                            }
                        }
                        c && this._element.setAttribute("aria-pressed", !a(this._element).hasClass(f.ACTIVE)), b && a(this._element).toggleClass(f.ACTIVE)
                    }, b.prototype.dispose = function() {
                        a.removeData(this._element, "bs.button"), this._element = null
                    }, b._jQueryInterface = function(c) {
                        return this.each(function() {
                            var d = a(this).data("bs.button");
                            d || (d = new b(this), a(this).data("bs.button", d)), "toggle" === c && d[c]()
                        })
                    }, e(b, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }]), b
                }();
            a(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE_CARROT, function(b) {
                b.preventDefault();
                var c = b.target;
                a(c).hasClass(f.BUTTON) || (c = a(c).closest(g.BUTTON)), i._jQueryInterface.call(a(c), "toggle")
            }).on(h.FOCUS_BLUR_DATA_API, g.DATA_TOGGLE_CARROT, function(b) {
                var c = a(b.target).closest(g.BUTTON)[0];
                a(c).toggleClass(f.FOCUS, /^focus(in)?$/.test(b.type))
            }), a.fn[b] = i._jQueryInterface, a.fn[b].Constructor = i, a.fn[b].noConflict = function() {
                return a.fn[b] = d, i._jQueryInterface
            }
        }(jQuery), function(a) {
            var b = "carousel",
                g = "bs.carousel",
                h = "." + g,
                i = a.fn[b],
                j = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                k = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                l = {
                    NEXT: "next",
                    PREV: "prev",
                    LEFT: "left",
                    RIGHT: "right"
                },
                m = {
                    SLIDE: "slide" + h,
                    SLID: "slid" + h,
                    KEYDOWN: "keydown" + h,
                    MOUSEENTER: "mouseenter" + h,
                    MOUSELEAVE: "mouseleave" + h,
                    TOUCHEND: "touchend" + h,
                    LOAD_DATA_API: "load.bs.carousel.data-api",
                    CLICK_DATA_API: "click.bs.carousel.data-api"
                },
                n = {
                    CAROUSEL: "carousel",
                    ACTIVE: "active",
                    SLIDE: "slide",
                    RIGHT: "carousel-item-right",
                    LEFT: "carousel-item-left",
                    NEXT: "carousel-item-next",
                    PREV: "carousel-item-prev",
                    ITEM: "carousel-item"
                },
                o = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                p = function() {
                    function i(b, d) {
                        c(this, i), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(d), this._element = a(b)[0], this._indicatorsElement = a(this._element).find(o.INDICATORS)[0], this._addEventListeners()
                    }
                    return i.prototype.next = function() {
                        this._isSliding || this._slide(l.NEXT)
                    }, i.prototype.nextWhenVisible = function() {
                        document.hidden || this.next()
                    }, i.prototype.prev = function() {
                        this._isSliding || this._slide(l.PREV)
                    }, i.prototype.pause = function(b) {
                        b || (this._isPaused = !0), a(this._element).find(o.NEXT_PREV)[0] && f.supportsTransitionEnd() && (f.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, i.prototype.cycle = function(a) {
                        a || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, i.prototype.to = function(b) {
                        var c = this;
                        this._activeElement = a(this._element).find(o.ACTIVE_ITEM)[0];
                        var d = this._getItemIndex(this._activeElement);
                        if (!(b > this._items.length - 1 || b < 0))
                            if (this._isSliding) a(this._element).one(m.SLID, function() {
                                return c.to(b)
                            });
                            else {
                                if (d === b) return this.pause(), void this.cycle();
                                var e = b > d ? l.NEXT : l.PREV;
                                this._slide(e, this._items[b])
                            }
                    }, i.prototype.dispose = function() {
                        a(this._element).off(h), a.removeData(this._element, g), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, i.prototype._getConfig = function(c) {
                        return c = a.extend({}, j, c), f.typeCheckConfig(b, c, k), c
                    }, i.prototype._addEventListeners = function() {
                        var b = this;
                        this._config.keyboard && a(this._element).on(m.KEYDOWN, function(a) {
                            return b._keydown(a)
                        }), "hover" === this._config.pause && (a(this._element).on(m.MOUSEENTER, function(a) {
                                return b.pause(a)
                            }).on(m.MOUSELEAVE, function(a) {
                                return b.cycle(a)
                            }),
                            "ontouchstart" in document.documentElement && a(this._element).on(m.TOUCHEND, function() {
                                b.pause(), b.touchTimeout && clearTimeout(b.touchTimeout), b.touchTimeout = setTimeout(function(a) {
                                    return b.cycle(a)
                                }, 500 + b._config.interval)
                            }))
                    }, i.prototype._keydown = function(a) {
                        if (!/input|textarea/i.test(a.target.tagName)) switch (a.which) {
                            case 37:
                                a.preventDefault(), this.prev();
                                break;
                            case 39:
                                a.preventDefault(), this.next();
                                break;
                            default:
                                return
                        }
                    }, i.prototype._getItemIndex = function(b) {
                        return this._items = a.makeArray(a(b).parent().find(o.ITEM)), this._items.indexOf(b)
                    }, i.prototype._getItemByDirection = function(a, b) {
                        var c = a === l.NEXT,
                            d = a === l.PREV,
                            e = this._getItemIndex(b),
                            f = this._items.length - 1;
                        if ((d && 0 === e || c && e === f) && !this._config.wrap) return b;
                        var g = (e + (a === l.PREV ? -1 : 1)) % this._items.length;
                        return -1 === g ? this._items[this._items.length - 1] : this._items[g]
                    }, i.prototype._triggerSlideEvent = function(b, c) {
                        var d = this._getItemIndex(b),
                            e = this._getItemIndex(a(this._element).find(o.ACTIVE_ITEM)[0]),
                            f = a.Event(m.SLIDE, {
                                relatedTarget: b,
                                direction: c,
                                from: e,
                                to: d
                            });
                        return a(this._element).trigger(f), f
                    }, i.prototype._setActiveIndicatorElement = function(b) {
                        if (this._indicatorsElement) {
                            a(this._indicatorsElement).find(o.ACTIVE).removeClass(n.ACTIVE);
                            var c = this._indicatorsElement.children[this._getItemIndex(b)];
                            c && a(c).addClass(n.ACTIVE)
                        }
                    }, i.prototype._slide = function(b, c) {
                        var d = this,
                            e = a(this._element).find(o.ACTIVE_ITEM)[0],
                            g = this._getItemIndex(e),
                            h = c || e && this._getItemByDirection(b, e),
                            i = this._getItemIndex(h),
                            j = Boolean(this._interval),
                            k = void 0,
                            p = void 0,
                            q = void 0;
                        if (b === l.NEXT ? (k = n.LEFT, p = n.NEXT, q = l.LEFT) : (k = n.RIGHT, p = n.PREV, q = l.RIGHT), h && a(h).hasClass(n.ACTIVE)) this._isSliding = !1;
                        else if (!this._triggerSlideEvent(h, q).isDefaultPrevented() && e && h) {
                            this._isSliding = !0, j && this.pause(), this._setActiveIndicatorElement(h);
                            var r = a.Event(m.SLID, {
                                relatedTarget: h,
                                direction: q,
                                from: g,
                                to: i
                            });
                            f.supportsTransitionEnd() && a(this._element).hasClass(n.SLIDE) ? (a(h).addClass(p), f.reflow(h), a(e).addClass(k), a(h).addClass(k), a(e).one(f.TRANSITION_END, function() {
                                a(h).removeClass(k + " " + p).addClass(n.ACTIVE), a(e).removeClass(n.ACTIVE + " " + p + " " + k), d._isSliding = !1, setTimeout(function() {
                                    return a(d._element).trigger(r)
                                }, 0)
                            }).emulateTransitionEnd(600)) : (a(e).removeClass(n.ACTIVE), a(h).addClass(n.ACTIVE), this._isSliding = !1, a(this._element).trigger(r)), j && this.cycle()
                        }
                    }, i._jQueryInterface = function(b) {
                        return this.each(function() {
                            var c = a(this).data(g),
                                e = a.extend({}, j, a(this).data());
                            "object" === (void 0 === b ? "undefined" : d(b)) && a.extend(e, b);
                            var f = "string" == typeof b ? b : e.slide;
                            if (c || (c = new i(this, e), a(this).data(g, c)), "number" == typeof b) c.to(b);
                            else if ("string" == typeof f) {
                                if (void 0 === c[f]) throw new Error('No method named "' + f + '"');
                                c[f]()
                            } else e.interval && (c.pause(), c.cycle())
                        })
                    }, i._dataApiClickHandler = function(b) {
                        var c = f.getSelectorFromElement(this);
                        if (c) {
                            var d = a(c)[0];
                            if (d && a(d).hasClass(n.CAROUSEL)) {
                                var e = a.extend({}, a(d).data(), a(this).data()),
                                    h = this.getAttribute("data-slide-to");
                                h && (e.interval = !1), i._jQueryInterface.call(a(d), e), h && a(d).data(g).to(h), b.preventDefault()
                            }
                        }
                    }, e(i, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return j
                        }
                    }]), i
                }();
            a(document).on(m.CLICK_DATA_API, o.DATA_SLIDE, p._dataApiClickHandler), a(window).on(m.LOAD_DATA_API, function() {
                a(o.DATA_RIDE).each(function() {
                    var b = a(this);
                    p._jQueryInterface.call(b, b.data())
                })
            }), a.fn[b] = p._jQueryInterface, a.fn[b].Constructor = p, a.fn[b].noConflict = function() {
                return a.fn[b] = i, p._jQueryInterface
            }
        }(jQuery), function(a) {
            var b = "collapse",
                g = "bs.collapse",
                h = a.fn[b],
                i = {
                    toggle: !0,
                    parent: ""
                },
                j = {
                    toggle: "boolean",
                    parent: "string"
                },
                k = {
                    SHOW: "show.bs.collapse",
                    SHOWN: "shown.bs.collapse",
                    HIDE: "hide.bs.collapse",
                    HIDDEN: "hidden.bs.collapse",
                    CLICK_DATA_API: "click.bs.collapse.data-api"
                },
                l = {
                    SHOW: "show",
                    COLLAPSE: "collapse",
                    COLLAPSING: "collapsing",
                    COLLAPSED: "collapsed"
                },
                m = {
                    WIDTH: "width",
                    HEIGHT: "height"
                },
                n = {
                    ACTIVES: ".show, .collapsing",
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                o = function() {
                    function h(b, d) {
                        c(this, h), this._isTransitioning = !1, this._element = b, this._config = this._getConfig(d), this._triggerArray = a.makeArray(a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'));
                        for (var e = a(n.DATA_TOGGLE), g = 0; g < e.length; g++) {
                            var i = e[g],
                                j = f.getSelectorFromElement(i);
                            null !== j && a(j).filter(b).length > 0 && this._triggerArray.push(i)
                        }
                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    return h.prototype.toggle = function() {
                        a(this._element).hasClass(l.SHOW) ? this.hide() : this.show()
                    }, h.prototype.show = function() {
                        var b = this;
                        if (!this._isTransitioning && !a(this._element).hasClass(l.SHOW)) {
                            var c = void 0,
                                d = void 0;
                            if (this._parent && ((c = a.makeArray(a(this._parent).children().children(n.ACTIVES))).length || (c = null)), !(c && (d = a(c).data(g)) && d._isTransitioning)) {
                                var e = a.Event(k.SHOW);
                                if (a(this._element).trigger(e), !e.isDefaultPrevented()) {
                                    c && (h._jQueryInterface.call(a(c), "hide"), d || a(c).data(g, null));
                                    var i = this._getDimension();
                                    a(this._element).removeClass(l.COLLAPSE).addClass(l.COLLAPSING), this._element.style[i] = 0, this._triggerArray.length && a(this._triggerArray).removeClass(l.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                    var j = function() {
                                        a(b._element).removeClass(l.COLLAPSING).addClass(l.COLLAPSE).addClass(l.SHOW), b._element.style[i] = "", b.setTransitioning(!1), a(b._element).trigger(k.SHOWN)
                                    };
                                    if (f.supportsTransitionEnd()) {
                                        var m = "scroll" + (i[0].toUpperCase() + i.slice(1));
                                        a(this._element).one(f.TRANSITION_END, j).emulateTransitionEnd(600), this._element.style[i] = this._element[m] + "px"
                                    } else j()
                                }
                            }
                        }
                    }, h.prototype.hide = function() {
                        var b = this;
                        if (!this._isTransitioning && a(this._element).hasClass(l.SHOW)) {
                            var c = a.Event(k.HIDE);
                            if (a(this._element).trigger(c), !c.isDefaultPrevented()) {
                                var d = this._getDimension();
                                if (this._element.style[d] = this._element.getBoundingClientRect()[d] + "px", f.reflow(this._element), a(this._element).addClass(l.COLLAPSING).removeClass(l.COLLAPSE).removeClass(l.SHOW), this._triggerArray.length)
                                    for (var e = 0; e < this._triggerArray.length; e++) {
                                        var g = this._triggerArray[e],
                                            h = f.getSelectorFromElement(g);
                                        null !== h && (a(h).hasClass(l.SHOW) || a(g).addClass(l.COLLAPSED).attr("aria-expanded", !1))
                                    }
                                this.setTransitioning(!0);
                                var i = function() {
                                    b.setTransitioning(!1), a(b._element).removeClass(l.COLLAPSING).addClass(l.COLLAPSE).trigger(k.HIDDEN)
                                };
                                this._element.style[d] = "", f.supportsTransitionEnd() ? a(this._element).one(f.TRANSITION_END, i).emulateTransitionEnd(600) : i()
                            }
                        }
                    }, h.prototype.setTransitioning = function(a) {
                        this._isTransitioning = a
                    }, h.prototype.dispose = function() {
                        a.removeData(this._element, g), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, h.prototype._getConfig = function(c) {
                        return c = a.extend({}, i, c), c.toggle = Boolean(c.toggle), f.typeCheckConfig(b, c, j), c
                    }, h.prototype._getDimension = function() {
                        return a(this._element).hasClass(m.WIDTH) ? m.WIDTH : m.HEIGHT
                    }, h.prototype._getParent = function() {
                        var b = this,
                            c = a(this._config.parent)[0],
                            d = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return a(c).find(d).each(function(a, c) {
                            b._addAriaAndCollapsedClass(h._getTargetFromElement(c), [c])
                        }), c
                    }, h.prototype._addAriaAndCollapsedClass = function(b, c) {
                        if (b) {
                            var d = a(b).hasClass(l.SHOW);
                            c.length && a(c).toggleClass(l.COLLAPSED, !d).attr("aria-expanded", d)
                        }
                    }, h._getTargetFromElement = function(b) {
                        var c = f.getSelectorFromElement(b);
                        return c ? a(c)[0] : null
                    }, h._jQueryInterface = function(b) {
                        return this.each(function() {
                            var c = a(this),
                                e = c.data(g),
                                f = a.extend({}, i, c.data(), "object" === (void 0 === b ? "undefined" : d(b)) && b);
                            if (!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || (e = new h(this, f), c.data(g, e)), "string" == typeof b) {
                                if (void 0 === e[b]) throw new Error('No method named "' + b + '"');
                                e[b]()
                            }
                        })
                    }, e(h, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return i
                        }
                    }]), h
                }();
            a(document).on(k.CLICK_DATA_API, n.DATA_TOGGLE, function(b) {
                /input|textarea/i.test(b.target.tagName) || b.preventDefault();
                var c = a(this),
                    d = f.getSelectorFromElement(this);
                a(d).each(function() {
                    var b = a(this),
                        d = b.data(g) ? "toggle" : c.data();
                    o._jQueryInterface.call(b, d)
                })
            }), a.fn[b] = o._jQueryInterface, a.fn[b].Constructor = o, a.fn[b].noConflict = function() {
                return a.fn[b] = h, o._jQueryInterface
            }
        }(jQuery), function(a) {
            if ("undefined" == typeof Popper) throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");
            var b = "dropdown",
                g = "bs.dropdown",
                h = "." + g,
                i = a.fn[b],
                j = new RegExp("38|40|27"),
                k = {
                    HIDE: "hide" + h,
                    HIDDEN: "hidden" + h,
                    SHOW: "show" + h,
                    SHOWN: "shown" + h,
                    CLICK: "click" + h,
                    CLICK_DATA_API: "click.bs.dropdown.data-api",
                    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
                    KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
                },
                l = {
                    DISABLED: "disabled",
                    SHOW: "show",
                    DROPUP: "dropup",
                    MENURIGHT: "dropdown-menu-right",
                    MENULEFT: "dropdown-menu-left"
                },
                m = {
                    DATA_TOGGLE: '[data-toggle="dropdown"]',
                    FORM_CHILD: ".dropdown form",
                    MENU: ".dropdown-menu",
                    NAVBAR_NAV: ".navbar-nav",
                    VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)"
                },
                n = {
                    TOP: "top-start",
                    TOPEND: "top-end",
                    BOTTOM: "bottom-start",
                    BOTTOMEND: "bottom-end"
                },
                o = {
                    placement: n.BOTTOM,
                    offset: 0,
                    flip: !0
                },
                p = {
                    placement: "string",
                    offset: "(number|string)",
                    flip: "boolean"
                },
                q = function() {
                    function i(a, b) {
                        c(this, i), this._element = a, this._popper = null, this._config = this._getConfig(b), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    return i.prototype.toggle = function() {
                        if (!this._element.disabled && !a(this._element).hasClass(l.DISABLED)) {
                            var b = i._getParentFromElement(this._element),
                                c = a(this._menu).hasClass(l.SHOW);
                            if (i._clearMenus(), !c) {
                                var d = {
                                        relatedTarget: this._element
                                    },
                                    e = a.Event(k.SHOW, d);
                                if (a(b).trigger(e), !e.isDefaultPrevented()) {
                                    var f = this._element;
                                    a(b).hasClass(l.DROPUP) && (a(this._menu).hasClass(l.MENULEFT) || a(this._menu).hasClass(l.MENURIGHT)) && (f = b), this._popper = new Popper(f, this._menu, this._getPopperConfig()), "ontouchstart" in document.documentElement && !a(b).closest(m.NAVBAR_NAV).length && a("body").children().on("mouseover", null, a.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), a(this._menu).toggleClass(l.SHOW), a(b).toggleClass(l.SHOW).trigger(a.Event(k.SHOWN, d))
                                }
                            }
                        }
                    }, i.prototype.dispose = function() {
                        a.removeData(this._element, g), a(this._element).off(h), this._element = null, this._menu = null, null !== this._popper && this._popper.destroy(), this._popper = null
                    }, i.prototype.update = function() {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, i.prototype._addEventListeners = function() {
                        var b = this;
                        a(this._element).on(k.CLICK, function(a) {
                            a.preventDefault(), a.stopPropagation(), b.toggle()
                        })
                    }, i.prototype._getConfig = function(c) {
                        var d = a(this._element).data();
                        return void 0 !== d.placement && (d.placement = n[d.placement.toUpperCase()]), c = a.extend({}, this.constructor.Default, a(this._element).data(), c), f.typeCheckConfig(b, c, this.constructor.DefaultType), c
                    }, i.prototype._getMenuElement = function() {
                        if (!this._menu) {
                            var b = i._getParentFromElement(this._element);
                            this._menu = a(b).find(m.MENU)[0]
                        }
                        return this._menu
                    }, i.prototype._getPlacement = function() {
                        var b = a(this._element).parent(),
                            c = this._config.placement;
                        return b.hasClass(l.DROPUP) || this._config.placement === n.TOP ? (c = n.TOP, a(this._menu).hasClass(l.MENURIGHT) && (c = n.TOPEND)) : a(this._menu).hasClass(l.MENURIGHT) && (c = n.BOTTOMEND), c
                    }, i.prototype._detectNavbar = function() {
                        return a(this._element).closest(".navbar").length > 0
                    }, i.prototype._getPopperConfig = function() {
                        var a = {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: {
                                    offset: this._config.offset
                                },
                                flip: {
                                    enabled: this._config.flip
                                }
                            }
                        };
                        return this._inNavbar && (a.modifiers.applyStyle = {
                            enabled: !this._inNavbar
                        }), a
                    }, i._jQueryInterface = function(b) {
                        return this.each(function() {
                            var c = a(this).data(g),
                                e = "object" === (void 0 === b ? "undefined" : d(b)) ? b : null;
                            if (c || (c = new i(this, e), a(this).data(g, c)), "string" == typeof b) {
                                if (void 0 === c[b]) throw new Error('No method named "' + b + '"');
                                c[b]()
                            }
                        })
                    }, i._clearMenus = function(b) {
                        if (!b || 3 !== b.which && ("keyup" !== b.type || 9 === b.which))
                            for (var c = a.makeArray(a(m.DATA_TOGGLE)), d = 0; d < c.length; d++) {
                                var e = i._getParentFromElement(c[d]),
                                    f = a(c[d]).data(g),
                                    h = {
                                        relatedTarget: c[d]
                                    };
                                if (f) {
                                    var j = f._menu;
                                    if (a(e).hasClass(l.SHOW) && !(b && ("click" === b.type && /input|textarea/i.test(b.target.tagName) || "keyup" === b.type && 9 === b.which) && a.contains(e, b.target))) {
                                        var n = a.Event(k.HIDE, h);
                                        a(e).trigger(n), n.isDefaultPrevented() || ("ontouchstart" in document.documentElement && a("body").children().off("mouseover", null, a.noop), c[d].setAttribute("aria-expanded", "false"), a(j).removeClass(l.SHOW), a(e).removeClass(l.SHOW).trigger(a.Event(k.HIDDEN, h)))
                                    }
                                }
                            }
                    }, i._getParentFromElement = function(b) {
                        var c = void 0,
                            d = f.getSelectorFromElement(b);
                        return d && (c = a(d)[0]), c || b.parentNode
                    }, i._dataApiKeydownHandler = function(b) {
                        if (!(!j.test(b.which) || /button/i.test(b.target.tagName) && 32 === b.which || /input|textarea/i.test(b.target.tagName) || (b.preventDefault(), b.stopPropagation(), this.disabled || a(this).hasClass(l.DISABLED)))) {
                            var c = i._getParentFromElement(this),
                                d = a(c).hasClass(l.SHOW);
                            if ((d || 27 === b.which && 32 === b.which) && (!d || 27 !== b.which && 32 !== b.which)) {
                                var e = a(c).find(m.VISIBLE_ITEMS).get();
                                if (e.length) {
                                    var f = e.indexOf(b.target);
                                    38 === b.which && f > 0 && f--, 40 === b.which && f < e.length - 1 && f++, f < 0 && (f = 0), e[f].focus()
                                }
                            } else {
                                if (27 === b.which) {
                                    var g = a(c).find(m.DATA_TOGGLE)[0];
                                    a(g).trigger("focus")
                                }
                                a(this).trigger("click")
                            }
                        }
                    }, e(i, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return o
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return p
                        }
                    }]), i
                }();
            a(document).on(k.KEYDOWN_DATA_API, m.DATA_TOGGLE, q._dataApiKeydownHandler).on(k.KEYDOWN_DATA_API, m.MENU, q._dataApiKeydownHandler).on(k.CLICK_DATA_API + " " + k.KEYUP_DATA_API, q._clearMenus).on(k.CLICK_DATA_API, m.DATA_TOGGLE, function(b) {
                b.preventDefault(), b.stopPropagation(), q._jQueryInterface.call(a(this), "toggle")
            }).on(k.CLICK_DATA_API, m.FORM_CHILD, function(a) {
                a.stopPropagation()
            }), a.fn[b] = q._jQueryInterface, a.fn[b].Constructor = q, a.fn[b].noConflict = function() {
                return a.fn[b] = i, q._jQueryInterface
            }
        }(jQuery), function(a) {
            var b = "modal",
                g = a.fn[b],
                h = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                i = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                j = {
                    HIDE: "hide.bs.modal",
                    HIDDEN: "hidden.bs.modal",
                    SHOW: "show.bs.modal",
                    SHOWN: "shown.bs.modal",
                    FOCUSIN: "focusin.bs.modal",
                    RESIZE: "resize.bs.modal",
                    CLICK_DISMISS: "click.dismiss.bs.modal",
                    KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                    MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                    MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                    CLICK_DATA_API: "click.bs.modal.data-api"
                },
                k = {
                    SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                    BACKDROP: "modal-backdrop",
                    OPEN: "modal-open",
                    FADE: "fade",
                    SHOW: "show"
                },
                l = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    NAVBAR_TOGGLER: ".navbar-toggler"
                },
                m = function() {
                    function g(b, d) {
                        c(this, g), this._config = this._getConfig(d), this._element = b, this._dialog = a(b).find(l.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    return g.prototype.toggle = function(a) {
                        return this._isShown ? this.hide() : this.show(a)
                    }, g.prototype.show = function(b) {
                        var c = this;
                        if (!this._isTransitioning) {
                            f.supportsTransitionEnd() && a(this._element).hasClass(k.FADE) && (this._isTransitioning = !0);
                            var d = a.Event(j.SHOW, {
                                relatedTarget: b
                            });
                            a(this._element).trigger(d), this._isShown || d.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), a(document.body).addClass(k.OPEN), this._setEscapeEvent(), this._setResizeEvent(), a(this._element).on(j.CLICK_DISMISS, l.DATA_DISMISS, function(a) {
                                return c.hide(a)
                            }), a(this._dialog).on(j.MOUSEDOWN_DISMISS, function() {
                                a(c._element).one(j.MOUSEUP_DISMISS, function(b) {
                                    a(b.target).is(c._element) && (c._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(function() {
                                return c._showElement(b)
                            }))
                        }
                    }, g.prototype.hide = function(b) {
                        var c = this;
                        if (b && b.preventDefault(), !this._isTransitioning && this._isShown) {
                            var d = f.supportsTransitionEnd() && a(this._element).hasClass(k.FADE);
                            d && (this._isTransitioning = !0);
                            var e = a.Event(j.HIDE);
                            a(this._element).trigger(e), this._isShown && !e.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), a(document).off(j.FOCUSIN), a(this._element).removeClass(k.SHOW), a(this._element).off(j.CLICK_DISMISS), a(this._dialog).off(j.MOUSEDOWN_DISMISS), d ? a(this._element).one(f.TRANSITION_END, function(a) {
                                return c._hideModal(a)
                            }).emulateTransitionEnd(300) : this._hideModal())
                        }
                    }, g.prototype.dispose = function() {
                        a.removeData(this._element, "bs.modal"), a(window, document, this._element, this._backdrop).off(".bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                    }, g.prototype.handleUpdate = function() {
                        this._adjustDialog()
                    }, g.prototype._getConfig = function(c) {
                        return c = a.extend({}, h, c), f.typeCheckConfig(b, c, i), c
                    }, g.prototype._showElement = function(b) {
                        var c = this,
                            d = f.supportsTransitionEnd() && a(this._element).hasClass(k.FADE);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, d && f.reflow(this._element), a(this._element).addClass(k.SHOW), this._config.focus && this._enforceFocus();
                        var e = a.Event(j.SHOWN, {
                                relatedTarget: b
                            }),
                            g = function() {
                                c._config.focus && c._element.focus(), c._isTransitioning = !1, a(c._element).trigger(e)
                            };
                        d ? a(this._dialog).one(f.TRANSITION_END, g).emulateTransitionEnd(300) : g()
                    }, g.prototype._enforceFocus = function() {
                        var b = this;
                        a(document).off(j.FOCUSIN).on(j.FOCUSIN, function(c) {
                            document === c.target || b._element === c.target || a(b._element).has(c.target).length || b._element.focus()
                        })
                    }, g.prototype._setEscapeEvent = function() {
                        var b = this;
                        this._isShown && this._config.keyboard ? a(this._element).on(j.KEYDOWN_DISMISS, function(a) {
                            27 === a.which && (a.preventDefault(), b.hide())
                        }) : this._isShown || a(this._element).off(j.KEYDOWN_DISMISS)
                    }, g.prototype._setResizeEvent = function() {
                        var b = this;
                        this._isShown ? a(window).on(j.RESIZE, function(a) {
                            return b.handleUpdate(a)
                        }) : a(window).off(j.RESIZE)
                    }, g.prototype._hideModal = function() {
                        var b = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                            a(document.body).removeClass(k.OPEN), b._resetAdjustments(), b._resetScrollbar(), a(b._element).trigger(j.HIDDEN)
                        })
                    }, g.prototype._removeBackdrop = function() {
                        this._backdrop && (a(this._backdrop).remove(), this._backdrop = null)
                    }, g.prototype._showBackdrop = function(b) {
                        var c = this,
                            d = a(this._element).hasClass(k.FADE) ? k.FADE : "";
                        if (this._isShown && this._config.backdrop) {
                            var e = f.supportsTransitionEnd() && d;
                            if (this._backdrop = document.createElement("div"), this._backdrop.className = k.BACKDROP, d && a(this._backdrop).addClass(d), a(this._backdrop).appendTo(document.body), a(this._element).on(j.CLICK_DISMISS, function(a) {
                                    c._ignoreBackdropClick ? c._ignoreBackdropClick = !1 : a.target === a.currentTarget && ("static" === c._config.backdrop ? c._element.focus() : c.hide())
                                }), e && f.reflow(this._backdrop), a(this._backdrop).addClass(k.SHOW), !b) return;
                            if (!e) return void b();
                            a(this._backdrop).one(f.TRANSITION_END, b).emulateTransitionEnd(150)
                        } else if (!this._isShown && this._backdrop) {
                            a(this._backdrop).removeClass(k.SHOW);
                            var g = function() {
                                c._removeBackdrop(), b && b()
                            };
                            f.supportsTransitionEnd() && a(this._element).hasClass(k.FADE) ? a(this._backdrop).one(f.TRANSITION_END, g).emulateTransitionEnd(150) : g()
                        } else b && b()
                    }, g.prototype._adjustDialog = function() {
                        var a = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && a && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !a && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, g.prototype._resetAdjustments = function() {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, g.prototype._checkScrollbar = function() {
                        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, g.prototype._setScrollbar = function() {
                        var b = this;
                        if (this._isBodyOverflowing) {
                            a(l.FIXED_CONTENT).each(function(c, d) {
                                var e = a(d)[0].style.paddingRight,
                                    f = a(d).css("padding-right");
                                a(d).data("padding-right", e).css("padding-right", parseFloat(f) + b._scrollbarWidth + "px")
                            }), a(l.NAVBAR_TOGGLER).each(function(c, d) {
                                var e = a(d)[0].style.marginRight,
                                    f = a(d).css("margin-right");
                                a(d).data("margin-right", e).css("margin-right", parseFloat(f) + b._scrollbarWidth + "px")
                            });
                            var c = document.body.style.paddingRight,
                                d = a("body").css("padding-right");
                            a("body").data("padding-right", c).css("padding-right", parseFloat(d) + this._scrollbarWidth + "px")
                        }
                    }, g.prototype._resetScrollbar = function() {
                        a(l.FIXED_CONTENT).each(function(b, c) {
                            var d = a(c).data("padding-right");
                            void 0 !== d && a(c).css("padding-right", d).removeData("padding-right")
                        }), a(l.NAVBAR_TOGGLER).each(function(b, c) {
                            var d = a(c).data("margin-right");
                            void 0 !== d && a(c).css("margin-right", d).removeData("margin-right")
                        });
                        var b = a("body").data("padding-right");
                        void 0 !== b && a("body").css("padding-right", b).removeData("padding-right")
                    }, g.prototype._getScrollbarWidth = function() {
                        var a = document.createElement("div");
                        a.className = k.SCROLLBAR_MEASURER, document.body.appendChild(a);
                        var b = a.getBoundingClientRect().width - a.clientWidth;
                        return document.body.removeChild(a), b
                    }, g._jQueryInterface = function(b, c) {
                        return this.each(function() {
                            var e = a(this).data("bs.modal"),
                                f = a.extend({}, g.Default, a(this).data(), "object" === (void 0 === b ? "undefined" : d(b)) && b);
                            if (e || (e = new g(this, f), a(this).data("bs.modal", e)), "string" == typeof b) {
                                if (void 0 === e[b]) throw new Error('No method named "' + b + '"');
                                e[b](c)
                            } else f.show && e.show(c)
                        })
                    }, e(g, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return h
                        }
                    }]), g
                }();
            a(document).on(j.CLICK_DATA_API, l.DATA_TOGGLE, function(b) {
                var c = this,
                    d = void 0,
                    e = f.getSelectorFromElement(this);
                e && (d = a(e)[0]);
                var g = a(d).data("bs.modal") ? "toggle" : a.extend({}, a(d).data(), a(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || b.preventDefault();
                var h = a(d).one(j.SHOW, function(b) {
                    b.isDefaultPrevented() || h.one(j.HIDDEN, function() {
                        a(c).is(":visible") && c.focus()
                    })
                });
                m._jQueryInterface.call(a(d), g, this)
            }), a.fn[b] = m._jQueryInterface, a.fn[b].Constructor = m, a.fn[b].noConflict = function() {
                return a.fn[b] = g, m._jQueryInterface
            }
        }(jQuery), function(a) {
            var b = "scrollspy",
                g = a.fn[b],
                h = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                i = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                j = {
                    ACTIVATE: "activate.bs.scrollspy",
                    SCROLL: "scroll.bs.scrollspy",
                    LOAD_DATA_API: "load.bs.scrollspy.data-api"
                },
                k = {
                    DROPDOWN_ITEM: "dropdown-item",
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active"
                },
                l = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    NAV_LINKS: ".nav-link",
                    LIST_ITEMS: ".list-group-item",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                m = {
                    OFFSET: "offset",
                    POSITION: "position"
                },
                n = function() {
                    function g(b, d) {
                        var e = this;
                        c(this, g), this._element = b, this._scrollElement = "BODY" === b.tagName ? window : b, this._config = this._getConfig(d), this._selector = this._config.target + " " + l.NAV_LINKS + "," + this._config.target + " " + l.LIST_ITEMS + "," + this._config.target + " " + l.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, a(this._scrollElement).on(j.SCROLL, function(a) {
                            return e._process(a)
                        }), this.refresh(), this._process()
                    }
                    return g.prototype.refresh = function() {
                        var b = this,
                            c = this._scrollElement !== this._scrollElement.window ? m.POSITION : m.OFFSET,
                            d = "auto" === this._config.method ? c : this._config.method,
                            e = d === m.POSITION ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), a.makeArray(a(this._selector)).map(function(b) {
                            var c = void 0,
                                g = f.getSelectorFromElement(b);
                            if (g && (c = a(g)[0]), c) {
                                var h = c.getBoundingClientRect();
                                if (h.width || h.height) return [a(c)[d]().top + e, g]
                            }
                            return null
                        }).filter(function(a) {
                            return a
                        }).sort(function(a, b) {
                            return a[0] - b[0]
                        }).forEach(function(a) {
                            b._offsets.push(a[0]), b._targets.push(a[1])
                        })
                    }, g.prototype.dispose = function() {
                        a.removeData(this._element, "bs.scrollspy"), a(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, g.prototype._getConfig = function(c) {
                        if ("string" != typeof(c = a.extend({}, h, c)).target) {
                            var d = a(c.target).attr("id");
                            d || (d = f.getUID(b), a(c.target).attr("id", d)), c.target = "#" + d
                        }
                        return f.typeCheckConfig(b, c, i), c
                    }, g.prototype._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, g.prototype._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, g.prototype._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                    }, g.prototype._process = function() {
                        var a = this._getScrollTop() + this._config.offset,
                            b = this._getScrollHeight(),
                            c = this._config.offset + b - this._getOffsetHeight();
                        if (this._scrollHeight !== b && this.refresh(), a >= c) {
                            var d = this._targets[this._targets.length - 1];
                            this._activeTarget !== d && this._activate(d)
                        } else {
                            if (this._activeTarget && a < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                            for (var e = this._offsets.length; e--;) this._activeTarget !== this._targets[e] && a >= this._offsets[e] && (void 0 === this._offsets[e + 1] || a < this._offsets[e + 1]) && this._activate(this._targets[e])
                        }
                    }, g.prototype._activate = function(b) {
                        this._activeTarget = b, this._clear();
                        var c = this._selector.split(",");
                        c = c.map(function(a) {
                            return a + '[data-target="' + b + '"],' + a + '[href="' + b + '"]'
                        });
                        var d = a(c.join(","));
                        d.hasClass(k.DROPDOWN_ITEM) ? (d.closest(l.DROPDOWN).find(l.DROPDOWN_TOGGLE).addClass(k.ACTIVE), d.addClass(k.ACTIVE)) : (d.addClass(k.ACTIVE), d.parents(l.NAV_LIST_GROUP).prev(l.NAV_LINKS + ", " + l.LIST_ITEMS).addClass(k.ACTIVE)), a(this._scrollElement).trigger(j.ACTIVATE, {
                            relatedTarget: b
                        })
                    }, g.prototype._clear = function() {
                        a(this._selector).filter(l.ACTIVE).removeClass(k.ACTIVE)
                    }, g._jQueryInterface = function(b) {
                        return this.each(function() {
                            var c = a(this).data("bs.scrollspy"),
                                e = "object" === (void 0 === b ? "undefined" : d(b)) && b;
                            if (c || (c = new g(this, e), a(this).data("bs.scrollspy", c)), "string" == typeof b) {
                                if (void 0 === c[b]) throw new Error('No method named "' + b + '"');
                                c[b]()
                            }
                        })
                    }, e(g, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return h
                        }
                    }]), g
                }();
            a(window).on(j.LOAD_DATA_API, function() {
                for (var b = a.makeArray(a(l.DATA_SPY)), c = b.length; c--;) {
                    var d = a(b[c]);
                    n._jQueryInterface.call(d, d.data())
                }
            }), a.fn[b] = n._jQueryInterface, a.fn[b].Constructor = n, a.fn[b].noConflict = function() {
                return a.fn[b] = g, n._jQueryInterface
            }
        }(jQuery), function(a) {
            var b = a.fn.tab,
                d = {
                    HIDE: "hide.bs.tab",
                    HIDDEN: "hidden.bs.tab",
                    SHOW: "show.bs.tab",
                    SHOWN: "shown.bs.tab",
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                g = {
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active",
                    DISABLED: "disabled",
                    FADE: "fade",
                    SHOW: "show"
                },
                h = {
                    DROPDOWN: ".dropdown",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    ACTIVE: ".active",
                    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                    DROPDOWN_TOGGLE: ".dropdown-toggle",
                    DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
                },
                i = function() {
                    function b(a) {
                        c(this, b), this._element = a
                    }
                    return b.prototype.show = function() {
                        var b = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && a(this._element).hasClass(g.ACTIVE) || a(this._element).hasClass(g.DISABLED))) {
                            var c = void 0,
                                e = void 0,
                                i = a(this._element).closest(h.NAV_LIST_GROUP)[0],
                                j = f.getSelectorFromElement(this._element);
                            i && (e = a.makeArray(a(i).find(h.ACTIVE)), e = e[e.length - 1]);
                            var k = a.Event(d.HIDE, {
                                    relatedTarget: this._element
                                }),
                                l = a.Event(d.SHOW, {
                                    relatedTarget: e
                                });
                            if (e && a(e).trigger(k), a(this._element).trigger(l), !l.isDefaultPrevented() && !k.isDefaultPrevented()) {
                                j && (c = a(j)[0]), this._activate(this._element, i);
                                var m = function() {
                                    var c = a.Event(d.HIDDEN, {
                                            relatedTarget: b._element
                                        }),
                                        f = a.Event(d.SHOWN, {
                                            relatedTarget: e
                                        });
                                    a(e).trigger(c), a(b._element).trigger(f)
                                };
                                c ? this._activate(c, c.parentNode, m) : m()
                            }
                        }
                    }, b.prototype.dispose = function() {
                        a.removeData(this._element, "bs.tab"), this._element = null
                    }, b.prototype._activate = function(b, c, d) {
                        var e = this,
                            i = a(c).find(h.ACTIVE)[0],
                            j = d && f.supportsTransitionEnd() && i && a(i).hasClass(g.FADE),
                            k = function() {
                                return e._transitionComplete(b, i, j, d)
                            };
                        i && j ? a(i).one(f.TRANSITION_END, k).emulateTransitionEnd(150) : k(), i && a(i).removeClass(g.SHOW)
                    }, b.prototype._transitionComplete = function(b, c, d, e) {
                        if (c) {
                            a(c).removeClass(g.ACTIVE);
                            var i = a(c.parentNode).find(h.DROPDOWN_ACTIVE_CHILD)[0];
                            i && a(i).removeClass(g.ACTIVE), c.setAttribute("aria-expanded", !1)
                        }
                        if (a(b).addClass(g.ACTIVE), b.setAttribute("aria-expanded", !0), d ? (f.reflow(b), a(b).addClass(g.SHOW)) : a(b).removeClass(g.FADE), b.parentNode && a(b.parentNode).hasClass(g.DROPDOWN_MENU)) {
                            var j = a(b).closest(h.DROPDOWN)[0];
                            j && a(j).find(h.DROPDOWN_TOGGLE).addClass(g.ACTIVE), b.setAttribute("aria-expanded", !0)
                        }
                        e && e()
                    }, b._jQueryInterface = function(c) {
                        return this.each(function() {
                            var d = a(this),
                                e = d.data("bs.tab");
                            if (e || (e = new b(this), d.data("bs.tab", e)), "string" == typeof c) {
                                if (void 0 === e[c]) throw new Error('No method named "' + c + '"');
                                e[c]()
                            }
                        })
                    }, e(b, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }]), b
                }();
            a(document).on(d.CLICK_DATA_API, h.DATA_TOGGLE, function(b) {
                b.preventDefault(), i._jQueryInterface.call(a(this), "show")
            }), a.fn.tab = i._jQueryInterface, a.fn.tab.Constructor = i, a.fn.tab.noConflict = function() {
                return a.fn.tab = b, i._jQueryInterface
            }
        }(jQuery), function(a) {
            if ("undefined" == typeof Popper) throw new Error("Bootstrap tooltips require Popper.js (https://popper.js.org)");
            var b = "tooltip",
                g = ".bs.tooltip",
                h = a.fn[b],
                i = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                j = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "(number|string)",
                    container: "(string|element|boolean)",
                    fallbackPlacement: "(string|array)"
                },
                k = {
                    AUTO: "auto",
                    TOP: "top",
                    RIGHT: "right",
                    BOTTOM: "bottom",
                    LEFT: "left"
                },
                l = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: 0,
                    container: !1,
                    fallbackPlacement: "flip"
                },
                m = {
                    SHOW: "show",
                    OUT: "out"
                },
                n = {
                    HIDE: "hide" + g,
                    HIDDEN: "hidden" + g,
                    SHOW: "show" + g,
                    SHOWN: "shown" + g,
                    INSERTED: "inserted" + g,
                    CLICK: "click" + g,
                    FOCUSIN: "focusin" + g,
                    FOCUSOUT: "focusout" + g,
                    MOUSEENTER: "mouseenter" + g,
                    MOUSELEAVE: "mouseleave" + g
                },
                o = {
                    FADE: "fade",
                    SHOW: "show"
                },
                p = {
                    TOOLTIP: ".tooltip",
                    TOOLTIP_INNER: ".tooltip-inner",
                    ARROW: ".arrow"
                },
                q = {
                    HOVER: "hover",
                    FOCUS: "focus",
                    CLICK: "click",
                    MANUAL: "manual"
                },
                r = function() {
                    function h(a, b) {
                        c(this, h), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = a, this.config = this._getConfig(b), this.tip = null, this._setListeners()
                    }
                    return h.prototype.enable = function() {
                        this._isEnabled = !0
                    }, h.prototype.disable = function() {
                        this._isEnabled = !1
                    }, h.prototype.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, h.prototype.toggle = function(b) {
                        if (b) {
                            var c = this.constructor.DATA_KEY,
                                d = a(b.currentTarget).data(c);
                            d || (d = new this.constructor(b.currentTarget, this._getDelegateConfig()), a(b.currentTarget).data(c, d)), d._activeTrigger.click = !d._activeTrigger.click, d._isWithActiveTrigger() ? d._enter(null, d) : d._leave(null, d)
                        } else {
                            if (a(this.getTipElement()).hasClass(o.SHOW)) return void this._leave(null, this);
                            this._enter(null, this)
                        }
                    }, h.prototype.dispose = function() {
                        clearTimeout(this._timeout), a.removeData(this.element, this.constructor.DATA_KEY), a(this.element).off(this.constructor.EVENT_KEY), a(this.element).closest(".modal").off("hide.bs.modal"), this.tip && a(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                    }, h.prototype.show = function() {
                        var b = this;
                        if ("none" === a(this.element).css("display")) throw new Error("Please use show on visible elements");
                        var c = a.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            a(this.element).trigger(c);
                            var d = a.contains(this.element.ownerDocument.documentElement, this.element);
                            if (c.isDefaultPrevented() || !d) return;
                            var e = this.getTipElement(),
                                g = f.getUID(this.constructor.NAME);
                            e.setAttribute("id", g), this.element.setAttribute("aria-describedby", g), this.setContent(), this.config.animation && a(e).addClass(o.FADE);
                            var i = "function" == typeof this.config.placement ? this.config.placement.call(this, e, this.element) : this.config.placement,
                                j = this._getAttachment(i);
                            this.addAttachmentClass(j);
                            var k = !1 === this.config.container ? document.body : a(this.config.container);
                            a(e).data(this.constructor.DATA_KEY, this), a.contains(this.element.ownerDocument.documentElement, this.tip) || a(e).appendTo(k), a(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Popper(this.element, e, {
                                placement: j,
                                modifiers: {
                                    offset: {
                                        offset: this.config.offset
                                    },
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: p.ARROW
                                    }
                                },
                                onCreate: function(a) {
                                    a.originalPlacement !== a.placement && b._handlePopperPlacementChange(a)
                                },
                                onUpdate: function(a) {
                                    b._handlePopperPlacementChange(a)
                                }
                            }), a(e).addClass(o.SHOW), "ontouchstart" in document.documentElement && a("body").children().on("mouseover", null, a.noop);
                            var l = function() {
                                b.config.animation && b._fixTransition();
                                var c = b._hoverState;
                                b._hoverState = null, a(b.element).trigger(b.constructor.Event.SHOWN), c === m.OUT && b._leave(null, b)
                            };
                            f.supportsTransitionEnd() && a(this.tip).hasClass(o.FADE) ? a(this.tip).one(f.TRANSITION_END, l).emulateTransitionEnd(h._TRANSITION_DURATION) : l()
                        }
                    }, h.prototype.hide = function(b) {
                        var c = this,
                            d = this.getTipElement(),
                            e = a.Event(this.constructor.Event.HIDE),
                            g = function() {
                                c._hoverState !== m.SHOW && d.parentNode && d.parentNode.removeChild(d), c._cleanTipClass(), c.element.removeAttribute("aria-describedby"), a(c.element).trigger(c.constructor.Event.HIDDEN), null !== c._popper && c._popper.destroy(), b && b()
                            };
                        a(this.element).trigger(e), e.isDefaultPrevented() || (a(d).removeClass(o.SHOW), "ontouchstart" in document.documentElement && a("body").children().off("mouseover", null, a.noop), this._activeTrigger[q.CLICK] = !1, this._activeTrigger[q.FOCUS] = !1, this._activeTrigger[q.HOVER] = !1, f.supportsTransitionEnd() && a(this.tip).hasClass(o.FADE) ? a(d).one(f.TRANSITION_END, g).emulateTransitionEnd(150) : g(), this._hoverState = "")
                    }, h.prototype.update = function() {
                        null !== this._popper && this._popper.scheduleUpdate()
                    }, h.prototype.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, h.prototype.addAttachmentClass = function(b) {
                        a(this.getTipElement()).addClass("bs-tooltip-" + b)
                    }, h.prototype.getTipElement = function() {
                        return this.tip = this.tip || a(this.config.template)[0]
                    }, h.prototype.setContent = function() {
                        var b = a(this.getTipElement());
                        this.setElementContent(b.find(p.TOOLTIP_INNER), this.getTitle()), b.removeClass(o.FADE + " " + o.SHOW)
                    }, h.prototype.setElementContent = function(b, c) {
                        var e = this.config.html;
                        "object" === (void 0 === c ? "undefined" : d(c)) && (c.nodeType || c.jquery) ? e ? a(c).parent().is(b) || b.empty().append(c) : b.text(a(c).text()): b[e ? "html" : "text"](c)
                    }, h.prototype.getTitle = function() {
                        var a = this.element.getAttribute("data-original-title");
                        return a || (a = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), a
                    }, h.prototype._getAttachment = function(a) {
                        return k[a.toUpperCase()]
                    }, h.prototype._setListeners = function() {
                        var b = this;
                        this.config.trigger.split(" ").forEach(function(c) {
                            if ("click" === c) a(b.element).on(b.constructor.Event.CLICK, b.config.selector, function(a) {
                                return b.toggle(a)
                            });
                            else if (c !== q.MANUAL) {
                                var d = c === q.HOVER ? b.constructor.Event.MOUSEENTER : b.constructor.Event.FOCUSIN,
                                    e = c === q.HOVER ? b.constructor.Event.MOUSELEAVE : b.constructor.Event.FOCUSOUT;
                                a(b.element).on(d, b.config.selector, function(a) {
                                    return b._enter(a)
                                }).on(e, b.config.selector, function(a) {
                                    return b._leave(a)
                                })
                            }
                            a(b.element).closest(".modal").on("hide.bs.modal", function() {
                                return b.hide()
                            })
                        }), this.config.selector ? this.config = a.extend({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, h.prototype._fixTitle = function() {
                        var a = d(this.element.getAttribute("data-original-title"));
                        (this.element.getAttribute("title") || "string" !== a) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, h.prototype._enter = function(b, c) {
                        var d = this.constructor.DATA_KEY;
                        (c = c || a(b.currentTarget).data(d)) || (c = new this.constructor(b.currentTarget, this._getDelegateConfig()), a(b.currentTarget).data(d, c)), b && (c._activeTrigger["focusin" === b.type ? q.FOCUS : q.HOVER] = !0), a(c.getTipElement()).hasClass(o.SHOW) || c._hoverState === m.SHOW ? c._hoverState = m.SHOW : (clearTimeout(c._timeout), c._hoverState = m.SHOW, c.config.delay && c.config.delay.show ? c._timeout = setTimeout(function() {
                            c._hoverState === m.SHOW && c.show()
                        }, c.config.delay.show) : c.show())
                    }, h.prototype._leave = function(b, c) {
                        var d = this.constructor.DATA_KEY;
                        (c = c || a(b.currentTarget).data(d)) || (c = new this.constructor(b.currentTarget, this._getDelegateConfig()), a(b.currentTarget).data(d, c)), b && (c._activeTrigger["focusout" === b.type ? q.FOCUS : q.HOVER] = !1), c._isWithActiveTrigger() || (clearTimeout(c._timeout), c._hoverState = m.OUT, c.config.delay && c.config.delay.hide ? c._timeout = setTimeout(function() {
                            c._hoverState === m.OUT && c.hide()
                        }, c.config.delay.hide) : c.hide())
                    }, h.prototype._isWithActiveTrigger = function() {
                        for (var a in this._activeTrigger)
                            if (this._activeTrigger[a]) return !0;
                        return !1
                    }, h.prototype._getConfig = function(c) {
                        return (c = a.extend({}, this.constructor.Default, a(this.element).data(), c)).delay && "number" == typeof c.delay && (c.delay = {
                            show: c.delay,
                            hide: c.delay
                        }), c.title && "number" == typeof c.title && (c.title = c.title.toString()), c.content && "number" == typeof c.content && (c.content = c.content.toString()), f.typeCheckConfig(b, c, this.constructor.DefaultType), c
                    }, h.prototype._getDelegateConfig = function() {
                        var a = {};
                        if (this.config)
                            for (var b in this.config) this.constructor.Default[b] !== this.config[b] && (a[b] = this.config[b]);
                        return a
                    }, h.prototype._cleanTipClass = function() {
                        var b = a(this.getTipElement()),
                            c = b.attr("class").match(i);
                        null !== c && c.length > 0 && b.removeClass(c.join(""))
                    }, h.prototype._handlePopperPlacementChange = function(a) {
                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(a.placement))
                    }, h.prototype._fixTransition = function() {
                        var b = this.getTipElement(),
                            c = this.config.animation;
                        null === b.getAttribute("x-placement") && (a(b).removeClass(o.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = c)
                    }, h._jQueryInterface = function(b) {
                        return this.each(function() {
                            var c = a(this).data("bs.tooltip"),
                                e = "object" === (void 0 === b ? "undefined" : d(b)) && b;
                            if ((c || !/dispose|hide/.test(b)) && (c || (c = new h(this, e), a(this).data("bs.tooltip", c)), "string" == typeof b)) {
                                if (void 0 === c[b]) throw new Error('No method named "' + b + '"');
                                c[b]()
                            }
                        })
                    }, e(h, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-beta"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return b
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.tooltip"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return g
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return j
                        }
                    }]), h
                }();
            return a.fn[b] = r._jQueryInterface, a.fn[b].Constructor = r, a.fn[b].noConflict = function() {
                return a.fn[b] = h, r._jQueryInterface
            }, r
        }(jQuery));
    ! function(f) {
        var h = "popover",
            i = ".bs.popover",
            j = f.fn[h],
            k = new RegExp("(^|\\s)bs-popover\\S+", "g"),
            l = f.extend({}, g.Default, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
            }),
            m = f.extend({}, g.DefaultType, {
                content: "(string|element|function)"
            }),
            n = {
                FADE: "fade",
                SHOW: "show"
            },
            o = {
                TITLE: ".popover-header",
                CONTENT: ".popover-body"
            },
            p = {
                HIDE: "hide" + i,
                HIDDEN: "hidden" + i,
                SHOW: "show" + i,
                SHOWN: "shown" + i,
                INSERTED: "inserted" + i,
                CLICK: "click" + i,
                FOCUSIN: "focusin" + i,
                FOCUSOUT: "focusout" + i,
                MOUSEENTER: "mouseenter" + i,
                MOUSELEAVE: "mouseleave" + i
            },
            q = function(g) {
                function j() {
                    return c(this, j), a(this, g.apply(this, arguments))
                }
                return b(j, g), j.prototype.isWithContent = function() {
                    return this.getTitle() || this._getContent()
                }, j.prototype.addAttachmentClass = function(a) {
                    f(this.getTipElement()).addClass("bs-popover-" + a)
                }, j.prototype.getTipElement = function() {
                    return this.tip = this.tip || f(this.config.template)[0]
                }, j.prototype.setContent = function() {
                    var a = f(this.getTipElement());
                    this.setElementContent(a.find(o.TITLE), this.getTitle()), this.setElementContent(a.find(o.CONTENT), this._getContent()), a.removeClass(n.FADE + " " + n.SHOW)
                }, j.prototype._getContent = function() {
                    return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
                }, j.prototype._cleanTipClass = function() {
                    var a = f(this.getTipElement()),
                        b = a.attr("class").match(k);
                    null !== b && b.length > 0 && a.removeClass(b.join(""))
                }, j._jQueryInterface = function(a) {
                    return this.each(function() {
                        var b = f(this).data("bs.popover"),
                            c = "object" === (void 0 === a ? "undefined" : d(a)) ? a : null;
                        if ((b || !/destroy|hide/.test(a)) && (b || (b = new j(this, c), f(this).data("bs.popover", b)), "string" == typeof a)) {
                            if (void 0 === b[a]) throw new Error('No method named "' + a + '"');
                            b[a]()
                        }
                    })
                }, e(j, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0-beta"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return l
                    }
                }, {
                    key: "NAME",
                    get: function() {
                        return h
                    }
                }, {
                    key: "DATA_KEY",
                    get: function() {
                        return "bs.popover"
                    }
                }, {
                    key: "Event",
                    get: function() {
                        return p
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function() {
                        return i
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return m
                    }
                }]), j
            }(g);
        f.fn[h] = q._jQueryInterface, f.fn[h].Constructor = q, f.fn[h].noConflict = function() {
            return f.fn[h] = j, q._jQueryInterface
        }
    }(jQuery)
}(),
/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
    v2.0.3 (c) Kyle Simpson
    MIT License
*/
function(a) {
    function b(a) {
        return "[object Function]" == Object.prototype.toString.call(a)
    }

    function c(a) {
        return "[object Array]" == Object.prototype.toString.call(a)
    }

    function d(a, b) {
        var c = /^\w+\:\/\//;
        return /^\/\/\/?/.test(a) ? a = location.protocol + a : c.test(a) || "/" == a.charAt(0) || (a = (b || "") + a), c.test(a) ? a : ("/" == a.charAt(0) ? r : q) + a
    }

    function e(a, b) {
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }

    function f(a) {
        for (var b = !1, c = 0; c < a.scripts.length; c++) a.scripts[c].ready && a.scripts[c].exec_trigger && (b = !0, a.scripts[c].exec_trigger(), a.scripts[c].exec_trigger = null);
        return b
    }

    function g(a, b, c, d) {
        a.onload = a.onreadystatechange = function() {
            a.readyState && "complete" != a.readyState && "loaded" != a.readyState || b[c] || (a.onload = a.onreadystatechange = null, d())
        }
    }

    function h(a) {
        a.ready = a.finished = !0;
        for (var b = 0; b < a.finished_listeners.length; b++) a.finished_listeners[b]();
        a.ready_listeners = [], a.finished_listeners = []
    }

    function i(a, b, c, d, e) {
        setTimeout(function() {
            var f, h, i = b.real_src;
            if ("item" in s) {
                if (!s[0]) return void setTimeout(arguments.callee, 25);
                s = s[0]
            }
            f = document.createElement("script"), b.type && (f.type = b.type), b.charset && (f.charset = b.charset), e ? w ? (c.elem = f, v ? (f.preload = !0, f.onpreload = d) : f.onreadystatechange = function() {
                "loaded" == f.readyState && d()
            }, f.src = i) : e && 0 == i.indexOf(r) && a[l] ? (h = new XMLHttpRequest, h.onreadystatechange = function() {
                4 == h.readyState && (h.onreadystatechange = function() {}, c.text = h.responseText + "\n//@ sourceURL=" + i, d())
            }, h.open("GET", i), h.send()) : (f.type = "text/cache-script", g(f, c, "ready", function() {
                s.removeChild(f), d()
            }), f.src = i, s.insertBefore(f, s.firstChild)) : x ? (f.async = !1, g(f, c, "finished", d), f.src = i, s.insertBefore(f, s.firstChild)) : (g(f, c, "finished", d), f.src = i, s.insertBefore(f, s.firstChild))
        }, 0)
    }

    function j() {
        function q(a, b, c) {
            function d() {
                null != e && (e = null, h(c))
            }
            var e;
            A[b.src].finished || (a[n] || (A[b.src].finished = !0), e = c.elem || document.createElement("script"), b.type && (e.type = b.type), b.charset && (e.charset = b.charset), g(e, c, "finished", d), c.elem ? c.elem = null : c.text ? (e.onload = e.onreadystatechange = null, e.text = c.text) : e.src = b.real_src, s.insertBefore(e, s.firstChild), c.text && d())
        }

        function r(a, b, c, e) {
            var f, g, j = function() {
                    b.ready_cb(b, function() {
                        q(a, b, f)
                    })
                },
                k = function() {
                    b.finished_cb(b, c)
                };
            b.src = d(b.src, a[p]), b.real_src = b.src + (a[o] ? (/\?.*$/.test(b.src) ? "&_" : "?_") + ~~(1e9 * Math.random()) + "=" : ""), A[b.src] || (A[b.src] = {
                items: [],
                finished: !1
            }), g = A[b.src].items, a[n] || 0 == g.length ? (f = g[g.length] = {
                ready: !1,
                finished: !1,
                ready_listeners: [j],
                finished_listeners: [k]
            }, i(a, b, f, e ? function() {
                f.ready = !0;
                for (var a = 0; a < f.ready_listeners.length; a++) f.ready_listeners[a]();
                f.ready_listeners = []
            } : function() {
                h(f)
            }, e)) : (f = g[0], f.finished ? k() : f.finished_listeners.push(k))
        }

        function t() {
            function a(a, b) {
                a.ready = !0, a.exec_trigger = b, g()
            }

            function d(a, b) {
                a.ready = a.finished = !0, a.exec_trigger = null;
                for (var c = 0; c < b.scripts.length; c++)
                    if (!b.scripts[c].finished) return;
                b.finished = !0, g()
            }

            function g() {
                for (; n < l.length;)
                    if (b(l[n])) try {
                        l[n++]()
                    } catch (a) {} else {
                        if (!l[n].finished) {
                            if (f(l[n])) continue;
                            break
                        }
                        n++
                    }
                    n == l.length && (o = !1, j = !1)
            }

            function h() {
                j && j.scripts || l.push(j = {
                    scripts: [],
                    finished: !0
                })
            }
            var i, j, k = e(v, {}),
                l = [],
                n = 0,
                o = !1;
            return i = {
                script: function() {
                    for (var f = 0; f < arguments.length; f++) ! function(f, g) {
                        var l;
                        c(f) || (g = [f]);
                        for (var n = 0; n < g.length; n++) h(), f = g[n], b(f) && (f = f()), f && (c(f) ? (l = [].slice.call(f), l.unshift(n, 1), [].splice.apply(g, l), n--) : ("string" == typeof f && (f = {
                            src: f
                        }), f = e(f, {
                            ready: !1,
                            ready_cb: a,
                            finished: !1,
                            finished_cb: d
                        }), j.finished = !1, j.scripts.push(f), r(k, f, j, x && o), o = !0, k[m] && i.wait()))
                    }(arguments[f], arguments[f]);
                    return i
                },
                wait: function() {
                    if (arguments.length > 0) {
                        for (var a = 0; a < arguments.length; a++) l.push(arguments[a]);
                        j = l[l.length - 1]
                    } else j = !1;
                    return g(), i
                }
            }, {
                script: i.script,
                wait: i.wait,
                setOptions: function(a) {
                    return e(a, k), i
                }
            }
        }
        var u, v = {},
            x = w || y,
            z = [],
            A = {};
        return v[l] = !0, v[m] = !1, v[n] = !1, v[o] = !1, v[p] = "", u = {
            setGlobalDefaults: function(a) {
                return e(a, v), u
            },
            setOptions: function() {
                return t().setOptions.apply(null, arguments)
            },
            script: function() {
                return t().script.apply(null, arguments)
            },
            wait: function() {
                return t().wait.apply(null, arguments)
            },
            queueScript: function() {
                return z[z.length] = {
                    type: "script",
                    args: [].slice.call(arguments)
                }, u
            },
            queueWait: function() {
                return z[z.length] = {
                    type: "wait",
                    args: [].slice.call(arguments)
                }, u
            },
            runQueue: function() {
                for (var a, b = u, c = z.length, d = c; --d >= 0;) a = z.shift(), b = b[a.type].apply(null, a.args);
                return b
            },
            noConflict: function() {
                return a.$LAB = k, u
            },
            sandbox: function() {
                return j()
            }
        }
    }
    var k = a.$LAB,
        l = "UseLocalXHR",
        m = "AlwaysPreserveOrder",
        n = "AllowDuplicates",
        o = "CacheBust",
        p = "BasePath",
        q = /^[^?#]*\//.exec(location.href)[0],
        r = /^\w+\:\/\/\/?[^\/]+/.exec(q)[0],
        s = document.head || document.getElementsByTagName("head"),
        t = a.opera && "[object Opera]" == Object.prototype.toString.call(a.opera) || "MozAppearance" in document.documentElement.style,
        u = document.createElement("script"),
        v = "boolean" == typeof u.preload,
        w = v || u.readyState && "uninitialized" == u.readyState,
        x = !w && u.async === !0,
        y = !w && !x && !t;
    a.$LAB = j(),
        function(a, b, c) {
            null == document.readyState && document[a] && (document.readyState = "loading", document[a](b, c = function() {
                document.removeEventListener(b, c, !1), document.readyState = "complete"
            }, !1))
        }("addEventListener", "DOMContentLoaded")
}(this),
function(a) {
    function b(b) {
        if ("string" == typeof b.data && (b.data = {
                keys: b.data
            }), b.data && b.data.keys && "string" == typeof b.data.keys) {
            var c = b.handler,
                d = b.data.keys.toLowerCase().split(" ");
            b.handler = function(b) {
                if (this === b.target || !(a.hotkeys.options.filterInputAcceptingElements && a.hotkeys.textInputTypes.test(b.target.nodeName) || a.hotkeys.options.filterContentEditable && a(b.target).attr("contenteditable") || a.hotkeys.options.filterTextInputs && a.inArray(b.target.type, a.hotkeys.textAcceptingInputTypes) > -1)) {
                    var e = "keypress" !== b.type && a.hotkeys.specialKeys[b.which],
                        f = String.fromCharCode(b.which).toLowerCase(),
                        g = "",
                        h = {};
                    a.each(["alt", "ctrl", "shift"], function(a, c) {
                        b[c + "Key"] && e !== c && (g += c + "+")
                    }), b.metaKey && !b.ctrlKey && "meta" !== e && (g += "meta+"), b.metaKey && "meta" !== e && g.indexOf("alt+ctrl+shift+") > -1 && (g = g.replace("alt+ctrl+shift+", "hyper+")), e ? h[g + e] = !0 : (h[g + f] = !0, h[g + a.hotkeys.shiftNums[f]] = !0, "shift+" === g && (h[a.hotkeys.shiftNums[f]] = !0));
                    for (var i = 0, j = d.length; i < j; i++)
                        if (h[d[i]]) return c.apply(this, arguments)
                }
            }
        }
    }
    a.hotkeys = {
        version: "0.2.0",
        specialKeys: {
            8: "backspace",
            9: "tab",
            10: "return",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            59: ";",
            61: "=",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        },
        shiftNums: {
            "`": "~",
            1: "!",
            2: "@",
            3: "#",
            4: "$",
            5: "%",
            6: "^",
            7: "&",
            8: "*",
            9: "(",
            0: ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        },
        textAcceptingInputTypes: ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color", "tel"],
        textInputTypes: /textarea|input|select/i,
        options: {
            filterInputAcceptingElements: !0,
            filterTextInputs: !0,
            filterContentEditable: !0
        }
    }, a.each(["keydown", "keyup", "keypress"], function() {
        a.event.special[this] = {
            add: b
        }
    })
}(jQuery || this.jQuery || window.jQuery),
function(a) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = a() : "function" == typeof define && define.amd ? define([], a) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Push = a()
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    return e(b[g][1][a] || a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(a, b, c) {
            "use strict";
            Object.defineProperty(c, "__esModule", {
                value: !0
            }), c.default = {
                errors: {
                    incompatible: "PushError: Push.js is incompatible with browser.",
                    invalid_plugin: "PushError: plugin class missing from plugin manifest (invalid plugin). Please check the documentation.",
                    invalid_title: "PushError: title of notification must be a string",
                    permission_denied: "PushError: permission request declined",
                    sw_notification_error: "PushError: could not show a ServiceWorker notification due to the following reason: ",
                    sw_registration_error: "PushError: could not register the ServiceWorker due to the following reason: ",
                    unknown_interface: "PushError: unable to create notification: unknown interface"
                }
            }
        }, {}],
        2: [function(a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var e = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                f = function() {
                    function a(b) {
                        d(this, a), this._win = b, this.DEFAULT = "default", this.GRANTED = "granted", this.DENIED = "denied", this._permissions = [this.GRANTED, this.DEFAULT, this.DENIED]
                    }
                    return e(a, [{
                        key: "request",
                        value: function(a, b) {
                            var c = this,
                                d = this.get(),
                                e = function(d) {
                                    d === c.GRANTED || 0 === d ? a && a() : b && b()
                                };
                            d !== this.DEFAULT ? e(d) : this._win.Notification && this._win.Notification.requestPermission ? this._win.Notification.requestPermission().then(e).catch(function() {
                                b && b()
                            }) : this._win.webkitNotifications && this._win.webkitNotifications.checkPermission ? this._win.webkitNotifications.requestPermission(e) : a && a()
                        }
                    }, {
                        key: "has",
                        value: function() {
                            return this.get() === this.GRANTED
                        }
                    }, {
                        key: "get",
                        value: function() {
                            return this._win.Notification && this._win.Notification.permission ? this._win.Notification.permission : this._win.webkitNotifications && this._win.webkitNotifications.checkPermission ? this._permissions[this._win.webkitNotifications.checkPermission()] : navigator.mozNotification ? this.GRANTED : this._win.external && this._win.external.msIsSiteMode ? this._win.external.msIsSiteMode() ? this.GRANTED : this.DEFAULT : this.GRANTED
                        }
                    }]), a
                }();
            c.default = f
        }, {}],
        3: [function(a, b, c) {
            "use strict";

            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }

            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var f = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                g = d(a("./Messages")),
                h = d(a("./Permission")),
                i = d(a("./Util")),
                j = d(a("./agents/DesktopAgent")),
                k = d(a("./agents/MobileChromeAgent")),
                l = d(a("./agents/MobileFirefoxAgent")),
                m = d(a("./agents/MSAgent")),
                n = d(a("./agents/WebKitAgent")),
                o = function() {
                    function a(b) {
                        e(this, a), this._currentId = 0, this._notifications = {}, this._win = b, this.Permission = new h.default(b), this._agents = {
                            desktop: new j.default(b),
                            chrome: new k.default(b),
                            firefox: new l.default(b),
                            ms: new m.default(b),
                            webkit: new n.default(b)
                        }, this._configuration = {
                            serviceWorker: "/serviceWorker.min.js",
                            fallback: function(a) {}
                        }
                    }
                    return f(a, [{
                        key: "_closeNotification",
                        value: function(a) {
                            var b = !0,
                                c = this._notifications[a];
                            if (void 0 !== c) {
                                if (b = this._removeNotification(a), this._agents.desktop.isSupported()) this._agents.desktop.close(c);
                                else if (this._agents.webkit.isSupported()) this._agents.webkit.close(c);
                                else {
                                    if (!this._agents.ms.isSupported()) throw b = !1, new Error(g.default.errors.unknown_interface);
                                    this._agents.ms.close()
                                }
                                return b
                            }
                            return !1
                        }
                    }, {
                        key: "_addNotification",
                        value: function(a) {
                            var b = this._currentId;
                            return this._notifications[b] = a, this._currentId++, b
                        }
                    }, {
                        key: "_removeNotification",
                        value: function(a) {
                            var b = !1;
                            return this._notifications.hasOwnProperty(a) && (delete this._notifications[a], b = !0), b
                        }
                    }, {
                        key: "_prepareNotification",
                        value: function(a, b) {
                            var c = this,
                                d = void 0;
                            return d = {
                                get: function() {
                                    return c._notifications[a]
                                },
                                close: function() {
                                    c._closeNotification(a)
                                }
                            }, b.timeout && setTimeout(function() {
                                d.close()
                            }, b.timeout), d
                        }
                    }, {
                        key: "_serviceWorkerCallback",
                        value: function(a, b, c) {
                            var d = this,
                                e = this._addNotification(a[a.length - 1]);
                            navigator.serviceWorker.addEventListener("message", function(a) {
                                var b = JSON.parse(a.data);
                                "close" === b.action && Number.isInteger(b.id) && d._removeNotification(b.id)
                            }), c(this._prepareNotification(e, b))
                        }
                    }, {
                        key: "_createCallback",
                        value: function(a, b, c) {
                            var d = this,
                                e = void 0,
                                f = null;
                            if (b = b || {}, e = function(a) {
                                    d._removeNotification(a), i.default.isFunction(b.onClose) && b.onClose.call(d, f)
                                }, this._agents.desktop.isSupported()) try {
                                f = this._agents.desktop.create(a, b)
                            } catch (e) {
                                var g = this._currentId,
                                    h = this.config().serviceWorker,
                                    j = function(a) {
                                        return d._serviceWorkerCallback(a, b, c)
                                    };
                                this._agents.chrome.isSupported() && this._agents.chrome.create(g, a, b, h, j)
                            } else this._agents.webkit.isSupported() ? f = this._agents.webkit.create(a, b) : this._agents.firefox.isSupported() ? this._agents.firefox.create(a, b) : this._agents.ms.isSupported() ? f = this._agents.ms.create(a, b) : (b.title = a, this.config().fallback(b));
                            if (null !== f) {
                                var k = this._addNotification(f),
                                    l = this._prepareNotification(k, b);
                                i.default.isFunction(b.onShow) && f.addEventListener("show", b.onShow), i.default.isFunction(b.onError) && f.addEventListener("error", b.onError), i.default.isFunction(b.onClick) && f.addEventListener("click", b.onClick), f.addEventListener("close", function() {
                                    e(k)
                                }), f.addEventListener("cancel", function() {
                                    e(k)
                                }), c(l)
                            }
                            c(null)
                        }
                    }, {
                        key: "create",
                        value: function(a, b) {
                            var c = this,
                                d = void 0;
                            if (!i.default.isString(a)) throw new Error(g.default.errors.invalid_title);
                            return d = this.Permission.has() ? function(d, e) {
                                try {
                                    c._createCallback(a, b, d)
                                } catch (a) {
                                    e(a)
                                }
                            } : function(d, e) {
                                c.Permission.request(function() {
                                    try {
                                        c._createCallback(a, b, d)
                                    } catch (a) {
                                        e(a)
                                    }
                                }, function() {
                                    e(g.default.errors.permission_denied)
                                })
                            }, new Promise(d)
                        }
                    }, {
                        key: "count",
                        value: function() {
                            var a = void 0,
                                b = 0;
                            for (a in this._notifications) this._notifications.hasOwnProperty(a) && b++;
                            return b
                        }
                    }, {
                        key: "close",
                        value: function(a) {
                            var b = void 0;
                            for (b in this._notifications)
                                if (this._notifications.hasOwnProperty(b) && this._notifications[b].tag === a) return this._closeNotification(b)
                        }
                    }, {
                        key: "clear",
                        value: function() {
                            var a = void 0,
                                b = !0;
                            for (a in this._notifications) this._notifications.hasOwnProperty(a) && (b = b && this._closeNotification(a));
                            return b
                        }
                    }, {
                        key: "supported",
                        value: function() {
                            var a = !1;
                            for (var b in this._agents) this._agents.hasOwnProperty(b) && (a = a || this._agents[b].isSupported());
                            return a
                        }
                    }, {
                        key: "config",
                        value: function(a) {
                            return (void 0 !== a || null !== a && i.default.isObject(a)) && i.default.objectMerge(this._configuration, a), this._configuration
                        }
                    }, {
                        key: "extend",
                        value: function(a) {
                            var b, c = {}.hasOwnProperty;
                            if (!c.call(a, "plugin")) throw new Error(g.default.errors.invalid_plugin);
                            c.call(a, "config") && i.default.isObject(a.config) && null !== a.config && this.config(a.config), b = new(0, a.plugin)(this.config());
                            for (var d in b) c.call(b, d) && i.default.isFunction(b[d]) && (this[d] = b[d])
                        }
                    }]), a
                }();
            c.default = o
        }, {
            "./Messages": 1,
            "./Permission": 2,
            "./Util": 4,
            "./agents/DesktopAgent": 6,
            "./agents/MSAgent": 7,
            "./agents/MobileChromeAgent": 8,
            "./agents/MobileFirefoxAgent": 9,
            "./agents/WebKitAgent": 10
        }],
        4: [function(a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
                    return typeof a
                } : function(a) {
                    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
                },
                f = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                g = function() {
                    function a() {
                        d(this, a)
                    }
                    return f(a, null, [{
                        key: "isUndefined",
                        value: function(a) {
                            return void 0 === a
                        }
                    }, {
                        key: "isString",
                        value: function(a) {
                            return "string" == typeof a
                        }
                    }, {
                        key: "isFunction",
                        value: function(a) {
                            return a && "[object Function]" === {}.toString.call(a)
                        }
                    }, {
                        key: "isObject",
                        value: function(a) {
                            return "object" == (void 0 === a ? "undefined" : e(a))
                        }
                    }, {
                        key: "objectMerge",
                        value: function(a, b) {
                            for (var c in b) a.hasOwnProperty(c) && this.isObject(a[c]) && this.isObject(b[c]) ? this.objectMerge(a[c], b[c]) : a[c] = b[c]
                        }
                    }]), a
                }();
            c.default = g
        }, {}],
        5: [function(a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            }), c.default = function a(b) {
                d(this, a), this._win = b
            }
        }, {}],
        6: [function(a, b, c) {
            "use strict";

            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }

            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function f(a, b) {
                if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !b || "object" != typeof b && "function" != typeof b ? a : b
            }

            function g(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var h = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                i = d(a("./AbstractAgent")),
                j = d(a("../Util")),
                k = function(a) {
                    function b() {
                        return e(this, b), f(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments))
                    }
                    return g(b, i.default), h(b, [{
                        key: "isSupported",
                        value: function() {
                            return void 0 !== this._win.Notification
                        }
                    }, {
                        key: "create",
                        value: function(a, b) {
                            return new this._win.Notification(a, {
                                icon: j.default.isString(b.icon) || j.default.isUndefined(b.icon) ? b.icon : b.icon.x32,
                                body: b.body,
                                tag: b.tag,
                                requireInteraction: b.requireInteraction
                            })
                        }
                    }, {
                        key: "close",
                        value: function(a) {
                            a.close()
                        }
                    }]), b
                }();
            c.default = k
        }, {
            "../Util": 4,
            "./AbstractAgent": 5
        }],
        7: [function(a, b, c) {
            "use strict";

            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }

            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function f(a, b) {
                if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !b || "object" != typeof b && "function" != typeof b ? a : b
            }

            function g(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var h = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                i = d(a("./AbstractAgent")),
                j = d(a("../Util")),
                k = function(a) {
                    function b() {
                        return e(this, b), f(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments))
                    }
                    return g(b, i.default), h(b, [{
                        key: "isSupported",
                        value: function() {
                            return void 0 !== this._win.external && void 0 !== this._win.external.msIsSiteMode
                        }
                    }, {
                        key: "create",
                        value: function(a, b) {
                            return this._win.external.msSiteModeClearIconOverlay(), this._win.external.msSiteModeSetIconOverlay(j.default.isString(b.icon) || j.default.isUndefined(b.icon) ? b.icon : b.icon.x16, a), this._win.external.msSiteModeActivate(), null
                        }
                    }, {
                        key: "close",
                        value: function() {
                            this._win.external.msSiteModeClearIconOverlay()
                        }
                    }]), b
                }();
            c.default = k
        }, {
            "../Util": 4,
            "./AbstractAgent": 5
        }],
        8: [function(a, b, c) {
            "use strict";

            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }

            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function f(a, b) {
                if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !b || "object" != typeof b && "function" != typeof b ? a : b
            }

            function g(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var h = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                i = d(a("./AbstractAgent")),
                j = d(a("../Util")),
                k = d(a("../Messages")),
                l = function(a) {
                    function b() {
                        return e(this, b), f(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments))
                    }
                    return g(b, i.default), h(b, [{
                        key: "isSupported",
                        value: function() {
                            return void 0 !== this._win.navigator && void 0 !== this._win.navigator.serviceWorker
                        }
                    }, {
                        key: "getFunctionBody",
                        value: function(a) {
                            return a.toString().match(/function[^{]+{([\s\S]*)}$/)[1]
                        }
                    }, {
                        key: "create",
                        value: function(a, b, c, d, e) {
                            var f = this;
                            this._win.navigator.serviceWorker.register(d), this._win.navigator.serviceWorker.ready.then(function(d) {
                                var g = {
                                    id: a,
                                    link: c.link,
                                    origin: document.location.href,
                                    onClick: j.default.isFunction(c.onClick) ? f.getFunctionBody(c.onClick) : "",
                                    onClose: j.default.isFunction(c.onClose) ? f.getFunctionBody(c.onClose) : ""
                                };
                                void 0 !== c.data && null !== c.data && (g = Object.assign(g, c.data)), d.showNotification(b, {
                                    icon: c.icon,
                                    body: c.body,
                                    vibrate: c.vibrate,
                                    tag: c.tag,
                                    data: g,
                                    requireInteraction: c.requireInteraction,
                                    silent: c.silent
                                }).then(function() {
                                    d.getNotifications().then(function(a) {
                                        d.active.postMessage(""), e(a)
                                    })
                                }).catch(function(a) {
                                    throw new Error(k.default.errors.sw_notification_error + a.message)
                                })
                            }).catch(function(a) {
                                throw new Error(k.default.errors.sw_registration_error + a.message)
                            })
                        }
                    }, {
                        key: "close",
                        value: function() {}
                    }]), b
                }();
            c.default = l
        }, {
            "../Messages": 1,
            "../Util": 4,
            "./AbstractAgent": 5
        }],
        9: [function(a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function e(a, b) {
                if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !b || "object" != typeof b && "function" != typeof b ? a : b
            }

            function f(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var g = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                h = function(a) {
                    return a && a.__esModule ? a : {
                        default: a
                    }
                }(a("./AbstractAgent")),
                i = function(a) {
                    function b() {
                        return d(this, b), e(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments))
                    }
                    return f(b, h.default), g(b, [{
                        key: "isSupported",
                        value: function() {
                            return void 0 !== this._win.navigator.mozNotification
                        }
                    }, {
                        key: "create",
                        value: function(a, b) {
                            var c = this._win.navigator.mozNotification.createNotification(a, b.body, b.icon);
                            return c.show(), c
                        }
                    }]), b
                }();
            c.default = i
        }, {
            "./AbstractAgent": 5
        }],
        10: [function(a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function e(a, b) {
                if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !b || "object" != typeof b && "function" != typeof b ? a : b
            }

            function f(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }
            Object.defineProperty(c, "__esModule", {
                value: !0
            });
            var g = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                h = function(a) {
                    return a && a.__esModule ? a : {
                        default: a
                    }
                }(a("./AbstractAgent")),
                i = function(a) {
                    function b() {
                        return d(this, b), e(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments))
                    }
                    return f(b, h.default), g(b, [{
                        key: "isSupported",
                        value: function() {
                            return void 0 !== this._win.webkitNotifications
                        }
                    }, {
                        key: "create",
                        value: function(a, b) {
                            var c = this._win.webkitNotifications.createNotification(b.icon, a, b.body);
                            return c.show(), c
                        }
                    }, {
                        key: "close",
                        value: function(a) {
                            a.cancel()
                        }
                    }]), b
                }();
            c.default = i
        }, {
            "./AbstractAgent": 5
        }],
        11: [function(a, b, c) {
            "use strict";
            var d = function(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }(a("./classes/Push"));
            b.exports = new d.default("undefined" != typeof window ? window : void 0)
        }, {
            "./classes/Push": 3
        }]
    }, {}, [11])(11)
}),
function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";
    var b = "animsition",
        c = {
            init: function(d) {
                d = a.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function(a) {
                        window.location.href = a
                    }
                }, d), c.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var e = c.supportCheck.call(this, d);
                return e || !(d.browser.length > 0) || e && this.length ? (c.optionCheck.call(this, d) && a("." + d.overlayClass).length <= 0 && c.addOverlay.call(this, d), d.loading && a("." + d.loadingClass).length <= 0 && c.addLoading.call(this, d), this.each(function() {
                    var e = this,
                        f = a(this),
                        g = a(window),
                        h = a(document);
                    f.data(b) || (d = a.extend({}, d), f.data(b, {
                        options: d
                    }), d.timeout && c.addTimer.call(e), d.onLoadEvent && g.on("load." + b, function() {
                        c.settings.timer && clearTimeout(c.settings.timer), c.in.call(e)
                    }), g.on("pageshow." + b, function(a) {
                        a.originalEvent.persisted && c.in.call(e)
                    }), g.on("unload." + b, function() {}), h.on("click." + b, d.linkElement, function(b) {
                        b.preventDefault();
                        var d = a(this),
                            f = d.attr("href");
                        2 === b.which || b.metaKey || b.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && b.ctrlKey ? window.open(f, "_blank") : c.out.call(e, d, f)
                    }))
                })) : ("console" in window || (window.console = {}, window.console.log = function(a) {
                    return a
                }), this.length || console.log("Animsition: Element does not exist on page."), e || console.log("Animsition: Does not support this browser."), c.destroy.call(this))
            },
            addOverlay: function(b) {
                a(b.overlayParentElement).prepend('<div class="' + b.overlayClass + '"></div>')
            },
            addLoading: function(b) {
                a(b.loadingParentElement).append('<div class="' + b.loadingClass + '">' + b.loadingInner + "</div>")
            },
            removeLoading: function() {
                var c = a(this),
                    d = c.data(b).options;
                a(d.loadingParentElement).children("." + d.loadingClass).fadeOut().remove()
            },
            addTimer: function() {
                var d = this,
                    e = a(this),
                    f = e.data(b).options;
                c.settings.timer = setTimeout(function() {
                    c.in.call(d), a(window).off("load." + b)
                }, f.timeoutCountdown)
            },
            supportCheck: function(b) {
                var c = a(this),
                    d = b.browser,
                    e = d.length,
                    f = !1;
                0 === e && (f = !0);
                for (var g = 0; e > g; g++)
                    if ("string" == typeof c.css(d[g])) {
                        f = !0;
                        break
                    }
                return f
            },
            optionCheck: function(b) {
                var d = a(this);
                return !(!b.overlay && !d.data(c.settings.data.overlay))
            },
            animationCheck: function(c, d, e) {
                var f = a(this),
                    g = f.data(b).options,
                    h = typeof c,
                    i = !d && "number" === h,
                    j = d && "string" === h && c.length > 0;
                return i || j ? c = c : d && e ? c = g.inClass : !d && e ? c = g.inDuration : d && !e ? c = g.outClass : d || e || (c = g.outDuration), c
            },
            in : function() {
                var d = this,
                    e = a(this),
                    f = e.data(b).options,
                    g = e.data(c.settings.data.inDuration),
                    h = e.data(c.settings.data.inClass),
                    i = c.animationCheck.call(d, g, !1, !0),
                    j = c.animationCheck.call(d, h, !0, !0),
                    k = c.optionCheck.call(d, f),
                    l = e.data(b).outClass;
                f.loading && c.removeLoading.call(d), l && e.removeClass(l), k ? c.inOverlay.call(d, j, i) : c.inDefault.call(d, j, i)
            },
            inDefault: function(b, d) {
                var e = a(this);
                e.css({
                    "animation-duration": d + "ms"
                }).addClass(b).trigger(c.settings.events.inStart).animateCallback(function() {
                    e.removeClass(b).css({
                        opacity: 1
                    }).trigger(c.settings.events.inEnd)
                })
            },
            inOverlay: function(d, e) {
                var f = a(this),
                    g = f.data(b).options;
                f.css({
                    opacity: 1
                }).trigger(c.settings.events.inStart), a(g.overlayParentElement).children("." + g.overlayClass).css({
                    "animation-duration": e + "ms"
                }).addClass(d).animateCallback(function() {
                    f.trigger(c.settings.events.inEnd)
                })
            },
            out: function(d, e) {
                var f = this,
                    g = a(this),
                    h = g.data(b).options,
                    i = d.data(c.settings.data.outClass),
                    j = g.data(c.settings.data.outClass),
                    k = d.data(c.settings.data.outDuration),
                    l = g.data(c.settings.data.outDuration),
                    m = i ? i : j,
                    n = k ? k : l,
                    o = c.animationCheck.call(f, m, !0, !1),
                    p = c.animationCheck.call(f, n, !1, !1),
                    q = c.optionCheck.call(f, h);
                g.data(b).outClass = o, q ? c.outOverlay.call(f, o, p, e) : c.outDefault.call(f, o, p, e)
            },
            outDefault: function(d, e, f) {
                var g = a(this),
                    h = g.data(b).options;
                g.css({
                    "animation-duration": e + 1 + "ms"
                }).addClass(d).trigger(c.settings.events.outStart).animateCallback(function() {
                    g.trigger(c.settings.events.outEnd), h.transition(f)
                })
            },
            outOverlay: function(d, e, f) {
                var g = this,
                    h = a(this),
                    i = h.data(b).options,
                    j = h.data(c.settings.data.inClass),
                    k = c.animationCheck.call(g, j, !0, !0);
                a(i.overlayParentElement).children("." + i.overlayClass).css({
                    "animation-duration": e + 1 + "ms"
                }).removeClass(k).addClass(d).trigger(c.settings.events.outStart).animateCallback(function() {
                    h.trigger(c.settings.events.outEnd), i.transition(f)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var c = a(this);
                    a(window).off("." + b), c.css({
                        opacity: 1
                    }).removeData(b)
                })
            }
        };
    a.fn.animateCallback = function(b) {
        var c = "animationend webkitAnimationEnd";
        return this.each(function() {
            var d = a(this);
            d.on(c, function() {
                return d.off(c), b.call(this)
            })
        })
    }, a.fn.animsition = function(d) {
        return c[d] ? c[d].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof d && d ? void a.error("Method " + d + " does not exist on jQuery." + b) : c.init.apply(this, arguments)
    }
}),
function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function(a, b, c) {
        "use strict";

        function d(a) {
            a.fn.perfectScrollbar = function(a) {
                return this.each(function() {
                    if ("object" == typeof a || void 0 === a) {
                        var b = a;
                        f.get(this) || e.initialize(this, b)
                    } else {
                        var c = a;
                        "update" === c ? e.update(this) : "destroy" === c && e.destroy(this)
                    }
                })
            }
        }
        var e = a("../main"),
            f = a("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], d);
        else {
            var g = window.jQuery ? window.jQuery : window.$;
            void 0 !== g && d(g)
        }
        b.exports = d
    }, {
        "../main": 7,
        "../plugin/instances": 18
    }],
    2: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            var c = a.className.split(" ");
            c.indexOf(b) < 0 && c.push(b), a.className = c.join(" ")
        }

        function e(a, b) {
            var c = a.className.split(" "),
                d = c.indexOf(b);
            d >= 0 && c.splice(d, 1), a.className = c.join(" ")
        }
        c.add = function(a, b) {
            a.classList ? a.classList.add(b) : d(a, b)
        }, c.remove = function(a, b) {
            a.classList ? a.classList.remove(b) : e(a, b)
        }, c.list = function(a) {
            return a.classList ? Array.prototype.slice.apply(a.classList) : a.className.split(" ")
        }
    }, {}],
    3: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            return window.getComputedStyle(a)[b]
        }

        function e(a, b, c) {
            return "number" == typeof c && (c = c.toString() + "px"), a.style[b] = c, a
        }

        function f(a, b) {
            for (var c in b) {
                var d = b[c];
                "number" == typeof d && (d = d.toString() + "px"), a.style[c] = d
            }
            return a
        }
        var g = {};
        g.e = function(a, b) {
            var c = document.createElement(a);
            return c.className = b, c
        }, g.appendTo = function(a, b) {
            return b.appendChild(a), a
        }, g.css = function(a, b, c) {
            return "object" == typeof b ? f(a, b) : void 0 === c ? d(a, b) : e(a, b, c)
        }, g.matches = function(a, b) {
            return void 0 !== a.matches ? a.matches(b) : void 0 !== a.matchesSelector ? a.matchesSelector(b) : void 0 !== a.webkitMatchesSelector ? a.webkitMatchesSelector(b) : void 0 !== a.mozMatchesSelector ? a.mozMatchesSelector(b) : void 0 !== a.msMatchesSelector ? a.msMatchesSelector(b) : void 0
        }, g.remove = function(a) {
            void 0 !== a.remove ? a.remove() : a.parentNode && a.parentNode.removeChild(a)
        }, g.queryChildren = function(a, b) {
            return Array.prototype.filter.call(a.childNodes, function(a) {
                return g.matches(a, b)
            })
        }, b.exports = g
    }, {}],
    4: [function(a, b, c) {
        "use strict";
        var d = function(a) {
            this.element = a, this.events = {}
        };
        d.prototype.bind = function(a, b) {
            void 0 === this.events[a] && (this.events[a] = []), this.events[a].push(b), this.element.addEventListener(a, b, !1)
        }, d.prototype.unbind = function(a, b) {
            var c = void 0 !== b;
            this.events[a] = this.events[a].filter(function(d) {
                return !(!c || d === b) || (this.element.removeEventListener(a, d, !1), !1)
            }, this)
        }, d.prototype.unbindAll = function() {
            for (var a in this.events) this.unbind(a)
        };
        var e = function() {
            this.eventElements = []
        };
        e.prototype.eventElement = function(a) {
            var b = this.eventElements.filter(function(b) {
                return b.element === a
            })[0];
            return void 0 === b && (b = new d(a), this.eventElements.push(b)), b
        }, e.prototype.bind = function(a, b, c) {
            this.eventElement(a).bind(b, c)
        }, e.prototype.unbind = function(a, b, c) {
            this.eventElement(a).unbind(b, c)
        }, e.prototype.unbindAll = function() {
            for (var a = 0; a < this.eventElements.length; a++) this.eventElements[a].unbindAll()
        }, e.prototype.once = function(a, b, c) {
            var d = this.eventElement(a),
                e = function(a) {
                    d.unbind(b, e), c(a)
                };
            d.bind(b, e)
        }, b.exports = e
    }, {}],
    5: [function(a, b, c) {
        "use strict";
        b.exports = function() {
            function a() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function() {
                return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
            }
        }()
    }, {}],
    6: [function(a, b, c) {
        "use strict";
        var d = a("./class"),
            e = a("./dom"),
            f = c.toInt = function(a) {
                return parseInt(a, 10) || 0
            },
            g = c.clone = function(a) {
                if (a) {
                    if (a.constructor === Array) return a.map(g);
                    if ("object" == typeof a) {
                        var b = {};
                        for (var c in a) b[c] = g(a[c]);
                        return b
                    }
                    return a
                }
                return null
            };
        c.extend = function(a, b) {
            var c = g(a);
            for (var d in b) c[d] = g(b[d]);
            return c
        }, c.isEditable = function(a) {
            return e.matches(a, "input,[contenteditable]") || e.matches(a, "select,[contenteditable]") || e.matches(a, "textarea,[contenteditable]") || e.matches(a, "button,[contenteditable]")
        }, c.removePsClasses = function(a) {
            for (var b = d.list(a), c = 0; c < b.length; c++) {
                var e = b[c];
                0 === e.indexOf("ps-") && d.remove(a, e)
            }
        }, c.outerWidth = function(a) {
            return f(e.css(a, "width")) + f(e.css(a, "paddingLeft")) + f(e.css(a, "paddingRight")) + f(e.css(a, "borderLeftWidth")) + f(e.css(a, "borderRightWidth"))
        }, c.startScrolling = function(a, b) {
            d.add(a, "ps-in-scrolling"), void 0 !== b ? d.add(a, "ps-" + b) : (d.add(a, "ps-x"), d.add(a, "ps-y"))
        }, c.stopScrolling = function(a, b) {
            d.remove(a, "ps-in-scrolling"), void 0 !== b ? d.remove(a, "ps-" + b) : (d.remove(a, "ps-x"), d.remove(a, "ps-y"))
        }, c.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function(a, b, c) {
        "use strict";
        var d = a("./plugin/destroy"),
            e = a("./plugin/initialize"),
            f = a("./plugin/update");
        b.exports = {
            initialize: e,
            update: f,
            destroy: d
        }
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function(a, b, c) {
        "use strict";
        b.exports = {
            handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !1,
            wheelSpeed: 1,
            theme: "default"
        }
    }, {}],
    9: [function(a, b, c) {
        "use strict";
        var d = a("../lib/helper"),
            e = a("../lib/dom"),
            f = a("./instances");
        b.exports = function(a) {
            var b = f.get(a);
            b && (b.event.unbindAll(), e.remove(b.scrollbarX), e.remove(b.scrollbarY), e.remove(b.scrollbarXRail), e.remove(b.scrollbarYRail), d.removePsClasses(a), f.remove(a))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            function c(a) {
                return a.getBoundingClientRect()
            }
            var d = function(a) {
                a.stopPropagation()
            };
            b.event.bind(b.scrollbarY, "click", d), b.event.bind(b.scrollbarYRail, "click", function(d) {
                var e = d.pageY - window.pageYOffset - c(b.scrollbarYRail).top,
                    h = e > b.scrollbarYTop ? 1 : -1;
                g(a, "top", a.scrollTop + h * b.containerHeight), f(a), d.stopPropagation()
            }), b.event.bind(b.scrollbarX, "click", d), b.event.bind(b.scrollbarXRail, "click", function(d) {
                var e = d.pageX - window.pageXOffset - c(b.scrollbarXRail).left,
                    h = e > b.scrollbarXLeft ? 1 : -1;
                g(a, "left", a.scrollLeft + h * b.containerWidth), f(a), d.stopPropagation()
            })
        }
        var e = a("../instances"),
            f = a("../update-geometry"),
            g = a("../update-scroll");
        b.exports = function(a) {
            d(a, e.get(a))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            function c(c) {
                var e = d + c * b.railXRatio,
                    g = Math.max(0, b.scrollbarXRail.getBoundingClientRect().left) + b.railXRatio * (b.railXWidth - b.scrollbarXWidth);
                b.scrollbarXLeft = e < 0 ? 0 : e > g ? g : e;
                var h = f.toInt(b.scrollbarXLeft * (b.contentWidth - b.containerWidth) / (b.containerWidth - b.railXRatio * b.scrollbarXWidth)) - b.negativeScrollAdjustment;
                j(a, "left", h)
            }
            var d = null,
                e = null,
                h = function(b) {
                    c(b.pageX - e), i(a), b.stopPropagation(), b.preventDefault()
                },
                k = function() {
                    f.stopScrolling(a, "x"), b.event.unbind(b.ownerDocument, "mousemove", h)
                };
            b.event.bind(b.scrollbarX, "mousedown", function(c) {
                e = c.pageX, d = f.toInt(g.css(b.scrollbarX, "left")) * b.railXRatio, f.startScrolling(a, "x"), b.event.bind(b.ownerDocument, "mousemove", h), b.event.once(b.ownerDocument, "mouseup", k), c.stopPropagation(), c.preventDefault()
            })
        }

        function e(a, b) {
            function c(c) {
                var e = d + c * b.railYRatio,
                    g = Math.max(0, b.scrollbarYRail.getBoundingClientRect().top) + b.railYRatio * (b.railYHeight - b.scrollbarYHeight);
                b.scrollbarYTop = e < 0 ? 0 : e > g ? g : e;
                var h = f.toInt(b.scrollbarYTop * (b.contentHeight - b.containerHeight) / (b.containerHeight - b.railYRatio * b.scrollbarYHeight));
                j(a, "top", h)
            }
            var d = null,
                e = null,
                h = function(b) {
                    c(b.pageY - e), i(a), b.stopPropagation(), b.preventDefault()
                },
                k = function() {
                    f.stopScrolling(a, "y"), b.event.unbind(b.ownerDocument, "mousemove", h)
                };
            b.event.bind(b.scrollbarY, "mousedown", function(c) {
                e = c.pageY, d = f.toInt(g.css(b.scrollbarY, "top")) * b.railYRatio, f.startScrolling(a, "y"), b.event.bind(b.ownerDocument, "mousemove", h), b.event.once(b.ownerDocument, "mouseup", k), c.stopPropagation(), c.preventDefault()
            })
        }
        var f = a("../../lib/helper"),
            g = a("../../lib/dom"),
            h = a("../instances"),
            i = a("../update-geometry"),
            j = a("../update-scroll");
        b.exports = function(a) {
            var b = h.get(a);
            d(a, b), e(a, b)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            function c(c, d) {
                var e = a.scrollTop;
                if (0 === c) {
                    if (!b.scrollbarYActive) return !1;
                    if (0 === e && d > 0 || e >= b.contentHeight - b.containerHeight && d < 0) return !b.settings.wheelPropagation
                }
                var f = a.scrollLeft;
                if (0 === d) {
                    if (!b.scrollbarXActive) return !1;
                    if (0 === f && c < 0 || f >= b.contentWidth - b.containerWidth && c > 0) return !b.settings.wheelPropagation
                }
                return !0
            }
            var d = !1;
            b.event.bind(a, "mouseenter", function() {
                d = !0
            }), b.event.bind(a, "mouseleave", function() {
                d = !1
            });
            var g = !1;
            b.event.bind(b.ownerDocument, "keydown", function(j) {
                if (!(j.isDefaultPrevented && j.isDefaultPrevented() || j.defaultPrevented)) {
                    var k = f.matches(b.scrollbarX, ":focus") || f.matches(b.scrollbarY, ":focus");
                    if (d || k) {
                        var l = document.activeElement ? document.activeElement : b.ownerDocument.activeElement;
                        if (l) {
                            if ("IFRAME" === l.tagName) l = l.contentDocument.activeElement;
                            else
                                for (; l.shadowRoot;) l = l.shadowRoot.activeElement;
                            if (e.isEditable(l)) return
                        }
                        var m = 0,
                            n = 0;
                        switch (j.which) {
                            case 37:
                                m = j.metaKey ? -b.contentWidth : j.altKey ? -b.containerWidth : -30;
                                break;
                            case 38:
                                n = j.metaKey ? b.contentHeight : j.altKey ? b.containerHeight : 30;
                                break;
                            case 39:
                                m = j.metaKey ? b.contentWidth : j.altKey ? b.containerWidth : 30;
                                break;
                            case 40:
                                n = j.metaKey ? -b.contentHeight : j.altKey ? -b.containerHeight : -30;
                                break;
                            case 33:
                                n = 90;
                                break;
                            case 32:
                                n = j.shiftKey ? 90 : -90;
                                break;
                            case 34:
                                n = -90;
                                break;
                            case 35:
                                n = j.ctrlKey ? -b.contentHeight : -b.containerHeight;
                                break;
                            case 36:
                                n = j.ctrlKey ? a.scrollTop : b.containerHeight;
                                break;
                            default:
                                return
                        }
                        i(a, "top", a.scrollTop - n), i(a, "left", a.scrollLeft + m), h(a), (g = c(m, n)) && j.preventDefault()
                    }
                }
            })
        }
        var e = a("../../lib/helper"),
            f = a("../../lib/dom"),
            g = a("../instances"),
            h = a("../update-geometry"),
            i = a("../update-scroll");
        b.exports = function(a) {
            d(a, g.get(a))
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            function c(c, d) {
                var e = a.scrollTop;
                if (0 === c) {
                    if (!b.scrollbarYActive) return !1;
                    if (0 === e && d > 0 || e >= b.contentHeight - b.containerHeight && d < 0) return !b.settings.wheelPropagation
                }
                var f = a.scrollLeft;
                if (0 === d) {
                    if (!b.scrollbarXActive) return !1;
                    if (0 === f && c < 0 || f >= b.contentWidth - b.containerWidth && c > 0) return !b.settings.wheelPropagation
                }
                return !0
            }

            function d(a) {
                var b = a.deltaX,
                    c = -1 * a.deltaY;
                return void 0 !== b && void 0 !== c || (b = -1 * a.wheelDeltaX / 6, c = a.wheelDeltaY / 6), a.deltaMode && 1 === a.deltaMode && (b *= 10, c *= 10), b !== b && c !== c && (b = 0, c = a.wheelDelta), a.shiftKey ? [-c, -b] : [b, c]
            }

            function e(b, c) {
                var d = a.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                if (d) {
                    if (!window.getComputedStyle(d).overflow.match(/(scroll|auto)/)) return !1;
                    var e = d.scrollHeight - d.clientHeight;
                    if (e > 0 && !(0 === d.scrollTop && c > 0 || d.scrollTop === e && c < 0)) return !0;
                    var f = d.scrollLeft - d.clientWidth;
                    if (f > 0 && !(0 === d.scrollLeft && b < 0 || d.scrollLeft === f && b > 0)) return !0
                }
                return !1
            }

            function h(h) {
                var j = d(h),
                    k = j[0],
                    l = j[1];
                e(k, l) || (i = !1, b.settings.useBothWheelAxes ? b.scrollbarYActive && !b.scrollbarXActive ? (l ? g(a, "top", a.scrollTop - l * b.settings.wheelSpeed) : g(a, "top", a.scrollTop + k * b.settings.wheelSpeed), i = !0) : b.scrollbarXActive && !b.scrollbarYActive && (k ? g(a, "left", a.scrollLeft + k * b.settings.wheelSpeed) : g(a, "left", a.scrollLeft - l * b.settings.wheelSpeed), i = !0) : (g(a, "top", a.scrollTop - l * b.settings.wheelSpeed), g(a, "left", a.scrollLeft + k * b.settings.wheelSpeed)), f(a), (i = i || c(k, l)) && (h.stopPropagation(), h.preventDefault()))
            }
            var i = !1;
            void 0 !== window.onwheel ? b.event.bind(a, "wheel", h) : void 0 !== window.onmousewheel && b.event.bind(a, "mousewheel", h)
        }
        var e = a("../instances"),
            f = a("../update-geometry"),
            g = a("../update-scroll");
        b.exports = function(a) {
            d(a, e.get(a))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            b.event.bind(a, "scroll", function() {
                f(a)
            })
        }
        var e = a("../instances"),
            f = a("../update-geometry");
        b.exports = function(a) {
            d(a, e.get(a))
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            function c() {
                var a = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === a.toString().length ? null : a.getRangeAt(0).commonAncestorContainer
            }

            function d() {
                j || (j = setInterval(function() {
                    return f.get(a) ? (h(a, "top", a.scrollTop + k.top), h(a, "left", a.scrollLeft + k.left), void g(a)) : void clearInterval(j)
                }, 50))
            }

            function i() {
                j && (clearInterval(j), j = null), e.stopScrolling(a)
            }
            var j = null,
                k = {
                    top: 0,
                    left: 0
                },
                l = !1;
            b.event.bind(b.ownerDocument, "selectionchange", function() {
                a.contains(c()) ? l = !0 : (l = !1, i())
            }), b.event.bind(window, "mouseup", function() {
                l && (l = !1, i())
            }), b.event.bind(window, "keyup", function() {
                l && (l = !1, i())
            }), b.event.bind(window, "mousemove", function(b) {
                if (l) {
                    var c = {
                            x: b.pageX,
                            y: b.pageY
                        },
                        f = {
                            left: a.offsetLeft,
                            right: a.offsetLeft + a.offsetWidth,
                            top: a.offsetTop,
                            bottom: a.offsetTop + a.offsetHeight
                        };
                    c.x < f.left + 3 ? (k.left = -5, e.startScrolling(a, "x")) : c.x > f.right - 3 ? (k.left = 5, e.startScrolling(a, "x")) : k.left = 0, c.y < f.top + 3 ? (f.top + 3 - c.y < 5 ? k.top = -5 : k.top = -20, e.startScrolling(a, "y")) : c.y > f.bottom - 3 ? (c.y - f.bottom + 3 < 5 ? k.top = 5 : k.top = 20, e.startScrolling(a, "y")) : k.top = 0, 0 === k.top && 0 === k.left ? i() : d()
                }
            })
        }
        var e = a("../../lib/helper"),
            f = a("../instances"),
            g = a("../update-geometry"),
            h = a("../update-scroll");
        b.exports = function(a) {
            d(a, f.get(a))
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function(a, b, c) {
        "use strict";

        function d(a, b, c, d) {
            function e(c, d) {
                var e = a.scrollTop,
                    f = a.scrollLeft,
                    g = Math.abs(c),
                    h = Math.abs(d);
                if (h > g) {
                    if (d < 0 && e === b.contentHeight - b.containerHeight || d > 0 && 0 === e) return !b.settings.swipePropagation
                } else if (g > h && (c < 0 && f === b.contentWidth - b.containerWidth || c > 0 && 0 === f)) return !b.settings.swipePropagation;
                return !0
            }

            function i(b, c) {
                h(a, "top", a.scrollTop - c), h(a, "left", a.scrollLeft - b), g(a)
            }

            function j() {
                u = !0
            }

            function k() {
                u = !1
            }

            function l(a) {
                return a.targetTouches ? a.targetTouches[0] : a
            }

            function m(a) {
                return !(!a.targetTouches || 1 !== a.targetTouches.length) || !(!a.pointerType || "mouse" === a.pointerType || a.pointerType === a.MSPOINTER_TYPE_MOUSE)
            }

            function n(a) {
                if (m(a)) {
                    v = !0;
                    var b = l(a);
                    q.pageX = b.pageX, q.pageY = b.pageY, r = (new Date).getTime(), null !== t && clearInterval(t), a.stopPropagation()
                }
            }

            function o(a) {
                if (!v && b.settings.swipePropagation && n(a), !u && v && m(a)) {
                    var c = l(a),
                        d = {
                            pageX: c.pageX,
                            pageY: c.pageY
                        },
                        f = d.pageX - q.pageX,
                        g = d.pageY - q.pageY;
                    i(f, g), q = d;
                    var h = (new Date).getTime(),
                        j = h - r;
                    j > 0 && (s.x = f / j, s.y = g / j, r = h), e(f, g) && (a.stopPropagation(), a.preventDefault())
                }
            }

            function p() {
                !u && v && (v = !1, clearInterval(t), t = setInterval(function() {
                    return f.get(a) && (s.x || s.y) ? Math.abs(s.x) < .01 && Math.abs(s.y) < .01 ? void clearInterval(t) : (i(30 * s.x, 30 * s.y), s.x *= .8, void(s.y *= .8)) : void clearInterval(t)
                }, 10))
            }
            var q = {},
                r = 0,
                s = {},
                t = null,
                u = !1,
                v = !1;
            c ? (b.event.bind(window, "touchstart", j), b.event.bind(window, "touchend", k), b.event.bind(a, "touchstart", n), b.event.bind(a, "touchmove", o), b.event.bind(a, "touchend", p)) : d && (window.PointerEvent ? (b.event.bind(window, "pointerdown", j), b.event.bind(window, "pointerup", k), b.event.bind(a, "pointerdown", n), b.event.bind(a, "pointermove", o), b.event.bind(a, "pointerup", p)) : window.MSPointerEvent && (b.event.bind(window, "MSPointerDown", j), b.event.bind(window, "MSPointerUp", k), b.event.bind(a, "MSPointerDown", n), b.event.bind(a, "MSPointerMove", o), b.event.bind(a, "MSPointerUp", p)))
        }
        var e = a("../../lib/helper"),
            f = a("../instances"),
            g = a("../update-geometry"),
            h = a("../update-scroll");
        b.exports = function(a) {
            if (e.env.supportsTouch || e.env.supportsIePointer) {
                d(a, f.get(a), e.env.supportsTouch, e.env.supportsIePointer)
            }
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function(a, b, c) {
        "use strict";
        var d = a("../lib/helper"),
            e = a("../lib/class"),
            f = a("./instances"),
            g = a("./update-geometry"),
            h = {
                "click-rail": a("./handler/click-rail"),
                "drag-scrollbar": a("./handler/drag-scrollbar"),
                keyboard: a("./handler/keyboard"),
                wheel: a("./handler/mouse-wheel"),
                touch: a("./handler/touch"),
                selection: a("./handler/selection")
            },
            i = a("./handler/native-scroll");
        b.exports = function(a, b) {
            b = "object" == typeof b ? b : {}, e.add(a, "ps-container");
            var c = f.add(a);
            c.settings = d.extend(c.settings, b), e.add(a, "ps-theme-" + c.settings.theme), c.settings.handlers.forEach(function(b) {
                h[b](a)
            }), i(a), g(a)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function(a, b, c) {
        "use strict";

        function d(a) {
            function b() {
                i.add(a, "ps-focus")
            }

            function c() {
                i.remove(a, "ps-focus")
            }
            var d = this;
            d.settings = h.clone(j), d.containerWidth = null, d.containerHeight = null, d.contentWidth = null, d.contentHeight = null, d.isRtl = "rtl" === k.css(a, "direction"), d.isNegativeScroll = function() {
                var b = a.scrollLeft,
                    c = null;
                return a.scrollLeft = -1, c = a.scrollLeft < 0, a.scrollLeft = b, c
            }(), d.negativeScrollAdjustment = d.isNegativeScroll ? a.scrollWidth - a.clientWidth : 0, d.event = new l, d.ownerDocument = a.ownerDocument || document, d.scrollbarXRail = k.appendTo(k.e("div", "ps-scrollbar-x-rail"), a), d.scrollbarX = k.appendTo(k.e("div", "ps-scrollbar-x"), d.scrollbarXRail), d.scrollbarX.setAttribute("tabindex", 0), d.event.bind(d.scrollbarX, "focus", b), d.event.bind(d.scrollbarX, "blur", c), d.scrollbarXActive = null, d.scrollbarXWidth = null, d.scrollbarXLeft = null, d.scrollbarXBottom = h.toInt(k.css(d.scrollbarXRail, "bottom")), d.isScrollbarXUsingBottom = d.scrollbarXBottom === d.scrollbarXBottom, d.scrollbarXTop = d.isScrollbarXUsingBottom ? null : h.toInt(k.css(d.scrollbarXRail, "top")), d.railBorderXWidth = h.toInt(k.css(d.scrollbarXRail, "borderLeftWidth")) + h.toInt(k.css(d.scrollbarXRail, "borderRightWidth")), k.css(d.scrollbarXRail, "display", "block"), d.railXMarginWidth = h.toInt(k.css(d.scrollbarXRail, "marginLeft")) + h.toInt(k.css(d.scrollbarXRail, "marginRight")), k.css(d.scrollbarXRail, "display", ""), d.railXWidth = null, d.railXRatio = null, d.scrollbarYRail = k.appendTo(k.e("div", "ps-scrollbar-y-rail"), a), d.scrollbarY = k.appendTo(k.e("div", "ps-scrollbar-y"), d.scrollbarYRail), d.scrollbarY.setAttribute("tabindex", 0), d.event.bind(d.scrollbarY, "focus", b), d.event.bind(d.scrollbarY, "blur", c), d.scrollbarYActive = null, d.scrollbarYHeight = null, d.scrollbarYTop = null, d.scrollbarYRight = h.toInt(k.css(d.scrollbarYRail, "right")), d.isScrollbarYUsingRight = d.scrollbarYRight === d.scrollbarYRight, d.scrollbarYLeft = d.isScrollbarYUsingRight ? null : h.toInt(k.css(d.scrollbarYRail, "left")), d.scrollbarYOuterWidth = d.isRtl ? h.outerWidth(d.scrollbarY) : null, d.railBorderYWidth = h.toInt(k.css(d.scrollbarYRail, "borderTopWidth")) + h.toInt(k.css(d.scrollbarYRail, "borderBottomWidth")), k.css(d.scrollbarYRail, "display", "block"), d.railYMarginHeight = h.toInt(k.css(d.scrollbarYRail, "marginTop")) + h.toInt(k.css(d.scrollbarYRail, "marginBottom")), k.css(d.scrollbarYRail, "display", ""), d.railYHeight = null, d.railYRatio = null
        }

        function e(a) {
            return a.getAttribute("data-ps-id")
        }

        function f(a, b) {
            a.setAttribute("data-ps-id", b)
        }

        function g(a) {
            a.removeAttribute("data-ps-id")
        }
        var h = a("../lib/helper"),
            i = a("../lib/class"),
            j = a("./default-setting"),
            k = a("../lib/dom"),
            l = a("../lib/event-manager"),
            m = a("../lib/guid"),
            n = {};
        c.add = function(a) {
            var b = m();
            return f(a, b), n[b] = new d(a), n[b]
        }, c.remove = function(a) {
            delete n[e(a)], g(a)
        }, c.get = function(a) {
            return n[e(a)]
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function(a, b, c) {
        "use strict";

        function d(a, b) {
            return a.settings.minScrollbarLength && (b = Math.max(b, a.settings.minScrollbarLength)), a.settings.maxScrollbarLength && (b = Math.min(b, a.settings.maxScrollbarLength)), b
        }

        function e(a, b) {
            var c = {
                width: b.railXWidth
            };
            b.isRtl ? c.left = b.negativeScrollAdjustment + a.scrollLeft + b.containerWidth - b.contentWidth : c.left = a.scrollLeft, b.isScrollbarXUsingBottom ? c.bottom = b.scrollbarXBottom - a.scrollTop : c.top = b.scrollbarXTop + a.scrollTop, h.css(b.scrollbarXRail, c);
            var d = {
                top: a.scrollTop,
                height: b.railYHeight
            };
            b.isScrollbarYUsingRight ? b.isRtl ? d.right = b.contentWidth - (b.negativeScrollAdjustment + a.scrollLeft) - b.scrollbarYRight - b.scrollbarYOuterWidth : d.right = b.scrollbarYRight - a.scrollLeft : b.isRtl ? d.left = b.negativeScrollAdjustment + a.scrollLeft + 2 * b.containerWidth - b.contentWidth - b.scrollbarYLeft - b.scrollbarYOuterWidth : d.left = b.scrollbarYLeft + a.scrollLeft, h.css(b.scrollbarYRail, d), h.css(b.scrollbarX, {
                left: b.scrollbarXLeft,
                width: b.scrollbarXWidth - b.railBorderXWidth
            }), h.css(b.scrollbarY, {
                top: b.scrollbarYTop,
                height: b.scrollbarYHeight - b.railBorderYWidth
            })
        }
        var f = a("../lib/helper"),
            g = a("../lib/class"),
            h = a("../lib/dom"),
            i = a("./instances"),
            j = a("./update-scroll");
        b.exports = function(a) {
            var b = i.get(a);
            b.containerWidth = a.clientWidth, b.containerHeight = a.clientHeight, b.contentWidth = a.scrollWidth, b.contentHeight = a.scrollHeight;
            var c;
            a.contains(b.scrollbarXRail) || (c = h.queryChildren(a, ".ps-scrollbar-x-rail"), c.length > 0 && c.forEach(function(a) {
                h.remove(a)
            }), h.appendTo(b.scrollbarXRail, a)), a.contains(b.scrollbarYRail) || (c = h.queryChildren(a, ".ps-scrollbar-y-rail"), c.length > 0 && c.forEach(function(a) {
                h.remove(a)
            }), h.appendTo(b.scrollbarYRail, a)), !b.settings.suppressScrollX && b.containerWidth + b.settings.scrollXMarginOffset < b.contentWidth ? (b.scrollbarXActive = !0, b.railXWidth = b.containerWidth - b.railXMarginWidth, b.railXRatio = b.containerWidth / b.railXWidth, b.scrollbarXWidth = d(b, f.toInt(b.railXWidth * b.containerWidth / b.contentWidth)), b.scrollbarXLeft = f.toInt((b.negativeScrollAdjustment + a.scrollLeft) * (b.railXWidth - b.scrollbarXWidth) / (b.contentWidth - b.containerWidth))) : b.scrollbarXActive = !1, !b.settings.suppressScrollY && b.containerHeight + b.settings.scrollYMarginOffset < b.contentHeight ? (b.scrollbarYActive = !0, b.railYHeight = b.containerHeight - b.railYMarginHeight, b.railYRatio = b.containerHeight / b.railYHeight, b.scrollbarYHeight = d(b, f.toInt(b.railYHeight * b.containerHeight / b.contentHeight)), b.scrollbarYTop = f.toInt(a.scrollTop * (b.railYHeight - b.scrollbarYHeight) / (b.contentHeight - b.containerHeight))) : b.scrollbarYActive = !1, b.scrollbarXLeft >= b.railXWidth - b.scrollbarXWidth && (b.scrollbarXLeft = b.railXWidth - b.scrollbarXWidth), b.scrollbarYTop >= b.railYHeight - b.scrollbarYHeight && (b.scrollbarYTop = b.railYHeight - b.scrollbarYHeight), e(a, b), b.scrollbarXActive ? g.add(a, "ps-active-x") : (g.remove(a, "ps-active-x"), b.scrollbarXWidth = 0, b.scrollbarXLeft = 0, j(a, "left", 0)), b.scrollbarYActive ? g.add(a, "ps-active-y") : (g.remove(a, "ps-active-y"), b.scrollbarYHeight = 0, b.scrollbarYTop = 0, j(a, "top", 0))
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function(a, b, c) {
        "use strict";
        var d, e, f = a("./instances"),
            g = function(a) {
                var b = document.createEvent("Event");
                return b.initEvent(a, !0, !0), b
            };
        b.exports = function(a, b, c) {
            if (void 0 === a) throw "You must provide an element to the update-scroll function";
            if (void 0 === b) throw "You must provide an axis to the update-scroll function";
            if (void 0 === c) throw "You must provide a value to the update-scroll function";
            "top" === b && c <= 0 && (a.scrollTop = c = 0, a.dispatchEvent(g("ps-y-reach-start"))), "left" === b && c <= 0 && (a.scrollLeft = c = 0, a.dispatchEvent(g("ps-x-reach-start")));
            var h = f.get(a);
            "top" === b && c >= h.contentHeight - h.containerHeight && (c = h.contentHeight - h.containerHeight, c - a.scrollTop <= 1 ? c = a.scrollTop : a.scrollTop = c, a.dispatchEvent(g("ps-y-reach-end"))), "left" === b && c >= h.contentWidth - h.containerWidth && (c = h.contentWidth - h.containerWidth, c - a.scrollLeft <= 1 ? c = a.scrollLeft : a.scrollLeft = c, a.dispatchEvent(g("ps-x-reach-end"))), d || (d = a.scrollTop), e || (e = a.scrollLeft), "top" === b && c < d && a.dispatchEvent(g("ps-scroll-up")), "top" === b && c > d && a.dispatchEvent(g("ps-scroll-down")), "left" === b && c < e && a.dispatchEvent(g("ps-scroll-left")), "left" === b && c > e && a.dispatchEvent(g("ps-scroll-right")), "top" === b && (a.scrollTop = d = c, a.dispatchEvent(g("ps-scroll-y"))), "left" === b && (a.scrollLeft = e = c, a.dispatchEvent(g("ps-scroll-x")))
        }
    }, {
        "./instances": 18
    }],
    21: [function(a, b, c) {
        "use strict";
        var d = a("../lib/helper"),
            e = a("../lib/dom"),
            f = a("./instances"),
            g = a("./update-geometry"),
            h = a("./update-scroll");
        b.exports = function(a) {
            var b = f.get(a);
            b && (b.negativeScrollAdjustment = b.isNegativeScroll ? a.scrollWidth - a.clientWidth : 0, e.css(b.scrollbarXRail, "display", "block"), e.css(b.scrollbarYRail, "display", "block"), b.railXMarginWidth = d.toInt(e.css(b.scrollbarXRail, "marginLeft")) + d.toInt(e.css(b.scrollbarXRail, "marginRight")), b.railYMarginHeight = d.toInt(e.css(b.scrollbarYRail, "marginTop")) + d.toInt(e.css(b.scrollbarYRail, "marginBottom")), e.css(b.scrollbarXRail, "display", "none"), e.css(b.scrollbarYRail, "display", "none"), g(a), h(a, "top", a.scrollTop), h(a, "left", a.scrollLeft), e.css(b.scrollbarXRail, "display", ""), e.css(b.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    }]
}, {}, [1]);