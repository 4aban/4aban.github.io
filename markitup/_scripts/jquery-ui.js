/*!
 * jQuery UI 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c, j) {
    function k(a) {
        return !c(a).parents().andSelf().filter(function() {
            return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
        }).length
    }
    c.ui = c.ui || {};
    if (!c.ui.version) {
        c.extend(c.ui, {
            version: "1.8.4",
            plugin: {
                add: function(a, b, d) {
                    a = c.ui[a].prototype;
                    for (var e in d) {
                        a.plugins[e] = a.plugins[e] || [];
                        a.plugins[e].push([b, d[e]])
                    }
                },
                call: function(a, b, d) {
                    if ((b = a.plugins[b]) && a.element[0].parentNode)
                        for (var e = 0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, d)
                }
            },
            contains: function(a,
                b) {
                return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
            },
            hasScroll: function(a, b) {
                if (c(a).css("overflow") === "hidden") return false;
                b = b && b === "left" ? "scrollLeft" : "scrollTop";
                var d = false;
                if (a[b] > 0) return true;
                a[b] = 1;
                d = a[b] > 0;
                a[b] = 0;
                return d
            },
            isOverAxis: function(a, b, d) {
                return a > b && a < b + d
            },
            isOver: function(a, b, d, e, h, i) {
                return c.ui.isOverAxis(a, d, h) && c.ui.isOverAxis(b, e, i)
            },
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        c.fn.extend({
            _focus: c.fn.focus,
            focus: function(a, b) {
                return typeof a === "number" ? this.each(function() {
                    var d = this;
                    setTimeout(function() {
                        c(d).focus();
                        b && b.call(d)
                    }, a)
                }) : this._focus.apply(this, arguments)
            },
            enableSelection: function() {
                return this.attr("unselectable",
                    "off").css("MozUserSelect", "")
            },
            disableSelection: function() {
                return this.attr("unselectable", "on").css("MozUserSelect", "none")
            },
            scrollParent: function() {
                var a;
                a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(c.curCSS(this,
                        "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
            },
            zIndex: function(a) {
                if (a !== j) return this.css("zIndex", a);
                if (this.length) {
                    a = c(this[0]);
                    for (var b; a.length && a[0] !== document;) {
                        b = a.css("position");
                        if (b === "absolute" || b === "relative" || b === "fixed") {
                            b = parseInt(a.css("zIndex"));
                            if (!isNaN(b) && b != 0) return b
                        }
                        a = a.parent()
                    }
                }
                return 0
            }
        });
        c.each(["Width", "Height"], function(a, b) {
            function d(f, g, l, m) {
                c.each(e, function() {
                    g -=
                        parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
                    if (l) g -= parseFloat(c.curCSS(f, "border" + this + "Width", true)) || 0;
                    if (m) g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
                });
                return g
            }
            var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                h = b.toLowerCase(),
                i = {
                    innerWidth: c.fn.innerWidth,
                    innerHeight: c.fn.innerHeight,
                    outerWidth: c.fn.outerWidth,
                    outerHeight: c.fn.outerHeight
                };
            c.fn["inner" + b] = function(f) {
                if (f === j) return i["inner" + b].call(this);
                return this.each(function() {
                    c.style(this, h, d(this, f) + "px")
                })
            };
            c.fn["outer" +
                b] = function(f, g) {
                if (typeof f !== "number") return i["outer" + b].call(this, f);
                return this.each(function() {
                    c.style(this, h, d(this, f, true, g) + "px")
                })
            }
        });
        c.extend(c.expr[":"], {
            data: function(a, b, d) {
                return !!c.data(a, d[3])
            },
            focusable: function(a) {
                var b = a.nodeName.toLowerCase(),
                    d = c.attr(a, "tabindex");
                if ("area" === b) {
                    b = a.parentNode;
                    d = b.name;
                    if (!a.href || !d || b.nodeName.toLowerCase() !== "map") return false;
                    a = c("img[usemap=#" + d + "]")[0];
                    return !!a && k(a)
                }
                return (/input|select|textarea|button|object/.test(b) ? !a.disabled : "a" ==
                    b ? a.href || !isNaN(d) : !isNaN(d)) && k(a)
            },
            tabbable: function(a) {
                var b = c.attr(a, "tabindex");
                return (isNaN(b) || b >= 0) && c(a).is(":focusable")
            }
        })
    }
})(jQuery);;
/*!
 * jQuery UI Widget 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b, j) {
    var k = b.fn.remove;
    b.fn.remove = function(a, c) {
        return this.each(function() {
            if (!c)
                if (!a || b.filter(a, [this]).length) b("*", this).add([this]).each(function() {
                    b(this).triggerHandler("remove")
                });
            return k.call(b(this), a, c)
        })
    };
    b.widget = function(a, c, d) {
        var e = a.split(".")[0],
            f;
        a = a.split(".")[1];
        f = e + "-" + a;
        if (!d) {
            d = c;
            c = b.Widget
        }
        b.expr[":"][f] = function(h) {
            return !!b.data(h, a)
        };
        b[e] = b[e] || {};
        b[e][a] = function(h, g) {
            arguments.length && this._createWidget(h, g)
        };
        c = new c;
        c.options = b.extend(true, {}, c.options);
        b[e][a].prototype = b.extend(true, c, {
            namespace: e,
            widgetName: a,
            widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a,
            widgetBaseClass: f
        }, d);
        b.widget.bridge(a, b[e][a])
    };
    b.widget.bridge = function(a, c) {
        b.fn[a] = function(d) {
            var e = typeof d === "string",
                f = Array.prototype.slice.call(arguments, 1),
                h = this;
            d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d;
            if (e && d.substring(0, 1) === "_") return h;
            e ? this.each(function() {
                    var g = b.data(this, a),
                        i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g;
                    if (i !== g && i !== j) {
                        h = i;
                        return false
                    }
                }) :
                this.each(function() {
                    var g = b.data(this, a);
                    if (g) {
                        d && g.option(d);
                        g._init()
                    } else b.data(this, a, new c(d, this))
                });
            return h
        }
    };
    b.Widget = function(a, c) {
        arguments.length && this._createWidget(a, c)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(a, c) {
            b.data(c, this.widgetName, this);
            this.element = b(c);
            this.options = b.extend(true, {}, this.options, b.metadata && b.metadata.get(c)[this.widgetName], a);
            var d = this;
            this.element.bind("remove." + this.widgetName, function() {
                d.destroy()
            });
            this._create();
            this._init()
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(a, c) {
            var d = a,
                e = this;
            if (arguments.length === 0) return b.extend({}, e.options);
            if (typeof a === "string") {
                if (c === j) return this.options[a];
                d = {};
                d[a] = c
            }
            b.each(d, function(f,
                h) {
                e._setOption(f, h)
            });
            return e
        },
        _setOption: function(a, c) {
            this.options[a] = c;
            if (a === "disabled") this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c);
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _trigger: function(a, c, d) {
            var e = this.options[a];
            c = b.Event(c);
            c.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase();
            d = d || {};
            if (c.originalEvent) {
                a =
                    b.event.props.length;
                for (var f; a;) {
                    f = b.event.props[--a];
                    c[f] = c.originalEvent[f]
                }
            }
            this.element.trigger(c, d);
            return !(b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
        }
    }
})(jQuery);;
/*!
 * jQuery UI Mouse 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(c) {
    c.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function(b) {
                return a._mouseDown(b)
            }).bind("click." + this.widgetName, function(b) {
                if (a._preventClickEvent) {
                    a._preventClickEvent = false;
                    b.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(a) {
            a.originalEvent = a.originalEvent || {};
            if (!a.originalEvent.mouseHandled) {
                this._mouseStarted &&
                    this._mouseUp(a);
                this._mouseDownEvent = a;
                var b = this,
                    e = a.which == 1,
                    f = typeof this.options.cancel == "string" ? c(a.target).parents().add(a.target).filter(this.options.cancel).length : false;
                if (!e || f || !this._mouseCapture(a)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function() {
                    b.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                    this._mouseStarted = this._mouseStart(a) !== false;
                    if (!this._mouseStarted) {
                        a.preventDefault();
                        return true
                    }
                }
                this._mouseMoveDelegate = function(d) {
                    return b._mouseMove(d)
                };
                this._mouseUpDelegate = function(d) {
                    return b._mouseUp(d)
                };
                c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                c.browser.safari || a.preventDefault();
                return a.originalEvent.mouseHandled = true
            }
        },
        _mouseMove: function(a) {
            if (c.browser.msie && !a.button) return this._mouseUp(a);
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if (this._mouseDistanceMet(a) &&
                this._mouseDelayMet(a))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== false) ? this._mouseDrag(a) : this._mouseUp(a);
            return !this._mouseStarted
        },
        _mouseUp: function(a) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = a.target == this._mouseDownEvent.target;
                this._mouseStop(a)
            }
            return false
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX -
                a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    })
})(jQuery);;
/*
 * jQuery UI Position 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c) {
    c.ui = c.ui || {};
    var m = /left|center|right/,
        n = /top|center|bottom/,
        p = c.fn.position,
        q = c.fn.offset;
    c.fn.position = function(a) {
        if (!a || !a.of) return p.apply(this, arguments);
        a = c.extend({}, a);
        var b = c(a.of),
            d = (a.collision || "flip").split(" "),
            e = a.offset ? a.offset.split(" ") : [0, 0],
            g, h, i;
        if (a.of.nodeType === 9) {
            g = b.width();
            h = b.height();
            i = {
                top: 0,
                left: 0
            }
        } else if (a.of.scrollTo && a.of.document) {
            g = b.width();
            h = b.height();
            i = {
                top: b.scrollTop(),
                left: b.scrollLeft()
            }
        } else if (a.of.preventDefault) {
            a.at = "left top";
            g = h =
                0;
            i = {
                top: a.of.pageY,
                left: a.of.pageX
            }
        } else {
            g = b.outerWidth();
            h = b.outerHeight();
            i = b.offset()
        }
        c.each(["my", "at"], function() {
            var f = (a[this] || "").split(" ");
            if (f.length === 1) f = m.test(f[0]) ? f.concat(["center"]) : n.test(f[0]) ? ["center"].concat(f) : ["center", "center"];
            f[0] = m.test(f[0]) ? f[0] : "center";
            f[1] = n.test(f[1]) ? f[1] : "center";
            a[this] = f
        });
        if (d.length === 1) d[1] = d[0];
        e[0] = parseInt(e[0], 10) || 0;
        if (e.length === 1) e[1] = e[0];
        e[1] = parseInt(e[1], 10) || 0;
        if (a.at[0] === "right") i.left += g;
        else if (a.at[0] === "center") i.left +=
            g / 2;
        if (a.at[1] === "bottom") i.top += h;
        else if (a.at[1] === "center") i.top += h / 2;
        i.left += e[0];
        i.top += e[1];
        return this.each(function() {
            var f = c(this),
                k = f.outerWidth(),
                l = f.outerHeight(),
                j = c.extend({}, i);
            if (a.my[0] === "right") j.left -= k;
            else if (a.my[0] === "center") j.left -= k / 2;
            if (a.my[1] === "bottom") j.top -= l;
            else if (a.my[1] === "center") j.top -= l / 2;
            j.left = parseInt(j.left);
            j.top = parseInt(j.top);
            c.each(["left", "top"], function(o, r) {
                c.ui.position[d[o]] && c.ui.position[d[o]][r](j, {
                    targetWidth: g,
                    targetHeight: h,
                    elemWidth: k,
                    elemHeight: l,
                    offset: e,
                    my: a.my,
                    at: a.at
                })
            });
            c.fn.bgiframe && f.bgiframe();
            f.offset(c.extend(j, {
                using: a.using
            }))
        })
    };
    c.ui.position = {
        fit: {
            left: function(a, b) {
                var d = c(window);
                b = a.left + b.elemWidth - d.width() - d.scrollLeft();
                a.left = b > 0 ? a.left - b : Math.max(0, a.left)
            },
            top: function(a, b) {
                var d = c(window);
                b = a.top + b.elemHeight - d.height() - d.scrollTop();
                a.top = b > 0 ? a.top - b : Math.max(0, a.top)
            }
        },
        flip: {
            left: function(a, b) {
                if (b.at[0] !== "center") {
                    var d = c(window);
                    d = a.left + b.elemWidth - d.width() - d.scrollLeft();
                    var e = b.my[0] === "left" ?
                        -b.elemWidth : b.my[0] === "right" ? b.elemWidth : 0,
                        g = -2 * b.offset[0];
                    a.left += a.left < 0 ? e + b.targetWidth + g : d > 0 ? e - b.targetWidth + g : 0
                }
            },
            top: function(a, b) {
                if (b.at[1] !== "center") {
                    var d = c(window);
                    d = a.top + b.elemHeight - d.height() - d.scrollTop();
                    var e = b.my[1] === "top" ? -b.elemHeight : b.my[1] === "bottom" ? b.elemHeight : 0,
                        g = b.at[1] === "top" ? b.targetHeight : -b.targetHeight,
                        h = -2 * b.offset[1];
                    a.top += a.top < 0 ? e + b.targetHeight + h : d > 0 ? e + g + h : 0
                }
            }
        }
    };
    if (!c.offset.setOffset) {
        c.offset.setOffset = function(a, b) {
            if (/static/.test(c.curCSS(a, "position"))) a.style.position =
                "relative";
            var d = c(a),
                e = d.offset(),
                g = parseInt(c.curCSS(a, "top", true), 10) || 0,
                h = parseInt(c.curCSS(a, "left", true), 10) || 0;
            e = {
                top: b.top - e.top + g,
                left: b.left - e.left + h
            };
            "using" in b ? b.using.call(a, e) : d.css(e)
        };
        c.fn.offset = function(a) {
            var b = this[0];
            if (!b || !b.ownerDocument) return null;
            if (a) return this.each(function() {
                c.offset.setOffset(this, a)
            });
            return q.call(this)
        }
    }
})(jQuery);;
/*
 * jQuery UI Draggable 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d) {
    d.widget("ui.draggable", d.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function() {
            if (this.options.helper ==
                "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function() {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function(a) {
            var b =
                this.options;
            if (this.helper || b.disabled || d(a.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(a);
            if (!this.handle) return false;
            return true
        },
        _mouseStart: function(a) {
            var b = this.options;
            this.helper = this._createHelper(a);
            this._cacheHelperProportions();
            if (d.ui.ddmanager) d.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top -
                    this.margins.top,
                left: this.offset.left - this.margins.left
            };
            d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            b.containment && this._setContainment();
            if (this._trigger("start", a) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(a, true);
            return true
        },
        _mouseDrag: function(a, b) {
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!b) {
                b = this._uiHash();
                if (this._trigger("drag", a, b) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = b.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis ||
                this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            d.ui.ddmanager && d.ui.ddmanager.drag(this, a);
            return false
        },
        _mouseStop: function(a) {
            var b = false;
            if (d.ui.ddmanager && !this.options.dropBehaviour) b = d.ui.ddmanager.drop(this, a);
            if (this.dropped) {
                b = this.dropped;
                this.dropped = false
            }
            if (!this.element[0] || !this.element[0].parentNode) return false;
            if (this.options.revert == "invalid" && !b || this.options.revert == "valid" && b || this.options.revert === true || d.isFunction(this.options.revert) && this.options.revert.call(this.element,
                    b)) {
                var c = this;
                d(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    c._trigger("stop", a) !== false && c._clear()
                })
            } else this._trigger("stop", a) !== false && this._clear();
            return false
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function(a) {
            var b = !this.options.handle || !d(this.options.handle, this.element).length ? true : false;
            d(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this ==
                    a.target) b = true
            });
            return b
        },
        _createHelper: function(a) {
            var b = this.options;
            a = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a])) : b.helper == "clone" ? this.element.clone() : this.element;
            a.parents("body").length || a.appendTo(b.appendTo == "parent" ? this.element[0].parentNode : b.appendTo);
            a[0] != this.element[0] && !/(fixed|absolute)/.test(a.css("position")) && a.css("position", "absolute");
            return a
        },
        _adjustOffsetFromHelper: function(a) {
            if (typeof a == "string") a = a.split(" ");
            if (d.isArray(a)) a = {
                left: +a[0],
                top: +a[1] ||
                    0
            };
            if ("left" in a) this.offset.click.left = a.left + this.margins.left;
            if ("right" in a) this.offset.click.left = this.helperProportions.width - a.right + this.margins.left;
            if ("top" in a) this.offset.click.top = a.top + this.margins.top;
            if ("bottom" in a) this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0],
                    this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && d.browser.msie) a = {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {
                    top: a.top -
                        (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var a = this.options;
            if (a.containment ==
                "parent") a.containment = this.helper[0].parentNode;
            if (a.containment == "document" || a.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, d(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (d(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(a.containment) &&
                a.containment.constructor != Array) {
                var b = d(a.containment)[0];
                if (b) {
                    a = d(a.containment).offset();
                    var c = d(b).css("overflow") != "hidden";
                    this.containment = [a.left + (parseInt(d(b).css("borderLeftWidth"), 10) || 0) + (parseInt(d(b).css("paddingLeft"), 10) || 0) - this.margins.left, a.top + (parseInt(d(b).css("borderTopWidth"), 10) || 0) + (parseInt(d(b).css("paddingTop"), 10) || 0) - this.margins.top, a.left + (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(d(b).css("borderLeftWidth"), 10) || 0) - (parseInt(d(b).css("paddingRight"),
                        10) || 0) - this.helperProportions.width - this.margins.left, a.top + (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(d(b).css("borderTopWidth"), 10) || 0) - (parseInt(d(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
                }
            } else if (a.containment.constructor == Array) this.containment = a.containment
        },
        _convertPositionTo: function(a, b) {
            if (!b) b = this.position;
            a = a == "absolute" ? 1 : -1;
            var c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0],
                    this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(c[0].tagName);
            return {
                top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()) * a),
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() :
                    f ? 0 : c.scrollLeft()) * a)
            }
        },
        _generatePosition: function(a) {
            var b = this.options,
                c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(c[0].tagName),
                e = a.pageX,
                g = a.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (a.pageX - this.offset.click.left < this.containment[0]) e = this.containment[0] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top < this.containment[1]) g = this.containment[1] +
                        this.offset.click.top;
                    if (a.pageX - this.offset.click.left > this.containment[2]) e = this.containment[2] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top > this.containment[3]) g = this.containment[3] + this.offset.click.top
                }
                if (b.grid) {
                    g = this.originalPageY + Math.round((g - this.originalPageY) / b.grid[1]) * b.grid[1];
                    g = this.containment ? !(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : !(g - this.offset.click.top < this.containment[1]) ? g - b.grid[1] : g + b.grid[1] : g;
                    e = this.originalPageX +
                        Math.round((e - this.originalPageX) / b.grid[0]) * b.grid[0];
                    e = this.containment ? !(e - this.offset.click.left < this.containment[0] || e - this.offset.click.left > this.containment[2]) ? e : !(e - this.offset.click.left < this.containment[0]) ? e - b.grid[0] : e + b.grid[0] : e
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()),
                left: e - this.offset.click.left -
                    this.offset.relative.left - this.offset.parent.left + (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : c.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(a, b, c) {
            c = c || this._uiHash();
            d.ui.plugin.call(this, a, [b, c]);
            if (a == "drag") this.positionAbs =
                this._convertPositionTo("absolute");
            return d.Widget.prototype._trigger.call(this, a, b, c)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    d.extend(d.ui.draggable, {
        version: "1.8.4"
    });
    d.ui.plugin.add("draggable", "connectToSortable", {
        start: function(a, b) {
            var c = d(this).data("draggable"),
                f = c.options,
                e = d.extend({}, b, {
                    item: c.element
                });
            c.sortables = [];
            d(f.connectToSortable).each(function() {
                var g = d.data(this, "sortable");
                if (g && !g.options.disabled) {
                    c.sortables.push({
                        instance: g,
                        shouldRevert: g.options.revert
                    });
                    g._refreshItems();
                    g._trigger("activate", a, e)
                }
            })
        },
        stop: function(a, b) {
            var c = d(this).data("draggable"),
                f = d.extend({}, b, {
                    item: c.element
                });
            d.each(c.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    c.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(a);
                    this.instance.options.helper = this.instance.options._helper;
                    c.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", a, f)
                }
            })
        },
        drag: function(a, b) {
            var c = d(this).data("draggable"),
                f = this;
            d.each(c.sortables, function() {
                this.instance.positionAbs = c.positionAbs;
                this.instance.helperProportions = c.helperProportions;
                this.instance.offset.click = c.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver =
                            1;
                        this.instance.currentItem = d(f).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return b.helper[0]
                        };
                        a.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(a, true);
                        this.instance._mouseStart(a, true, true);
                        this.instance.offset.click.top = c.offset.click.top;
                        this.instance.offset.click.left = c.offset.click.left;
                        this.instance.offset.parent.left -= c.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= c.offset.parent.top - this.instance.offset.parent.top;
                        c._trigger("toSortable", a);
                        c.dropped = this.instance.element;
                        c.currentItem = c.element;
                        this.instance.fromOutside = c
                    }
                    this.instance.currentItem && this.instance._mouseDrag(a)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", a, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(a, true);
                    this.instance.options.helper =
                        this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    c._trigger("fromSortable", a);
                    c.dropped = false
                }
            })
        }
    });
    d.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var a = d("body"),
                b = d(this).data("draggable").options;
            if (a.css("cursor")) b._cursor = a.css("cursor");
            a.css("cursor", b.cursor)
        },
        stop: function() {
            var a = d(this).data("draggable").options;
            a._cursor && d("body").css("cursor", a._cursor)
        }
    });
    d.ui.plugin.add("draggable", "iframeFix", {
        start: function() {
            var a =
                d(this).data("draggable").options;
            d(a.iframeFix === true ? "iframe" : a.iframeFix).each(function() {
                d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(d(this).offset()).appendTo("body")
            })
        },
        stop: function() {
            d("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            })
        }
    });
    d.ui.plugin.add("draggable", "opacity", {
        start: function(a, b) {
            a = d(b.helper);
            b = d(this).data("draggable").options;
            if (a.css("opacity")) b._opacity = a.css("opacity");
            a.css("opacity", b.opacity)
        },
        stop: function(a, b) {
            a = d(this).data("draggable").options;
            a._opacity && d(b.helper).css("opacity", a._opacity)
        }
    });
    d.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var a = d(this).data("draggable");
            if (a.scrollParent[0] != document && a.scrollParent[0].tagName != "HTML") a.overflowOffset = a.scrollParent.offset()
        },
        drag: function(a) {
            var b = d(this).data("draggable"),
                c = b.options,
                f = false;
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName !=
                "HTML") {
                if (!c.axis || c.axis != "x")
                    if (b.overflowOffset.top + b.scrollParent[0].offsetHeight - a.pageY < c.scrollSensitivity) b.scrollParent[0].scrollTop = f = b.scrollParent[0].scrollTop + c.scrollSpeed;
                    else if (a.pageY - b.overflowOffset.top < c.scrollSensitivity) b.scrollParent[0].scrollTop = f = b.scrollParent[0].scrollTop - c.scrollSpeed;
                if (!c.axis || c.axis != "y")
                    if (b.overflowOffset.left + b.scrollParent[0].offsetWidth - a.pageX < c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft + c.scrollSpeed;
                    else if (a.pageX -
                    b.overflowOffset.left < c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft - c.scrollSpeed
            } else {
                if (!c.axis || c.axis != "x")
                    if (a.pageY - d(document).scrollTop() < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() - c.scrollSpeed);
                    else if (d(window).height() - (a.pageY - d(document).scrollTop()) < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() + c.scrollSpeed);
                if (!c.axis || c.axis != "y")
                    if (a.pageX - d(document).scrollLeft() < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() -
                        c.scrollSpeed);
                    else if (d(window).width() - (a.pageX - d(document).scrollLeft()) < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() + c.scrollSpeed)
            }
            f !== false && d.ui.ddmanager && !c.dropBehaviour && d.ui.ddmanager.prepareOffsets(b, a)
        }
    });
    d.ui.plugin.add("draggable", "snap", {
        start: function() {
            var a = d(this).data("draggable"),
                b = a.options;
            a.snapElements = [];
            d(b.snap.constructor != String ? b.snap.items || ":data(draggable)" : b.snap).each(function() {
                var c = d(this),
                    f = c.offset();
                this != a.element[0] && a.snapElements.push({
                    item: this,
                    width: c.outerWidth(),
                    height: c.outerHeight(),
                    top: f.top,
                    left: f.left
                })
            })
        },
        drag: function(a, b) {
            for (var c = d(this).data("draggable"), f = c.options, e = f.snapTolerance, g = b.offset.left, n = g + c.helperProportions.width, m = b.offset.top, o = m + c.helperProportions.height, h = c.snapElements.length - 1; h >= 0; h--) {
                var i = c.snapElements[h].left,
                    k = i + c.snapElements[h].width,
                    j = c.snapElements[h].top,
                    l = j + c.snapElements[h].height;
                if (i - e < g && g < k + e && j - e < m && m < l + e || i - e < g && g < k + e && j - e < o && o < l + e || i - e < n && n < k + e && j - e < m && m < l + e || i - e < n && n < k + e && j - e < o &&
                    o < l + e) {
                    if (f.snapMode != "inner") {
                        var p = Math.abs(j - o) <= e,
                            q = Math.abs(l - m) <= e,
                            r = Math.abs(i - n) <= e,
                            s = Math.abs(k - g) <= e;
                        if (p) b.position.top = c._convertPositionTo("relative", {
                            top: j - c.helperProportions.height,
                            left: 0
                        }).top - c.margins.top;
                        if (q) b.position.top = c._convertPositionTo("relative", {
                            top: l,
                            left: 0
                        }).top - c.margins.top;
                        if (r) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: i - c.helperProportions.width
                        }).left - c.margins.left;
                        if (s) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: k
                        }).left - c.margins.left
                    }
                    var t =
                        p || q || r || s;
                    if (f.snapMode != "outer") {
                        p = Math.abs(j - m) <= e;
                        q = Math.abs(l - o) <= e;
                        r = Math.abs(i - g) <= e;
                        s = Math.abs(k - n) <= e;
                        if (p) b.position.top = c._convertPositionTo("relative", {
                            top: j,
                            left: 0
                        }).top - c.margins.top;
                        if (q) b.position.top = c._convertPositionTo("relative", {
                            top: l - c.helperProportions.height,
                            left: 0
                        }).top - c.margins.top;
                        if (r) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: i
                        }).left - c.margins.left;
                        if (s) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: k - c.helperProportions.width
                        }).left - c.margins.left
                    }
                    if (!c.snapElements[h].snapping &&
                        (p || q || r || s || t)) c.options.snap.snap && c.options.snap.snap.call(c.element, a, d.extend(c._uiHash(), {
                        snapItem: c.snapElements[h].item
                    }));
                    c.snapElements[h].snapping = p || q || r || s || t
                } else {
                    c.snapElements[h].snapping && c.options.snap.release && c.options.snap.release.call(c.element, a, d.extend(c._uiHash(), {
                        snapItem: c.snapElements[h].item
                    }));
                    c.snapElements[h].snapping = false
                }
            }
        }
    });
    d.ui.plugin.add("draggable", "stack", {
        start: function() {
            var a = d(this).data("draggable").options;
            a = d.makeArray(d(a.stack)).sort(function(c, f) {
                return (parseInt(d(c).css("zIndex"),
                    10) || 0) - (parseInt(d(f).css("zIndex"), 10) || 0)
            });
            if (a.length) {
                var b = parseInt(a[0].style.zIndex) || 0;
                d(a).each(function(c) {
                    this.style.zIndex = b + c
                });
                this[0].style.zIndex = b + a.length
            }
        }
    });
    d.ui.plugin.add("draggable", "zIndex", {
        start: function(a, b) {
            a = d(b.helper);
            b = d(this).data("draggable").options;
            if (a.css("zIndex")) b._zIndex = a.css("zIndex");
            a.css("zIndex", b.zIndex)
        },
        stop: function(a, b) {
            a = d(this).data("draggable").options;
            a._zIndex && d(b.helper).css("zIndex", a._zIndex)
        }
    })
})(jQuery);;
/*
 * jQuery UI Tabs 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(d, p) {
    function u() {
        return ++v
    }

    function w() {
        return ++x
    }
    var v = 0,
        x = 0;
    d.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function() {
            this._tabify(true)
        },
        _setOption: function(a, e) {
            if (a == "selected") this.options.collapsible &&
                e == this.options.selected || this.select(e);
            else {
                this.options[a] = e;
                this._tabify()
            }
        },
        _tabId: function(a) {
            return a.title && a.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + u()
        },
        _sanitizeSelector: function(a) {
            return a.replace(/:/g, "\\:")
        },
        _cookie: function() {
            var a = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + w());
            return d.cookie.apply(null, [a].concat(d.makeArray(arguments)))
        },
        _ui: function(a, e) {
            return {
                tab: a,
                panel: e,
                index: this.anchors.index(a)
            }
        },
        _cleanup: function() {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                var a =
                    d(this);
                a.html(a.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function(a) {
            function e(g, f) {
                g.css("display", "");
                !d.support.opacity && f.opacity && g[0].style.removeAttribute("filter")
            }
            var b = this,
                c = this.options,
                h = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = d("li:has(a[href])", this.list);
            this.anchors = this.lis.map(function() {
                return d("a", this)[0]
            });
            this.panels = d([]);
            this.anchors.each(function(g, f) {
                var j = d(f).attr("href"),
                    l = j.split("#")[0],
                    q;
                if (l && (l === location.toString().split("#")[0] ||
                        (q = d("base")[0]) && l === q.href)) {
                    j = f.hash;
                    f.href = j
                }
                if (h.test(j)) b.panels = b.panels.add(b._sanitizeSelector(j));
                else if (j !== "#") {
                    d.data(f, "href.tabs", j);
                    d.data(f, "load.tabs", j.replace(/#.*$/, ""));
                    j = b._tabId(f);
                    f.href = "#" + j;
                    f = d("#" + j);
                    if (!f.length) {
                        f = d(c.panelTemplate).attr("id", j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(b.panels[g - 1] || b.list);
                        f.data("destroy.tabs", true)
                    }
                    b.panels = b.panels.add(f)
                } else c.disabled.push(g)
            });
            if (a) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (c.selected === p) {
                    location.hash && this.anchors.each(function(g, f) {
                        if (f.hash == location.hash) {
                            c.selected = g;
                            return false
                        }
                    });
                    if (typeof c.selected !== "number" && c.cookie) c.selected = parseInt(b._cookie(), 10);
                    if (typeof c.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) c.selected =
                        this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    c.selected = c.selected || (this.lis.length ? 0 : -1)
                } else if (c.selected === null) c.selected = -1;
                c.selected = c.selected >= 0 && this.anchors[c.selected] || c.selected < 0 ? c.selected : 0;
                c.disabled = d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"), function(g) {
                    return b.lis.index(g)
                }))).sort();
                d.inArray(c.selected, c.disabled) != -1 && c.disabled.splice(d.inArray(c.selected, c.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (c.selected >= 0 && this.anchors.length) {
                    this.panels.eq(c.selected).removeClass("ui-tabs-hide");
                    this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");
                    b.element.queue("tabs", function() {
                        b._trigger("show", null, b._ui(b.anchors[c.selected], b.panels[c.selected]))
                    });
                    this.load(c.selected)
                }
                d(window).bind("unload", function() {
                    b.lis.add(b.anchors).unbind(".tabs");
                    b.lis = b.anchors = b.panels = null
                })
            } else c.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[c.collapsible ? "addClass" :
                "removeClass"]("ui-tabs-collapsible");
            c.cookie && this._cookie(c.selected, c.cookie);
            a = 0;
            for (var i; i = this.lis[a]; a++) d(i)[d.inArray(a, c.disabled) != -1 && !d(i).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            c.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (c.event !== "mouseover") {
                var k = function(g, f) {
                        f.is(":not(.ui-state-disabled)") && f.addClass("ui-state-" + g)
                    },
                    n = function(g, f) {
                        f.removeClass("ui-state-" + g)
                    };
                this.lis.bind("mouseover.tabs",
                    function() {
                        k("hover", d(this))
                    });
                this.lis.bind("mouseout.tabs", function() {
                    n("hover", d(this))
                });
                this.anchors.bind("focus.tabs", function() {
                    k("focus", d(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function() {
                    n("focus", d(this).closest("li"))
                })
            }
            var m, o;
            if (c.fx)
                if (d.isArray(c.fx)) {
                    m = c.fx[0];
                    o = c.fx[1]
                } else m = o = c.fx;
            var r = o ? function(g, f) {
                    d(g).closest("li").addClass("ui-tabs-selected ui-state-active");
                    f.hide().removeClass("ui-tabs-hide").animate(o, o.duration || "normal", function() {
                        e(f, o);
                        b._trigger("show",
                            null, b._ui(g, f[0]))
                    })
                } : function(g, f) {
                    d(g).closest("li").addClass("ui-tabs-selected ui-state-active");
                    f.removeClass("ui-tabs-hide");
                    b._trigger("show", null, b._ui(g, f[0]))
                },
                s = m ? function(g, f) {
                    f.animate(m, m.duration || "normal", function() {
                        b.lis.removeClass("ui-tabs-selected ui-state-active");
                        f.addClass("ui-tabs-hide");
                        e(f, m);
                        b.element.dequeue("tabs")
                    })
                } : function(g, f) {
                    b.lis.removeClass("ui-tabs-selected ui-state-active");
                    f.addClass("ui-tabs-hide");
                    b.element.dequeue("tabs")
                };
            this.anchors.bind(c.event + ".tabs",
                function() {
                    var g = this,
                        f = d(g).closest("li"),
                        j = b.panels.filter(":not(.ui-tabs-hide)"),
                        l = d(b._sanitizeSelector(g.hash));
                    if (f.hasClass("ui-tabs-selected") && !c.collapsible || f.hasClass("ui-state-disabled") || f.hasClass("ui-state-processing") || b._trigger("select", null, b._ui(this, l[0])) === false) {
                        this.blur();
                        return false
                    }
                    c.selected = b.anchors.index(this);
                    b.abort();
                    if (c.collapsible)
                        if (f.hasClass("ui-tabs-selected")) {
                            c.selected = -1;
                            c.cookie && b._cookie(c.selected, c.cookie);
                            b.element.queue("tabs", function() {
                                s(g,
                                    j)
                            }).dequeue("tabs");
                            this.blur();
                            return false
                        } else if (!j.length) {
                        c.cookie && b._cookie(c.selected, c.cookie);
                        b.element.queue("tabs", function() {
                            r(g, l)
                        });
                        b.load(b.anchors.index(this));
                        this.blur();
                        return false
                    }
                    c.cookie && b._cookie(c.selected, c.cookie);
                    if (l.length) {
                        j.length && b.element.queue("tabs", function() {
                            s(g, j)
                        });
                        b.element.queue("tabs", function() {
                            r(g, l)
                        });
                        b.load(b.anchors.index(this))
                    } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                    d.browser.msie && this.blur()
                });
            this.anchors.bind("click.tabs",
                function() {
                    return false
                })
        },
        _getIndex: function(a) {
            if (typeof a == "string") a = this.anchors.index(this.anchors.filter("[href$=" + a + "]"));
            return a
        },
        destroy: function() {
            var a = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function() {
                var e = d.data(this, "href.tabs");
                if (e) this.href =
                    e;
                var b = d(this).unbind(".tabs");
                d.each(["href", "load", "cache"], function(c, h) {
                    b.removeData(h + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function() {
                d.data(this, "destroy.tabs") ? d(this).remove() : d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            a.cookie && this._cookie(null, a.cookie);
            return this
        },
        add: function(a, e, b) {
            if (b === p) b = this.anchors.length;
            var c = this,
                h = this.options;
            e = d(h.tabTemplate.replace(/#\{href\}/g, a).replace(/#\{label\}/g, e));
            a = !a.indexOf("#") ? a.replace("#", "") : this._tabId(d("a", e)[0]);
            e.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var i = d("#" + a);
            i.length || (i = d(h.panelTemplate).attr("id", a).data("destroy.tabs", true));
            i.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (b >= this.lis.length) {
                e.appendTo(this.list);
                i.appendTo(this.list[0].parentNode)
            } else {
                e.insertBefore(this.lis[b]);
                i.insertBefore(this.panels[b])
            }
            h.disabled = d.map(h.disabled, function(k) {
                return k >= b ? ++k : k
            });
            this._tabify();
            if (this.anchors.length == 1) {
                h.selected = 0;
                e.addClass("ui-tabs-selected ui-state-active");
                i.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function() {
                    c._trigger("show", null, c._ui(c.anchors[0], c.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[b], this.panels[b]));
            return this
        },
        remove: function(a) {
            a = this._getIndex(a);
            var e = this.options,
                b = this.lis.eq(a).remove(),
                c = this.panels.eq(a).remove();
            if (b.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(a + (a + 1 < this.anchors.length ? 1 : -1));
            e.disabled = d.map(d.grep(e.disabled, function(h) {
                return h != a
            }), function(h) {
                return h >= a ? --h : h
            });
            this._tabify();
            this._trigger("remove", null, this._ui(b.find("a")[0], c[0]));
            return this
        },
        enable: function(a) {
            a = this._getIndex(a);
            var e = this.options;
            if (d.inArray(a, e.disabled) != -1) {
                this.lis.eq(a).removeClass("ui-state-disabled");
                e.disabled = d.grep(e.disabled, function(b) {
                    return b != a
                });
                this._trigger("enable", null,
                    this._ui(this.anchors[a], this.panels[a]));
                return this
            }
        },
        disable: function(a) {
            a = this._getIndex(a);
            var e = this.options;
            if (a != e.selected) {
                this.lis.eq(a).addClass("ui-state-disabled");
                e.disabled.push(a);
                e.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[a], this.panels[a]))
            }
            return this
        },
        select: function(a) {
            a = this._getIndex(a);
            if (a == -1)
                if (this.options.collapsible && this.options.selected != -1) a = this.options.selected;
                else return this;
            this.anchors.eq(a).trigger(this.options.event + ".tabs");
            return this
        },
        load: function(a) {
            a = this._getIndex(a);
            var e = this,
                b = this.options,
                c = this.anchors.eq(a)[0],
                h = d.data(c, "load.tabs");
            this.abort();
            if (!h || this.element.queue("tabs").length !== 0 && d.data(c, "cache.tabs")) this.element.dequeue("tabs");
            else {
                this.lis.eq(a).addClass("ui-state-processing");
                if (b.spinner) {
                    var i = d("span", c);
                    i.data("label.tabs", i.html()).html(b.spinner)
                }
                this.xhr = d.ajax(d.extend({}, b.ajaxOptions, {
                    url: h,
                    success: function(k, n) {
                        d(e._sanitizeSelector(c.hash)).html(k);
                        e._cleanup();
                        b.cache && d.data(c, "cache.tabs",
                            true);
                        e._trigger("load", null, e._ui(e.anchors[a], e.panels[a]));
                        try {
                            b.ajaxOptions.success(k, n)
                        } catch (m) {}
                    },
                    error: function(k, n) {
                        e._cleanup();
                        e._trigger("load", null, e._ui(e.anchors[a], e.panels[a]));
                        try {
                            b.ajaxOptions.error(k, n, a, c)
                        } catch (m) {}
                    }
                }));
                e.element.dequeue("tabs");
                return this
            }
        },
        abort: function() {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        },
        url: function(a,
            e) {
            this.anchors.eq(a).removeData("cache.tabs").data("load.tabs", e);
            return this
        },
        length: function() {
            return this.anchors.length
        }
    });
    d.extend(d.ui.tabs, {
        version: "1.8.4"
    });
    d.extend(d.ui.tabs.prototype, {
        rotation: null,
        rotate: function(a, e) {
            var b = this,
                c = this.options,
                h = b._rotate || (b._rotate = function(i) {
                    clearTimeout(b.rotation);
                    b.rotation = setTimeout(function() {
                        var k = c.selected;
                        b.select(++k < b.anchors.length ? k : 0)
                    }, a);
                    i && i.stopPropagation()
                });
            e = b._unrotate || (b._unrotate = !e ? function(i) {
                    i.clientX && b.rotate(null)
                } :
                function() {
                    t = c.selected;
                    h()
                });
            if (a) {
                this.element.bind("tabsshow", h);
                this.anchors.bind(c.event + ".tabs", e);
                h()
            } else {
                clearTimeout(b.rotation);
                this.element.unbind("tabsshow", h);
                this.anchors.unbind(c.event + ".tabs", e);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);;