! function($) {
    "use strict";
    const restArguments = function(t, e) {
        return e = null == e ? t.length - 1 : +e,
            function(i, s) {
                for (var n = Math.max(arguments.length - e, 0), o = Array(n), a = 0; a < n; a++) o[a] = arguments[a + e];
                switch (e) {
                    case 0:
                        return t.call(this, o);
                    case 1:
                        return t.call(this, i, o);
                    case 2:
                        return t.call(this, i, s, o)
                }
                var l = Array(e + 1);
                for (a = 0; a < e; a++) l[a] = arguments[a];
                return l[e] = o, t.apply(this, l)
            }
    },
    xbDelay = restArguments((function(t, e, i) {
        return setTimeout((function() {
            return t.apply(null, i)
        }), e)
    }));
    window.xbDebounce = function(t, e, i) {
        var s, n, o = function(e, i) {
                s = null, i && (n = t.apply(e, i))
            },
            a = restArguments((function(a) {
                if (s && clearTimeout(s), i) {
                    var l = !s;
                    s = setTimeout(o, e), l && (n = t.apply(this, a))
                } else s = xbDelay(o, e, this, a);
                return n
            }));
        return a.cancel = function() {
            clearTimeout(s), s = null
        }, a
    };

    const t = "xbThrowable";
    let e = {
        roundness: "sharp",
        scrollGravity: !1
    };
    class i {
        constructor(i, s) {
            this._defaults = e, this._name = t, this.options = {
                ...e,
                ...s
            }, this.DOM = {}, this.DOM.element = i, this.DOM.$element = $(i), this.DOM.throwables = this.DOM.element.querySelectorAll("[data-xb-throwable-el]"), this.onWindowResize = xbDebounce(this.onWindowResize.bind(this), 250), this.bodies = [], this.init()
        }
        init() {
            this.createWorld(), this.createBoundries(), this.createBodies(), this.enableRunner(), this.makeItRain(), this.bindResize()
        }
        enableRunner() {
            this.runnerObserver = new IntersectionObserver((([t]) => {
                this.runner.enabled = t.isIntersecting
            })).observe(this.DOM.element)
        }
        makeItRain() {
            new IntersectionObserver((([t], e) => {
                t.isIntersecting && (this.DOM.throwables.forEach((t => {
                    gsap.to(t, {
                        opacity: 1,
                        duration: .35,
                    })
                })), this.startRain(), e.disconnect())
            })).observe(this.DOM.element)
        }
        bindResize() {
            window.addEventListener("resize", this.onWindowResize)
        }
        createWorld() {
            this.height = this.DOM.element.offsetHeight, this.width = this.DOM.element.offsetWidth, this.engine = Matter.Engine.create(), this.runner = Matter.Runner.create(), this.mouse = Matter.Mouse.create(this.DOM.element), this.DOM.element.removeEventListener("mousewheel", this.mouse.mousewheel), this.DOM.element.addEventListener("mouseleave", this.mouse.mouseup), this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
                mouse: this.mouse,
                constraint: {
                    render: {
                        visible: !1
                    }
                }
            }), this.engine.gravity.y = .8, Matter.Composite.add(this.engine.world, [this.mouseConstraint]), Matter.Runner.start(this.runner, this.engine), Matter.Events.on(this.mouseConstraint, "mousedown", (() => {
                this.DOM.element.style.pointerEvents = "auto"
            })), Matter.Events.on(this.mouseConstraint, "mouseup", (() => {
                this.DOM.element.style.pointerEvents = ""
            })), this.runner.enabled = !1
        }
        createBoundries() {
            this.boundStart = Matter.Bodies.rectangle(-250, this.height / 2, 500, 4 * this.height, {
                isStatic: !0
            }), this.boundEnd = Matter.Bodies.rectangle(this.width + 250, this.height / 2, 500, 4 * this.height, {
                isStatic: !0
            }), this.boundBottom = Matter.Bodies.rectangle(0, this.height + 250, 2 * this.width, 500, {
                isStatic: !0
            }), Matter.Composite.add(this.engine.world, [this.boundBottom, this.boundStart, this.boundEnd])
        }
        createBodies() {
            this.DOM.throwables.forEach(((t, e) => {
                const i = t.querySelector("span"),
                    s = t.getBoundingClientRect(),
                    n = gsap.quickSetter(t, "x", "px"),
                    o = gsap.quickSetter(t, "y", "px"),
                    h = gsap.utils.random(.2 * -Math.PI, .2 * Math.PI),
                    r = gsap.utils.random(s.width / 2, this.width - s.width / 2),
                    a = -s.width - (e * s.height + 10),
                    d = "sharp" === this.options.roundness ? 0 : s.height / 2,
                    u = Matter.Bodies.rectangle(r, a, s.width, s.height, {
                        chamfer: {
                            radius: d
                        },
                        angle: h,
                        isStatic: !0,
                        restitution: .3
                    });
                this.bodies.push(u), Matter.Composite.add(this.engine.world, [u]), Matter.Events.on(this.runner, "tick", (() => {
                    this.runner.enabled && (i.style.transform = "translate(-50%, -50%) rotate(" + u.angle.toFixed(2) + "rad)", o(u.position.y.toFixed(1)), n(u.position.x.toFixed(1)))
                }))
            }))
        }
        createTopBound() {
            this.boundTop = Matter.Bodies.rectangle(0, 0, 2 * this.width, 500, {
                isStatic: !0
            }), Matter.Composite.add(this.engine.world, [this.boundTop])
        }
        makeScrollGravity() {
            let t = 0;
            Matter.Events.on(this.runner, "tick", (() => {
                const e = document.documentElement.scrollTop - document.documentElement.clientTop,
                    i = e - t;
                this.engine.gravity.y = .7 - gsap.utils.clamp(-2, 4, .1 * i), t = e
            }))
        }
        updateBoundries() {
            this.boundTop && Matter.Body.setVertices(this.boundTop, Matter.Bodies.rectangle(0, -250, 2 * this.width, 500, {
                isStatic: !0
            }).vertices), this.boundStart && (Matter.Body.setPosition(this.boundStart, {
                x: -250,
                y: this.height / 2
            }), Matter.Body.setVertices(this.boundStart, Matter.Bodies.rectangle(-250, this.height / 2, 500, 4 * this.height, {
                isStatic: !0
            }).vertices)), this.boundEnd && (Matter.Body.setPosition(this.boundEnd, {
                x: this.width + 250,
                y: this.height / 2
            }), Matter.Body.setVertices(this.boundEnd, Matter.Bodies.rectangle(this.width + 250, this.height / 2, 500, 4 * this.height, {
                isStatic: !0
            }).vertices)), this.boundBottom && (Matter.Body.setPosition(this.boundBottom, {
                x: 0,
                y: this.height + 250
            }), Matter.Body.setVertices(this.boundBottom, Matter.Bodies.rectangle(0, this.height + 250, 2 * this.width, 500, {
                isStatic: !0
            }).vertices))
        }
        updateBodies() {
            this.DOM.throwables.forEach(((t, e) => {
                const i = this.bodies[e],
                    s = t.getBoundingClientRect(),
                    n = "sharp" === this.options.roundness ? 0 : s.height / 2,
                    o = Matter.Bodies.rectangle(i.position.x, i.position.y, s.width, s.height, {
                        chamfer: {
                            radius: n
                        },
                        angle: i.angle
                    });
                if (Matter.Body.setVertices(i, o.vertices), i.position.y > this.height && Matter.Body.setPosition(i, {
                        y: this.height / 2,
                        x: i.position.x
                    }), i.position.x > this.width) {
                    var h = gsap.utils.random(s.width / 2, this.width - s.width / 2);
                    Matter.Body.setPosition(i, {
                        y: i.position.y,
                        x: h
                    })
                }
            }))
        }
        startRain() {
            this.bodies.forEach(((t, e) => {
                const i = setTimeout((() => {
                    Matter.Body.setStatic(t, !1), clearTimeout(i)
                }), 80 * e)
            }));
            let t = !1;
            Matter.Events.on(this.runner, "tick", (() => {
                !t && this.bodies[this.bodies.length - 1].position.y > this.DOM.element.offsetHeight / 2 && (this.createTopBound(), this.options.scrollGravity && this.makeScrollGravity(), t = !0)
            }))
        }
        refresh() {
            if (this.height === this.DOM.element.offsetHeight && this.width === this.DOM.element.offsetWidth) return !1;
            this.height = this.DOM.element.offsetHeight, this.width = this.DOM.element.offsetWidth;
            const t = setTimeout((() => {
                this.updateBoundries(), this.updateBodies(), clearTimeout(t)
            }))
        }
        onWindowResize() {
            this.refresh()
        }
        destroy() {
            this.runner.enabled = !1, Matter.Runner.stop(this.runner), window.removeEventListener("resize", this.onWindowResize)
        }
    }
    $.fn[t] = function(e) {
        return this.each((function() {
            const s = {
                ...$(this).data("throwable-options"),
                ...e
            };
            $.data(this, "plugin_" + t) || $.data(this, "plugin_" + t, new i(this, s))
        }))
    }
}(jQuery), jQuery(document).ready((function($) {
    $("[data-throwable-scene]").xbThrowable()
}));